<script lang="ts" setup>
import { ElSelect } from 'element-plus';
import { ref, onMounted, onUnmounted } from 'vue';
import allergens from '../mockData/allergens.json';
import PageTitle from '../components/page-title.vue';
import OptionComponent from '../components/option-component.vue';
import NameNeededPopUp from '../components/nameNeededPopUp.vue';
import { SubCategory } from '../interfaces/SubCategory';
import { Category } from '../interfaces/Category';
import { Option } from '../interfaces/Option';
import { Choice } from '../interfaces/Choice';
import { Item } from '../interfaces/Item';

import { useRestaurantStore } from '../store/restaurant';
import { useCategoryStore } from '../store/category';
import { useItemStore } from '../store/item';

const restaurantStore = useRestaurantStore();
const categoryStore = useCategoryStore();
const itemStore = useItemStore();
const restaurant = restaurantStore.restaurantGetter;
const defaultSrc =
	'https://img.favpng.com/23/21/6/knife-fork-spoon-clip-art-png-favpng-g0zSCK2EGgjPqfDQWPh6qVtmY.jpg';
let item: Item;
const dummyCategory: Category = {
	name: '',
	description: '',
	imageUrl: '',
	subCategorySet: [],
	id: -1,
	presentationOrder: 0,
};
const dummyItem: Item = {
	id: -1,
	name: '',
	description: '',
	longDescription: '',
	presentationOrder: 0,
	imageUrl: defaultSrc,
	price: 0,
	category: dummyCategory,
	subCategory: null,
	sideItemSet: [],
	optionSet: [],
	allergen: '',
};

const props = defineProps({
	addItem: {
		type: Boolean,
		required: true,
	},
	itemId: {
		type: Number,
		required: true,
	},
});
const disableSubCateg = ref(true);
const nameNeededPopUp = ref(false);

if (props.addItem === false) {
	const realItem = restaurant.itemSet.filter((x) => x.id === props.itemId)[0];
	let imageUrl = realItem.imageUrl;
	if (imageUrl === null) imageUrl = defaultSrc;
	let subCategory = null;
	if (realItem.subCategory) subCategory = SubCategoryDeepCopy(realItem.subCategory);
	item = {
		id: realItem.id,
		name: realItem.name,
		description: realItem.description,
		longDescription: realItem.longDescription,
		presentationOrder: realItem.presentationOrder,
		imageUrl,
		price: realItem.price,
		category: CategoryDeepCopy(realItem.category),
		subCategory,
		sideItemSet: realItem.sideItemSet,
		optionSet: realItem.optionSet.map((x) => OptionDeepCopy(x)),
		allergen: realItem.allergen,
	};
	if (realItem.category.subCategorySet && realItem.category.subCategorySet.length > 0)
		disableSubCateg.value = false;
} else {
	item = {
		id: -1,
		name: '',
		description: '',
		longDescription: '',
		presentationOrder: 0,
		imageUrl: defaultSrc,
		price: 0,
		category: dummyCategory,
		subCategory: null,
		sideItemSet: [],
		optionSet: [],
		allergen: '',
	};
}

let allergen: string[] = [];
if (item.allergen != null && item.allergen.length > 0) {
	const temp = item.allergen.split(',').map((x) => allergens.filter((y) => y.letter === x)[0]);
	allergen = temp.filter((x) => x !== undefined).map((x) => x.name);
}

const sideItems = ref<number[]>(item.sideItemSet.map((x) => x.id));
const name = ref(item.name);
const description = ref(item.description);
const price = ref(item.price);
const presentationOrder = ref(item.presentationOrder);
const longDescription = ref(item.longDescription);
const category = ref();

if (item.category.id !== -1) category.value = item.category.id;
const subCategory = ref();
if (item.subCategory) subCategory.value = item.subCategory.id;

const subCategories = ref(item.category.subCategorySet);

