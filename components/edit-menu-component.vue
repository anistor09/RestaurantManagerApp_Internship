<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useLanguageStore } from '../store/language';
import translations from '../mockData/translations.json';
import { Carte } from '~/interfaces/Carte';
import { Hours } from '~/interfaces/Hours';
import { Restaurant } from '~/interfaces/Restaurant';

const languageStore = useLanguageStore();

const computedLanguageId = computed(() => languageStore.idGetter);

const workingDays = computed(() => [translations[computedLanguageId.value].monday, translations[computedLanguageId.value].tuesday, 
translations[computedLanguageId.value].wednesday, translations[computedLanguageId.value].thursday, translations[computedLanguageId.value].friday,
translations[computedLanguageId.value].saturday, translations[computedLanguageId.value].sunday]);

const props = defineProps({
	restaurant: {
		type: Object as () => Restaurant,
		required: true,
	},
	menu: {
		type: Object as () => Carte,
		required: true,
	},
});

const restaurantRef = ref(props.restaurant);
const selectedMenu = ref(props.menu);

const defaultSrc =
	'https://img.favpng.com/23/21/6/knife-fork-spoon-clip-art-png-favpng-g0zSCK2EGgjPqfDQWPh6qVtmY.jpg';

const checkEdit = ref(false);
const checkDelete = ref(false);

const imageEdited: Ref<File | null> = ref(null);
const acceptedTypes = ['image/jpeg', 'image/png'];

const emit = defineEmits(['close']);

// eslint-disable-next-line prefer-const
let name = selectedMenu.value.name;
// eslint-disable-next-line prefer-const
const description : Ref<string>= ref(selectedMenu.value.description);
// eslint-disable-next-line prefer-const
const src = ref(selectedMenu.value.imageUrl);

/// function to handle the upload of a image to a menu
function handleFileUpload(event: any) {
	const file = event.target.files[0];
	event.target.value = null;
  	if(!file||!acceptedTypes.includes(file.type)){
		openErrorNotification("Wrong image type")
		return
	}
	else imageEdited.value=file
	
	const reader = new FileReader();
	reader.onload = (event) => {
		if(event.target){
			const x = event.target.result;
			if(typeof x === "string")
				src.value=x
			else 
				openErrorNotification("Something went wrong!")
		}
		else 
			openErrorNotification("Something went wrong!")
	};
	if(imageEdited.value)
		reader.readAsDataURL(imageEdited.value);
	else 
		openErrorNotification("Something went wrong!")	
}

// Function to delete the selected image for a menu
function deleteImg(){
	imageEdited.value=null
	src.value=defaultSrc
}

// Function to display a error notification
const openErrorNotification = (notifTitle: string) => {
	ElNotification({
		title: notifTitle,
		message: h(
			'div',
			{ style: 'color: #ed5087; font-family: "Open Sans"' },
			'Please try with a diffrent file.',
		),
		customClass: 'notif',
	});
};

// Deep copy the two arrays and ref them
const startTimes = ref(
	JSON.parse(JSON.stringify(selectedMenu.value.hoursSet.map((x) => x.opening))),
);
const endTimes = ref(JSON.parse(JSON.stringify(selectedMenu.value.hoursSet.map((x) => x.closing))));
if (startTimes.value.length === 0) startTimes.value = ['', '', '', '', '', '', ''];
if (endTimes.value.length === 0) endTimes.value = ['', '', '', '', '', '', ''];

const editMenu = async() => {
	// Adjust in the database
	const hoursSet = [] as Hours[];
	for (let i = 0; i < 7; i++) {
		if (startTimes.value[i] !== '' && endTimes.value[i] !== '') {
			const hour: Hours = {
				id: 1,
				opening: startTimes.value[i],
				closing: endTimes.value[i],
				day: i,
			};
			hoursSet.push(hour);
		}
	}
	const carte: Carte = {
		id: selectedMenu.value.id,
		name,
		description : description.value,
		version: 1,
		active: true,
		imageUrl: src.value,
		itemSet: [],
		hoursSet
	};
	if(imageEdited.value) 
		carte.imageUrl=""
	await useFetch('/api/menus/editMenu', {
		method: 'PUT',
		body: carte,
		headers: {
			'Content-Type': 'application/json',
		},
	});
	if(imageEdited.value){
		const formData = new FormData();
		formData.append('file', imageEdited.value);
		formData.append('id', selectedMenu.value.id.toString())
		await useFetch(`/api/photos/photoMenu`, {
			method: 'POST',
			body: formData,
		});
	}
	checkEdit.value = false;
	// Adjust locally
	restaurantRef.value.carteSet.filter((menu) => {
		if (menu.id === selectedMenu.value.id) {
			menu.name = name;
			menu.description = description.value;
			menu.imageUrl = src.value;
			menu.hoursSet = hoursSet;
		}
		return true;
	});

	emit('close', name);
};

