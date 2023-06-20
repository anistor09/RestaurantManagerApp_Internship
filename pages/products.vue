<script lang="ts" setup>
import { computed } from "vue";
import { Search } from '@element-plus/icons-vue';
import { useLanguageStore } from '../store/language';
import translations from '../mockData/translations.json';
import { useCategoryStore } from '~/store/category';
import { useItemStore } from '~/store/item';
import { useRestaurantStore } from '~/store/restaurant';

const languageStore = useLanguageStore();
const computedLanguageId = computed(() => languageStore.idGetter);

const categoryStore = useCategoryStore();
const itemStore = useItemStore();
const restaurantStore = useRestaurantStore();
const restaurant = restaurantStore.restaurantGetter;

const currentProduct = ref(translations[computedLanguageId.value].items);
const selectedProducts = computed(() => [translations[computedLanguageId.value].items, translations[computedLanguageId.value].categories]);

const searchItems = ref('');
const searchCategories = ref('');

const filterItems = computed(() =>
	restaurant.itemSet.filter(
		(x) => !searchItems.value || x.name.toLowerCase().includes(searchItems.value.toLowerCase()),
	),
);

const filterCategories = computed(() =>
	restaurant.categorySet.filter(
		(x) =>
			!searchCategories.value ||
			x.name.toLowerCase().includes(searchCategories.value.toLowerCase()),
	),
);

const addCategory = () => {
	window.open('/editCategoryView', '_blank');
};

function addItem() {
	window.open('/editItemView', '_blank');
}

onMounted(() => {
	window.addEventListener('storage', handleStorageEvent);
});

onUnmounted(() => {
	window.removeEventListener('storage', handleStorageEvent);
});

const handleStorageEvent = (event: StorageEvent) => {
	if (event.key === 'category') {
		categoryStore.$hydrate();
		if (categoryStore.categoryGetter.length !== 0) {
			const newCategory = categoryStore.categoryGetter[0];
			const index = restaurant.categorySet.findIndex((x) => x.id === newCategory.id);
			if (index === -1) {
				restaurant.categorySet.push(newCategory);
			} else {
				restaurant.categorySet[index].description = newCategory.description;
				restaurant.categorySet[index].imageUrl = newCategory.imageUrl;
				restaurant.categorySet[index].name = newCategory.name;
				restaurant.categorySet[index].presentationOrder = newCategory.presentationOrder;
				restaurant.categorySet[index].subCategorySet = newCategory.subCategorySet;
			}
			setTimeout(() => {categoryStore.categoryReset();}, 1000);
		}
		if (categoryStore.deleteGetter.length !== 0) {
			const categoryId = categoryStore.deleteGetter[0];
			const index = restaurant.categorySet.findIndex((x) => x.id === categoryId);
			if (index !== -1) {
				restaurant.categorySet.splice(index, 1);
			}
			setTimeout(() => {categoryStore.categoryReset();}, 1000);
		}
	} else if (event.key === 'item') {
		itemStore.$hydrate();
		if (itemStore.itemGetter.length !== 0) {
			const newItem = itemStore.itemGetter[0];
			const index = restaurant.itemSet.findIndex((x) => x.id === newItem.id);
			if (index === -1) {
				restaurant.itemSet.push(newItem);
			} else {
				restaurant.itemSet[index].description = newItem.description;
				restaurant.itemSet[index].imageUrl = newItem.imageUrl;
				restaurant.itemSet[index].name = newItem.name;
				restaurant.itemSet[index].presentationOrder = newItem.presentationOrder;
				restaurant.itemSet[index].category = newItem.category;
				restaurant.itemSet[index].subCategory = newItem.subCategory;
				restaurant.itemSet[index].price = newItem.price;
				restaurant.itemSet[index].allergen = newItem.allergen;
				restaurant.itemSet[index].longDescription = newItem.longDescription;
				restaurant.itemSet[index].optionSet = newItem.optionSet;
				restaurant.itemSet[index].sideItemSet = newItem.sideItemSet;
			}
			setTimeout(() => {itemStore.itemReset();}, 1000);
		}
		if (itemStore.deleteGetter.length !== 0) {
			const itemId = itemStore.deleteGetter[0];
			const index = restaurant.itemSet.findIndex((x) => x.id === itemId);
			if (index !== -1) {
				restaurant.itemSet.splice(index, 1);
			}
			setTimeout(() => {itemStore.itemReset();}, 1000);
		}
	}
};
</script>

