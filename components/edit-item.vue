<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed} from 'vue';
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
import { useLanguageStore } from '../store/language';
import translations from '../mockData/translations.json';
// initialize stores
const languageStore = useLanguageStore();
const computedLanguageId = computed(() => languageStore.idGetter);
const restaurantStore = useRestaurantStore();
const categoryStore = useCategoryStore();
const itemStore = useItemStore();
const restaurant = restaurantStore.restaurantGetter;
// image information
const defaultSrc ='https://img.favpng.com/23/21/6/knife-fork-spoon-clip-art-png-favpng-g0zSCK2EGgjPqfDQWPh6qVtmY.jpg';
const acceptedTypes = ['image/jpeg', 'image/png'];

// dummy information
let item: Item;
async function fetchHelper(address:string, data:any) {
	return await useFetch(address, {watch: false, method: 'POST',body: data,headers: {'Content-Type': 'application/json'}});
}
const dummyCategory: Category = {name: '',description: '',imageUrl: '',subCategorySet: [],id: -1,presentationOrder: 0,};
const dummyItem: Item = {id: -1,name: '',description: '',longDescription: '',presentationOrder: 0,imageUrl: defaultSrc,price: 0,category: dummyCategory,subCategory: null,sideItemSet: [],optionSet: [],allergen: '',};

// props for the page
const props = defineProps({
	addItem: {type: Boolean,required: true,},
	itemId: {type: Number,required: true,}});

const disableSubCateg = ref(true);
const disableButtons = ref(false);
// create the item
if (props.addItem === false) {
	const realItem = restaurant.itemSet.filter((x) => x.id === props.itemId)[0];
	let imageUrl = realItem.imageUrl;
	if (imageUrl === null) imageUrl = defaultSrc;
	let subCategory = null;
	if (realItem.subCategory) subCategory = SubCategoryDeepCopy(realItem.subCategory);
	item = {id: realItem.id,name: realItem.name,description: realItem.description,longDescription: realItem.longDescription,presentationOrder: realItem.presentationOrder,imageUrl,price: realItem.price,category: CategoryDeepCopy(realItem.category),subCategory,sideItemSet: realItem.sideItemSet,optionSet: realItem.optionSet.map((x) => OptionDeepCopy(x)),allergen: realItem.allergen};
	if (realItem.category.subCategorySet && realItem.category.subCategorySet.length > 0)
		disableSubCateg.value = false;
} else 
	item = {id: -1,name: '',description: '',longDescription: '',presentationOrder: 0,imageUrl: defaultSrc,price: 0,category: dummyCategory,subCategory: null,sideItemSet: [],optionSet: [],allergen: ''};

// allergens
let allergen: string[] = [];
if (item.allergen != null && item.allergen.length > 0) {
	const temp = item.allergen.split(',').map((x) => allergens.filter((y) => y.letter === x)[0]);
	allergen = temp.filter((x) => x !== undefined).map((x) => x.name);
}
// input fields
const imageEdited: Ref<File | null> = ref(null);
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
const imageData = {imageEdited,src}
const categories = ref(restaurant.categorySet);
const allItems = restaurant.itemSet;

const selectedAllergens = ref<string[]>(allergen); // Refference  to the list of allergens for the current item
const options = ref(item.optionSet);

// function that triggers a category change
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
// pop-up initialization
const addOptionPopUp = ref(false);
const delteteOptionPopUp = ref(false);
const editOptionPopUp = ref(false);
const addChoicePopUp = ref(false);
const deleteItemPopUp = ref(false);
const nameNeededPopUp = ref(false);

const optionNameField = ref('');
const optionDescriptionField = ref('');
const optionMandatory = ref(false);
const selectedOption = ref(0);
const selectedOptionName = ref('');
const choiceName = ref('');
const choiceDescription = ref('');

