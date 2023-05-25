<script lang="ts" setup>
import { SubCategory } from '~/interfaces/SubCategory';
import { useRestaurantStore } from '~/store/restaurant';

const restaurantStore = useRestaurantStore();
const restaurant = restaurantStore.restaurantGetter;

const defaultSrc =
	'https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png';

const props = defineProps({
	addCategory: Boolean,
	categoryId: Number,
});

const name = ref('');
const description = ref('');
const src = ref(defaultSrc);
const hasSubcategories = ref(false);
const presentationOrder = ref(0);
let subCategories: SubCategory[] = [];

if (props.addCategory === false) {
	const category = restaurant.categorySet.filter((x) => x.id === props.categoryId)[0];
	name.value = category === undefined ? '' : category.name;
	description.value = category === undefined ? '' : category.description;
	src.value = category === undefined ? '' : category.imageUrl;
	presentationOrder.value = category === undefined ? 0 : category.presentationOrder;

	if (category.subCategorySet.length > 0) {
		subCategories = category.subCategorySet;
		hasSubcategories.value = true;
	}
}

const openNotification = (notifTitle: string) => {
	ElNotification({
		title: notifTitle,
		message: h('div', { style: 'color: #ed5087' }, 'You can now close this window.'),
		customClass: 'notificationClass',
	});
};

// watch(category, () => {
//     const newCategory = restaurant.categorySet.filter(x => x.name === category.value)[0]
//     subCategories = newCategory.subCategorySet
//     disableSubCateg.value = false;
//     subCategory.value = ""
// });
</script>

<template>
	<page-title v-if="addCategory" title="Add category"></page-title>
	<page-title v-else title="Edit category"></page-title>
	<div class="container">
		<div class="bottom">
			<div class="left">
				<div class="elementLeft">
					<div class="box">
						<div style="height: 40%; width: 100%">
							<div class="fieldText" style="padding-bottom: 2%">Name</div>
							<input v-model="name" class="specialInput" style="height: 56.25%" />
						</div>
					</div>
				</div>
				<div class="elementLeft">
					<div class="box">
						<div class="fieldText" style="padding-bottom: 2%">Description</div>
						<textarea v-model="description" class="specialTextArea"></textarea>
					</div>
				</div>
				<div class="elementLeft" style="padding-bottom: 5%">
					<div class="box" style="padding-top: 10%">
						<div class="fieldText" style="padding-bottom: 2%">Photo</div>
						<div style="width: 92%; height: 90%; display: flex; padding-bottom: 10%">
							<el-image
								:src="src"
								style="width: 35%; height: 15vh; object-fit: cover; border-radius: 40px"
							/>
							<div class="photoButtonSpace">
								<el-button class="specialPhotoButton">Change</el-button>
								<el-button class="specialPhotoButton">Delete</el-button>
							</div>
						</div>
					</div>
				</div>
				<div class="elementLeft">
					<div class="box" style="">
						<div style="height: 40%; width: 100%">
							<div class="fieldText" style="padding-bottom: 2%">Order in Menu</div>
							<input v-model="presentationOrder" class="specialInput" style="height: 56.25%" />
						</div>
					</div>
				</div>
			</div>
			<div class="right">
				<div class="elementLeft" style="padding-top: 5%; height: 10% !important">
					<div style="width: 100%; height: 90%; display: flex; padding-bottom: 10%">
						<div class="box">
							<div class="fieldText">Subcategories</div>
						</div>
						<div class="box" style="padding-left: 20%">
							<el-button
								color="#ED5087"
								plain
								round
								style="width: 8vw; font-size: 0.8vw; font-weight: bolder"
								>Add subcategory</el-button
							>
						</div>
					</div>
				</div>
				<div class="subcategoryWrapper">
					<el-scrollbar style="overflow-x: hidden">
						<div v-if="hasSubcategories">
							<div
								v-for="subcategory in subCategories"
								:key="subcategory.id"
								style="padding-bottom: 2%; height: 20%; width: 80%"
							>
								<div class="box" style="padding-top: 5%; padding-left: 20%; display: flex">
									<div class="subcategoryText" style="padding-bottom: 5%">
										{{ subcategory === undefined ? 'None' : subcategory.name }}
									</div>
									<div style="width: 100%; height: 90%; display: flex; padding-bottom: 10%">
										<el-image
											:src="subcategory.imageUrl == '' ? defaultSrc : subcategory.imageUrl"
											style="width: 40%; height: 12vh; border-radius: 40px; object-fit: cover"
										/>
										<div class="photoButtonSpace">
											<el-button class="specialPhotoButton" style="margin-bottom: 3vh"
												>Change</el-button
											>
											<el-button class="specialPhotoButton">Delete</el-button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</el-scrollbar>
				</div>
				<div style="margin-top: 10%; display: flex; justify-content: flex-end">
					<el-button
						v-if="addCategory"
						id="addSubcategoryButton"
						class="specialExitButton"
						@click="openNotification('Category was successfully added')"
						>Save</el-button
					>
					<el-button
						v-else
						id="addSubcategoryButton"
						class="specialExitButton"
						@click="openNotification('Category was successfully edited')"
						>Save</el-button
					>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans');

* {
	font-family: 'Open Sans';
}
#addSubcategoryButton {
	height: 5vh;
	width: 25%;
}

.subcategoryWrapper {
	height: 70%;
	width: 99%;
	border: 2px solid #ed5087;
	border-radius: 1vw;
}
.container {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 80%;
	overflow: hidden;
}

.top {
	width: 100%;
	height: 11.6%;
	margin: 0;
	display: flex;
	align-items: center;
	font-size: 3vw;
	font-family: 'Cairo', Arial, sans-serif;
}

.bottom {
	width: 100%;
	height: 100%;
	margin: 0;
}

.left {
	width: 50%;
	height: 100%;
	margin: 0;
	float: left;
}

.right {
	width: 40%;
	height: 100%;
	margin-left: 5%;
	overflow-x: hidden;
	float: left;
}

.elementLeft {
	height: 20%;
	width: 100%;
}

.fieldText {
	width: 100%;
	color: #ed5087;
	font-size: 1.25vw;
}

.subcategoryText {
	width: 100%;
	color: #727171;
	font-size: 1vw;
}

.box {
	padding-left: 10%;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
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
	width: 70%;
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
	width: 70%;
	height: 50%;
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

.specialExitButton {
	border-radius: 30px;
	font-size: 1.25vw;
	border-color: #ed5087;
	background-color: #ed5087;
	color: white;
	width: 20%;
	height: 30%;
}

.specialExitButton:hover {
	background-color: #d9d9d9;
	border-color: darkgrey;
	color: black;
}

.specialPhotoButton:hover {
	background-color: #ed5087;
	border-color: darkgrey;
	color: white;
}

.el-button + .el-button {
	margin-left: 0;
}

.photoButtonSpace {
	width: 60%;
	height: 100%;
	padding-left: 5%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
</style>