const deleteMenu = async () => {
	// Delete from database
	await useFetch(`/api/menus/${selectedMenu.value.id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	checkDelete.value = false;

	// Delete locally
	restaurantRef.value.carteSet = restaurantRef.value.carteSet.filter(
		(x) => x.id !== selectedMenu.value.id,
	);

	emit('close', '');
};

const checkIfChange = () => {
	checkEdit.value = true;
};

const checkIfDelete = () => {
	checkDelete.value = true;
};

const nameNeededPopUp = ref(false);

async function addAiMenuDescription() {
	if (name.length === 0) {
		nameNeededPopUp.value = true;
	} else {
		description.value = 'The new description is loading...';
		const requestBody = {itemName: name, length: 150, target: 'menu',};
		const response = await useFetch(`/api/autocompletion/getAutocompletion`, {
			method: 'POST',
			body: requestBody,
			headers: {
				'Content-Type': 'application/json',
			},
		});
		description.value = response.data.value;
	}
}
</script>

<template>
	<div id="all">
		<ClientOnly>
			<Teleport to="body">
				<NameNeededPopUp
					v-model="nameNeededPopUp"
					:message="'menu'"
					@closeNoName="nameNeededPopUp = false"
				></NameNeededPopUp>
			</Teleport>
		</ClientOnly>
		<div class="box" style="height: 100%">
			<div class="fieldText">{{translations[computedLanguageId].photo}}</div>
			<div style="width: 92%; height: 100%; display: flex">
				<el-image
					:src="src || defaultSrc"
					style="width: 13vw; height: 15vh; object-fit: cover; border-radius: 40px"
				/>
				<div class="photoButtonSpace">
					<label for="changePhoto" class="specialPhotoLabel" >{{translations[computedLanguageId].change}}</label>
					<input id="changePhoto" type="file" style="display: none;" @change="handleFileUpload"/>
					<el-button class="specialPhotoButton" @click="deleteImg()">{{translations[computedLanguageId].delete}}</el-button>
				</div>
			</div>
		</div>
		<div class="box">
			<div id="addName">
				<div id="nameIdPrefix" class="fieldText">{{translations[computedLanguageId].name}}</div>
				<input id="nameId" v-model="name" class="specialInput" style="height: 100%" />
			</div>
		</div>
		<div class="box" style="">
			<!-- <div id="descriptionIdPrefix" class="fieldText">Description</div> -->
			<div
				class="div"
				style="display: flex; align-items: center; padding-bottom: 1%; padding-top: 3%"
			>
				<div id="descriptionIdPrefix" class="fieldText" style="width: 18%; padding-bottom: 0.7%">
					{{translations[computedLanguageId].description}}
				</div>

				<el-button class="aiButtonSubcatgory" @click="addAiMenuDescription"
					>✨{{translations[computedLanguageId].writeAi}}</el-button
				>
			</div>
			<textarea id="descriptionId" v-model="description" class="specialTextArea"></textarea>
		</div>
		<div class="box" style="">
			<div class="fieldText">{{translations[computedLanguageId].menuPeriods}}</div>
			<div v-for="(day, index) in workingDays" :key="index" class="workingDay">
				<div class="dayName">{{ day }}</div>
				<el-time-select
					v-model="startTimes[index]"
					style="width: 25%"
					:placeholder=translations[computedLanguageId].startTime
					start="00:00"
					step="00:30"
					end="23:59"
				/>
				<el-time-select
					v-model="endTimes[index]"
					style="width: 25%"
					:placeholder=translations[computedLanguageId].endTime
					start="00:00"
					step="00:30"
					end="23:59"
				/>
			</div>
		</div>
		<div id="buttonContainer">
			<el-button class="specialPhotoButton" style="width: 17%; height: 20%" @click="checkIfChange()"
				>{{translations[computedLanguageId].saveMenu}}</el-button
			>
			<div style="margin-left: 1vw"></div>
			<el-button class="specialPhotoButton" style="width: 17%; height: 20%" data-testId="delete-button" @click="checkIfDelete()"
				>{{translations[computedLanguageId].deleteMenu}}</el-button
			>
		</div>
		<Teleport to="body">
			<el-dialog
				v-model="checkEdit"
				width="20%"
				:style="{
					fontFamily: 'Open Sans',
					textAlign: 'center',
					fontSize: '0.8vw',
					fontWeight: 'bold',
					color: 'black',
					borderRadius: '40px',
					border: '0.15vw solid #ed5087 !important',
					top: '20%',
				}"
			>
				<div>
					Are you sure you want to save the changes for this menu?
					<div id="change-bottom-button">
						<el-button color="#ED5087" plain round @click="editMenu()">Yes</el-button>
					</div>
				</div>
			</el-dialog>

			<Teleport to="body">
				<el-dialog
					v-model="checkDelete"
					width="20%"
					:style="{
						fontFamily: 'Open Sans',
						textAlign: 'center',
						fontSize: '0.8vw',
						fontWeight: 'bold',
						color: 'black',
						borderRadius: '40px',
						border: '0.15vw solid #ed5087 !important',
						top: '20%',
					}"
				>
					<div>
						Are you sure you want to delete this menu?
						<div id="change-bottom-button">
							<el-button color="#ED5087" plain round data-testId="confirm-delete" @click="deleteMenu()">Yes</el-button>
						</div>
					</div>
				</el-dialog>
			</Teleport>
		</Teleport>
	</div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Cairo');

.timeSelect {
	width: 40% !important;
}

.dayName {
	width: 12%;
	min-width: 80px;
}
.box {
	padding-left: 17%;
	height: auto;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}

.fieldText {
	width: 100%;
	color: #ed5087;
	font-size: 1.1vw;
	font-weight: bold;
}
.photoButtonSpace {
	width: 50%;
	padding-left: 5%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}

.specialPhotoButton {
	border-radius: 25px;
	font-size: 1vw;
	border-color: #ed5087;
	background-color: white;
	color: #ed5087;
	width: 50%;
	height: 30%;
}
.aiButtonSubcatgory:hover,
.specialPhotoButton:hover {
	background-color: #ed5087;
	border-color: darkgrey;
	color: white;
}


.specialPhotoLabel {
	border-radius: 25px;
	font-size: 1vw;
	border: 1px solid #ed5087;
	background-color: white;
	color: #ed5087;
	width: 50%;
	height: 30%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.specialPhotoLabel:hover {
	background-color: #ed5087;
	border-color: darkgrey;
	color: white;
}

.el-button + .el-button {
	margin-left: 0;
}

.workingDay {
	display: flex;
	flex-direction: row;
}

.specialInput {
	color: black;
	padding-left: 3%;
	padding-right: 3%;
	background-color: #d9d9d9;
	border-radius: 25px;
	font-size: 1.1vw;
	font-weight: normal !important;
	font-family: 'Cairo';
	border: none;
	width: 60%;
	height: 100%;
}

.specialTextArea {
	color: black;
	font-weight: lighter !important;
	padding: 3%;
	font-size: 0.9vw;
	font-family: 'Cairo';
	background-color: #d9d9d9;
	border-radius: 25px;
	border: none;
	resize: none;
	width: 60%;
	height: 50%;
}
.specialSelect {
	width: 10%;
}
#buttonContainer {
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 5%;
	/*padding-right: 15%;*/
	align-items: center;
	height: 10%;
	width: 100%;
}

.el-select .el-input__wrapper {
	font-family: 'Open Sans';
	font-size: 1.1vw;
	width: 12vw;
	font-weight: bolder;
	height: auto;
	border-radius: 30px;
}

.el-select .el-input.is-focus .el-input__wrapper {
	box-shadow: 0 0 0 1px #ed5087 inset !important;
}

.el-select .el-input.is-ac .el-input__wrapper {
	box-shadow: 0 0 0 1px #ed5087 inset !important;
}

.el-select {
	--el-select-input-focus-border-color: #ed5087;
}

.el-popper {
	border-radius: 25px;
}

.el-select-dropdown__item {
	font-family: 'Open Sans';
	font-size: 1vw;
	text-align: center;
}

.el-select-dropdown__item.selected {
	color: #ed5087;
}
#change-bottom-button {
	display: flex;
	padding-top: 8%;
	justify-content: center;
}
.specialTextArea::-webkit-scrollbar {
  width: 5px;
}
.aiButtonSubcatgory {
	border-radius: 15px;
	font-size: 0.9vw;
	border-color: #ed5087;
	background-color: white;
	color: #ed5087;
	width: 20%;
	height: 3vh;
}
</style>
