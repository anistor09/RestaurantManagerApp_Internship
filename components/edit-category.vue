<script lang="ts" setup>

import { SubCategory } from '~/interfaces/SubCategory';
import { useRestaurantStore } from '~/store/restaurant';
import { useCategoryStore } from '~/store/category';

const restaurantStore = useRestaurantStore();
const restaurant = restaurantStore.restaurantGetter;
const categoryStore = useCategoryStore();

const defaultSrc =
	'https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png';

const props = defineProps({
	addCategory: Boolean,
	categoryId: Number,
});


const name = ref('');
const description = ref('');
const src = ref(defaultSrc);
const hasSubcategories = ref(false);
const presentationOrder = ref(0);
const subCategories: Ref<SubCategory[]> = ref([]);
const newSubcategoryName = ref('');
const newSubcategoryDescription = ref('');
const addSubcategoryPopUp = ref(false);
const presentationSubcategoryOrder = ref(0);
const newSubcategorySrc = ref(src.value);
const editSubcategory = ref(false);
const editedSubcategoryId = ref(0);
const tobeDeletedSubcat: Ref<number[]> = ref([]);
const toBeEditedSubcat: Ref<Set<number>> = ref(new Set<number>());
const deleteSubcategoryPopup = ref(false)
const deleteCategoryPopup = ref(false)
const deleteSubcatIdLocally = ref(-1);
const nameNeededPopUp = ref(false)


if (props.addCategory === false) {

	const category = restaurant.categorySet.filter((x) => x.id === props.categoryId)[0];
	name.value = category === undefined ? '' : category.name;
	description.value = category === undefined ? '' : category.description;
	src.value = category === undefined ? defaultSrc : category.imageUrl;
	presentationOrder.value = category === undefined ? 0 : category.presentationOrder;
	if (category.subCategorySet !== undefined)
		if (category.subCategorySet.length > 0) {
			subCategories.value = category.subCategorySet;
			hasSubcategories.value = true;

		}
}

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

