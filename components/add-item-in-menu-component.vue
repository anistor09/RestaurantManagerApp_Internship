<script lang="ts" setup>
import restaurants from '../mockData/restaurants.json';

const restaurant = ref(restaurants.filter((x) => x.id === 1)[0]);

const categories = ref(restaurant.value.categorySet);

// the category name that will be displayed on the bar
const categoryName = ref('');

// this represents the category object itself that is selected by the user
// TODO: add interfaces to prevent the case when there are no filteredSubcategories.
const selectedCategory = ref(categories.value[0]);

// the category name that will be displayed on the bar
const subcategoryName = ref('');

// this represents the array of subcategories
// It is dynamically changed in order to display only the subcategories that are from the selected category
const filteredSubcategories = ref(restaurant.value.subCategorySet);

// this represents the subcategory object itself that is selected by the user
// TODO: add interfaces to prevent the case when there are no filteredSubcategories.
const selectedSubcategory = ref(filteredSubcategories.value[0]);

const restaurantItems = ref(restaurant.value.itemSet);

// the items that have the category and subcategory selected
const filteredItems = ref(restaurant.value.itemSet);

// the name of the item which is displayed on the bar
const itemName = ref('');

// the object itself of the selected item (what the popup will return)
// TODO: add interfaces to prevent the case when there are no filteredSubcategories.
const selectedItem = ref(restaurantItems.value[0]);

const enableSubcategory = ref(false);
const enableItems = ref(false);

/*
  This method applies when the user choose the category. It enables the subcategories and make the filtering. 
  Moreover, it disables the items because the user didn't choose the subcategory. 
*/
const changeCategory = () => {
	enableSubcategory.value = true;
	subcategoryName.value = '';
	enableItems.value = false;
	itemName.value = '';
	selectedCategory.value = categories.value.filter((x) => x.name === categoryName.value)[0];
	filteredSubcategories.value = selectedCategory.value.subCategorySet;
};

/*
  This method applies when the user choose the subcategory. It enables the items and make the filtering.
*/
const changeSubCategory = () => {
	enableItems.value = true;
	itemName.value = '';
	selectedSubcategory.value = filteredSubcategories.value.filter(
		(x) => x.name === subcategoryName.value,
	)[0];
	filteredItems.value = restaurantItems.value.filter(
		(x) =>
			x.category.id === selectedCategory.value.id &&
			x.subCategory?.id === selectedSubcategory.value.id,
	);
};

/*
  This method applies when the user choose the item. It updated the object.
*/
const changeItem = () => {
	selectedItem.value = filteredItems.value.filter((x) => x.name === itemName.value)[0];
};
</script>

<template>
	<div id="popup">
		<div id="all">
			<div class="div">
				<h1 class="title">Category:</h1>

				<el-select
					v-model="categoryName"
					class="specialSelect"
					placeholder="Select category"
					size="large"
					@change="changeCategory"
				>
					<el-option
						v-for="category in categories"
						:key="category.id"
						:label="category.name"
						:value="category.name"
					/>
				</el-select>
			</div>

			<div class="div">
				<h1 class="title">SubCategory:</h1>

				<el-select
					v-model="subcategoryName"
					class="specialSelect"
					:disabled="!enableSubcategory"
					placeholder="Select subcategory"
					size="large"
					@change="changeSubCategory"
				>
					<el-option
						v-for="subcategory in filteredSubcategories"
						:key="subcategory.id"
						:label="subcategory.name"
						:value="subcategory.name"
					/>
				</el-select>
			</div>

			<div class="div">
				<h1 class="title">Item:</h1>

				<el-select
					v-model="itemName"
					class="specialSelect"
					placeholder="Select item"
					size="large"
					:disabled="!enableItems"
					@change="changeItem"
				>
					<el-option
						v-for="item in filteredItems"
						:key="item.id"
						:label="item.name"
						:value="item.name"
					/>
				</el-select>
			</div>
			<div id="buttonContainer">
				<el-button color="#ED5087" plain round> Add</el-button>
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
	width: 35%;
	height: 60%;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: space-around;
	border: 10px solid #ed5087;
	border-radius: 100px;
	padding: 20px;
}
#buttonContainer {
	display: flex;
	justify-content: center;
	padding: 5%;
	align-items: center;
}

.specialSelect >>> .el-input__wrapper {
	border-radius: 25px;
	background-color: #d9d9d9;
	padding-left: 4%;
	padding-right: 4%;
	width: 100%;
	height: 100%;
}
.specialSelect >>> .el-input__inner {
	color: black;
	font-size: 2vh;
}

.el-select {
	width: 100%;
	height: 30%;
}
.specialSelect >>> .select-trigger {
	width: 100%;
	height: 100%;
}
.div {
	width: 60%;
}
.title {
	color: #ed5087;
}
.specialSelect >>> .el-input {
	width: 100%;
	height: 100%;
}
.el-button + .el-button {
	margin-left: 0;
}
</style>
