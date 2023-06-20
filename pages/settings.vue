<script lang="ts" setup>
import { computed, ref } from 'vue';
import { ElTimeSelect } from 'element-plus';
import { useRestaurantStore } from '../store/restaurant';
import { Hours } from '../interfaces/Hours';
import NameNeededPopUp from '../components/nameNeededPopUp.vue';
import PageTitle from '../components/page-title.vue';
import currencies from '../mockData/currency.json';
import languages from '../mockData/languages.json';
import { useCurrencyStore } from '../store/currency';
import { useLanguageStore } from '../store/language';
import translations from '../mockData/translations.json';

const currencyStore = useCurrencyStore();
const restaurantStore = useRestaurantStore();
const restaurant = restaurantStore.restaurantGetter;
const languageStore = useLanguageStore();

const defaultSrc =
	'https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png';
const src = ref(restaurant.imageUrl || defaultSrc);
const name = ref(restaurant.name);
const addresse = ref(restaurant.addresse);
const description = ref(restaurant.description);
const imageUrl = ref(restaurant.logoUrl);
const phoneNumber = ref(restaurant.phoneNumber);
const email = ref(restaurant.email);
const category = ref(restaurant.category);
const doubleCheck = ref(false);
const nameNeededPopUp = ref(false);
const selectedCurrency = ref(currencyStore.currencyGetter.currency);
const selectedLanguage = ref(languageStore.languageGetter.language);

const computedLanguageId = computed(() => languageStore.idGetter);

const workingDays = computed(() => [
	translations[computedLanguageId.value].monday,
	translations[computedLanguageId.value].tuesday,
	translations[computedLanguageId.value].wednesday,
	translations[computedLanguageId.value].thursday,
	translations[computedLanguageId.value].friday,
	translations[computedLanguageId.value].saturday,
	translations[computedLanguageId.value].sunday,
]);

const acceptedTypes = ['image/jpeg', 'image/png'];
const logoEdited: Ref<File | null> = ref(null);
const backgroundEdited: Ref<File | null> = ref(null);
const backroundImageData={imageEdited: backgroundEdited, src}
const logoImageData={imageEdited: logoEdited, src:imageUrl}

/// function to handle the upload of a photo to a restaurant
function handleFileUpload(data: any, event: any) {
	const imageEdited=data.imageEdited
	const src=data.src
	const file = event.target.files[0];
	console.log(src)
	event.target.value = null;
  	if(!file||!acceptedTypes.includes(file.type)){
		openErrorNotification("Wrong image type")
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
				openErrorNotification("Something went wrong!")
			console.log(src)
		}
		else 
			openErrorNotification("Something went wrong!")
	};
	if(imageEdited.value)
		reader.readAsDataURL(imageEdited.value);
	else 
		openErrorNotification("Something went wrong!")	
}

// Function to delete the selected logo for a restaurant
function deleteImgLogo(){
	logoEdited.value=null
	imageUrl.value=defaultSrc
}

// Function to delete the selected image for a menu
function deleteImgBackground(){
	backgroundEdited.value=null
	src.value=defaultSrc
}

// Function to display a error notification
const openErrorNotification = (notifTitle: string) => {
	ElNotification({
		title: notifTitle,
		message: h('div',{ style: 'color: #ed5087; font-family: "Open Sans"' },'Please try with a diffrent file.',),
		customClass: 'notif',
	});
};




const checkIfChange = () => {
	doubleCheck.value = true;
};

const deepCopyHours = () => {
	const opening = ['', '', '', '', '', '', ''];
	const closing = ['', '', '', '', '', '', ''];
	for (const [index, element] of restaurant.hoursSet.entries()) {
		if (index < 7) {
			opening[index] = element.opening;
			closing[index] = element.closing;
		}
	}
	return [opening, closing];
};

const times = deepCopyHours();

const startTimes = ref(times[0]);
const endTimes = ref(times[1]);