const src = ref(item.imageUrl);
const categories = ref(restaurant.categorySet);
const allItems = restaurant.itemSet;

const selectedAllergens = ref<string[]>(allergen); // Refference  to the list of allergens for the current item
const options = ref(item.optionSet);

const changeCategory = (id: Number) => {
	const category = restaurant.categorySet.find((x) => x.id === id);
	if (category) {
		if (category.subCategorySet && category.subCategorySet.length > 0) {
			subCategories.value = category.subCategorySet;
			subCategory.value = undefined;
			disableSubCateg.value = false;
		} else {
			subCategories.value = [];
			disableSubCateg.value = true;
			subCategory.value = undefined;
		}
	}
};

const addOptionPopUp = ref(false);
const delteteOptionPopUp = ref(false);
const editOptionPopUp = ref(false);
const addChoicePopUp = ref(false);
const deleteItemPopUp = ref(false);

const optionNameField = ref('');
const optionDescriptionField = ref('');
const optionMandatory = ref(false);
const selectedOption = ref(0);
const selectedOptionName = ref('');
const choiceName = ref('');
const choiceDescription = ref('');

let newChoiceId = -1;
let newOptionId = -1;

const handleAddChoiceEmit = (optionId: number) => {
	addChoicePopUp.value = true;
	choiceDescription.value = '';
	choiceName.value = '';
	selectedOption.value = optionId;
};

function handleAddChoice() {
	newChoiceId -= 1;
	addChoicePopUp.value = false;
	const currentOption = options.value.find((x) => x.id === selectedOption.value);
	if (currentOption) {
		const choice: Choice = {
			id: newChoiceId,
			name: choiceName.value,
			description: choiceDescription.value,
		};
		currentOption.choiceSet.push(choice);
	}
	addChoicePopUp.value = false;
}

const handleEditOptionEmit = (optionId: number) => {
	selectedOption.value = optionId;
	const currentOption = options.value.find((x) => x.id === optionId);
	if (currentOption) {
		optionDescriptionField.value = currentOption.description;
		optionNameField.value = currentOption.name;
		optionMandatory.value = currentOption.mandatory;
		editOptionPopUp.value = true;
	}
};

function handleEditOption() {
	const option = options.value.find((x) => x.id === selectedOption.value);
	if (option) {
		option.name = optionNameField.value;
		option.description = optionDescriptionField.value;
		option.mandatory = optionMandatory.value;
	}
	editOptionPopUp.value = false;
}

const handleDeleteOptionEmit = (optionId: number) => {
	selectedOption.value = optionId;
	delteteOptionPopUp.value = true;
	const currentOption = options.value.find((x) => x.id === optionId);
	if (currentOption) {
		selectedOptionName.value = currentOption.name;
	}
};

function handleDeleteOption() {
	const index = options.value.findIndex((x) => x.id === selectedOption.value);
	if (index !== -1) {
		options.value.splice(index, 1);
	}
	delteteOptionPopUp.value = false;
}

function handleAddOption() {
	const x: Option = {
		id: newOptionId,
		name: optionNameField.value,
		description: optionDescriptionField.value,
		mandatory: optionMandatory.value,
		choiceSet: [],
	};
	newOptionId -= 1;
	addOptionPopUp.value = false;
	options.value.push(x);
}

function handleDeleteItem() {
	itemStore.deleteGetter.push(props.itemId);
	openNotification('Item was successfully deleted');
	setTimeout(() => {
		window.close();
	}, 2000);
}

function addOption() {
	optionDescriptionField.value = '';
	optionNameField.value = '';
	optionMandatory.value = false;
	addOptionPopUp.value = true;
}

const handleDeleteChoiceEmit = (choiceId: number, optionId: number) => {
	const option = options.value.find((x) => x.id === optionId);
	if (option) {
		const choices = option.choiceSet;
		const index = choices.findIndex((x) => x.id === choiceId);
		if (index !== -1) {
			choices.splice(index, 1);
		}
	}
};