let newChoiceId = -1;
let newOptionId = -1;
// funtion to handle addChoice emit
const handleAddChoiceEmit = (optionId: number) => {
	addChoicePopUp.value = true;
	choiceDescription.value = '';
	choiceName.value = '';
	selectedOption.value = optionId;
};
// funtion to trigger addChoice
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
// funtion to handle EditOption emit
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
// funtion to trigger EditOption
function handleEditOption() {
	const option = options.value.find((x) => x.id === selectedOption.value);
	if (option) {
		option.name = optionNameField.value;
		option.description = optionDescriptionField.value;
		option.mandatory = optionMandatory.value;
	}
	editOptionPopUp.value = false;
}
// funtion to handle DeleteOption emit
const handleDeleteOptionEmit = (optionId: number) => {
	selectedOption.value = optionId;
	delteteOptionPopUp.value = true;
	const currentOption = options.value.find((x) => x.id === optionId);
	if (currentOption) {
		selectedOptionName.value = currentOption.name;
	}
};
// funtion to delete an option
function handleDeleteOption() {
	const index = options.value.findIndex((x) => x.id === selectedOption.value);
	if (index !== -1) {
		options.value.splice(index, 1);
	}
	delteteOptionPopUp.value = false;
}

// funtion to add an option
function handleAddOption() {
	const x: Option = {id: newOptionId,name: optionNameField.value,description: optionDescriptionField.value,mandatory: optionMandatory.value,choiceSet: [],};
	newOptionId -= 1;
	addOptionPopUp.value = false;
	options.value.push(x);
}

// funtion to handle DeleteItem
function handleDeleteItem() {
	disableButtons.value=true
	itemStore.deleteGetter.push(props.itemId);
	fetchHelper('/api/items/delete',props.itemId)
	openNotification(translations[computedLanguageId.value].itemWasSuccessfullyDeleted,translations[computedLanguageId.value].youWillBeRedirectedNow);
	setTimeout(() => {window.close();}, 2000);
}
// funtion to handle addOption
function addOption() {
	optionDescriptionField.value = '';
	optionNameField.value = '';
	optionMandatory.value = false;
	addOptionPopUp.value = true;
}

