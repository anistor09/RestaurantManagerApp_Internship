<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRestaurantStore } from '../store/restaurant';
import { useCategoryStore } from '../store/category';
import { useLanguageStore } from '../store/language';
import translations from '../mockData/translations.json';
import PageTitle from '../components/page-title.vue';
import { SubCategory } from '../interfaces/SubCategory';
import NameNeededPopUp from '../components/nameNeededPopUp.vue';
import { ImageWrapper } from '~/interfaces/ImageWrapper';

const languageStore = useLanguageStore();

const computedLanguageId = computed(() => languageStore.idGetter);
// Retrieve the restaurant store and category store
const restaurantStore = useRestaurantStore();
const restaurant = restaurantStore.restaurantGetter;
const categoryStore = useCategoryStore();
const acceptedTypes = ['image/jpeg', 'image/png'];

// Set the default source for any image
const defaultSrc =
	'https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png';
// Define props for the component
const props = defineProps({
	addCategory: Boolean,
	categoryId: {
		type: Number,
		default: -1,
	},
});
// Define reactive variables using the ref function
const name = ref('');
const selectedFile: Ref<File | null> = ref(null);
const imageEdited: Ref<File | null> = ref(null);
const description = ref('');
const src = ref(defaultSrc);
const categoryImageData={imageEdited:selectedFile,src}
const hasSubcategories = ref(false);
const presentationOrder = ref(0);
const subCategories: Ref<SubCategory[]> = ref([]);
const imageSubCategories: Ref<ImageWrapper[]> = ref([]);
const newSubcategoryName = ref('');
const newSubcategoryDescription = ref('');
const addSubcategoryPopUp = ref(false);
const presentationSubcategoryOrder = ref(0);
const newSubcategorySrc = ref(defaultSrc);
const subcategoryImageData={imageEdited,src:newSubcategorySrc}
const editSubcategory = ref(false);
const editedSubcategoryId = ref(0);
const tobeDeletedSubcat: Ref<number[]> = ref([]);
const toBeEditedSubcat: Ref<Set<number>> = ref(new Set<number>());
const deleteSubcategoryPopup = ref(false);
const deleteCategoryPopup = ref(false);
const deleteSubcatIdLocally = ref(-1);
const nameNeededPopUp = ref(false);
const disableButtons = ref(false);

if (props.addCategory === false) {
	const category = restaurant.categorySet.filter((x) => x.id === props.categoryId)[0];
	name.value = category === undefined ? '' : category.name;
	description.value = category === undefined ? '' : category.description;
	src.value = category === undefined ? defaultSrc : category.imageUrl;
	presentationOrder.value = category === undefined ? 0 : category.presentationOrder;
	if (category.subCategorySet !== undefined)
		if (category.subCategorySet.length > 0) {
			subCategories.value = category.subCategorySet;
			imageSubCategories.value = category.subCategorySet.map((x) => {
				const rez: ImageWrapper = { id: x.id, img: null };
				return rez;
			});
			hasSubcategories.value = true;
		}
}

/// function to handle the upload of a image to a item
function handleFileUpload(data: any, event: any) {
	const imageEdited=data.imageEdited
	const src=data.src
	const file = event.target.files[0];
	event.target.value = null;
  	if(!file||!acceptedTypes.includes(file.type)){
		openNotification(translations[computedLanguageId.value].wrongImageType,translations[computedLanguageId.value].pleaseTryDifferentFile)
		return
	}
	else imageEdited.value=file
	
	const reader = new FileReader();
	reader.onload = (event) => {
		if (event.target) {
			const x = event.target.result;
			if(typeof x === "string")
			src.value=x
			else 
				openNotification(translations[computedLanguageId.value].somethingWentWrong,translations[computedLanguageId.value].pleaseTryDifferentFile)
		}
		else 
			openNotification(translations[computedLanguageId.value].somethingWentWrong,translations[computedLanguageId.value].pleaseTryDifferentFile)
	};
	if(imageEdited.value)
		reader.readAsDataURL(imageEdited.value);
	else 
		openNotification(translations[computedLanguageId.value].somethingWentWrong,translations[computedLanguageId.value].pleaseTryDifferentFile)	
}

