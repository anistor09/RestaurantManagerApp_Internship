<script lang="ts" setup>
import { Carte } from '~/interfaces/Carte';
import { Restaurant } from '~/interfaces/Restaurant';
import { Hours } from '~/interfaces/Hours';

const workingDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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

const emit = defineEmits(['close']);

// eslint-disable-next-line prefer-const
let name = selectedMenu.value.name;
// eslint-disable-next-line prefer-const
let description = selectedMenu.value.description;
// eslint-disable-next-line prefer-const
let src = selectedMenu.value.imageUrl;

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
		description,
		version: 1,
		active: true,
		imageUrl: defaultSrc,
		itemSet: [],
		hoursSet
	};
	await useFetch('/api/menus/editMenu', {
		method: 'PUT',
		body: carte,
		headers: {
			'Content-Type': 'application/json',
		},
	});
	checkEdit.value = false;
	// Adjust locally
	restaurantRef.value.carteSet.filter((menu) => {
		if (menu.id === selectedMenu.value.id) {
			menu.name = name;
			menu.description = description;
			menu.imageUrl = src;
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
</script>

<template>
	<div id="all">
		<div class="box" style="height: 100%">
			<div class="fieldText">Photo</div>
			<div style="width: 92%; height: 100%; display: flex">
				<el-image
					:src="src || defaultSrc"
					style="width: 13vw; height: 15vh; object-fit: cover; border-radius: 40px"
				/>
				<div class="photoButtonSpace">
					<el-button class="specialPhotoButton">Change</el-button>
					<el-button class="specialPhotoButton">Delete</el-button>
				</div>
			</div>
		</div>
		<div class="box">
			<div id="addName">
				<div class="fieldText">Name</div>
				<input v-model="name" class="specialInput" style="height: 100%" />
			</div>
		</div>
		<div class="box" style="">
			<div class="fieldText">Description</div>
			<textarea v-model="description" class="specialTextArea"></textarea>
		</div>
		<div class="box" style="">
			<div class="fieldText">Menu periods</div>
			<div v-for="(day, index) in workingDays" :key="index" class="workingDay">
				<div class="dayName">{{ day }}</div>
				<el-time-select
					v-model="startTimes[index]"
					style="width: 25%"
					placeholder="Start time"
					start="00:00"
					step="00:30"
					end="23:59"
				/>
				<el-time-select
					v-model="endTimes[index]"
					style="width: 25%"
					placeholder="End time"
					start="00:00"
					step="00:30"
					end="23:59"
				/>
			</div>
		</div>
		<div id="buttonContainer">
			<el-button class="specialPhotoButton" style="width: 17%; height: 20%" @click="checkIfChange()"
				>Save menu</el-button
			>
			<div style="margin-left: 1vw"></div>
			<el-button class="specialPhotoButton" style="width: 17%; height: 20%" data-testId="delete-button" @click="checkIfDelete()"
				>Delete menu</el-button
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

.specialPhotoButton:hover {
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
</style>