// funtion to handle DeleteChoice emit
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
// funtion to handle EditChoice emit
const handleEditChoiceEmit = (choiceId: number,optionId: number,name: string,description: string) => {
	const option = options.value.find((x) => x.id === optionId);
	if (option) {
		const choice = option.choiceSet.find((x) => x.id === choiceId);
		if (choice) {
			choice.name = name;
			choice.description = description;
		}
	}
};
// function to make a deep copy of a subcategory
function SubCategoryDeepCopy(x: SubCategory) {
	const newSubCategory: SubCategory = {name: x.name,description: x.description,imageUrl: x.imageUrl,presentationOrder: x.presentationOrder,id: x.id,};
	return newSubCategory;
}
// function to make a deep copy of a category
function CategoryDeepCopy(x: Category) {
	const newSubCategorySet: SubCategory[] = x.subCategorySet.map((y) => SubCategoryDeepCopy(y));
	const newCategory: Category = {name: x.name,description: x.description,imageUrl: x.imageUrl,presentationOrder: x.presentationOrder,id: x.id,subCategorySet: newSubCategorySet,};
	return newCategory;
}
// function to make a deep copy of a choice
function ChoiceDeepCopy(x: Choice) {
	const newChoice: Choice = { name: x.name, description: x.description, id: x.id };
	return newChoice;
}
// function to make a deep copy of a option
function OptionDeepCopy(x: Option) {
	const newChoiceSet: Choice[] = x.choiceSet.map((y) => ChoiceDeepCopy(y));
	const newChoice: Option = {name: x.name,description: x.description,id: x.id,mandatory: x.mandatory,choiceSet: newChoiceSet,};
	return newChoice;
}
// function that cancels the addition of an item
const cancelButton = () => {
	window.close();
};
// function that triggers the delete pop-up
const deleteButton = () => {
	deleteItemPopUp.value = true;
};
// function that adds or edits an item
const saveButton = async () => {
	if(name.value===""){
		openNotification(translations[computedLanguageId.value].youHaveNotInsertedNameItem,translations[computedLanguageId.value].pleaseAddNameItem)
		return
	}
	if(!category.value){
		openNotification(translations[computedLanguageId.value].youHaveNotSelectedCategoryItem,translations[computedLanguageId.value].pleaseAddCategoryItem)
		return
	}
	disableButtons.value=true
	if (props.addItem) {
		item.name = name.value;
		item.description = description.value;
		item.longDescription = longDescription.value;
		item.optionSet = options.value;
		item.price = price.value;
		const auxAllergen = selectedAllergens.value.length > 0 ? selectedAllergens.value.map(x => allergens.find(y=>y.name===x)).map(x=>x?.letter).reduce((res,x) => {if(x) return res+','+x; else return res;}) : undefined
		if(auxAllergen) item.allergen =auxAllergen
		else item.allergen='' 
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
		// photo uploaded case
		if(imageEdited.value){
			item.imageUrl=defaultSrc
		}
		
		/// add item to database
		const response = await fetchHelper('/api/items/add', {item,id:restaurant.id})
		item.id=parseInt(response.data.value as string)
		/// add option to database
		for (const option of item.optionSet) {
			const response = await fetchHelper('/api/options/add', {option,id:restaurant.id})
			option.id=parseInt(response.data.value as string)
			/// add choices to database
			for (const choice of option.choiceSet)
				await fetchHelper('/api/choice/add', {choice,id:option.id})
			
			await fetchHelper('/api/items/addOption', {item:item.id,option:option.id})
		}

		// photo uploaded case
		if(imageEdited.value){
			const formData = new FormData();
			formData.append('file', imageEdited.value);
			formData.append('id', item.id.toString())
			await useFetch(`/api/photos/photoItem`, {method: 'POST',body: formData,});
			item.imageUrl=src.value
		}
		
		// add item to store
		restaurant.itemSet.push(item);
		itemStore.itemGetter.push(item);
		openNotification(translations[computedLanguageId.value].itemWasSuccessfullyAdded,translations[computedLanguageId.value].youWillBeRedirectedNow);
	} else {
		const realItem = restaurant.itemSet.filter((x) => x.id === props.itemId)[0];
		realItem.name = name.value;
		realItem.description = description.value;
		realItem.longDescription = longDescription.value;
		const auxAllergen=selectedAllergens.value.length > 0?selectedAllergens.value.map(x => allergens.find(y=>y.name===x)).map(x=>x?.letter).reduce((res,x) => {if(x) return res+','+x; else return res;}) : undefined
		if(auxAllergen) realItem.allergen =auxAllergen
		else realItem.allergen=""
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
		// photo uploaded case
		if(imageEdited.value){
			realItem.imageUrl=defaultSrc
		}
		realItem.presentationOrder = presentationOrder.value;
		
		// update item in the database
		await fetchHelper('/api/items/edit',realItem)
		
		for (const option of options.value) {
			if(option.id<0){
				const response = await fetchHelper('/api/options/add', {option,id:restaurant.id})
				option.id=parseInt(response.data.value as string)
				/// add choices to database
				for (const choice of option.choiceSet)
					await fetchHelper('/api/choice/add', {choice,id:option.id})
				await fetchHelper('/api/items/addOption', {item:item.id,option:option.id})
			}else{
				const realOption=realItem.optionSet.find(x=>x.id===option.id)
				if(realOption){
					if(option.name!==realOption.name||option.description!==realOption.description)
						await fetchHelper('/api/options/edit', option)
					for (const choice of option.choiceSet){
						if(choice.id<0)
							await fetchHelper('/api/choice/add', {choice,id:option.id})
						else{
							const realChoice=realOption.choiceSet.find(x=>x.id===choice.id)
							if(realChoice&&(choice.name!==realChoice.name||choice.description!==realChoice.description))
								await fetchHelper('/api/choice/edit', choice)
						}
					}
					for(const realChoice of realOption.choiceSet){
						const choice=option.choiceSet.find(x=>x.id===realChoice.id)
						if(!choice) await fetchHelper('/api/choice/delete', realChoice.id)
					}
				}
			}
		}
		for(const realOption of realItem.optionSet){
			const option=options.value.find(x=>x.id===realOption.id)
			if(!option) await fetchHelper('/api/option/delete', realOption.id)
		}
		
		realItem.optionSet = options.value;
		// photo uploaded case
		if(imageEdited.value){
			const formData = new FormData();
			formData.append('file', imageEdited.value);
			formData.append('id', realItem.id.toString())
			await useFetch(`/api/photos/photoItem`, {method: 'POST',body: formData,});
			realItem.imageUrl=src.value
		}

		// add item to store
		itemStore.itemGetter.push(realItem);
		openNotification(translations[computedLanguageId.value].itemWasSuccessfullyEdited,translations[computedLanguageId.value].youWillBeRedirectedNow);
	}
	setTimeout(() => {window.close();}, 2000);
};
// function that opens the add category page
const addCategory = () => {
	window.open('/editCategoryView', '_blank');
};
// function that opens the edit category page
const editCategory = () => {
	if (category.value) {
		window.open(`/editCategoryView/${category.value}`, '_blank');
	}
};
// function that handles a storage update
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
// function that adds a listener for the storage
onMounted(() => {
	window.addEventListener('storage', handleStorageEvent);
});
// function that removes the listener for the storage
onUnmounted(() => {
	window.removeEventListener('storage', handleStorageEvent);
});
// function that notifies the user
const openNotification = (notifTitle: string, notifBody: string) => {
	ElNotification({
		title: notifTitle,
		message: h(
			'div',
			{ style: 'color: #ed5087; font-family: "Open Sans"' },
			notifBody,
		),
		customClass: 'notif',
	});
};
// function that requests a short ai description
async function addAiShortDescription() {
	await addAiDescription('150', true);
}
// function that requests a long ai description
async function addAiLongDescription() {
	await addAiDescription('250', false);
}
// function that gets an ai description
async function addAiDescription(neededLength: string, short: boolean) {
	if (name.value.length === 0) {
		nameNeededPopUp.value = true;
	} else {
		if (short) 
			description.value = 'The new description is loading...';
		else
			longDescription.value = 'The new description is loading...';
		const requestBody = {itemName: name.value,length: neededLength,target: 'an item',};
		const response = await useFetch(`/api/autocompletion/getAutocompletion`, {method: 'POST',body: requestBody,headers: {'Content-Type': 'application/json',},});

		if (short) {
			description.value = response.data.value;
		} else {
			longDescription.value = response.data.value;
		}
	}
}
/// function to handle the upload of a image to a item
function handleFileUpload(data: any, event: any) {
	const imageEdited=data.imageEdited
	const src=data.src
	const file = event.target.files[0];
	event.target.value = null;
  	if(!file||!acceptedTypes.includes(file.type)){
		openNotification(translations[computedLanguageId.value].wrongImageType,translations[computedLanguageId.value].pleaseTryDifferentFile	)
		return
	}
	else imageEdited.value=file
	
	const reader = new FileReader();
	reader.onload = (event) => {
		if(event.target){
			const x = event.target.result;
			if(typeof x === "string")
			src.value=x
			else 
				openNotification(translations[computedLanguageId.value].somethingWentWrong,translations[computedLanguageId.value].pleaseTryDifferentFile	)
		}
		else 
			openNotification(translations[computedLanguageId.value].somethingWentWrong,translations[computedLanguageId.value].pleaseTryDifferentFile	)
	};
	if(imageEdited.value)
		reader.readAsDataURL(imageEdited.value);
	else 
		openNotification(translations[computedLanguageId.value].somethingWentWrong,translations[computedLanguageId.value].pleaseTryDifferentFile	)	
}
// Function to delete the selected image for a item
function deleteImg(){
	imageEdited.value=null
	src.value=defaultSrc
}