const getUniqueId = () => {
	const oldIds = subCategories.value.map(x => x.id);
	let found = false;
	let newId = -1;
	while (!found) {
		newId = Math.floor(Math.random() * -1001);
		if (oldIds.filter(y => y === newId).length === 0)
			found = true;
	}
	return newId;
}
function saveNewSubcategoryLocally() {

	if (editSubcategory.value) {

		editSubcategoryLocally()
	} else {

		const newSubcategory: SubCategory = {
			id: getUniqueId(),
			name: newSubcategoryName.value,
			description: newSubcategoryName.value,
			presentationOrder: presentationSubcategoryOrder.value,
			imageUrl: newSubcategorySrc.value
		}


		subCategories.value.push(newSubcategory)

		addSubcategoryPopUp.value = false;
		refreshDetails();
	}
}
function deleteSubcategoryLocally(idSubcat: number) {
	addSubcategoryPopUp.value = false;
	deleteSubcategoryPopup.value = false;
	subCategories.value = subCategories.value.filter(x => x.id !== idSubcat)

	if (idSubcat >= 0) {
		tobeDeletedSubcat.value.push(idSubcat)
	}
	refreshDetails()

}
function editSubcategoryLocally() {
	const positionSubCat = subCategories.value.findIndex(x => x.id === editedSubcategoryId.value);

	subCategories.value.splice(positionSubCat, 1, {
		id: editedSubcategoryId.value,
		name: newSubcategoryName.value,
		description: newSubcategoryName.value,
		presentationOrder: presentationSubcategoryOrder.value,
		imageUrl: newSubcategorySrc.value
	});

	if (editedSubcategoryId.value >= 0) {
		toBeEditedSubcat.value.add(editedSubcategoryId.value)
	}

	refreshDetails();

	editSubcategory.value = false;

}
function refreshDetails() {
	newSubcategoryName.value = "";
	newSubcategoryDescription.value = "";
	newSubcategorySrc.value = defaultSrc;
	presentationSubcategoryOrder.value = 0
	addSubcategoryPopUp.value = false;
	hasSubcategoriesFct();
}
function hasSubcategoriesFct() {
	if (subCategories.value.length > 0) {
		hasSubcategories.value = true;

	}
}
async function handleAddEditSubcategory(subcategory: SubCategory, cid: number, editMode: boolean) {
	const requestBody = {

		name: subcategory.name,
		description: subcategory.description,
		presentationOrder: subcategory.presentationOrder,
		imageUrl: subcategory.imageUrl,
		categoryId: cid,
		restaurant: {
			id: restaurant.id,
			name: restaurant.name,
			latitude: restaurant.latitude,
			imageUrl: restaurant.imageUrl,
			longitude: restaurant.longitude,
			rating: restaurant.rating,
			category: restaurant.category,
			backgroundColor: restaurant.backgroundColor,
			foregroundColor: restaurant.foregroundColor,
			font_color: restaurant.font_color,
			description: restaurant.description,
			logoUrl: restaurant.logoUrl,
			addresse: restaurant.addresse,
			phoneNumber: restaurant.phoneNumber,
			email: restaurant.email,
			averageWaitingTime: 0,
		},

	};

	if (!editMode) {
		const response = await useFetch('/api/subcategory/add', {
			method: 'POST',
			body: requestBody,
			headers: {
				'Content-Type': 'application/json',
			},
		});

		console.log("added the subcategory with id " + parseInt(response.data.value as string))


	} else {
		const putBody = {
			requestBody,
			sid: subcategory.id,

		}
		await useFetch('/api/subcategory/update', {
			method: 'PUT',
			body: putBody,
			headers: {
				'Content-Type': 'application/json',
			},
		})

		console.log("edited the subcategory with id " + subcategory.id)

	};



}
const changeSubcategory = (idSubcat: number) => {
	const editedSubcategory = subCategories.value.filter(x => x.id === idSubcat)[0]

	newSubcategoryName.value = editedSubcategory === undefined ? '' : editedSubcategory.name;
	newSubcategoryDescription.value = editedSubcategory === undefined ? '' : editedSubcategory.description;
	newSubcategorySrc.value = editedSubcategory === undefined ? '' : editedSubcategory.imageUrl;
	presentationSubcategoryOrder.value = editedSubcategory === undefined ? subCategories.value.length : editedSubcategory.presentationOrder;
	addSubcategoryPopUp.value = true;
	editedSubcategoryId.value = idSubcat;
	editSubcategory.value = true;

}
async function handleDeleteSubcategory(idSubcat: number) {
	// await useFetch(`/api/subcategory/${idSubcat}`);
	const requestBody = {
		id: idSubcat,
	}
	await useFetch('/api/subcategory/delete', {
		method: 'DELETE',
		body: requestBody,
		headers: {
			'Content-Type': 'application/json',
		},
	})
	addSubcategoryPopUp.value = false;
	subCategories.value = subCategories.value.filter(x => x.id !== idSubcat)
	hasSubcategoriesFct()

}
async function handleSubcategories(categoryId: number) {
	for (const subcategory of subCategories.value) {
		if (subcategory.id < 0) {
			await handleAddEditSubcategory(subcategory, categoryId, false)
		}
	}

	for (const toDeleteId of tobeDeletedSubcat.value) {
		await handleDeleteSubcategory(toDeleteId)
	}
	for (const toEditId of toBeEditedSubcat.value) {
		const editedSubcategory = subCategories.value.filter(x => x.id === toEditId)[0]
		await handleAddEditSubcategory(editedSubcategory, categoryId, true)
	}
}

