<script lang="ts" setup>
const defaultSrc = 'https://img.favpng.com/23/21/6/knife-fork-spoon-clip-art-png-favpng-g0zSCK2EGgjPqfDQWPh6qVtmY.jpg'
const src = ref(defaultSrc)
const name = ref('')
const description = ref('')
const workingDays = ['Monday', 'Tuesday', 'Wendsnday', 'Thursday', 'Friday', 'Saturnday', 'Sunday'];
const workingHours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const timeOfDay = ['AM', 'PM'];
</script>

<template>
    
    <div id="popup">
        <div id="all">
            <div class="box" style="">
                <div class="fieldText">Photo</div>
                <div style="width: 92%;height:90%;display: flex;">
                    <el-image :src="src" style="width:35%;height: 100%; border-radius: 40px;" />
                    <div class="photoButtonSpace">
                        <el-button class="specialPhotoButton">Change</el-button>
                        <el-button class="specialPhotoButton">Delete</el-button>
                    </div>
                </div>
            </div>
            <div class="box">
                <div id="addName">
                    <div class="fieldText">Name</div>
                    <input v-model="name" class="specialInput" style="height: 56.25%;" />
                </div>
            </div>
            <div class="box" style="">
                <div class="fieldText">Description</div>
                <textarea v-model="description" class="specialTextArea"></textarea>
            </div>
            <div class="box" style="">
                <div class="fieldText">Working Hours:</div>
                <div v-for="day in workingDays" class="workingDay">
                    {{ day }}
                    <el-select
					class="specialSelect"
					size="small"
                    placeholder="HH"
				    >
					<el-option
						v-for="hour in workingHours"
						:key="hour"
						:label="hour"
						:value="hour"
					/>
				</el-select>
                <el-select
					class="specialSelect"
					size="small"
                    placeholder="AM/PM"
				    >
					<el-option
						v-for="period in timeOfDay"
						:key="period"
						:label="period"
						:value="period"
					/>
				</el-select>
                to
                <el-select
					class="specialSelect"
					size="small"
                    placeholder="HH"

				    >
					<el-option
						v-for="hour in workingHours"
						:key="hour"
						:label="hour"
						:value="hour"
					/>
				</el-select>
                <el-select
					class="specialSelect"
					size="small"
                    placeholder="AM/PM"

				    >
					<el-option
						v-for="period in timeOfDay"
						:key="period"
						:label="period"
						:value="period"
					/>
				</el-select>
                </div>
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
	width: 70%;
	height: 75%;
	display: flex;
	align-items: center;
	flex-direction: column;
	border: 10px solid #ed5087;
	border-radius: 100px;
	padding: 20px;
}

#addName {
    /*
    display: flex;
    flex-direction: row;
    justify-content: left;
    */
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
    color: #ED5087;
    font-size: 1.25vw;
}
.photoButtonSpace {
    width: 50%;
    height: 100%;
    padding-left: 0%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.specialPhotoButton {
    border-radius: 25px;
    font-size: 1vw;
    border-color: #ED5087;
    background-color: white;
    color: #ED5087;
    width: 50%;
    height: 30%;
}

.specialPhotoButton:hover {
    background-color: #ED5087;
    border-color: darkgrey;
    color: white;
}

.specialInput {
    color: black;
    padding-left: 3%;
    padding-right: 3%;
    background-color: #D9D9D9;
    border-radius: 25px;
    font-size: 0.9vw;
    font-weight: normal !important;
    border: none;
    width: 70%;
    height: 22.5%;
}

.specialTextArea {
    color: black;
    font-weight: lighter !important;
    padding: 3%;
    font-size: 0.9vw;
    background-color: #D9D9D9;
    border-radius: 25px;
    border: none;
    resize: none;
    width: 70%;
    height: 50%;
}
.specialSelect {
    width: 10%;
}

</style>