const saveChanges = async () => {
	doubleCheck.value = false;

	changeCurrencyGlobally();
	changeLanguageGlobally();
	restaurant.hoursSet = [];
	for (let i = 0; i < 7; i++) {
		if (startTimes.value[i] !== '' && endTimes.value[i] !== '') {
			const hour: Hours = {
				id: 1,
				opening: startTimes.value[i],
				closing: endTimes.value[i],
				day: i,
			};
			restaurant.hoursSet.push(hour);
		}
	}
	restaurant.name = name.value;
	restaurant.addresse = addresse.value;
	restaurant.description = description.value;
	restaurant.phoneNumber = phoneNumber.value;
	restaurant.email = email.value;
	restaurant.category = category.value;

	await useFetch('/api/restaurant/editRestaurant', {method: 'PUT',body: restaurant,headers: {'Content-Type': 'application/json',},});

	// if(logoEdited.value){
	// 	const formData = new FormData();
	// 	formData.append('file', logoEdited.value);
	// 	formData.append('id', restaurant.id.toString())
	// 	await useFetch(`/api/photos/photoLogo`, {
	// 		method: 'POST',
	// 		body: formData,
	// 	});
	// }

	if (backgroundEdited.value) {
		const formData = new FormData();
		formData.append('file', backgroundEdited.value);
		formData.append('id', restaurant.id.toString());
		await useFetch(`/api/photos/photoBackground`, {method: 'POST',body: formData,});
	}
};
async function addAiRestaurantDescription() {
	if (name.value.length === 0) {
		nameNeededPopUp.value = true;
	} else {
		description.value = 'The new description is loading...';

		const requestBody = {itemName: name.value,length: 200,target: 'restaurant',};
		const response = await useFetch(`/api/autocompletion/getAutocompletion`, {method: 'POST',body: requestBody,headers: {'Content-Type': 'application/json',},});

		description.value = response.data.value;
	}
}
function changeCurrencyGlobally() {
	currencyStore.currencyGetter.currency = selectedCurrency.value;
}

function changeLanguageGlobally() {
	languageStore.languageGetter.language = selectedLanguage.value;
}
</script>