// Function to delete the selected image for a category
function deleteImg() {
	selectedFile.value = null;
	src.value = defaultSrc;
}

// Function to delete the selected image for a subcategory
function deleteImgSubCategory() {
	imageEdited.value = null;
	newSubcategorySrc.value = defaultSrc;
}

// Function to display a notification
const openNotification = (notifTitle: string, notifBody: string) => {
	ElNotification({
		title: notifTitle,
		message: h('div',{ style: 'color: #ed5087; font-family: "Open Sans"' },notifBody,),
		customClass: 'notif',
	});
};
// Function to generate a unique ID for a subcategory
const getUniqueId = () => {
	const oldIds = subCategories.value.map((x) => x.id);
	let found = false;
	let newId = -1;
	while (!found) {
		newId = Math.floor(Math.random() * -1001);
		if (oldIds.filter((y) => y === newId).length === 0) found = true;
	}
	return newId;
};
// Function to save a new subcategory locally
function saveNewSubcategoryLocally() {
	if(newSubcategoryName.value===""){
		openNotification(translations[computedLanguageId.value].youHaveNotInsertedNameSubcategory,translations[computedLanguageId.value].pleaseAddNameSubcategory)
		return
	}
	if (editSubcategory.value) {
		editSubcategoryLocally();
	} else {
		const newSubcategory: SubCategory = {
			id: getUniqueId(),
			name: newSubcategoryName.value,
			description: newSubcategoryDescription.value,
			presentationOrder: presentationSubcategoryOrder.value,
			imageUrl: newSubcategorySrc.value,
		};
		subCategories.value.push(newSubcategory);
		const aux: ImageWrapper = { id: newSubcategory.id, img: imageEdited.value };
		imageSubCategories.value.push(aux);

		addSubcategoryPopUp.value = false;
		refreshDetails();
	}
}
// Function to delete a subcategory locally
function deleteSubcategoryLocally(idSubcat: number) {
	addSubcategoryPopUp.value = false;
	deleteSubcategoryPopup.value = false;
	subCategories.value = subCategories.value.filter((x) => x.id !== idSubcat);
	imageSubCategories.value = imageSubCategories.value.filter((x) => x.id !== idSubcat);
	if (idSubcat >= 0) {
		tobeDeletedSubcat.value.push(idSubcat);
	}
	refreshDetails();
}
// Function to edit a subcategory locally
function editSubcategoryLocally() {
	const positionSubCat = subCategories.value.findIndex((x) => x.id === editedSubcategoryId.value);

	subCategories.value.splice(positionSubCat, 1, {
		id: editedSubcategoryId.value,
		name: newSubcategoryName.value,
		description: newSubcategoryDescription.value,
		presentationOrder: presentationSubcategoryOrder.value,
		imageUrl: newSubcategorySrc.value,
	});
	const aux = imageSubCategories.value.find((x) => x.id === editedSubcategoryId.value);
	if (aux) {
		aux.img = imageEdited.value;
	}
	if (editedSubcategoryId.value >= 0) {
		toBeEditedSubcat.value.add(editedSubcategoryId.value);
	}
	refreshDetails();
	editSubcategory.value = false;
}
// Refreshes the details of the category by resetting the new subcategory fields and hiding the add subcategory popup
function refreshDetails() {
	newSubcategoryName.value = '';
	newSubcategoryDescription.value = '';
	newSubcategorySrc.value = defaultSrc;
	imageEdited.value = null;
	presentationSubcategoryOrder.value = 0;
	addSubcategoryPopUp.value = false;
	hasSubcategoriesFct();
}
function hasSubcategoriesFct() {
	if (subCategories.value.length > 0) {
		hasSubcategories.value = true;
	}
}
// Handles the addition or editing of a subcategory.
async function handleAddEditSubcategory(subcategory: SubCategory, cid: number, editMode: boolean) {
	const requestBody = {
		name: subcategory.name,description: subcategory.description,presentationOrder: subcategory.presentationOrder,imageUrl: subcategory.imageUrl,categoryId: cid,
		restaurant: {id: restaurant.id,name: restaurant.name,latitude: restaurant.latitude,imageUrl: restaurant.imageUrl,longitude: restaurant.longitude,rating: restaurant.rating,category: restaurant.category,backgroundColor: restaurant.backgroundColor,foregroundColor: restaurant.foregroundColor,font_color: restaurant.font_color,description: restaurant.description,logoUrl: restaurant.logoUrl,addresse: restaurant.addresse,phoneNumber: restaurant.phoneNumber,email: restaurant.email,averageWaitingTime: 0}
	};
	const aux = imageSubCategories.value.filter((x) => x.id === subcategory.id)[0];
	if (aux.img) requestBody.imageUrl = '';
	if (!editMode) {
		const response = await useFetch('/api/subcategory/add', {watch:false, method: 'POST',body: requestBody,headers: {'Content-Type': 'application/json',},});
		const newId = response.data.value;
		if (aux.img && newId) {
			const formData = new FormData();
			formData.append('file', aux.img);
			formData.append('id', newId.toString());
			await useFetch(`/api/photos/photoSubCategory`, {watch:false, method: 'POST',body: formData,});
		}
	} else {
		const putBody = {requestBody,sid: subcategory.id,};
		await useFetch('/api/subcategory/update', {watch:false,method: 'PUT',body: putBody,headers: {'Content-Type': 'application/json',},});

		if (aux.img) {
			const formData = new FormData();
			formData.append('file', aux.img);
			formData.append('id', subcategory.id.toString());
			await useFetch(`/api/photos/photoSubCategory`, {watch:false, method: 'POST',body: formData,});
		}
	}
}
// Changes the selected subcategory for editing.
const changeSubcategory = (idSubcat: number) => {
	const editedSubcategory = subCategories.value.filter((x) => x.id === idSubcat)[0];

	newSubcategoryName.value = editedSubcategory === undefined ? '' : editedSubcategory.name;
	newSubcategoryDescription.value =
		editedSubcategory === undefined ? '' : editedSubcategory.description;
	newSubcategorySrc.value =
		editedSubcategory === undefined ? defaultSrc : editedSubcategory.imageUrl;
	imageEdited.value = imageSubCategories.value.filter((x) => x.id === idSubcat)[0].img;
	presentationSubcategoryOrder.value =
		editedSubcategory === undefined
			? subCategories.value.length
			: editedSubcategory.presentationOrder;
	addSubcategoryPopUp.value = true;
	editedSubcategoryId.value = idSubcat;
	editSubcategory.value = true;
};
// Handles the deletion of a subcategory.
async function handleDeleteSubcategory(idSubcat: number) {
	const requestBody = {id: idSubcat,};
	await useFetch('/api/subcategory/delete', {method: 'DELETE',body: requestBody,headers: {'Content-Type': 'application/json',},});
	addSubcategoryPopUp.value = false;
	subCategories.value = subCategories.value.filter((x) => x.id !== idSubcat);
	hasSubcategoriesFct();
}
// Handles the subcategories of a category.
async function handleSubcategories(categoryId: number) {
	for (const subcategory of subCategories.value) {
		if (subcategory.id < 0) {
			await handleAddEditSubcategory(subcategory, categoryId, false);
		}
	}
	for (const toDeleteId of tobeDeletedSubcat.value) {
		await handleDeleteSubcategory(toDeleteId);
	}
	for (const toEditId of toBeEditedSubcat.value) {
		const editedSubcategory = subCategories.value.filter((x) => x.id === toEditId)[0];
		await handleAddEditSubcategory(editedSubcategory, categoryId, true);
	}
}
// Handles the addition or editing of a category.
async function handleAddEditCategory() {
	if(name.value===""){
		openNotification(translations[computedLanguageId.value].youHaveNotInsertedNameCategory,translations[computedLanguageId.value].pleaseAddNameCategory)
		return
	}
	disableButtons.value = true
	const requestBody = {
		name: name.value,description: description.value,presentationOrder: presentationOrder.value,imageUrl: src.value,
		restaurant: {id: restaurant.id,name: restaurant.name,imageUrl: restaurant.imageUrl,latitude: restaurant.latitude,longitude: restaurant.longitude,rating: restaurant.rating,category: restaurant.category,foregroundColor: restaurant.foregroundColor,backgroundColor: restaurant.backgroundColor,font_color: restaurant.font_color,description: restaurant.description,logoUrl: restaurant.logoUrl,addresse: restaurant.addresse,phoneNumber: restaurant.phoneNumber,email: restaurant.email,averageWaitingTime: 0,},
	};
	if (selectedFile.value) requestBody.imageUrl = '';
	if (props.addCategory) {
		const response = await useFetch('/api/category/add', {watch:false,method: 'POST',body: requestBody,headers: {'Content-Type': 'application/json',},});
		const categoryId = response.data.value;
		if (categoryId != null) {
			categoryStore.categoryGetter.push({
				id: categoryId,
				name: name.value,
				description: description.value,
				presentationOrder: presentationOrder.value,
				imageUrl: src.value,
				subCategorySet: subCategories.value,
			});
		}
		if (selectedFile.value) {
			const formData = new FormData();
			formData.append('file', selectedFile.value);
			formData.append('id', categoryId?.toString() as string);
			await useFetch(`/api/photos/photoCategory`, {watch:false,method: 'POST',body: formData,});
			
		}
		if (categoryId !== null) await handleSubcategories(categoryId);
		openNotification(translations[computedLanguageId.value].categoryWasSuccessfullyAdded,translations[computedLanguageId.value].youWillBeRedirectedNow);
	} else {
		const putBody = {requestBody,cid: props.categoryId,};
		await useFetch('/api/category/update', {watch:false,method: 'PUT',body: putBody,headers: {'Content-Type': 'application/json',},});
		if (props.categoryId !== undefined) {
			const index = categoryStore.categoryGetter.findIndex((x) => x.id === props.categoryId);
			categoryStore.categoryGetter.splice(index, 1, {
				id: props.categoryId,
				name: name.value,
				description: description.value,
				presentationOrder: presentationOrder.value,
				imageUrl: src.value,
				subCategorySet: subCategories.value,});
		}
		if (selectedFile.value && props.categoryId) {
			const formData = new FormData();
			formData.append('file', selectedFile.value);
			formData.append('id', props.categoryId.toString());
			await useFetch(`/api/photos/photoCategory`, {method: 'POST',body: formData,});
		}
		if (props.categoryId !== undefined) await handleSubcategories(props.categoryId);
		openNotification(translations[computedLanguageId.value].categoryWasSuccessfullyEdited,translations[computedLanguageId.value].youWillBeRedirectedNow);
	}
	setTimeout(() => {window.close();}, 2000);
}
// Opens a popup to confirm deleting a subcategory locally.
function popUpDeleteSubcategoryLocally(subcatid: number) {
	deleteSubcatIdLocally.value = subcatid;
	deleteSubcategoryPopup.value = true;
}
// Handles the deletion of a category.
async function handleDeleteCategory() {
	disableButtons.value=true
	if(restaurant.itemSet.filter(x=>x.category.id===props.categoryId).length>0){
		openNotification(translations[computedLanguageId.value].categoryCannotBeDeleted,translations[computedLanguageId.value].deleteAllItemAssigned)
		setTimeout(() => {window.close();}, 3000);
		return 
	}
	for (const subcategory of subCategories.value) {
		await handleDeleteSubcategory(subcategory.id);
	}
	const requestBody = {
		id: props.categoryId,
	};
	await useFetch('/api/category/delete', {method: 'DELETE',body: requestBody,headers: {'Content-Type': 'application/json',},});
	if (props.categoryId) categoryStore.deleteGetter.push(props.categoryId);
	openNotification(translations[computedLanguageId.value].categoryWasSuccessfullyDeleted,translations[computedLanguageId.value].youWillBeRedirectedNow);
	setTimeout(() => {window.close();}, 2000);
}
// Cancels adding a new subcategory.
const cancelNewSubcategory = () => {
	addSubcategoryPopUp.value = false;
	editSubcategory.value = false;
	newSubcategoryName.value = '';
	newSubcategoryDescription.value = '';
	newSubcategorySrc.value = defaultSrc;
	presentationSubcategoryOrder.value = 0;
};
// Computes the filtered subcategories.
const filteredSubcategories = computed(() => {
	const unsortedCategories = subCategories.value;
	return unsortedCategories.sort((a, b) => a.presentationOrder - b.presentationOrder);
});
// Computes if the category has subcategories.
const hasSubcategoriesComputed = computed(() => {
	return hasSubcategories.value;
});
// Adds AI-generated category description.
async function addAiCategoryDescription() {
	await addAiDescription('150', true);
}
// Adds AI-generated subcategory description.
async function addAiSubcategoryDescription() {
	await addAiDescription('80', false);
}
// Adds AI-generated description for category or subcategory.
async function addAiDescription(neededLength: string, forCategory: boolean) {
	if (
		(name.value.length === 0 && forCategory) ||
		(newSubcategoryName.value.length === 0 && !forCategory)
	) {
		nameNeededPopUp.value = true;
	} else {
		let queriedName = '';

		if (forCategory) {
			description.value = 'The new description is loading...';
			queriedName = name.value;
		} else {
			newSubcategoryDescription.value = 'The new description is loading...';
			queriedName = newSubcategoryName.value;
		}
		const requestBody = {itemName: queriedName,length: neededLength,target: 'a category',};
		const response = await useFetch(`/api/autocompletion/getAutocompletion`, {method: 'POST',body: requestBody,headers: {'Content-Type': 'application/json',},});
		if (forCategory) {
			description.value = response.data.value;
		} else {
			newSubcategoryDescription.value = response.data.value;
		}
	}
}
</script>
<template>
	<title v-if="addCategory">{{translations[computedLanguageId].addACategory}}</title>
	<title v-else> {{translations[computedLanguageId].editACategory}}</title>
	<ClientOnly>
		<page-title
			v-if="addCategory"
			:title="translations[computedLanguageId].addCategory"
		></page-title>
		<page-title v-else title="Edit category"></page-title>
		<div class="container">
			<div id="add-Category-Info" class="bottom">
				<ClientOnly>
					<Teleport to="body">
						<NameNeededPopUp
							v-model="nameNeededPopUp"
							:message="'category'"
							@close-no-name="nameNeededPopUp = false"
						></NameNeededPopUp>
					</Teleport>
					<Teleport to="body">
						<el-dialog
							id="add_subcategory_popup"
							v-model="addSubcategoryPopUp"
							width="25%"
							style="border-radius: 5%"
							:before-close="refreshDetails"
						>
							<div class="edit" style="padding-left: 3%">
								<div>
									<div
										id="subcategory-name"
										style="padding-bottom: 1%"
										data-testid="subcategory-name-title"
									>
										{{ translations[computedLanguageId].name }}
									</div>
									<input
										id="subcategory-name-input"
										v-model="newSubcategoryName"
										data-testid="subcategory-name-input"
										class="specialInputSubcategory"
									/>
								</div>
								<div data-testid="subcategory-description-title" style="padding-top: 2%">
									<div class="div" style="display: flex; align-items: center; padding-bottom: 1%">
										<div id="subcategory-description" style="width: 30%; padding-bottom: 0.9%">
											{{ translations[computedLanguageId].descriptionW }}
										</div>

										<el-button class="aiButtonSubcatgory" @click="addAiSubcategoryDescription"
											>✨{{ translations[computedLanguageId].writeAi }}</el-button
										>
									</div>

									<textarea
										id="subcategory-description-input"
										v-model="newSubcategoryDescription"
										data-testid="subcategory-description-input"
										class="specialTextAreaSubcategory"
									></textarea>
								</div>
								<div data-testid="subcategory-presentation-order-title" style="padding-top: 2%">
									<div id="subcategory-presentationorder" style="padding-bottom: 1%">
										{{ translations[computedLanguageId].presentationOrder }}
									</div>
									<input
										v-model.number="presentationSubcategoryOrder"
										data-testid="subcategory-presentationorder-input"
										class="specialInputSubcategory"
									/>
								</div>
								<div
									style="
										width: 100%;
										height: 90%;
										display: flex;
										padding-top: 6%;
										padding-left: 13%;
									"
								>
									<el-image
										:src="newSubcategorySrc"
										style="width: 40%; height: 12vh; border-radius: 40px; object-fit: cover"
									/>
									<div class="photoButtonSpace" style="height: 12vh">
										<label for="changeSubCategoryPhoto" class="specialPhotoLabelSubcategory">{{
											translations[computedLanguageId].change
										}}</label>
										<input
											id="changeSubCategoryPhoto"
											type="file"
											style="display: none"
											@change="handleFileUpload(subcategoryImageData, $event)"
										/>
										<el-button
											class="specialPhotoButtonSubcategory"
											@click="deleteImgSubCategory()"
											>{{ translations[computedLanguageId].delete }}</el-button
										>
									</div>
								</div>
								<div>
									<div id="bottomButtons">
										<el-button
											id="cancelAddEditSubcategory"
											color="#ED5087"
											plain
											round
											@click="cancelNewSubcategory()"
											>{{ translations[computedLanguageId].cancel }}</el-button
										>
										<el-button
											data-testid="save-subcategory-button"
											color="#ED5087"
											plain
											round
											@click="saveNewSubcategoryLocally()"
											>{{ translations[computedLanguageId].save }}</el-button
										>
									</div>
								</div>
							</div>
						</el-dialog>
					</Teleport>
					<Teleport to="body">
						<el-dialog
							id="safetyPopUpDeleteSubcategory"
							v-model="deleteSubcategoryPopup"
							width="20%"
							style="border-radius: 5%"
						>
							<div class="delete">
								{{ translations[computedLanguageId].areYouSureYouWantToDeleteSubCategory }}
								<div id="bottomButtons">
									<el-button color="#ED5087" plain round @click="deleteSubcategoryPopup = false">{{
										translations[computedLanguageId].no
									}}</el-button>
									<el-button
										id="yessafetyPopUpDeleteSubcategory"
										color="#ED5087"
										plain
										round
										@click="deleteSubcategoryLocally(deleteSubcatIdLocally)"
										>{{ translations[computedLanguageId].yes }}</el-button
									>
								</div>
							</div>
						</el-dialog>
					</Teleport>
					<Teleport to="body">
						<el-dialog v-model="deleteCategoryPopup" width="20%" style="border-radius: 5%">
							<div class="delete">
								{{ translations[computedLanguageId].areYouSureYouWantToDeleteCategory }} {{ name }}?
								<div id="bottomButtons">
									<el-button color="#ED5087" plain round @click="deleteCategoryPopup = false">{{
										translations[computedLanguageId].no
									}}</el-button>
									<el-button color="#ED5087" plain round @click="handleDeleteCategory()">{{
										translations[computedLanguageId].yes
									}}</el-button>
								</div>
							</div>
						</el-dialog>
					</Teleport>
				</ClientOnly>
				<div class="left">
					<div class="elementLeft">
						<div class="box">
							<div style="height: 40%; width: 100%">
								<div id="category-name" class="fieldText" style="padding-bottom: 2%">
									{{ translations[computedLanguageId].name }}
								</div>
								<input
									id="input-category-name"
									v-model="name"
									class="specialInput"
									style="height: 56.25%"
								/>
							</div>
						</div>
					</div>
					<div class="elementLeft">
						<div class="box">
							<!-- <div class="fieldText" style="padding-bottom: 2%">Description</div> -->
							<div class="div" style="display: flex; align-items: center">
								<div
									id="category-description"
									class="fieldText"
									style="width: 20%; padding-bottom: 0.9%"
								>
									{{ translations[computedLanguageId].descriptionW }}
								</div>

								<el-button class="aiButton" @click="addAiCategoryDescription"
									>✨{{ translations[computedLanguageId].writeAi }}</el-button
								>
							</div>
							<textarea
								id="input-category-description"
								v-model="description"
								class="specialTextArea"
							></textarea>
						</div>
					</div>
					<div class="elementLeft" style="padding-bottom: 5%">
						<div class="box" style="padding-top: 10%">
							<div class="fieldText" style="padding-bottom: 2%">
								{{ translations[computedLanguageId].photo }}
							</div>
							<div style="width: 92%; height: 90%; display: flex; padding-bottom: 10%">
								<el-image
									:src="src"
									style="width: 35%; height: 15vh; object-fit: cover; border-radius: 40px"
								/>
								<div class="photoButtonSpace" style="padding-top: 0.9%">
									<label for="changeCategoryPhoto" class="specialPhotoLabel">{{
										translations[computedLanguageId].change
									}}</label>
									<input
										id="changeCategoryPhoto"
										type="file"
										style="display: none"
										@change="handleFileUpload(categoryImageData, $event)"
									/>
									<el-button class="specialPhotoButton" @click="deleteImg()">{{
										translations[computedLanguageId].delete
									}}</el-button>
								</div>
							</div>
						</div>
					</div>
					<div class="elementLeft">
						<div class="box" style="">
							<div style="height: 40%; width: 100%">
								<div id="category-orderinmenu" class="fieldText" style="padding-bottom: 2%">
									{{ translations[computedLanguageId].presentationOrder }}
								</div>
								<input
									id="input-category-order"
									v-model="presentationOrder"
									class="specialInput"
									style="height: 56.25%"
								/>
							</div>
						</div>
					</div>

					<div style="padding-top: 7%; display: flex; padding-left: 8%">
						<el-button
							v-if="!props.addCategory"
							id="deleteCategoryButton"
							class="specialExitButton"
							:class="{ 'disabled-element': disableButtons }"
							@click="deleteCategoryPopup = true"
							>{{ translations[computedLanguageId].deleteCategory }}</el-button
						>
					</div>
				</div>
				<div class="right">
					<div class="elementLeft" style="padding-top: 5%; height: 10% !important">
						<div style="width: 100%; height: 90%; display: flex; padding-bottom: 10%">
							<div class="box">
								<div class="fieldText">{{ translations[computedLanguageId].subcategories }}</div>
							</div>
							<div class="box" style="padding-left: 20%">
								<el-button
									id="add-subcategory-button"
									data-testid="add-subcategory"
									color="#ED5087"
									plain
									round
									style="width: 8vw; font-size: 0.8vw; font-weight: bolder"
									@click="addSubcategoryPopUp = true"
									>{{ translations[computedLanguageId].addSubcategory }}</el-button
								>
							</div>
						</div>
					</div>
					<div class="subcategoryWrapper">
						<el-scrollbar id="subcategory-list" style="overflow-x: hidden">
							<div v-if="hasSubcategoriesComputed">
								<div
									v-for="subcategory in filteredSubcategories"
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
											<div class="photoButtonSpace" style="padding-top: 2%">
												<el-button
													data-testid="edit-subcategory"
													class="specialPhotoButton"
													style="margin-bottom: 3vh"
													@click="changeSubcategory(subcategory.id)"
													>{{ translations[computedLanguageId].edit }}</el-button
												>
												<el-button
													id="deleteSubcategory"
													class="specialPhotoButton"
													@click="popUpDeleteSubcategoryLocally(subcategory.id)"
													>{{ translations[computedLanguageId].delete }}</el-button
												>
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
							id="saveCategoryButton"
							class="specialExitButton"
							:class="{ 'disabled-element': disableButtons }"
							@click="handleAddEditCategory()"
							>{{ translations[computedLanguageId].save }}</el-button
						>
						<el-button
							v-else
							id="addSubcategoryButton"
							class="specialExitButton"
							:class="{ 'disabled-element': disableButtons }"
							@click="handleAddEditCategory()"
							>{{ translations[computedLanguageId].save }}</el-button
						>
					</div>
				</div>
			</div>
		</div>
	</ClientOnly>
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

