<script lang="ts" setup>
import { Category } from '~/interfaces/Category';

const props = defineProps({
	category: {
		type: Object as () => Category,
		required: true,
	},
});

const editCategory = () => {


	const newWindow = window.open(`/editCategoryView/${props.category.id}`, '_blank');
	if (newWindow !== null)
		newWindow.onbeforeunload = function () {
			window.location.reload();
		};
};
</script>

<!-- Item card component containing basic information, including image, description and edit/delete buttons-->
<template>
	<el-card id="card" shadow="always" :body-style="{ padding: '0px' }" @click="editCategory()">
		<div style="width: 100%; height: 100%">
			<!-- The background image of the card -->
			<img id="image" :src="
				props.category.imageUrl ||
				'https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png'
			" />

			<!-- The text part of the card -->
			<div>
				<!-- The name of the restaurant -->
				<div id="title">{{ props.category.name }}</div>

				<!-- The description of the category, which gives a general overview -->
				<div id="description">
					<el-scrollbar>
						<b>Description:</b>
						{{ props.category.description == '' ? 'None' : props.category.description }}
					</el-scrollbar>
				</div>
			</div>
		</div>
	</el-card>
</template>

<style scoped>
/* Imported font used in Figma, may be changed when we receive the brand identity docs from Ewai */
@import url('https://fonts.googleapis.com/css?family=Open+Sans');

#card>>>.el-card__body {
	height: 100%;
}

#card {
	border-radius: 3vw;
	font-family: 'Open Sans';
	width: 15vw;
	height: 40vh;
	cursor: pointer;
}

#card:hover {
	box-shadow: 1px 3px 3px 3px #ed508786;
}

#image {
	display: block;
	width: 100%;
	height: 30%;
	object-fit: cover;
}

#title {
	font-size: 1.5vw;
	padding-left: 5%;
	padding-right: 5%;
	font-weight: bolder;
	text-align: center;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	height: 20%;
}

#description {
	text-align: center;
	padding-left: 10%;
	padding-right: 10%;
	height: 50%;
	font-size: 0.8vw;
}
</style>