<template>
	<PageTitle id="titleComponent" :title="translations[computedLanguageId].settings"></PageTitle>
	<div class="container">
		<ClientOnly>
			<Teleport to="body">
				<NameNeededPopUp
					v-model="nameNeededPopUp"
					:message="'restaurant'"
					@close-no-name="nameNeededPopUp = false"
				></NameNeededPopUp>
			</Teleport>
		</ClientOnly>

		<div id="firstHalf">
			<div style="padding-left: 15%">
				<!-- Container which contains the image, the name of the restaurant and it's address-->
				<div id="imageNameAddress">
					<img id="circleImage" :src="imageUrl" alt="" />
					<!-- Container which contains the name of the restaurant and it's address-->
					<div id="nameAddress">
						<input
							id="nameId"
							v-model="name"
							class="specialInput"
							style="font-size: 1.3vw; width: 80%"
							type="input"
							placeholder="Please input"
						/>
						<input
							id="addressId"
							v-model="addresse"
							class="specialInput"
							type="input"
							style="font-size: 1vw; width: 100%"
							placeholder="Please input"
						/>
						<div style="width: 100%; padding-top: 1%; display: flex">
							<label
								for="changePhotoLogo"
								class="specialPhotoLabel"
								style="width: 35%; height: 3vh; font-size: 0.8vw; margin-right: 3%"
								>{{ translations[computedLanguageId].changeLogo }}</label
							>
							<input
								id="changePhotoLogo"
								type="file"
								style="display: none"
								@change="handleFileUpload(logoImageData,$event)"
							/>
							<el-button
								class="specialPhotoButton"
								data-testid="deleteLogoButton"
								style="width: 35%; height: 3vh; font-size: 0.8vw"
								@click="deleteImgLogo()"
								>{{ translations[computedLanguageId].deleteLogo }}</el-button
							>
						</div>
					</div>
				</div>
				<div id="backgroundPrefix" class="prefix">
					{{ translations[computedLanguageId].backgroundImage }}
				</div>
				<div style="width: 92%; height: 100%; display: flex; padding-left: 1%">
					<img
						:src="src"
						style="
							width: 100%;
							height: 15vh;
							object-fit: contain;
							border: solid #ed5087;
							border-radius: 40px;
						"
					/>
					<div class="photoButtonSpace">
						<label for="changePhotoBackground" class="specialPhotoLabel">{{
							translations[computedLanguageId].change
						}}</label>
						<input
							id="changePhotoBackground"
							type="file"
							style="display: none"
							@change="handleFileUpload(backroundImageData,$event)"
						/>
						<el-button
							data-testid="deleteBackButton"
							class="specialPhotoButton"
							@click="deleteImgBackground()"
							>{{ translations[computedLanguageId].delete }}</el-button
						>
					</div>
				</div>
				<!-- Container which the other information(description, phone number, email and category)-->
				<div class="otherDetails">
					<!-- <div id="descriptionIdPrefix" class="prefix">Description:</div> -->
					<!-- The textarea where the restaurant description can be changed by the restaurant owner-->
					<div
						class="div"
						style="display: flex; align-items: center; padding-bottom: 1%; padding-top: 3%"
					>
						<div id="descriptionIdPrefix" class="prefix" style="width: 18%; padding-bottom: 0.7%">
							{{ translations[computedLanguageId].description }}
						</div>

						<el-button class="aiButtonSubcatgory" @click="addAiRestaurantDescription"
							>✨{{ translations[computedLanguageId].writeAi }}</el-button
						>
					</div>
					<textarea
						id="descriptionId"
						v-model="description"
						class="specialInput"
						autosize
						style="
							text-align: start;
							width: 90%;
							resize: none;
							height: 12vh;
							overflow: auto;
							max-width: 80vw;
							min-width: 300px;
							border-radius: 30px;
							padding-left: 1%;
							padding-top: 1.2%;
						"
						placeholder="Please input"
					/>
					<!-- TODO -->
					<!-- Opening Hours: <br> -->
					<!-- <input type="text" id="restaurantDescriptionEdit" :value="restaurant."> <br> -->
				</div>
			</div>
		</div>
		<div id="secondHalf">
			<div style="padding-left: 10%; padding-top: 5%">
				<div class="details">
					<div id="phoneIdPrefix" class="prefix">
						{{ translations[computedLanguageId].phoneNumber }}
					</div>
					<!-- The input where the restaurant phone number can be changed by the restaurant owner-->
					<input
						id="phoneId"
						v-model="phoneNumber"
						class="specialInput"
						style="width: 20%; text-align: center"
						type="input"
						placeholder="Please input"
					/>
				</div>
				<div class="details">
					<div id="mailIdPrefix" class="prefix">{{ translations[computedLanguageId].email }}</div>
					<!-- The input where the restaurant email can be changed by the restaurant owner-->
					<input
						id="mailId"
						v-model="email"
						class="specialInput"
						style="width: 30%"
						type="input"
						placeholder="Please input"
					/>
				</div>
				<div class="details">
					<div id="categoryIdPrefix" class="prefix">
						{{ translations[computedLanguageId].category }}
					</div>
					<!-- The input where the restaurant category can be changed by the restaurant owner-->
					<input
						id="categoryId"
						v-model="category"
						class="specialInput"
						style="width: 20%"
						type="input"
						placeholder="Please input"
					/>
				</div>
				<div id="hoursId" class="prefix">{{ translations[computedLanguageId].workingHours }}</div>
				<div v-for="(day, index) in workingDays" :key="index" class="workingDay">
					<div class="dayName">{{ day }}</div>
					<el-time-select
						v-model="startTimes[index]"
						style="width: 30%"
						class="time-selector"
						:placeholder= translations[computedLanguageId].startTimeRestaurant
						start="00:00"
						step="00:30"
						end="23:59"
					/>
					<el-time-select
						v-model="endTimes[index]"
						style="width: 30%"
						class="time-selector"
						:placeholder= translations[computedLanguageId].endTimeRestaurant
						start="00:00"
						step="00:30"
						end="23:59"
					/>
				</div>
				<div class="details" style="padding-top: 2%">
					<div id="mailIdPrefix" class="prefix">
						{{ translations[computedLanguageId].currency }}
					</div>
					<div style="width: 20%">
						<el-select
							v-model="selectedCurrency"
							class="currency-select-item"
							collapse-tags
							filterable
							default-first-option
							:reserve-keyword="false"
						>
							<el-option
								v-for="currency in currencies"
								:key="currency.id"
								:label="currency.symbol"
								:value="currency.symbol"
							/>
						</el-select>
					</div>
					<div id="mailIdPrefix" class="prefix">
						{{ translations[computedLanguageId].language }}
					</div>
					<div style="width: 27%">
						<el-select
							v-model="selectedLanguage"
							class="currency-select-item"
							collapse-tags
							filterable
							default-first-option
							:reserve-keyword="false"
						>
							<el-option
								v-for="language in languages"
								:key="language.id"
								:label="language.symbol"
								:value="language.symbol"
							/>
						</el-select>
					</div>
				</div>
			</div>
		</div>
	</div>
	<el-button id="save-button" color="#ED5087" plain round @click="checkIfChange()">
		{{ translations[computedLanguageId].saveChanges }}</el-button
	>

	<Teleport to="body">
		<el-dialog
			v-model="doubleCheck"
			width="20%"
			style="
				font-family: 'Open Sans';
				text-align: center;
				font-size: 0.8vw;
				font-weight: bold;
				color: black;
				border-radius: 40px;
				border: 0.15vw solid #ed5087 !important;
				top: 20%;
			"
		>
			<div>
				{{ translations[computedLanguageId].settingsScript }}
				<div id="change-bottom-button">
					<el-button id="confirmButton" color="#ED5087" plain round @click="saveChanges()">{{
						translations[computedLanguageId].yes
					}}</el-button>
				</div>
			</div>
		</el-dialog>
	</Teleport>