#deleteCategoryButton {
	height: 5vh;
	width: 30%;
}

.subcategoryWrapper {
	height: 69%;
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

.notif {
	font-family: 'Open Sans';
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

.specialInputSubcategory {
	color: black;
	padding-left: 3%;
	padding-right: 3%;
	background-color: #d9d9d9;
	border-radius: 25px;
	font-size: 0.9vw;
	font-weight: normal !important;
	border: none;
	width: 90%;
	height: 22.5%;
}

#bottomButtons {
	display: flex;
	justify-content: space-between;
	position: relative;
	width: 80%;
	left: 7%;
	padding-top: 5%;
}

#bottomButtons .el-button {
	width: 6vw;
	height: 3.5vh;
	font-size: 0.9vw;
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
.specialTextAreaSubcategory::-webkit-scrollbar,
.specialTextArea::-webkit-scrollbar {
	width: 5px;
}

/* .specialTextArea::-webkit-scrollbar-track {
  background-color: #f0f0f0;
} */
/*  
.specialTextArea::-webkit-scrollbar-thumb {
  background-color: #c0c0c0;
  border-radius: 4px;
} */
/*
.specialTextArea::-webkit-scrollbar-thumb:hover {
  background-color: #a0a0a0;
} */

.specialTextAreaSubcategory {
	color: black;
	font-weight: lighter !important;
	padding: 3%;
	font-size: 0.9vw;
	background-color: #d9d9d9;
	border-radius: 25px;
	border: none;
	resize: none;
	width: 90%;
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

.specialPhotoLabel {
	border-radius: 25px;
	font-size: 1vw;
	border: 1px solid #ed5087;
	background-color: white;
	color: #ed5087;
	width: 50%;
	height: 30%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.specialPhotoButtonSubcategory {
	border-radius: 25px;
	font-size: 0.7vw;
	border-color: #ed5087;
	background-color: white;
	color: #ed5087;
	width: 30%;
	height: 30%;
}

.specialPhotoLabelSubcategory {
	border-radius: 25px;
	font-size: 0.7vw;
	border: 1px solid #ed5087;
	background-color: white;
	color: #ed5087;
	width: 30%;
	height: 30%;
	display: flex;
	justify-content: center;
	align-items: center;
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

.specialPhotoLabel:hover {
	background-color: #ed5087;
	border-color: darkgrey;
	color: white;
}

.specialPhotoButtonSubcategory:hover {
	background-color: #ed5087;
	border-color: darkgrey;
	color: white;
}

.specialPhotoLabelSubcategory:hover {
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

.edit {
	display: flex;
	flex-direction: column;
	text-align: left;
	font-size: 0.9vw;
	font-weight: 300;
	color: black;
}

.delete {
	text-align: center;
	font-size: 0.85vw;
	font-weight: 300;
	color: black;
}

.aiButton {
	border-radius: 25px;
	font-size: 1vw;
	border-color: #ed5087;
	background-color: white;
	color: #ed5087;
	width: 20%;
	height: 65%;
}

.aiButtonSubcatgory {
	border-radius: 15px;
	font-size: 0.7vw;
	border-color: #ed5087;
	background-color: white;
	color: #ed5087;
	width: 27%;
	height: 3vh;
}

.aiButton:hover,
.aiButtonSubcatgory:hover {
	background-color: #ed5087;
	border-color: #ed5087;
	color: white;
}

.disabled-element {
	opacity: 0.2;
	pointer-events: none;
}
</style>