const handleEditChoiceEmit = (
	choiceId: number,
	optionId: number,
	name: string,
	description: string,
) => {
	const option = options.value.find((x) => x.id === optionId);
	if (option) {
		const choice = option.choiceSet.find((x) => x.id === choiceId);
		if (choice) {
			choice.name = name;
			choice.description = description;
		}
	}
};

function SubCategoryDeepCopy(x: SubCategory) {
	const newSubCategory: SubCategory = {
		name: x.name,
		description: x.description,
		imageUrl: x.imageUrl,
		presentationOrder: x.presentationOrder,
		id: x.id,
	};
	return newSubCategory;
}

function CategoryDeepCopy(x: Category) {
	const newSubCategorySet: SubCategory[] = x.subCategorySet.map((y) => SubCategoryDeepCopy(y));
	const newCategory: Category = {
		name: x.name,
		description: x.description,
		imageUrl: x.imageUrl,
		presentationOrder: x.presentationOrder,
		id: x.id,
		subCategorySet: newSubCategorySet,
	};
	return newCategory;
}

function ChoiceDeepCopy(x: Choice) {
	const newChoice: Choice = { name: x.name, description: x.description, id: x.id };
	return newChoice;
}

function OptionDeepCopy(x: Option) {
	const newChoiceSet: Choice[] = x.choiceSet.map((y) => ChoiceDeepCopy(y));
	const newChoice: Option = {
		name: x.name,
		description: x.description,
		id: x.id,
		mandatory: x.mandatory,
		choiceSet: newChoiceSet,
	};
	return newChoice;
}

const cancelButton = () => {
	window.close();
};

const deleteButton = () => {
	deleteItemPopUp.value = true;
};

const saveButton = () => {
	itemStore.itemGetter.push();
	if (props.addItem) {
		item.name = name.value;
		item.description = description.value;
		item.longDescription = longDescription.value;
		item.optionSet = options.value;
		item.price = price.value;
		item.sideItemSet = sideItems.value.map((x) => {
			const item = allItems.find((y) => y.id === x);
			if (item) return item;
			else return dummyItem;
		});
		const newCategory = restaurant.categorySet.find((x) => x.id === category.value);
		if (newCategory) {
			item.category = newCategory;
			if (subCategories.value === undefined) item.subCategory = null;
			else {
				const newSubCategory = newCategory.subCategorySet.find((x) => x.id === subCategory.value);
				if (newSubCategory) item.subCategory = newSubCategory;
				else item.subCategory = null;
			}
		}
		item.imageUrl = src.value;
		item.presentationOrder = presentationOrder.value;
		restaurant.itemSet.push(item);
		itemStore.itemGetter.push(item);
		/// add item to database
		openNotification('Item was successfully added');
	} else {
		const realItem = restaurant.itemSet.filter((x) => x.id === props.itemId)[0];
		realItem.name = name.value;
		realItem.description = description.value;
		realItem.longDescription = longDescription.value;
		realItem.optionSet = options.value;
		realItem.price = price.value;
		realItem.sideItemSet = sideItems.value.map((x) => {
			const item = allItems.find((y) => y.id === x);
			if (item) return item;
			else return dummyItem;
		});
		const newCategory = restaurant.categorySet.find((x) => x.id === category.value);
		if (newCategory) {
			realItem.category = newCategory;
			if (subCategories.value === undefined) realItem.subCategory = null;
			else {
				const newSubCategory = newCategory.subCategorySet.find((x) => x.id === subCategory.value);
				if (newSubCategory) realItem.subCategory = newSubCategory;
				else realItem.subCategory = null;
			}
		}
		realItem.imageUrl = src.value;
		realItem.presentationOrder = presentationOrder.value;
		itemStore.itemGetter.push(realItem);
		/// update item in the database
		openNotification('Item was successfully edited');
	}
	setTimeout(() => {
		window.close();
	}, 2000);
};