<template>
	<ClientOnly>
		<el-scrollbar>
			<PageTitle :title=translations[computedLanguageId].products></PageTitle>
			<el-tabs v-model="currentProduct" class="products-tabs">
				<el-tab-pane
					v-for="product in selectedProducts"
					:key="product"
					:label="product"
					:name="product"
					class="products-individual-tab"
				>
					<el-row v-if="currentProduct === selectedProducts[0]" class="up-buttons-products">
						<el-col :span="2" :offset="1">
							<el-input
								v-model="searchItems"
								class="search-bar-products"
								size="default"
								clearable
								:placeholder=translations[computedLanguageId].searchByItem
								:prefix-icon="Search"
							/>
						</el-col>
						<el-col :span="2" :offset="17">
							<el-button id="addItemButtonProducts" class="products-button" color="#ED5087" plain round @click="addItem()"
								>+ {{translations[computedLanguageId].addItem}}</el-button
							>
						</el-col>
					</el-row>
					<el-row v-else class="up-buttons-products">
						<el-col :span="2" :offset="1">
							<el-input
								id="searchforitems"
								v-model="searchCategories"
								class="search-bar-products"
								size="default"
								clearable
								:placeholder=translations[computedLanguageId].searchByCategory
								:prefix-icon="Search"
							/>
						</el-col>
						<el-col :span="2" :offset="17">
							<el-button class="products-button" color="#ED5087" plain round @click="addCategory()"
								>+ {{translations[computedLanguageId].addCategory}}</el-button
							>
						</el-col>
					</el-row>
					<div v-if="currentProduct === selectedProducts[0]">
						<el-row
							v-for="rowIndex in Math.ceil(filterItems.length / 3)"
							:key="rowIndex"
							class="products-rows"
						>
							<el-col v-for="colIndex in 3" :key="colIndex" :span="8">
								<div v-if="(rowIndex - 1) * 3 + colIndex - 1 < filterItems.length">
									<ItemComponent :item="filterItems[(rowIndex - 1) * 3 + colIndex - 1]" />
								</div>
							</el-col>
						</el-row>
					</div>
					<div v-else>
						<el-row
							v-for="rowIndex in Math.ceil(filterCategories.length / 3)"
							:key="rowIndex"
							class="products-rows"
						>
							<el-col v-for="colIndex in 3" :key="colIndex" :span="8">
								<div v-if="(rowIndex - 1) * 3 + colIndex - 1 < filterCategories.length">
									<CategoryComponent
										:category="filterCategories[(rowIndex - 1) * 3 + colIndex - 1]"
									/>
								</div>
							</el-col>
						</el-row>
					</div>
				</el-tab-pane>
			</el-tabs>
		</el-scrollbar>
	</ClientOnly>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans');

.products-tabs .el-tabs__item {
	font-size: 2vw;
	font-weight: bolder;
	font-family: 'Open Sans';
}

.products-tabs .el-tabs__item.is-active {
	color: #ed5087;
}

.products-tabs .el-tabs__active-bar {
	background-color: #ed5087;
}

.products-tabs .el-tabs__item:hover {
	color: #ed5087;
}

.products-tabs {
	justify-content: center;
	max-width: 98%;
	margin: 0 auto;
	/* Center the tabs horizontally */
}

.el-tabs {
	--el-tabs-header-height: 7vh;
}

.products-rows {
	margin-bottom: 3vh;
	margin-left: 4vw;
}

.search-bar-products {
	width: 15vw !important;
}

.up-buttons-products {
	padding-bottom: 2vh;
}

.products-button {
	width: 9vw;
	font-size: 0.8vw;
	font-weight: bold;
}

.el-input .el-input__wrapper {
	font-family: 'Open Sans';
	font-size: 1vw;
	font-weight: bolder;
	height: auto;
	border-radius: 30px;
}

.el-input {
	--el-input-focus-border-color: #ed5087 !important;
}
</style>
