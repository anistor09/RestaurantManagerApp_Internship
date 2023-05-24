<script lang="ts" setup>
import { Item } from '~/interfaces/Item';

const props = defineProps({
	item: {
		type: Object as () => Item,
		required: true,
	},
});

function editItem() {
	console.log('TODO: wire with editItem page');
}
</script>

<!-- Item card component containing basic information, including image, description and edit/delete buttons-->
<template>
	<el-card id="card" shadow="always" :body-style="{ padding: '0px' }" @click="editItem">
		<!-- The background image of the card -->
		<div style="width: 100%; height: 100%">
			<img
				id="image"
				:src="
					props.item.imageUrl ||
					'https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png'
				"
			/>

			<div id="title">{{ props.item.name }}</div>
			<div class="info">
				<div id="category">
					<b>Category:</b> {{ props.item.category == null ? 'None' : props.item.category.name }}
				</div>
				<div id="subcategory">
					<b>Subcategory:</b>
					{{ props.item.subCategory == null ? 'None' : props.item.subCategory.name }}
				</div>
			</div>

			<div class="description">
				<el-scrollbar>
					<b>Description:</b> {{ props.item.description == '' ? 'None' : props.item.description }}
				</el-scrollbar>
			</div>

			<div class="price"><b>Price:</b> {{ props.item.price }}</div>
		</div>
	</el-card>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans');

#card >>> .el-card__body {
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
	height: 15%;
}

#category,
#subcategory {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.info {
	line-height: 1.5;
	text-align: center;
	height: 15%;
	font-size: 0.8vw;
}

.description {
	text-align: center;
	padding-left: 10%;
	padding-right: 10%;
	height: 30%;
	font-size: 0.8vw;
}

.price {
	text-align: center;
	font-size: 0.8vw;
	height: 10%;
}
</style>