async function handleAddEditCategory() {

	const requestBody = {
		name: name.value,
		description: description.value,
		presentationOrder: presentationOrder.value,
		imageUrl: src.value,
		restaurant: {
			id: restaurant.id,
			name: restaurant.name,
			imageUrl: restaurant.imageUrl,
			latitude: restaurant.latitude,
			longitude: restaurant.longitude,
			rating: restaurant.rating,
			category: restaurant.category,
			foregroundColor: restaurant.foregroundColor,
			backgroundColor: restaurant.backgroundColor,
			font_color: restaurant.font_color,
			description: restaurant.description,
			logoUrl: restaurant.logoUrl,
			addresse: restaurant.addresse,
			phoneNumber: restaurant.phoneNumber,
			email: restaurant.email,
			averageWaitingTime: 0,
		},

	};
	if (props.addCategory) {
		const response = await useFetch('/api/category/add', {
			method: 'POST',
			body: requestBody,
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const categoryId = response.data.value
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

		if (categoryId !== null)
			await handleSubcategories(categoryId)
		openNotification('Category was successfully added')
	}
	else {
		const putBody = {
			requestBody,
			cid: props.categoryId,
		}

		await useFetch('/api/category/update', {
			method: 'PUT',
			body: putBody,

			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (props.categoryId !== undefined) {
			categoryStore.categoryGetter.push({
				id: props.categoryId,
				name: name.value,
				description: description.value,
				presentationOrder: presentationOrder.value,
				imageUrl: src.value,
				subCategorySet: subCategories.value,
			});
		}
		if (props.categoryId !== undefined)
			await handleSubcategories(props.categoryId)
		openNotification('Category was successfully edited')
	}

	setTimeout(() => {
		window.close();
	}, 2000);


}
function popUpDeleteSubcategoryLocally(subcatid: number) {
	deleteSubcatIdLocally.value = subcatid;
	deleteSubcategoryPopup.value = true;
}
async function handleDeleteCategory() {

	for (const subcategory of subCategories.value) {
		await handleDeleteSubcategory(subcategory.id)
	}

	const requestBody = {
		id: props.categoryId,
	}
	const response = await useFetch('/api/category/delete', {
		method: 'DELETE',
		body: requestBody,
		headers: {
			'Content-Type': 'application/json',
		},
	})
	console.log(response.data.value);
	if (props.categoryId)
		categoryStore.deleteGetter.push(props.categoryId)
	openNotification('Category was successfully deleted')
	window.close();
}
const cancelNewSubcategory = () => {
	addSubcategoryPopUp.value = false
	editSubcategory.value = false
	newSubcategoryName.value = "";
	newSubcategoryDescription.value = "";
	newSubcategorySrc.value = defaultSrc;
	presentationSubcategoryOrder.value = 0
}


const filteredSubcategories = computed(() => {

	return subCategories.value.sort((a, b) => a.presentationOrder - b.presentationOrder)
});
const hasSubcategoriesComputed = computed(() => { return hasSubcategories.value });
async function addAiCategoryDescription() {
	await addAiDescription('250', true)
}
async function addAiSubcategoryDescription() {
	await addAiDescription('150', false)
}
async function addAiDescription(neededLength: string, forCategory: boolean) {
	if ((name.value.length === 0 && forCategory) || (newSubcategoryName.value.length === 0 && !forCategory)) {
		console.log(forCategory);
		nameNeededPopUp.value = true;
	}
	else {
		let queriedName = ""

		if (forCategory) {
			description.value = "The new description is loading...";
			queriedName = name.value;
		}
		else {
			newSubcategoryDescription.value = "The new description is loading...";
			queriedName = newSubcategoryName.value;
		}
		const requestBody = {
			itemName: queriedName,
			length: neededLength,
			forItem: false,
		}
		const response = await useFetch(`/api/autocompletion/getAutocompletion`, {
			method: 'POST',
			body: requestBody,
			headers: {
				'Content-Type': 'application/json',
			},
		});
		console.log(response.data.value)

		if (forCategory) { description.value = response.data.value }
		else { newSubcategoryDescription.value = response.data.value }
	}
}
</script>

<template>
	<ClientOnly>
		<page-title v-if="addCategory" title="Add category"></page-title>
		<page-title v-else title="Edit category"></page-title>
		<div class="container">
			<div class="bottom">
				<ClientOnly>
					<Teleport to="body">
						<el-dialog v-model="nameNeededPopUp" width="20%" style="border-radius: 5%; height: 25%">
							<div class="delete">
								Please input the name before you request an AI item description.
								<div id="bottomButtons" style="left: 33%;">
									<el-button color="#ED5087" plain round @click="nameNeededPopUp = false">Ok</el-button>

								</div>
							</div>
						</el-dialog>
					</Teleport>
					<Teleport to="body">

						<el-dialog v-model="addSubcategoryPopUp" width="25%" style="border-radius: 5%; height: 65%"
							:before-close="refreshDetails">
							<div class="edit" style="padding-left: 3%;">
								<div>
									<div style="padding-bottom: 1%">Name: </div><input v-model="newSubcategoryName"
										class="specialInputSubcategory" />
								</div>
								<div style="padding-top: 2%">
									<!-- <div style="padding-bottom: 1%">Description: </div> -->
									<div class="div" style="display: flex; align-items: center; padding-bottom: 1%;">
										<div  style="width: 30%; padding-bottom: 0.9%;">Description: </div>

										<el-button class="aiButtonSubcatgory" @click="addAiSubcategoryDescription">Add AI
											Description</el-button>

									</div>

									<textarea v-model="newSubcategoryDescription"
										class="specialTextAreaSubcategory"></textarea>
								</div>
								<div style="padding-top: 2%">
									<div style="padding-bottom: 1%">Presentation order: </div><input
										v-model.number="presentationSubcategoryOrder" class="specialInputSubcategory" />
								</div>
								<div style="width: 100%; height: 90%; display: flex; padding-top: 6%; padding-left: 16%">
									<el-image :src="newSubcategorySrc"
										style="width: 40%; height: 12vh; border-radius: 40px; object-fit: cover" />
									<div class="photoButtonSpace" style="margin-bottom: 3vh; padding-top: 3%;">
										<el-button class="specialPhotoButtonSubcategory"
											style="margin-bottom: 3vh;">Change</el-button>
										<el-button class="specialPhotoButtonSubcategory">Delete</el-button>
									</div>
								</div>
								<div>

									<div id="bottomButtons">
										<el-button color="#ED5087" plain round
											@click="cancelNewSubcategory()">Cancel</el-button>
										<el-button color="#ED5087" plain round
											@click="saveNewSubcategoryLocally()">Save</el-button>
									</div>
								</div>
							</div>

						</el-dialog>
					</Teleport>
					<Teleport to="body">
						<el-dialog v-model="deleteSubcategoryPopup" width="20%" style="border-radius: 5%; height: 20%">
							<div class="delete">
								Are you sure you want to delete this subcategory?
								<div id="bottomButtons">
									<el-button color="#ED5087" plain round
										@click="deleteSubcategoryPopup = false">No</el-button>
									<el-button color="#ED5087" plain round
										@click="deleteSubcategoryLocally(deleteSubcatIdLocally)">Yes</el-button>
								</div>
							</div>
						</el-dialog>
					</Teleport>
					<Teleport to="body">
						<el-dialog v-model="deleteCategoryPopup" width="20%" style="border-radius: 5%; height: 20%">
							<div class="delete">
								Are you sure you want to delete category {{ name }}?
								<div id="bottomButtons">
									<el-button color="#ED5087" plain round
										@click="deleteCategoryPopup = false">No</el-button>
									<el-button color="#ED5087" plain round @click="handleDeleteCategory()">Yes</el-button>
								</div>
							</div>
						</el-dialog>
					</Teleport>
				</ClientOnly>
				<div class="left">
					<div class="elementLeft">
						<div class="box">
							<div style="height: 40%; width: 100%">
								<div class="fieldText" style="padding-bottom: 2%">Name</div>
								<input v-model="name" class="specialInput" style="height: 56.25%" />
							</div>
						</div>
					</div>
					<div class="elementLeft">
						<div class="box">
							<!-- <div class="fieldText" style="padding-bottom: 2%">Description</div> -->
							<div class="div" style="display: flex; align-items: center;">
								<div class="fieldText" style="width: 30%; padding-bottom: 0.9%;">Description</div>

								<el-button class="aiButton" @click="addAiCategoryDescription">Add AI
									Description</el-button>

							</div>
							<textarea v-model="description" class="specialTextArea"></textarea>
						</div>
					</div>
					<div class="elementLeft" style="padding-bottom: 5%">
						<div class="box" style="padding-top: 10%">
							<div class="fieldText" style="padding-bottom: 2%">Photo</div>
							<div style="width: 92%; height: 90%; display: flex; padding-bottom: 10%">
								<el-image :src="defaultSrc"
									style="width: 35%; height: 15vh; object-fit: cover; border-radius: 40px" />
								<div class="photoButtonSpace" style="padding-top: 0.9%;">
									<el-button class="specialPhotoButton">Change</el-button>
									<el-button class="specialPhotoButton">Delete</el-button>
								</div>
							</div>
						</div>
					</div>
					<div class="elementLeft">
						<div class="box" style="">
							<div style="height: 40%; width: 100%">
								<div class="fieldText" style="padding-bottom: 2%">Order in Menu</div>
								<input v-model="presentationOrder" class="specialInput" style="height: 56.25%" />
							</div>
						</div>
					</div>


					<div style="padding-top: 7%; display: flex; padding-left: 8%;">
						<el-button v-if="!props.addCategory" id="deleteCategoryButton" class="specialExitButton"
							@click="deleteCategoryPopup = true">Delete Category</el-button>
					</div>
				</div>
				<div class="right">
					<div class="elementLeft" style="padding-top: 5%; height: 10% !important">
						<div style="width: 100%; height: 90%; display: flex; padding-bottom: 10%">
							<div class="box">
								<div class="fieldText">Subcategories</div>
							</div>
							<div class="box" style="padding-left: 20%">
								<el-button color="#ED5087" plain round
									style="width: 8vw; font-size: 0.8vw; font-weight: bolder"
									@click="addSubcategoryPopUp = true">Add subcategory</el-button>
							</div>
						</div>
					</div>
					<div class="subcategoryWrapper">
						<el-scrollbar style="overflow-x: hidden">
							<div v-if="hasSubcategoriesComputed">
								<div v-for="subcategory in filteredSubcategories" :key="subcategory.id"
									style="padding-bottom: 2%; height: 20%; width: 80%">
									<div class="box" style="padding-top: 5%; padding-left: 20%; display: flex">
										<div class="subcategoryText" style="padding-bottom: 5%">
											{{ subcategory === undefined ? 'None' : subcategory.name }}
										</div>
										<div style="width: 100%; height: 90%; display: flex; padding-bottom: 10% ">
											<el-image :src="subcategory.imageUrl == '' ? defaultSrc : subcategory.imageUrl"
												style="width: 40%; height: 12vh; border-radius: 40px; object-fit: cover" />
											<div class="photoButtonSpace" style=" padding-top: 2%;">
												<el-button class="specialPhotoButton" style="margin-bottom: 3vh "
													@click="changeSubcategory(subcategory.id)">Edit</el-button>
												<el-button class="specialPhotoButton"
													@click="popUpDeleteSubcategoryLocally(subcategory.id)">Delete</el-button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</el-scrollbar>
					</div>
					<div style="margin-top: 10%; display: flex; justify-content: flex-end">
						<el-button v-if="addCategory" id="addSubcategoryButton" class="specialExitButton"
							@click="handleAddEditCategory()">Save</el-button>
						<el-button v-else id="addSubcategoryButton" class="specialExitButton"
							@click="handleAddEditCategory()">Save</el-button>
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
	height: 70%;
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

.top {
	width: 100%;
	height: 11.6%;
	margin: 0;
	display: flex;
	align-items: center;
	font-size: 3vw;
	font-family: 'Cairo', Arial, sans-serif;
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
	top: 3.5vh;
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

.specialPhotoButtonSubcategory {
	border-radius: 25px;
	font-size: 0.7vw;
	border-color: #ed5087;
	background-color: white;
	color: #ed5087;
	width: 30%;
	height: 30%;
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

.specialPhotoButtonSubcategory:hover {
	background-color: #ed5087;
	border-color: darkgrey;
	color: white;
}

.el-button+.el-button {
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
	border-color: #ED5087;
	background-color: white;
	color: #ED5087;
	width: 25%;
	height: 65%;
}

.aiButtonSubcatgory {

border-radius: 25px;
font-size: 0.55vw;
border-color: #ED5087;
background-color: white;
color: #ED5087;
width: 25%;
height: 45%;
}

.aiButton:hover,
.aiButtonSubcatgory:hover {
	background-color: #ED5087;
	border-color: #ED5087;
	color: white;
}

</style>