</template>

<style scoped>
/* Imported font used in Figma, may be changed when we receive the brand identity docs from Ewai */
@import url('https://fonts.googleapis.com/css?family=Open+Sans');
* {
	font-family: 'Open Sans';
}

#firstHalf {
	width: 50%;
}
#secondHalf {
	width: 50%;
}

textarea::-webkit-scrollbar {
	display: none;
}
.container {
	display: flex;
	justify-content: center;
	align-items: flex-start;
	margin-top: 3%;
}

.specialPhotoButton {
	border-radius: 25px;
	font-size: 1vw;
	border-color: #ed5087;
	background-color: white;
	color: #ed5087;
	width: 80%;
	height: 30%;
	margin-left: 0;
}

.specialPhotoButton:hover {
	background-color: #ed5087;
	border-color: darkgrey;
	color: white;
}

.specialPhotoLabel {
	border-radius: 25px;
	font-size: 1vw;
	border: 1px solid #ed5087;
	background-color: white;
	color: #ed5087;
	width: 80%;
	height: 30%;
	margin-left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
}

.specialPhotoLabel:hover {
	background-color: #ed5087;
	border-color: darkgrey;
	color: white;
}
.photoButtonSpace {
	width: 30%;
	padding-left: 5%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}

/*Styling for both the containers which formed of pairs of inputs and their descriptions*/
.details {
	display: flex;
	align-items: center;
	padding-top: 1%;
}

/* Styling for the descriptions of the inputs */
.prefix {
	margin-top: 1%;
	margin-right: 3%;
	font-size: 1.2vw;
	font-weight: bolder;
	padding-bottom: 1.5%;
	color: #ed5087;
}

#imageNameAddress {
	display: flex;
	align-items: center;
}

#nameAddress {
	display: flex;
	flex-direction: column;
	padding: 5%;
}

/*Styling for the inputs*/
.specialInput {
	color: black;
	background-color: #dfdfdf;
	border-radius: 15px;
	margin: 0.2vh;
	height: 3vh;
	font-size: 1vw;
	border: none;
	font-family: 'Open Sans';
	text-align: center;
}
#buttonContainer {
	position: absolute;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: flex-end;
	padding-right: 5%;
	align-items: center;
}

#save-button {
	width: 10%;
	height: 5%;
	font-size: 1vw;
	font-weight: bolder;
	position: absolute;
	right: 3%;
	bottom: 3%;
}

.dayName {
	width: 12%;
	min-width: 80px;
	padding-right: 3%;
}
.workingDay {
	display: flex;
	flex-direction: row;
	padding-bottom: 0.5%;
	font-weight: bold;
	font-size: 0.9vw;
}

#change-bottom-button {
	display: flex;
	padding-top: 8%;
	justify-content: center;
}

#circleImage {
	width: 7vw;
	height: 7vw;
	border-radius: 50%;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}
.aiButtonSubcatgory {
	border-radius: 15px;
	margin-top: 1%;
	font-size: 0.9vw;
	border-color: #ed5087;
	background-color: white;
	color: #ed5087;
	width: 20%;
	height: 3vh;
}

.aiButtonSubcatgory:hover {
	background-color: #ed5087;
	border-color: #ed5087;
	color: white;
}

.time-selector :deep(.el-input__wrapper) {
	font-family: 'Open Sans';
	font-size: 1vw;
	font-weight: bolder;
	height: auto;
	border-radius: 30px;
}

.el-select {
	--el-select-input-focus-border-color: #ed5087 !important;
}
</style>
