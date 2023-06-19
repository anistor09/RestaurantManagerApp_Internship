<script lang="ts" setup>

import { useLanguageStore } from '../store/language';
import translations from '../mockData/translations.json';
import { Choice } from '~/interfaces/Choice';
import { Option } from '~/interfaces/Option';
import { ChoiceWrapper } from '~/interfaces/ChoiceWrapper';


const languageStore = useLanguageStore();
const computedLanguageId = computed(() => languageStore.idGetter);

const props = defineProps({
	optionName: {
		type: String,
		required: true,
	},
	choices: {
		type: Array as () => Choice[],
		required: true,
	},
	options: {
		type: Array as () => Option[],
		required: true,
	},
	id: {
		type: Number,
		required: true,
	},
});

const choiceName = ref("")
const choiceDescription = ref("")

function createChoiceWrapper(choice: Choice): ChoiceWrapper {
	return {
		choice,
		showDelete: false,
		showEdit: false,
	};
}



const localChoices = ref(props.choices.map(x=> createChoiceWrapper(x)));

const emits = defineEmits(['delete-choice','add-choice','edit-choice','edit-option','delete-option'])

const deletedChoiceId = ref(0);
const editedChoiceId = ref(0);

function addChoice(){
	emits('add-choice',props.id)
}

function deleteOption() {
	emits('delete-option', props.id)
}

function editOption() {
	emits('edit-option', props.id)
	
}

function handleDeleteChoice(id: number) {
	const itemWrapper = localChoices.value.find((wrapper) => wrapper.choice.id === id);
	if (itemWrapper) {
		itemWrapper.showEdit = false;
		emits('delete-choice', deletedChoiceId.value, props.id)
	}
}


function deleteChoice(id: number) {
	const itemWrapper = localChoices.value.find((wrapper) => wrapper.choice.id === id);
	if (itemWrapper) {
		itemWrapper.showDelete = true;
		deletedChoiceId.value = id;
	}
}

function editChoice(id: number) {
	const itemWrapper = localChoices.value.find((wrapper) => wrapper.choice.id === id);
	if (itemWrapper) {
		itemWrapper.showEdit = true;
		editedChoiceId.value = id;
		choiceName.value=itemWrapper.choice.name;
		choiceDescription.value=itemWrapper.choice.description;
	}
}

function handleEditChoice(id: number) {
	const itemWrapper = localChoices.value.find((wrapper) => wrapper.choice.id === id);
	if (itemWrapper) {
		itemWrapper.showEdit = false;
		emits('edit-choice', editedChoiceId.value, props.id, choiceName.value, choiceDescription.value)	
	}
}


watch(props.choices, () => {
	localChoices.value=props.choices.map(x=> createChoiceWrapper(x))
})


</script>