const addCategory = () => {
	window.open('/editCategoryView', '_blank');
};
const editCategory = () => {
	if (category.value) {
		window.open(`/editCategoryView/${category.value}`, '_blank');
	}
};

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
			setTimeout(() => {
				categoryStore.categoryReset();
			}, 1000);
			categories.value = restaurant.categorySet;
			changeCategory(category.value);
		}
		if (categoryStore.deleteGetter.length !== 0) {
			const categoryId = categoryStore.deleteGetter[0];
			const index = restaurant.categorySet.findIndex((x) => x.id === categoryId);
			if (index !== -1) {
				restaurant.categorySet.splice(index, 1);
				category.value = undefined;
				subCategory.value = undefined;
				disableSubCateg.value = true;
			}
			setTimeout(() => {
				categoryStore.categoryReset();
			}, 1000);
			categories.value = restaurant.categorySet;
		}
	}
};

onMounted(() => {
	window.addEventListener('storage', handleStorageEvent);
});

onUnmounted(() => {
	window.removeEventListener('storage', handleStorageEvent);
});

const openNotification = (notifTitle: string) => {
	ElNotification({
		title: notifTitle,
		message: h(
			'div',
			{ style: 'color: #ed5087; font-family: "Open Sans"' },
			'You will be redirected now.',
		),
		customClass: 'notif',
	});
};
async function addAiShortDescription() {
	await addAiDescription('150', true);
}
async function addAiLongDescription() {
	await addAiDescription('250', false);
}
async function addAiDescription(neededLength: string, short: boolean) {
	if (name.value.length === 0) {
		nameNeededPopUp.value = true;
	} else {
		if (short) {
			description.value = 'The new description is loading...';
		} else {
			longDescription.value = 'The new description is loading...';
		}
		const requestBody = {
			itemName: name.value,
			length: neededLength,
			target: 'an item',
		};
		const response = await useFetch(`/api/autocompletion/getAutocompletion`, {
			method: 'POST',
			body: requestBody,
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (short) {
			description.value = response.data.value;
		} else {
			longDescription.value = response.data.value;
		}
	}
}
</script>

<template>
	<ClientOnly>
		<Teleport to="body">
			<NameNeededPopUp
				v-model="nameNeededPopUp"
				:message="'item'"
				@closeNoName="nameNeededPopUp = false"
			></NameNeededPopUp>
		</Teleport>
	</ClientOnly>
	<div class="container">
		<page-title v-if="addItem" :title="'Add an item'" />
		<page-title v-else :title="'Edit an item'" />
		<div class="bottom">
			<div class="left">
				<div class="elementLeft">
					<div class="box">
						<div style="height: 40%; width: 100%">
							<div id="item-name" class="fieldText">Name</div>
							<input v-model="name" class="specialInput" style="height: 56.25%" />
						</div>
					</div>
				</div>
				<div class="elementLeft">
					<div class="box" style="">
						<div class="div" style="display: flex; align-items: center">
							<div id="item-description" class="fieldText" style="width: 30%; padding-bottom: 0.9%">
								Description
							</div>

							<el-button id="item-ai-description" class="aiButton" @click="addAiShortDescription"
								>✨Write with AI</el-button
							>
						</div>
						<textarea v-model="description" class="specialTextArea"></textarea>
					</div>
				</div>
				<div class="elementLeft">
					<div class="box">
						<div id="item-category" class="fieldText">Category</div>
						<el-select
							v-model="category"
							class="special-select-item"
							filterable
							@change="changeCategory"
						>
							<el-option
								v-for="categoryOption in categories"
								:label="categoryOption.name"
								:value="categoryOption.id"
							/>
						</el-select>
						<el-button id="item-add-category" class="specialAddButton" @click="addCategory"
							>Add Category</el-button
						>
					</div>
				</div>
				<div class="elementLeft">
					<div class="box">
						<div id="item-subcategory" class="fieldText">Subcategory</div>
						<el-select
							v-model="subCategory"
							class="special-select-item"
							filterable
							clearable
							:class="{ 'disabled-element': disableSubCateg }"
							placeholder="No subcategory"
						>
							<el-option
								v-for="subCategoryOption in subCategories"
								:label="subCategoryOption.name"
								:value="subCategoryOption.id"
							/>
						</el-select>
						<el-button id="item-add-subcategory" class="specialAddButton" @click="editCategory"
							>Add Subcategory</el-button
						>
					</div>
				</div>
				<div class="elementLeft">
					<div class="box" style="">
						<el-button
							v-if="props.addItem"
							id="item-cancel-button"
							class="specialExitButton"
							@click="cancelButton"
							>Cancel</el-button
						>
						<el-button
							v-else
							id="item-delete-button"
							class="specialExitButton"
							@click="deleteButton"
							>Delete</el-button
						>
					</div>
				</div>
			</div>
			<div class="middle">
				<div class="elementLeft">
					<div class="box" style="padding-left: 0%">
						<div style="height: 40%; width: 100%">
							<div id="item-sidedishes" class="fieldText">Side-dishes</div>
							<el-select
								v-model="sideItems"
								class="special-multiple-select-item special-select-item"
								multiple
								collapse-tags
								filterable
								@change="changeCategory"
							>
								<el-option
									v-for="sideItemOption in allItems"
									:label="sideItemOption.name"
									:value="sideItemOption.id"
								/>
							</el-select>
						</div>
					</div>
				</div>
				<div style="width: 100%; height: 75%">
					<div id="item-options" class="fieldText">Options</div>
					<div id="menus-wrapper">
						<el-scrollbar>
							<el-col>
								<el-row v-for="option in options" :key="option.id" class="menus-row">
									<option-component
										:id="option.id"
										:option-name="option.name"
										:choices="option.choiceSet"
										:options="options"
										@delete-choice="handleDeleteChoiceEmit"
										@delete-option="handleDeleteOptionEmit"
										@edit-choice="handleEditChoiceEmit"
										@add-choice="handleAddChoiceEmit"
										@edit-option="handleEditOptionEmit"
									/>
								</el-row>
							</el-col>
							<el-button
								id="item-add-option"
								class="specialAddButton"
								style="margin-top: 1%"
								@click="addOption()"
								>Add Option</el-button
							>
						</el-scrollbar>
					</div>
				</div>
			</div>
			<div class="right">
				<div class="elementLeft">
					<div class="box" style="flex-direction: row; justify-content: left">
						<div style="width: 48%; height: 100%; display: flex; align-items: center">
							<div style="height: 40%; width: 100%">
								<div id="item-presentation" class="fieldText">Presentation Order</div>
								<input
									v-model="presentationOrder"
									class="specialInput"
									style="height: 56.25%; width: 80%"
								/>
							</div>
						</div>
						<div style="width: 36.5%; height: 100%; display: flex; align-items: center">
							<div style="height: 40%; width: 100%">
								<div id="item-price" class="fieldText">Price</div>
								<input v-model="price" class="specialInput" style="height: 56.25%; width: 67%" />
							</div>
						</div>
					</div>
				</div>
				<div class="elementLeft">
					<div class="box" style="">
						<div class="div" style="display: flex; align-items: center">
							<div
								id="item-long-description"
								class="fieldText"
								style="width: 30%; padding-bottom: 0.9%"
							>
								Long Description
							</div>
							<el-button
								id="item-ai-long-description"
								class="aiButton"
								style="height: 45%"
								@click="addAiLongDescription"
								>✨Write with AI
							</el-button>
						</div>
						<textarea v-model="longDescription" class="specialTextArea"></textarea>
					</div>
				</div>
				<div class="elementLeft">
					<div class="box" style="">
						<div id="item-photo" class="fieldText">Photo</div>
						<div style="width: 92%; height: 90%; display: flex">
							<el-image :src="src" style="width: 35%; height: 100%; border-radius: 40px" />
							<div class="photoButtonSpace">
								<el-button id="item-photo-change" class="specialPhotoButton">Change</el-button>
								<el-button id="item-photo-delete" class="specialPhotoButton">Delete</el-button>
							</div>
						</div>
					</div>
				</div>
				<div class="elementLeft">
					<div class="box" style="justify-content: center">
						<div id="item-allergens" class="fieldText">Alergens</div>
						<el-select
							v-model="selectedAllergens"
							class="special-select-item"
							multiple
							collapse-tags
							filterable
							default-first-option
							:reserve-keyword="false"
							placeholder="Please input allergens list"
						>
							<el-option
								v-for="allergenOption in allergens"
								:key="allergenOption.id"
								:label="allergenOption.name"
								:value="allergenOption.name"
							/>
						</el-select>
					</div>
				</div>
				<div class="elementLeft">
					<div class="box" style="width: 84%; align-items: end; padding-left: 0%">
						<el-button
							id="item-save-button"
							class="specialExitButton"
							style="width: 39.325%"
							@click="saveButton"
						>
							Save
						</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<ClientOnly>
		<Teleport to="body">
			<el-dialog v-model="addOptionPopUp" class="choice-edit-popup">
				<template #header>
					<div class="my-header">
						<div class="choiceFieldText">Add an option</div>
					</div>
				</template>
				<div style="width: 100%; height: 70%">
					<div style="width: 100%; height: 100%; padding-left: 15%">
						<div class="choiceFieldText">Name</div>
						<input v-model="optionNameField" class="specialOptionInput" />
						<div class="choiceFieldText">Description</div>
						<textarea v-model="optionDescriptionField" class="specialOptionTextArea"></textarea>
						<div class="choiceFieldText">
							<el-checkbox
								v-model="optionMandatory"
								class="option-checkbox"
								label="Mandatory"
								size="large"
							/>
						</div>
					</div>
				</div>
				<div
					style="
						width: 100%;
						height: 30%;
						display: flex;
						justify-content: center;
						align-items: center;
					"
				>
					<el-button class="choice-edit-popup-button" @click="handleAddOption()"
						>Add option</el-button
					>
				</div>
			</el-dialog>
		</Teleport>
		<Teleport to="body">
			<el-dialog v-model="delteteOptionPopUp" class="choice-delete-popup">
				<div
					style="
						width: 100%;
						height: 70%;
						text-align: center;
						display: flex;
						justify-content: center;
						align-items: center;
					"
				>
					Are you sure you want to delete "{{ selectedOptionName }}"?
				</div>
				<div
					style="
						display: flex;
						justify-content: center;
						align-items: center;
						width: 100%;
						height: 20%;
					"
				>
					<el-button class="choice-delete-popup-button" @click="handleDeleteOption()"
						>Yes</el-button
					>
				</div>
			</el-dialog>
		</Teleport>
		<Teleport to="body">
			<el-dialog v-model="deleteItemPopUp" class="choice-delete-popup">
				<div
					style="
						width: 100%;
						height: 70%;
						text-align: center;
						display: flex;
						justify-content: center;
						align-items: center;
					"
				>
					Are you sure you want to delete "{{ item.name }}"?
				</div>
				<div
					style="
						display: flex;
						justify-content: center;
						align-items: center;
						width: 100%;
						height: 20%;
					"
				>
					<el-button class="choice-delete-popup-button" @click="handleDeleteItem()">Yes</el-button>
				</div>
			</el-dialog>
		</Teleport>
		<Teleport to="body">
			<el-dialog v-model="addChoicePopUp" class="choice-edit-popup">
				<template #header>
					<div class="my-header">
						<div class="choiceFieldText">Add a choice</div>
					</div>
				</template>
				<div style="width: 100%; height: 70%">
					<div style="width: 100%; height: 100%; padding-left: 15%">
						<div class="choiceFieldText">Name</div>
						<input v-model="choiceName" class="specialChoiceInput" />
						<div class="choiceFieldText">Description</div>
						<textarea v-model="choiceDescription" class="specialChoiceTextArea"></textarea>
					</div>
				</div>
				<div
					style="
						width: 100%;
						height: 30%;
						display: flex;
						justify-content: center;
						align-items: center;
					"
				>
					<el-button class="choice-edit-popup-button" @click="handleAddChoice()"
						>Add Choice</el-button
					>
				</div>
			</el-dialog>
		</Teleport>
		<Teleport to="body">
			<el-dialog v-model="editOptionPopUp" class="option-edit-popup">
				<template #header>
					<div class="my-header">
						<div class="choiceFieldText">Edit a option</div>
					</div>
				</template>
				<div style="width: 100%; height: 70%">
					<div style="width: 100%; height: 100%; padding-left: 15%">
						<div class="choiceFieldText">Name</div>
						<input v-model="optionNameField" class="specialOptionInput" />
						<div class="choiceFieldText">Description</div>
						<textarea v-model="optionDescriptionField" class="specialOptionTextArea"></textarea>
						<div class="choiceFieldText">
							<el-checkbox
								v-model="optionMandatory"
								class="option-checkbox"
								label="Mandatory"
								size="large"
							/>
						</div>
					</div>
				</div>
				<div
					style="
						width: 100%;
						height: 30%;
						display: flex;
						justify-content: center;
						align-items: center;
					"
				>
					<el-button class="option-edit-popup-button" @click="handleEditOption()"
						>Update option</el-button
					>
				</div>
			</el-dialog>
		</Teleport>
	</ClientOnly>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans');

* {
	font-family: 'Open Sans';
}

.notif {
	font-family: 'Open Sans';
}

.container {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	overflow-x: hidden;
}

.bottom {
	width: 100%;
	height: 88%;
	margin: 0;
}

.left {
	width: 33.3%;
	height: 100%;
	margin: 0;
	float: left;
}

.middle {
	width: 33.3%;
	height: 100%;
	margin: 0;
	float: left;
}

.right {
	width: 33.3%;
	height: 100%;
	margin: 0;
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

.box {
	padding-left: 8%;
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

.specialAddButton {
	border-radius: 25px;
	font-size: 1vw;
	border-color: #ed5087;
	background-color: white;
	color: #ed5087;
	width: 40%;
	height: 22.5%;
}

.aiButton {
	border-radius: 25px;
	font-size: 1vw;
	border-color: #ed5087;
	background-color: white;
	color: #ed5087;
	width: 30%;
	height: 65%;
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
	border-radius: 25px;
	font-size: 1.25vw;
	border-color: #ed5087;
	background-color: #ed5087;
	color: white;
	width: 30%;
	height: 40%;
}

.specialExitButton:hover {
	background-color: #d9d9d9;
	border-color: darkgrey;
	color: black;
}

/* .specialAddButton:hover {
    background-color: #ED5087;
    border-color: #ED5087;
    color: white;
} */
.aiButton:hover,
.specialAddButton:hover,
.specialPhotoButton:hover {
	background-color: #ed5087;
	border-color: #ed5087;
	color: white;
}

/* .aiButton:hover {
    background-color: #ED5087;
    border-color: #ED5087;
    color: white;
} */

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

.disabled-element {
	opacity: 0.2;
	pointer-events: none;
}

.disabled-element >>> .el-input__suffix-inner {
	opacity: 0.2;
	pointer-events: none;
}

#menus-wrapper {
	padding-left: 0%;
	padding-top: 0%;
	height: 92%;
	width: 100%;
}
.specialChoiceTextArea::-webkit-scrollbar,
.specialOptionTextArea::-webkit-scrollbar,
.specialTextArea::-webkit-scrollbar {
	width: 5px;
}
</style>
