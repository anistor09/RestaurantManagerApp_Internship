<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue';
import { useRestaurantStore } from '~/store/restaurant';

const restaurantStore = useRestaurantStore();
const restaurant = restaurantStore.restaurantGetter;

const currentProduct = ref('Items');
const selectedProducts = ['Items', 'Categories'];
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

function addCategory() {
	console.log('TODO: wire with add category page');
}

function addItem() {
	console.log('TODO: wire with add item page');
}
</script>

<template>
	<el-scrollbar>
		<el-tabs v-model="currentProduct" class="products-tabs">
			<el-tab-pane
				v-for="product in selectedProducts"
				:key="product"
				:label="product"
				:name="product"
				class="products-individual-tab"
			>
				<el-row v-if="currentProduct === 'Items'" class="up-buttons-products">
					<el-col :span="2" :offset="1">
						<el-input
							v-model="searchItems"
							class="search-bar-products"
							size="default"
							placeholder="Search by item"
							:prefix-icon="Search"
						/>
					</el-col>
					<el-col :span="2" :offset="17">
						<el-button class="products-button" color="#ED5087" plain round @click="addItem()"
							>+ Add item</el-button
						>
					</el-col>
				</el-row>
				<el-row v-else class="up-buttons-products">
					<el-col :span="2" :offset="1">
						<el-input
							v-model="searchCategories"
							class="search-bar-products"
							size="default"
							placeholder="Search by category"
							:prefix-icon="Search"
						/>
					</el-col>
					<el-col :span="2" :offset="17">
						<el-button class="products-button" color="#ED5087" plain round @click="addCategory()"
							>+ Add category</el-button
						>
					</el-col>
				</el-row>
				<div v-if="currentProduct === 'Items'">
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
	max-width: 99%;
	margin: 0 auto; /* Center the tabs horizontally */
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
	width: 7vw;
	font-size: 0.8vw;
	font-weight: bold;
}
</style>