</script>
<template>
	<title v-if="addItem">{{translations[computedLanguageId].addAnItem}}</title>
	<title v-else> {{translations[computedLanguageId].editAnItem}}</title>
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
		<page-title v-if="addItem" :title="translations[computedLanguageId].addAnItem" />
		<page-title v-else :title="translations[computedLanguageId].editAnItem" />
		<div class="bottom">
			<div class="left">
				<div class="elementLeft">
					<div class="box">
						<div style="height: 40%; width: 100%">
							<div id="item-name" class="fieldText">
								{{ translations[computedLanguageId].name }}
							</div>
							<input id="item-name-field" v-model="name" class="specialInput" style="height: 56.25%" />
						</div>
					</div>
				</div>
				<div class="elementLeft">
					<div class="box" style="">
						<div class="div" style="display: flex; align-items: center">
							<div id="item-description" class="fieldText" style="width: 30%; padding-bottom: 0.9%">
								{{ translations[computedLanguageId].description }}
							</div>

							<el-button id="item-ai-description" class="aiButton" @click="addAiShortDescription"
								>✨{{ translations[computedLanguageId].writeAi }}</el-button
							>
						</div>
						<textarea id="item-description-field" v-model="description" class="specialTextArea"></textarea>
					</div>
				</div>
				<div class="elementLeft">
					<div class="box">
						<div id="item-category" class="fieldText">
							{{ translations[computedLanguageId].category }}
						</div>
						<el-select
							id="item-category-select"
							v-model="category"
							class="special-select-item"
							:placeholder="translations[computedLanguageId].select"
							filterable
							@change="changeCategory"
						>
							<el-option
								v-for="categoryOption in categories"
								:label="categoryOption.name"
								:value="categoryOption.id"
							/>
						</el-select>
						<el-button id="item-add-category" class="specialAddButton" @click="addCategory">{{
							translations[computedLanguageId].addCategory
						}}</el-button>
					</div>
				</div>
				<div class="elementLeft">
					<div class="box">
						<div id="item-subcategory" class="fieldText">
							{{ translations[computedLanguageId].subcategory }}
						</div>
						<el-select
							id="item-subcategory-select"
							v-model="subCategory"
							class="special-select-item"
							filterable
							clearable
							:class="{ 'disabled-element': disableSubCateg }"
							:placeholder="translations[computedLanguageId].noSubcategory"
						>
							<el-option
								v-for="subCategoryOption in subCategories"
								:label="subCategoryOption.name"
								:value="subCategoryOption.id"
							/>
						</el-select>
						<el-button id="item-add-subcategory" class="specialAddButton" @click="editCategory">{{
							translations[computedLanguageId].addSubcategory
						}}</el-button>
					</div>
				</div>
				<div class="elementLeft">
					<div class="box" style="">
						<el-button
							v-if="props.addItem"
							id="item-cancel-button"
							class="specialExitButton"
							:class="{ 'disabled-element': disableButtons }"
							@click="cancelButton"
							>Cancel</el-button
						>
						<el-button
							v-else
							id="item-delete-button"
							class="specialExitButton"
							:class="{ 'disabled-element': disableButtons }"
							@click="deleteButton"
							>{{ translations[computedLanguageId].delete }}</el-button
						>
					</div>
				</div>
			</div>
			<div class="middle">
				<div class="elementLeft">
					<div class="box" style="padding-left: 0%">
						<div style="height: 40%; width: 100%">
							<div id="item-sidedishes" class="fieldText">
								{{ translations[computedLanguageId].sideDishes }}
							</div>
							<el-select
								v-model="sideItems"
								class="special-multiple-select-item special-select-item"
								multiple
								:placeholder="translations[computedLanguageId].select"
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
					<div id="item-options" class="fieldText">
						{{ translations[computedLanguageId].options }}
					</div>
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
								>{{ translations[computedLanguageId].addOption }}</el-button
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
								<div id="item-presentation" class="fieldText">
									{{ translations[computedLanguageId].presentationOrder }}
								</div>
								<input
									id="item-presentation-field"
									v-model="presentationOrder"
									class="specialInput"
									style="height: 56.25%; width: 80%"
								/>
							</div>
						</div>
						<div style="width: 36.5%; height: 100%; display: flex; align-items: center">
							<div style="height: 40%; width: 100%">
								<div id="item-price" class="fieldText">
									{{ translations[computedLanguageId].price }}
								</div>
								<input id="item-price-field" v-model="price" class="specialInput" style="height: 56.25%; width: 67%" />
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
								{{ translations[computedLanguageId].longDescription }}
							</div>
							<el-button
								id="item-ai-long-description"
								class="aiButton"
								style="height: 45%"
								@click="addAiLongDescription"
								>✨{{ translations[computedLanguageId].writeAi }}
							</el-button>
						</div>
						<textarea id="item-long-description-field" v-model="longDescription" class="specialTextArea"></textarea>
					</div>
				</div>
				<div class="elementLeft">
					<div class="box" style="">
						<div id="item-photo" class="fieldText">
							{{ translations[computedLanguageId].photo }}
						</div>
						<div style="width: 92%; height: 90%; display: flex">
							<el-image :src="src" style="width: 35%; height: 100%; border-radius: 40px" />
							<div class="photoButtonSpace">
								<label for="changePhotoLogo" class="specialPhotoLabel">{{
									translations[computedLanguageId].change
								}}</label>
								<input
									id="changePhotoLogo"
									type="file"
									style="display: none"
									@change="handleFileUpload(imageData, $event)"
								/>
								<el-button id="item-photo-delete" class="specialPhotoButton" @click="deleteImg">{{
									translations[computedLanguageId].delete
								}}</el-button>
							</div>
						</div>
					</div>
				</div>
				<div class="elementLeft">
					<div class="box" style="justify-content: center">
						<div id="item-allergens" class="fieldText">
							{{ translations[computedLanguageId].alergens }}
						</div>
						<el-select
							id="item-allergens-select"
							v-model="selectedAllergens"
							class="special-select-item"
							multiple
							collapse-tags
							filterable
							default-first-option
							:reserve-keyword="false"
							:placeholder="translations[computedLanguageId].pleaseInputAlergens"
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
							:class="{ 'disabled-element': disableButtons }"
							style="width: 39.325%"
							@click="saveButton"
						>
							{{ translations[computedLanguageId].save }}
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
						<div class="choiceFieldText">{{ translations[computedLanguageId].addOption }}</div>
					</div>
				</template>
				<div style="width: 100%; height: 70%">
					<div style="width: 100%; height: 100%; padding-left: 15%">
						<div class="choiceFieldText">{{ translations[computedLanguageId].name }}</div>
						<input v-model="optionNameField" class="specialOptionInput" />
						<div class="choiceFieldText">{{ translations[computedLanguageId].description }}</div>
						<textarea v-model="optionDescriptionField" class="specialOptionTextArea"></textarea>
						<div class="choiceFieldText">
							<el-checkbox
								v-model="optionMandatory"
								class="option-checkbox"
								:label="translations[computedLanguageId].mandatory"
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
					<el-button class="choice-edit-popup-button" @click="handleAddOption()">{{
						translations[computedLanguageId].addOption
					}}</el-button>
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
					{{ translations[computedLanguageId].areYouSureYouWantToDelete }} "{{
						selectedOptionName
					}}"?
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
					<el-button class="choice-delete-popup-button" @click="handleDeleteOption()">{{
						translations[computedLanguageId].yes
					}}</el-button>
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
					{{ translations[computedLanguageId].areYouSureYouWantToDelete }} "{{ item.name }}"?
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
						<div class="choiceFieldText">{{ translations[computedLanguageId].addAChoice }}</div>
					</div>
				</template>
				<div style="width: 100%; height: 70%">
					<div style="width: 100%; height: 100%; padding-left: 15%">
						<div class="choiceFieldText">{{ translations[computedLanguageId].name }}</div>
						<input v-model="choiceName" class="specialChoiceInput" />
						<div class="choiceFieldText">{{ translations[computedLanguageId].description }}</div>
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
					<el-button class="choice-edit-popup-button" @click="handleAddChoice()">{{
						translations[computedLanguageId].addChoice
					}}</el-button>
				</div>
			</el-dialog>
		</Teleport>
		<Teleport to="body">
			<el-dialog v-model="editOptionPopUp" class="option-edit-popup">
				<template #header>
					<div class="my-header">
						<div class="choiceFieldText">{{ translations[computedLanguageId].editAnOption }}</div>
					</div>
				</template>
				<div style="width: 100%; height: 70%">
					<div style="width: 100%; height: 100%; padding-left: 15%">
						<div class="choiceFieldText">{{ translations[computedLanguageId].name }}</div>
						<input v-model="optionNameField" class="specialOptionInput" />
						<div class="choiceFieldText">{{ translations[computedLanguageId].description }}</div>
						<textarea v-model="optionDescriptionField" class="specialOptionTextArea"></textarea>
						<div class="choiceFieldText">
							<el-checkbox
								v-model="optionMandatory"
								class="option-checkbox"
								:label="translations[computedLanguageId].mandatory"
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
					<el-button class="option-edit-popup-button" @click="handleEditOption()">{{
						translations[computedLanguageId].updateOption
					}}</el-button>
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

.specialPhotoLabel {
	border-radius: 25px;
	font-size: 1vw;
	border: 1px solid #ed5087;
	background-color: white;
	color: #ed5087;
	width: 50%;
	height: 30%;
	margin-left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
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
.aiButton:hover,
.specialAddButton:hover,
.specialPhotoButton:hover {
	background-color: #ed5087;
	border-color: #ed5087;
	color: white;
}
.specialPhotoLabel:hover {
	background-color: #ed5087;
	border-color: #ed5087;
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
