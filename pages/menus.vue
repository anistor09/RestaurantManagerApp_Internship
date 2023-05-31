<script lang="ts" setup>
import SubcategoryComponent from '../components/subcategory-component.vue';
import { Carte } from '../interfaces/Carte';
import { Category } from '../interfaces/Category';
import { Item } from '../interfaces/Item';
import { ItemWrapper } from '../interfaces/ItemWrapper';
import { SubCategory } from '../interfaces/SubCategory';
import { useRestaurantStore } from '../store/restaurant';
import { ref, computed, watch } from 'vue';
const restaurantStore = useRestaurantStore();
const restaurant = restaurantStore.restaurantGetter;

const editPopupKey = ref(0);
const currentCategory = ref('');
const selectedMenuName = ref('');
const forceCollapse = ['1'];
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
const editMenu = ref(false);

function editMenuOnClose(name: string) {
	selectedMenuName.value = name;
	editMenu.value = false;
	editPopupKey.value++;
}

function closeEditPopup() {
	editMenu.value = false;
	editPopupKey.value++;
}
</script>

<template>
	<el-scrollbar>
		<PageTitle title="Menus"></PageTitle>
		<el-container>
			<el-header>
				<div class="el-row">
					<div class="el-col" :style="{ flex: '0 0 67%', 'text-align': 'left', paddingTop: '3vh' }">
						<el-select
							v-model="selectedMenuName"
							:style="{ paddingRight: '1vw' }"
							filterable
							clearable
							placeholder="Select menu"
						>
							<el-option v-for="item in restaurant.carteSet" :key="item.id" :value="item.name" />
						</el-select>
						<el-button
							class="menus-button"
							:style="{ width: '6vw' }"
							color="#ED5087"
							plain
							round
							@click="addMenu = true"
						>
							Add menu
						</el-button>
						<ClientOnly>
							<Teleport to="body">
								<el-dialog
									v-model="addMenu"
									:style="{
										top: '-10%',
										width: '40%',
										height: '85%',
										minHeight: '750px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										flexDirection: 'column',
										border: '5px solid #ed5087',
										borderRadius: '50px !important',
										padding: '10px',
										fontFamily: 'Open Sans',
									}"
								>
									<AddMenuComponent
										:restaurant="restaurant"
										@close="addMenu = false"
									></AddMenuComponent>
								</el-dialog>
							</Teleport>
						</ClientOnly>
					</div>
					<div class="el-col" :style="{ flex: '0 0 30%', textAlign: 'right', paddingTop: '3vh' }">
						<el-button
							class="menus-button"
							:disabled="selectedMenuName === ''"
							color="#ED5087"
							plain
							round
							@click="editMenu = true"
						>
							Edit menu
						</el-button>
						<ClientOnly>
							<Teleport to="body">
								<el-dialog
									:key="editPopupKey"
									v-model="editMenu"
									:before-close="closeEditPopup"
									:style="{
										top: '-10%',
										width: '40%',
										height: '85%',
										minHeight: '750px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										flexDirection: 'column',
										border: '5px solid #ed5087',
										borderRadius: '50px !important',
										padding: '10px',
										fontFamily: 'Open Sans',
									}"
								>
									<EditMenuComponent
										:restaurant="restaurant"
										:menu="selectedMenu"
										@close="editMenuOnClose"
									></EditMenuComponent>
								</el-dialog>
							</Teleport>
						</ClientOnly>
						<el-button
							class="menus-button"
							:disabled="selectedMenuName === ''"
							color="#ED5087"
							plain
							round
							@click="addItemInMenu = true"
						>
							Place item
						</el-button>
						<ClientOnly>
							<Teleport to="body">
								<el-dialog
									v-model="addItemInMenu"
									:style="{
										width: '20%',
										height: '45%',
										display: 'flex',
										alignItems: 'center',
										flexDirection: 'column',
										justifyContent: 'space-around',
										border: '5px solid #ed5087',
										borderRadius: '50px !important',
									}"
								>
									<AddItemInMenuComponent
										:menu="selectedMenu"
										@close="addItemInMenu = false"
									></AddItemInMenuComponent>
								</el-dialog>
							</Teleport>
						</ClientOnly>
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
								<el-row v-if="selectedSubcategories.length == 0" :key="1" class="menus-row">
									<SubcategoryComponent
										v-model="forceCollapse"
										:restaurant="restaurant"
										subcategory-name=""
										:items="
											selectedMenu.itemSet
												.filter((x) => x.category.name == category.name)
												.map((x) => createItemWrapper(x))
										"
										:collapsed="true"
										:menu-id="selectedMenu.id"
									/>
								</el-row>
								<div v-else>
									<el-row
										v-for="subcategory in selectedSubcategories"
										:key="subcategory.id"
										class="menus-row"
									>
										<SubcategoryComponent
											:restaurant="restaurant"
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
											:collapsed="false"
											:menu-id="selectedMenu.id"
										/>
									</el-row>
									<el-row
										v-if="
											selectedMenu.itemSet.filter(
												(x) => x.category.name == category.name && x.subCategory == null,
											).length > 0
										"
										:key="100000"
										class="menus-row"
									>
										<SubcategoryComponent
											:restaurant="restaurant"
											subcategory-name="Others"
											:items="
												selectedMenu.itemSet
													.filter((x) => x.category.name == category.name && x.subCategory == null)
													.map((x) => createItemWrapper(x))
											"
											:collapsed="false"
											:menu-id="selectedMenu.id"
										/>
									</el-row>
								</div>
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

.el-overlay-dialog {
	overflow: hidden;
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
