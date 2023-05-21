<script lang="ts" setup>
const defaultSrc =
	'https://img.favpng.com/23/21/6/knife-fork-spoon-clip-art-png-favpng-g0zSCK2EGgjPqfDQWPh6qVtmY.jpg';
const src = ref(defaultSrc);
const name = ref('');
const description = ref('');
const workingDays = ['Monday', 'Tuesday', 'Wendsnday', 'Thursday', 'Friday', 'Saturnday', 'Sunday'];

const startTimes = ref(['', '', '', '', '', '', '']);
const endTimes = ref(['', '', '', '', '', '', '']);

</script>

<template>
	<div class="demo-time-range"></div>

	<div id="popup">
		<div id="all">
			<div class="box" style="">
				<div class="fieldText">Photo</div>
				<div style="width: 92%; height: 90%; display: flex">
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
					<input v-model="name" class="specialInput" style="height: 56.25%" />
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
                        style="width: 25%;"
						placeholder="Start time"
						start="00:00"
						step="00:30"
						end="23:59"
					/>
					<el-time-select
						v-model="endTimes[index]"
                        style="width: 25%;"
						placeholder="End time"
						start="00:00"
						step="00:30"
						end="23:59"
					/>
				</div>
			</div>
            <div id="buttonContainer">
				<el-button class="specialPhotoButton" style="width: 15%; height: 50%;">Add</el-button>
			</div>
		</div>
	</div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Cairo');
#popup {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	font-family: 'Cairo';
}
#all {
	width: 50%;
	height: 85%;
	display: flex;
	align-items: center;
	flex-direction: column;
	border: 10px solid #ed5087;
	border-radius: 100px;
	padding: 20px;
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
	padding-left: 8%;
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
	height: 100%;
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
	font-size: 0.9vw;
	font-weight: normal !important;
	border: none;
	width: 88%;
	height: 22.5%;
}

.specialTextArea {
	color: black;
	font-weight: lighter !important;
	padding: 3%;
	font-size: 0.9vw;
	background-color: #d9d9d9;
	border-radius: 25px;
	border: none;
	resize: none;
	width: 88%;
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

</style>
