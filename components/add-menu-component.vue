<script lang="ts" setup>
import { Carte } from '~/interfaces/Carte';
import { Hours } from '~/interfaces/Hours';
import { Restaurant } from '~/interfaces/Restaurant';

const emit = defineEmits(['close'])

const props = defineProps({
	restaurant: {
		type: Object as () => Restaurant,
		required: true,
	},
});
const restaurantRef = ref(props.restaurant);
const defaultSrc =
	'https://img.favpng.com/23/21/6/knife-fork-spoon-clip-art-png-favpng-g0zSCK2EGgjPqfDQWPh6qVtmY.jpg';
const src = ref(defaultSrc);
const name = ref('');
const description = ref('');
const workingDays = ['Monday', 'Tuesday', 'Wendsnday', 'Thursday', 'Friday', 'Saturnday', 'Sunday'];

const startTimes = ref(['', '', '', '', '', '', '']);
const endTimes = ref(['', '', '', '', '', '', '']);

const doubleCheck = ref(false);

const checkIfChange = () => {
	doubleCheck.value = true;
};

const addMenu = async() => {
	const hoursSet = [];
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
		id: -1,
		name: name.value,
		description: description.value,
		version: 1,
		active: true,
		imageUrl: defaultSrc,
		itemSet: [],
		hoursSet
	};
	await useFetch('/api/menus/addMenu', {
		method: 'POST',
		body: carte,
		headers: {
			'Content-Type': 'application/json',
		},
	});
	restaurantRef.value.carteSet.push(carte);
	doubleCheck.value = false;
	emit('close');
};

/*
function handleAdd() {
	const requestBody = {
		number: tableNumber.value,
		capacity: tableCapacity.value,
		restaurantId: 1,
	};
	useFetch('/api/table/add', {
		method: 'POST',
		body: requestBody,
		headers: {
			'Content-Type': 'application/json',
		},
	}).then((response) => {
		tables.value.push({
			id: tableId.value,
			number: tableNumber.value,
			capacity: tableCapacity.value,
			url: response.data.value?.url === undefined ? 'Not there yet' : response.data.value.url,
		});
		addPopup.value = false;
	});
}

watchEffect(() => {
	const selected = getTable.value;
	if (selected) {
		tableNumber.value = selected.number;
		tableCapacity.value = selected.capacity;
	}
});
*/
</script>

<template>
	<div id="all">
		<div class="box" style="height: 100%">
			<div class="fieldText">Photo</div>
			<div style="width: 92%; height: 100%; display: flex">
				<el-image :src="src" style="width: 35%; height: 100%; border-radius: 40px" />
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
			<div class="fieldText">Working Hours:</div>
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
			<el-button class="specialPhotoButton" style="width: 15%; height: 50%" @click="checkIfChange()"
				>Add</el-button
			>
		</div>
		<Teleport to="body">
			<el-dialog
				v-model="doubleCheck"
				width="20%"
				style="
					font-family: 'Open Sans';
					text-align: center;
					font-size: 0.8vw;
					font-weight: bold;
					color: black;
					border-radius: 40px;
					border: 0.15vw solid #ed5087 !important;
					top: 20%;
				"
			>
				<div>
					Are you sure you want to add this menu?
					<div id="change-bottom-button">
						<el-button color="#ED5087" plain round @click="addMenu()">Yes</el-button>
					</div>
				</div>
			</el-dialog>
		</Teleport>
	</div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Cairo');

#all {
	
}

.timeSelect {
	width: 40% !important;
}

#addName {
	/*
    display: flex;
    flex-direction: row;
    justify-content: left;
    */
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
	font-size: 1.25vw;
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
