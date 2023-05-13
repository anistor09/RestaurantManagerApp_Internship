<script lang="ts" setup>
// Hardcoded information, will be extracted from the restaurant global object later on
const itemName = 'Appetizers';
const imageSource =
	'https://images-gmi-pmc.edge-generalmills.com/fca4b25f-5859-4048-974c-4ef02a0014ee.jpg';
const description =
	'Our carefully crafted selection of small plates will awaken your taste buds and leave you yearning for more.';
</script>

<!-- Item card component containing basic information, including image, description and edit/delete buttons-->
<template>
	<el-card id="card" shadow="always" :body-style="{ padding: '0px' }">
		<!-- The background image of the card -->
		<img id="image" :src="imageSource" />

		<!-- The text part of the card -->
		<div>
			<!-- The name of the restaurant -->
			<div id="title">{{ itemName }}</div>

			<!-- The description of the category, which gives a general overview -->
			<div id="description"><b>Description:</b> {{ description }}</div>
		</div>
	</el-card>
</template>

<style>
/* Imported font used in Figma, may be changed when we receive the brand identity docs from Ewai */
@import url('https://fonts.googleapis.com/css?family=Cairo');

#card {
	border-radius: 3vw;
	width: 15vw;
	height: 20vw;
	font-family: 'Cairo';
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
	line-height: 1.5;
	text-align: center;
	font-size: 0.8vw;
	padding: 5% 10% 3% 10%;
}

#buttons {
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: 'Cairo';
}

.extraPadding {
	padding-top: 19% !important;
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

	#title {
		font-size: 1.5rem;
	}

	#description {
		font-size: 4vw;
	}

	.extraPadding {
		padding-top: 10% !important;
	}
}
</style>
