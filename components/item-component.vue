<script lang="ts" setup>
// Hardcoded information, will be extracted from the restaurant global object later on
const itemName = 'Fries';
const imageSource =
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9orIJR7zMICOYAZ3bZ_Y9IGKJmDrD4Zk9Dw&usqp=CAU';
const category = 'Side Dish';
const subcategory = 'None';
const description = 'Crunchy and delicious, our fries are the perfect addition to any meal.';
const price = 2;
const currency = '$';
</script>

<!-- Item card component containing basic information, including image, description and edit/delete buttons-->
<template>
	<el-card id="card" shadow="always" :body-style="{ padding: '0px' }">
		<!-- The background image of the card -->
		<img id="image" :src="imageSource" />

		<!-- The text part of the card -->
		<div style="height: 10vh">
			<!-- The name of the restaurant -->
			<div id="title">{{ itemName }}</div>

			<!-- The information of the item, which gives a general overview -->
			<div class="info">
				<div><b>Category:</b> {{ category }}</div>
				<div><b>Subcategory:</b> {{ subcategory }}</div>
			</div>
			<div id="description" class="info"><b>Description:</b> {{ description }}</div>
			<div class="info"><b>Price:</b> {{ price }} {{ currency }}</div>
		</div>
	</el-card>
</template>

<style scoped>
/* Imported font used in Figma, may be changed when we receive the brand identity docs from Ewai */
@import url('https://fonts.googleapis.com/css?family=Open+Sans');

#card {
	border-radius: 3vw;
	width: 15vw;
	height: 20vw;
	font-family: 'Open Sans';
}

#image {
	display: block;
	width: 100%;
	height: 6vw;
}

#title {
	font-size: 1.7vw;
	font-weight: bolder;
	text-align: center;
}

#description {
	padding: 5% 10% 3% 10%;
}

#buttons {
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 0.5vh;
	font-family: 'Open Sans';
}

.info {
	line-height: 1.5;
	text-align: center;
	font-size: 0.8vw;
}

@media only screen and (max-width: 500px) {
	#card {
		border-radius: 9vw;
		width: 65vw;
		height: 78vw;
	}

	#image {
		height: 25vw;
	}

	.info {
		font-size: 4vw;
	}

	#title {
		font-size: 1.5rem;
	}
}
</style>
