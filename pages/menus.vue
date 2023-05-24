<script lang="ts" setup>
import SubcategoryComponent from '~/components/subcategory-component.vue';
import { Carte } from '~/interfaces/Carte';
import { Category } from '~/interfaces/Category';
import { Item } from '~/interfaces/Item';
import { ItemWrapper } from '~/interfaces/ItemWrapper';
import { SubCategory } from '~/interfaces/SubCategory';
import { useRestaurantStore } from '~/store/restaurant';
const restaurantStore = useRestaurantStore();
const restaurant = restaurantStore.restaurantGetter;

const currentCategory = ref('');
const selectedMenuName = ref('');
const instructions = 'Manage and customize your menus easily with these steps:';
const steps =
	'Step 1: Select your menu \nStep 2: Choose the category \nStep 3: Choose the subcategory \nStep 4: Happy editing!';

const selectedMenu = computed<Carte>(() => {
	if (selectedMenuName.value !== '')
		return restaurant.carteSet.filter((x) => x.name === selectedMenuName.value)[0];
	return {} as Carte;
});

const selectedCategories = computed<Category[]>(() => {
	const arr = new Array<Category>();
	if (Array.isArray(selectedMenu.value.itemSet) && selectedMenu.value.itemSet.length > 0) {
		for (const item of selectedMenu.value.itemSet) {
			arr.push(item.category as Category);
		}
	}
	return [...new Map(arr.map((x) => [x.id, x])).values()];
});

const selectedSubcategories = computed<SubCategory[]>(() => {
	const arr = new Array<SubCategory>();
	if (Array.isArray(selectedMenu.value.itemSet) && selectedMenu.value.itemSet.length > 0) {
		for (const item of selectedMenu.value.itemSet) {
			if (item.category.name === currentCategory.value && item.subCategory != null)
				arr.push(item.subCategory as SubCategory);
		}
	}
	return [...new Map(arr.map((x) => [x.id, x])).values()];
});

function createItemWrapper(item: Item): ItemWrapper {
	return {
		item,
		showDelete: false,
	};
}

watch(selectedMenuName, () => {
	currentCategory.value = '';
});

const addItemInMenu = ref(false);
const addMenu = ref(false);

</script>

<template>
	<el-scrollbar>
		<el-container>
			<el-header>
				<div class="el-row">
					<div class="el-col" :style="{ flex: '0 0 56%', 'text-align': 'left' }">
						<el-select
							v-model="selectedMenuName"
							class="menu-selector"
							filterable
							placeholder="Select menu"
						>
							<el-option v-for="item in restaurant.carteSet" :value="item.name" />
						</el-select>
					</div>
					<div class="el-col" :style="{ flex: '0 0 40%', textAlign: 'right', paddingTop: '3vh' }">
						<el-button class="menus-button" color="#ED5087" plain round @click="addMenu = true"> Add menu </el-button>
						<el-button class="menus-button" :disabled="selectedMenuName === ''" color="#ED5087" plain round @click="addItemInMenu = true;"> Place item </el-button>
						<Teleport to="body">
							<el-dialog
								v-model="addItemInMenu"
								style="
									width: 35%;
									height: 70%;
									display: flex;
									align-items: center;
									flex-direction: column;
									justify-content: space-around;
									border: 5px solid #ed5087;
									border-radius: 50px !important;
								"
							>
							<AddItemInMenuComponent :menu="selectedMenu" @close="addItemInMenu = false"></AddItemInMenuComponent>				
							</el-dialog>
						</Teleport>
						<Teleport to="body">
							<el-dialog
								v-model="addMenu"
								style="
								top: -10%;
								width: 40%;
								height: 85%;
								min-height: 750px;
								display: flex;
								align-items: center;
								justify-content: center;
								flex-direction: column;
								border: 5px solid #ed5087;
								border-radius: 50px !important;
								padding: 10px;
								font-family: 'Open Sans';
								"
							>
							<AddMenuComponent :restaurant="restaurant" @close="addMenu = false"></AddMenuComponent>				
							</el-dialog>
						</Teleport>
					</div>
				</div>
			</el-header>

			<el-main>
				<div v-if="selectedMenuName === ''" id="menus-description-wrapper">
					<div id="menus-instructions">{{ instructions }}</div>
					<div id="menus-steps">{{ steps }}</div>
				</div>
				<el-tabs v-else v-model="currentCategory" class="menu-tabs">
					<el-tab-pane
						v-for="category in selectedCategories"
						:key="category.id"
						:label="category.name"
						:name="category.name"
					>
						<div id="menus-wrapper">
							<el-col>
								<el-row
									v-for="subcategory in selectedSubcategories"
									:key="subcategory.id"
									class="menus-row"
								>
									<SubcategoryComponent
										:subcategory-name="subcategory.name"
										:items="
											selectedMenu.itemSet
												.filter(
													(x) =>
														x.category.name == category.name &&
														x.subCategory?.name == subcategory.name,
												)
												.map((x) => createItemWrapper(x))
										"
									/>
								</el-row>
								<el-row :key="100000" class="menus-row">
									<SubcategoryComponent
										subcategory-name="Others"
										:items="
											selectedMenu.itemSet
												.filter((x) => x.category.name == category.name && x.subCategory == null)
												.map((x) => createItemWrapper(x))
										"
									/>
								</el-row>
							</el-col>
						</div>
					</el-tab-pane>
				</el-tabs>
			</el-main>
		</el-container>
	</el-scrollbar>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans');

#menus-instructions {
	padding-top: 5%;
	font-family: 'Open Sans' !important;
	font-size: 2.5rem;
	font-weight: bold;
	color: #ed5087b9;
	white-space: pre-wrap;
	text-align: center;
}

#menus-steps {
	font-family: 'Open Sans' !important;
	font-size: 2rem;
	font-weight: bold;
	color: #ed50876e;
	white-space: pre-wrap;
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 1.5%;
}

#menus-wrapper {
	padding-left: 2vw;
	padding-top: 2vh;
}

.menus-button {
	width: 25%;
	height: auto;
	font-family: 'Open Sans' !important;
	font-size: 1vw;
	font-weight: bold;
}

.el-select .el-input__wrapper {
	font-family: 'Open Sans';
	font-size: 1.1vw;
	width: 15vw;
	font-weight: bolder;
	height: auto;
	border-radius: 30px;
}

.el-select .el-input.is-focus .el-input__wrapper {
	box-shadow: 0 0 0 1px #ed5087 inset !important;
}

.el-select .el-input.is-ac .el-input__wrapper {
	box-shadow: 0 0 0 1px #ed5087 inset !important;
}

.el-select {
	--el-select-input-focus-border-color: #ed5087;
}

.el-popper {
	border-radius: 25px;
}

.el-select-dropdown__item {
	font-family: 'Open Sans';
	font-size: 1vw;
	text-align: center;
}

.el-select-dropdown__item.selected {
	color: #ed5087;
}

.menu-selector {
	padding-top: 3vh;
}

.menus-row {
	margin-bottom: 2vh !important;
}

.menu-tabs .el-tabs__item {
	font-size: 1.7vw;
	font-weight: bolder;
	font-family: 'Open Sans';
}

.menu-tabs .el-tabs__item.is-active {
	color: #ed5087;
}

.menu-tabs .el-tabs__active-bar {
	background-color: #ed5087;
}

.menu-tabs .el-tabs__item:hover {
	color: #ed5087;
}

.dropdown-menu {
	font-family: 'Open Sans';
	cursor: pointer;
	color: #ed5087;
	display: flex;
	align-items: center;
}
</style>
