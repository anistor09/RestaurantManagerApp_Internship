<script lang="ts" setup>
import { ElSelect } from 'element-plus';
import { ref } from 'vue';
import { useRestaurantStore } from '../store/restaurant';
import { Carte } from '../interfaces/Carte';
import { SubCategory } from '~/interfaces/SubCategory';
import { useLanguageStore } from '../store/language';
import translations from '../mockData/translations.json';

const languageStore = useLanguageStore();

const computedLanguageId = computed(() => languageStore.idGetter);

const restaurantStore = useRestaurantStore();
const restaurant = restaurantStore.restaurantGetter;

const emit = defineEmits(['close']);

const props = defineProps({
	menu: {
		type: Object as () => Carte,
		required: true,
	},
});
const menuRef = ref(props.menu);

const categories = ref(restaurant.categorySet);

// the category name that will be displayed on the bar
const categoryName = ref('');

// this represents the category object itself that is selected by the user
const selectedCategory = ref(categories.value[0]);

// the category name that will be displayed on the bar
const subcategoryName = ref('');

// this represents the array of subcategories
// It is dynamically changed in order to display only the subcategories that are from the selected category
const filteredSubcategories = ref(restaurant.subCategorySet);

// this represents the subcategory object itself that is selected by the user
const selectedSubcategory = ref<SubCategory | null>(filteredSubcategories.value[0]);

const restaurantItems = ref(restaurant.itemSet);

// the items that have the category and subcategory selected
const filteredItems = ref(restaurant.itemSet);

// the name of the item which is displayed on the bar
const itemName = ref('');

// the object itself of the selected item (what the popup will return)
const selectedItem = ref(restaurantItems.value[0]);

const enableSubcategory = ref(false);

/*
  This method applies when the user choose the category. It enables the subcategories and make the filtering. 
  Moreover, it disables the items because the user didn't choose the subcategory. 
*/
const changeCategory = () => {
	enableSubcategory.value = true;
	subcategoryName.value = '';
	itemName.value = '';
	selectedCategory.value = categories.value.filter((x) => x.name === categoryName.value)[0];
	filteredItems.value = restaurantItems.value.filter(
		(x) => x.category.id === selectedCategory.value.id,
	);
	filteredSubcategories.value = selectedCategory.value.subCategorySet;
};

/*
  This method applies when the user choose the subcategory. It enables the items and make the filtering.
*/
const changeSubCategory = () => {
	itemName.value = '';
	selectedSubcategory.value = filteredSubcategories.value.filter(
		(x) => x.name === subcategoryName.value,
	)[0];
	filteredItems.value = restaurantItems.value.filter(
		(x) =>
			x.category.id === selectedCategory.value.id &&
			x.subCategory?.id === selectedSubcategory.value?.id,
	);
};

/*
  This method applies when the user choose the item. It updated the object.
*/
const changeItem = () => {
	selectedItem.value = filteredItems.value.filter((x) => x.name === itemName.value)[0];
	selectedCategory.value = selectedItem.value.category;
	categoryName.value = selectedCategory.value.name;
	selectedSubcategory.value = selectedItem.value.subCategory;
	subcategoryName.value = selectedSubcategory.value === null ? '' : selectedSubcategory.value.name;
};

const addItemInMenu = async () => {
	const data = {
		carteId: menuRef.value.id,
		itemId: selectedItem.value.id,
	};
	await useFetch('/api/menus/addItemInMenu', {
		method: 'POST',
		body: data,
		headers: {
			'Content-Type': 'application/json',
		},
	});
	menuRef.value.itemSet.push(selectedItem.value);
	emit('close');
};
</script>

<template>
	<div id="all">
		<div class="div">
			<h2 id="categoryIdPrefix" class="title">{{ translations[computedLanguageId].category }}</h2>

			<el-select
				id="categoryId"
				v-model="categoryName"
				filterable
				clearable
				class="specialSelect"
				:placeholder=translations[computedLanguageId].selectCategory
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
			<h2 id="subcategoryIdPrefix" class="title">{{ translations[computedLanguageId].subcategory }}</h2>

			<el-select
				id="subcategoryId"
				v-model="subcategoryName"
				filterable
				clearable
				class="specialSelect"
				:disabled="!enableSubcategory"
				:placeholder=translations[computedLanguageId].selectSubcategory
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
			<h2 id="itemIdPrefix" class="title">{{ translations[computedLanguageId].item }}</h2>

			<el-select
				id="itemIdPrefix"
				v-model="itemName"
				filterable
				clearable
				class="specialSelect"
				:placeholder=translations[computedLanguageId].selectItem
				size="large"
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
			<el-button color="#ED5087" plain round @click="addItemInMenu()"> Add</el-button>
		</div>
	</div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans');
#all {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	font-family: 'Open Sans';
	position: relative;
	bottom: 2vh;
}
#buttonContainer {
	display: flex;
	justify-content: center;
	padding-top: 2.5vh;
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
	width: 100%;
}
.title {
	font-size: 1.1vw;
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
