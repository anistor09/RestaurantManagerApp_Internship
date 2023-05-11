<script lang="ts" setup>
// Hardcoded information, will be extracted from the restaurant global object later on
const restaurantName = 'SkyBar';
const imageSource = 'https://media-cdn.tripadvisor.com/media/photo-s/27/a7/c7/05/skybar-paris.jpg';
const logoSource = 'https://mma.prnewswire.com/media/1713860/SKYBAR_LOGO_PARIS__1.jpg';
const openHour = '8:00';
const closeHour = '18:00';
const phoneNumber = '+310712345678';
const email = 'email@restaurant.com';
const location = 'Market St, San Francisco, CA, USA';
</script>

<!-- Card component containing basic information related to the restaurant, including logo and background image -->
<template>
	<el-card id="card" shadow="always" :body-style="{ padding: '0px' }">
		<!-- The background image of the card (blurred) -->
		<img id="image" :src="imageSource" />

		<!-- The logo of the restaurant, cut as a circle -->
		<img id="logo" :src="logoSource" />

		<!-- The text part of the card -->
		<div style="height: 10vh">
			<!-- The name of the restaurant -->
			<div id="title">{{ restaurantName }}</div>

			<!-- The location of the restaurant, written under the title -->
			<div id="location">{{ location }}</div>

			<!-- The information of the restaurant, which gives a general overview -->
			<div id="info">
				<div>Opening hours: {{ openHour }} - {{ closeHour }}</div>
				<div>Phone number: {{ phoneNumber }}</div>
				<div>Email: {{ email }}</div>
			</div>
		</div>
	</el-card>
</template>

<style>
/* Imported font used in Figma, may be changed when we receive the brand identity docs from Ewai */
@import url('https://fonts.googleapis.com/css?family=Cairo');

#card {
	position: relative;
	width: 50vw;
	height: 20vh;
	border-radius: 3vw;
	font-family: 'Cairo';
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
}

#title {
	position: absolute;
	left: 7vw;
	margin-left: 0.5vw;
	margin-top: 1vh;
	font-size: 1.5rem;
	font-weight: bolder;
}

#location {
	position: absolute;
	left: 6vw;
	margin-top: 4vh;
	margin-left: 1.2vw;
}

#info {
	position: absolute;
	top: 11vh;
	left: 35vw;
	line-height: 1.5;
}
</style>
