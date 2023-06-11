<script lang="ts" setup>
import { useRestaurantStore } from '../store/restaurant';
const restaurantStore = useRestaurantStore();
const restaurant = restaurantStore.restaurantGetter;
</script>

<!-- Card component containing basic information related to the restaurant, including logo and background image -->
<template>
	<el-card id="card" shadow="always" :body-style="{ padding: '0px' }">
		<!-- The background image of the card (blurred) -->
		<img id="image" :src="restaurant.imageUrl" />

		<!-- The logo of the restaurant, cut as a circle -->
		<img id="logo" :src="restaurant.logoUrl" />

		<!-- The text part of the card -->
		<div style="height: 10v; display: flex; flex-direction: row">
			<div style="width: 80%; height: 100%">
				<!-- The name of the restaurant -->
				<div id="title">{{ restaurant.name }}</div>

				<!-- The location of the restaurant, written under the title -->
				<i id="location">{{ restaurant.addresse == null ? 'No location added' : restaurant.addresse  }}</i>
			</div>
			<!-- The information of the restaurant, which gives a general overview -->
			<div id="info">
				<div>Phone number: {{ restaurant.phoneNumber == null ? 'None' : restaurant.phoneNumber  }}</div>
				<div>Email: {{ restaurant.email == null ? 'None' : restaurant.email }}</div>
			</div>
		</div>
	</el-card>
</template>

<style scoped>
/* Imported font used in Figma, may be changed when we receive the brand identity docs from Ewai */
@import url('https://fonts.googleapis.com/css?family=Open+Sans');

#card {
	position: relative;
	width: 100%;
	height: 20vh;
	border-radius: 3vw;
	font-family: 'Open Sans';
}

#logo {
	position: absolute;
	left: 1vw;
	top: 4vh;
	width: 6vw;
	height: 6vw;
	border-radius: 100%;
	box-shadow: 0.2vh 0.1vw 0.7vh 0.2vw rgba(0, 0, 0, 0.07) !important;
}

#image {
	display: block;
	width: 100%;
	height: 10vh;
	filter: blur(3px);
	border-bottom: 0.3vh solid black;
}

#title {
	position: absolute;
	left: 7vw;
	margin-left: 0.5vw;
	margin-top: -0.3vh;
	font-size: 1.6vw;
	font-weight: bolder;
}

#location {
	position: absolute;
	left: 6vw;
	margin-top: 4vh;
	margin-left: 1.2vw;
	font-size: 0.9vw;
}

#info {
	padding-top: 1.4%;
	width: 40%;
	line-height: 1.5;
	text-align: center;
	font-size: 0.9vw;
}

@media only screen and (max-width: 500px) {
	#card {
		border-radius: 9vw;
		width: 65vw;
		height: 37vh;
	}

	#logo {
		position: absolute;
		left: 17vw;
		top: 4vh;
		width: 30vw;
		height: 30vw;
		border-radius: 100%;
		box-shadow: 0.2vh 0.1vw 0.7vh 0.2vw rgba(0, 0, 0, 0.07) !important;
	}

	#title {
		font-size: 9vw;
		top: 16vh;
		left: 17vw;
	}

	#location {
		left: 3vw;
		top: 18vh;
		font-size: 4vw;
	}

	#info {
		position: absolute;
		top: 27vh;
		left: 8vw;
		line-height: 1.5;
		text-align: center;
		font-size: 3.5vw;
	}

	.extraPadding {
		padding-top: 10% !important;
	}
}
</style>