<template>
	<el-card class="option-card" shadow="always" :body-style="{ padding: '0px' }">
		<el-collapse class="=option-collapse">
			<el-collapse-item class="option-collapse-item" :title="optionName" name="1">
				<el-table class="option-table" :data="localChoices">
					<el-table-column align="center" label="Name" prop="choice.name" />
					<el-table-column align="center" label="Description" prop="choice.description" />
					<el-table-column align="center">
						<template #header>
							<el-button class="option-button"  @click="editOption()">{{ translations[computedLanguageId].editOption }}</el-button>
							<el-button class="option-button"  @click="deleteOption()">{{ translations[computedLanguageId].deleteOption }}</el-button>
						</template>
						<template #default="{ row }">
							<el-button class="table-button" @click="editChoice(row.choice.id)">{{ translations[computedLanguageId].edit }}</el-button>
							<el-button class="table-button" @click="deleteChoice(row.choice.id)" >{{ translations[computedLanguageId].delete }}</el-button>
							<Teleport to="body">
								<el-dialog v-model="row.showDelete" class="choice-delete-popup">
									<div style="width: 100%;height: 70%;text-align: center; display: flex; justify-content: center; align-items: center; font-size: 1.0vw;">
										{{ translations[computedLanguageId].areYouSureYouWantToDelete }} "{{ row.choice.name }}" {{ translations[computedLanguageId].fromThisOption }}?
									</div>
									<div style="display: flex; justify-content: center; align-items: center; width: 100%;height: 20%;">
										<el-button class="choice-delete-popup-button" @click="handleDeleteChoice(row.choice.id)">Yes</el-button>
									</div>
								</el-dialog>
							</Teleport>
							<Teleport to="body">
								<el-dialog v-model="row.showEdit" class="choice-edit-popup">
									<template #header>
										<div class="my-header">
											<div class="choiceFieldText">{{translations[computedLanguageId].editAChoice}}</div>
										</div>
									</template>
									<div style="width:100%;height: 70%;">
										<div style="width:100%;height: 100%;padding-left: 15%;">
											<div class="choiceFieldText">{{ translations[computedLanguageId].name }}</div>
											<input v-model="choiceName" class="specialChoiceInput"/>
											<div class="choiceFieldText">{{ translations[computedLanguageId].description }}</div>
											<textarea v-model="choiceDescription" class="specialChoiceTextArea"></textarea>
										</div>	
									</div>
									<div style="width:100%;height: 30%;display: flex;justify-content: center;align-items: center;">
										<el-button class="choice-edit-popup-button" @click="handleEditChoice(row.choice.id)">{{ translations[computedLanguageId].save }}</el-button>
									</div>
									
								</el-dialog>
							</Teleport>
						</template>
					</el-table-column>
				</el-table>
				<div style="width: 100%; display: flex; justify-content: center; align-items: center;">
					<el-button class="add-choice-button" color="#ED5087" pink round @click="addChoice()">{{ translations[computedLanguageId].addChoice }}</el-button>
				</div>
				
			</el-collapse-item>
		</el-collapse>
	</el-card>
	
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans');
* {
    font-family: 'Open Sans';
}

.option-card {
	margin-top: 1%;
	width: 96%;
	height: auto;
	border-radius: 40px;
	border-color: #ed5087;
	border-width: 0.2vw;
	font-family: 'Open Sans';
}


.option-delete-popup {
	text-align: center;
	font-size: 0.8vw;
	font-weight: bold;
	color: black;
	border-radius: 40px;
	border: 0.15vw solid #ed5087 !important;
}

.choice-button-add {
	display: flex;
	width: 100%;
	height: 33.3%;
	justify-content: center;
}


.option-collapse-item :deep(.el-collapse-item__header) {
	margin-left: 2vw;
	height: 4vh;
	font-size: 1.5vw;
	font-weight: bolder;
	color: #ed5087;
}

.option-table :deep(.el-table .cell) {
	word-break: normal;
}

.option-table {
	width: 100%;
	align-items: center;
}

.option-table :deep(.el-table .el-table__cell.is-right) {
	text-align: center !important;
}

.el-button+.el-button {
    margin-left: 0;
}

.table-button {
	width:60%;
	height:2.5vh;
	border-radius: 25px;
    font-size: 0.7vw;
    border-color: #ED5087;
    color: #ED5087;
	background-color: rgb(253, 238, 243);
	margin-top: 1%;
}

.table-button:hover{
	background-color: #ED5087;
    color: white;
}

.table-button:focus{
	background-color: rgb(253, 238, 243);
    color: #ED5087;
}

.option-button {
	width:100%;
	height:10%;
	background-color: white;
	border-radius: 25px;
    font-size: 0.8vw;
    border-color: #ED5087;
    background-color: white;
    color: #ED5087;
	margin-top: 1%;
}

.option-button:hover{
	background-color: #ED5087;
    color: white;
}

.add-choice-button:hover {
    background-color: #ED5087;
    border-color: darkgrey;
    color: white;
}

.add-choice-button.active {
    background-color: #ED5087;
    border-color: darkgrey;
    color: white;
}

.add-choice-button {
	margin-top: 3%;
	border-radius: 25px;
    font-size: 1vw;
    border-color: #ED5087;
    background-color: white;
    color: #ED5087;
    width: 50%;
    height: 30%;
}

.choice-save-button{
    height: 45%;
	width: 30%;
	font-size: 0.8vw;
	border-radius: 40px;
	color: #ED5087;
	background-color: white;
}

.choice-bottom-button {
	display: flex;
	padding-top: 8%;
	font-size: 0.8vw;
	justify-content: center;
}
</style>
