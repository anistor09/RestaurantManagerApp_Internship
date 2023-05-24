<script lang="ts" setup>
import { useRestaurantStore } from '~/store/restaurant';
import { Hours } from '~/interfaces/Hours';
const restaurantStore = useRestaurantStore();
const restaurant = restaurantStore.restaurantGetter;

const workingDays = ['Monday', 'Tuesday', 'Wendsnday', 'Thursday', 'Friday', 'Saturnday', 'Sunday'];
const startTimes = ref(['', '', '', '', '', '', '']);
const endTimes = ref(['', '', '', '', '', '', '']);
const doubleCheck = ref(false);

const checkIfChange = () => {
	doubleCheck.value = true;
};
const saveChanges = async() => {
	console.log(restaurant.hoursSet);
	restaurant.hoursSet = [];
	for (let i = 0; i < 7; i++) {
		if (startTimes.value[i] !== '' && endTimes.value[i] !== '') {
			const hour: Hours = {
				id: 1,
				opening: startTimes.value[i],
				closing: endTimes.value[i],
				day: i,
			};
			restaurant.hoursSet.push(hour);
		}
	}
	const bodyString = JSON.stringify(restaurant);
	console.log(bodyString);
	
	await useFetch('/api/restaurant/editRestaurant', {
		method: 'PUT',
		body: bodyString,
		headers: {
			'Content-Type': 'application/json',
		},
	});
		
	doubleCheck.value = false;
};

onMounted(() => {
	for (const [index, element] of restaurant.hoursSet.entries()) {
		if (index < 7) {
			startTimes.value[index] = element.opening;
			endTimes.value[index] = element.closing;
		}
	}
	console.log('set');
});
</script>

<template>
	<div>
		<div id="title"><h1 style="font-size: 40px">Restaurant Overview</h1></div>
		<div class="All">
			<!-- Container which contains the image, the name of the restaurant and it's address-->
			<div id="imageNameAddress">
				<img id="circleImage" :src="restaurant.imageUrl" alt="" />
				<!-- Container which contains the name of the restaurant and it's address-->
				<div id="nameAddress">
					<input
						v-model="restaurant.name"
						class="specialInput"
						style="font-size: 23px; width: 80%"
						type="input"
						placeholder="Please input"
					/>
					<input
						v-model="restaurant.addresse"
						class="specialInput"
						type="input"
						style="font-size: 18px; text-align: start; width: 100%"
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
						v-model="restaurant.phoneNumber"
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
							style="width: 12%"
							placeholder="Start time"
							start="00:00"
							step="00:30"
							end="23:59"
						/>
						<el-time-select
							v-model="endTimes[index]"
							style="width: 12%"
							placeholder="End time"
							start="00:00"
							step="00:30"
							end="23:59"
						/>
					</div>
				</div>
				<div id="buttonContainer">
					<el-button color="#ED5087" plain round @click="checkIfChange()"> Save changes</el-button>
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
							Are you sure you want to make this changes?
							<div id="change-bottom-button">
								<el-button color="#ED5087" plain round @click="saveChanges()">Yes</el-button>
							</div>
						</div>
					</el-dialog>
				</Teleport>
			</div>
		</div>
	</div>
</template>

<style scoped>
/* Imported font used in Figma, may be changed when we receive the brand identity docs from Ewai */
@import url('https://fonts.googleapis.com/css?family=Cairo');
* {
	font-family: 'Cairo';
}
.All {
	padding-top: 2%;
	padding-left: 2%;
	height: 81vh;
	overflow: auto;
}
h1 {
	padding-left: 2%;
}

#title::after {
	content: '';
	display: block;
	height: 3px;
	background-color: #727171;
	margin-top: 10px;
}
/*Styling for both the containers which formed of pairs of inputs and their descriptions*/
.details {
	display: flex;
	align-items: center;
	padding-top: 1%;
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
}

#nameAddress {
	display: flex;
	flex-direction: column;
	padding: 25px;
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
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}


#change-bottom-button {
	display: flex;
	padding-top: 8%;
	justify-content: center;
}

#circleImage {
	width: 130px; /* set the width to whatever you need */
	height: 130px; /* set the height to whatever you need */
	border-radius: 50%; /* make the image circular */
	box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.3);
}
</style>
