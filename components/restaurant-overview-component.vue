<script setup>

import { useRestaurantStore } from '~/store/restaurant';

const restaurantStore = useRestaurantStore();
const restaurant = restaurantStore.restaurantGetter;

const workingDays = ['Monday', 'Tuesday', 'Wendsnday', 'Thursday', 'Friday', 'Saturnday', 'Sunday'];
const startTimes = ref(['', '', '', '', '', '', '']);
const endTimes = ref(['', '', '', '', '', '', '']);



</script>

<template>
	<div style="width:100%;">
		<div id="title"><h1 style="font-size: 40px;">Restaurant Overview</h1></div>
		<div class="All">
			<!-- Container which contains the image, the name of the restaurant and it's address-->
			<div id="imageNameAddress">
				<img id="circleImage" :src="restaurant.imageUrl" alt=""/>
			    <!-- Container which contains the name of the restaurant and it's address-->
				<div id="nameAddress">
					<input
						v-model="restaurant.name"
						class="specialInput"
						style="font-size: 23px; width: 20%"
						type="input"
						placeholder="Please input"
					/>
					<input
						v-model="restaurant.addresse"
						class="specialInput"
						type="input"
						style="font-size: 18px; text-align: start; width: 50%"
						placeholder="Please input"
					/>
				</div>
			</div>
			<!-- Container which the other information(description, phone number, email and category)-->
			<div class="otherDetails">
				<div class="prefix">Description:</div>
				<!-- The textarea where the restaurant description can be changed by the restaurant owner-->
				<textarea
					v-model="restaurant.description"
					class="specialInput"
					autosize
					style="
						text-align: start;
						width: 40%;
						height: auto;
						overflow: hidden;
						max-width: 80vw;
						min-width: 300px;
						border-radius: 45px;
						padding-left: 1%;
					"
					placeholder="Please input"
				/>
				<!-- TODO -->
				<!-- Opening Hours: <br> -->
				<!-- <input type="text" id="restaurantDescriptionEdit" :value="restaurant."> <br> -->
				<div class="details">
					<div class="prefix">Phone Number:</div>
					<!-- The input where the restaurant phone number can be changed by the restaurant owner-->
					<input
						v-model="restaurant.phone_number"
						class="specialInput"
						style="width: 9%; text-align: center; min-width: 130px"
						type="input"
						placeholder="Please input"
					/>
				</div>
				<div class="details">
					<div class="prefix">Email:</div>
					<!-- The input where the restaurant email can be changed by the restaurant owner-->
					<input
						v-model="restaurant.email"
						class="specialInput"
						style="width: 15%; min-width: 200px"
						type="input"
						placeholder="Please input"
					/>
				</div>
				<div class="details">
					<div class="prefix">Category:</div>
					<!-- The input where the restaurant category can be changed by the restaurant owner-->
					<input
						v-model="restaurant.category"
						class="specialInput"
						style="width: 10%"
						type="input"
						placeholder="Please input"
					/>
				</div>
				<div class="box" style="">
					<div class="prefix">Working Hours:</div>
					<div v-for="(day, index) in workingDays" :key="index" class="workingDay">
						<div class="dayName">{{ day }}</div>
						<el-time-select
							v-model="startTimes[index]"
							style="width: 12%;"
							placeholder="Start time"
							start="00:00"
							step="00:30"
							end="23:59"
						/>
						<el-time-select
							v-model="endTimes[index]"
							style="width: 12%;"
							placeholder="End time"
							start="00:00"
							step="00:30"
							end="23:59"
						/>
					</div>
				</div>
				<div id="buttonContainer">
					<el-button color="#ED5087" plain round> Save changes</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
/* Imported font used in Figma, may be changed when we receive the brand identity docs from Ewai */
@import url('https://fonts.googleapis.com/css?family=Cairo');
.All {
	font-family: 'Cairo';
	width: 100%;
	height: 100%;
	padding-top: 2%;
	padding-left: 2%;
}
h1 {
	padding-left: 2%;
}

#title::after {
	content: '';
	display: block;
	height: 3px;
	width: 100%;
	background-color: #727171;
	margin-top: 10px;
}
/*Styling for both the containers which formed of pairs of inputs and their descriptions*/
.details {
	display: flex;
	align-items: center;
	padding-top: 1%;
	width: 100%;
	font-size: 20px;

}

/* Styling for the descriptions of the inputs */
.prefix {
	margin-right: 10px;
	font-size: 20px;
	padding-left: 3px;
	color: #ed5087;
}

#imageNameAddress {
	display: flex;
	align-items: center;
	width: 100%;
}

#nameAddress {
	display: flex;
	flex-direction: column;
	padding: 25px;
	width: 100%;
}

/*Styling for the inputs*/
.specialInput {
	color: black;
	padding: 4px;
	background-color: #dfdfdf;
	border-radius: 15px;
	margin: 0.2vh;
	height: 20px;
	font-size: 20px;
	border: none;
	font-family: 'Cairo';
	text-align: center;
}
#buttonContainer {
	display: flex;
	justify-content: flex-end;
	padding-right: 5%;
	align-items: center;
}
.dayName {
    width: 12%;
    min-width: 80px;
}
.workingDay {
    display: flex;
    flex-direction: row;
	padding-left: 0%;
}
.box {
	height: auto;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.fieldText {
	width: 100%;
}

#circleImage {
	width: 130px; /* set the width to whatever you need */
	height: 130px; /* set the height to whatever you need */
	border-radius: 50%; /* make the image circular */
	box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.3);
}
</style>
