<script lang="ts" setup>
import {
	ElScrollbar,
	ElMain,
	ElContainer,
	ElOption,
	ElButton,
	ElDialog,
	ElHeader,
	ElSelect,
} from 'element-plus';
import { ref, computed, watch } from 'vue';
import SubcategoryComponent from '../components/subcategory-component.vue';
import EditMenuComponent from '../components/edit-menu-component.vue';
import AddItemInMenuComponent from '../components/add-item-in-menu-component.vue';
import AddMenuComponent from '../components/add-menu-component.vue';
import PageTitle from '../components/page-title.vue';
import { Carte } from '../interfaces/Carte';
import { Category } from '../interfaces/Category';
import { Item } from '../interfaces/Item';
import { ItemWrapper } from '../interfaces/ItemWrapper';
import { SubCategory } from '../interfaces/SubCategory';
import { useRestaurantStore } from '../store/restaurant';
import { useLanguageStore } from '../store/language';
import translations from '../mockData/translations.json';

const restaurantStore = useRestaurantStore();
const restaurant = restaurantStore.restaurantGetter;
const languageStore = useLanguageStore();
const computedLanguageId = computed(() => languageStore.idGetter);

const editPopupKey = ref(0);
const currentCategory = ref('');
const selectedMenuName = ref('');
const forceCollapse = ['1'];
const instructions = computed(() => translations[computedLanguageId.value].manageAndCustomize);
const steps = computed(() => translations[computedLanguageId.value].menuScript);

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
		<PageTitle :title=translations[computedLanguageId].menus></PageTitle>
		<el-container>
			<el-header>
				<div class="el-row">
					<div class="el-col" :style="{ flex: '0 0 67%', 'text-align': 'left', paddingTop: '3vh' }">
						<el-select
							v-model="selectedMenuName"
							:style="{ paddingRight: '1vw' }"
							filterable
							clearable
							data-testid="select-menu"
							:placeholder=translations[computedLanguageId].selectMenu
						>
							<el-option v-for="item in restaurant.carteSet" :key="item.id" :value="item.name" />
						</el-select>
						<el-button
							class="menus-button"
							:style="{ width: '18%' }"
							color="#ED5087"
							plain
							round
							data-testid="add-menu-button"
							@click="addMenu = true"
						>
							{{ translations[computedLanguageId].createNewMenu }}
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
							data-testid="edit-menu-button"
							@click="editMenu = true"
						>
							{{translations[computedLanguageId].editMenu}}
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
							style="width: 40%"
							:disabled="selectedMenuName === ''"
							color="#ED5087"
							plain
							round
							data-testid="place-item-button"
							@click="addItemInMenu = true"
						>
							{{ translations[computedLanguageId].addItemToMenu }}
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
						data-testid="category-tabs"
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
											data-testid="subcategory-component"
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
	font-size: 2vw;
	font-weight: bold;
	color: #ed5087b9;
	white-space: pre-wrap;
	text-align: center;
}

#menus-steps {
	font-family: 'Open Sans' !important;
	font-size: 1.5vw;
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
