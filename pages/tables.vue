<script lang="ts" setup>
import { ElButton, ElDialog } from 'element-plus';
import { ref, computed, watchEffect } from 'vue';
import { Table } from '../interfaces/Table';
import { useRestaurantStore } from '../store/restaurant';
import PageTitle from '../components/page-title.vue';
import TableComponent from '../components/table-component.vue';
import SearchBar from '../components/search-bar.vue';

const restaurantStore = useRestaurantStore();
const restaurant = restaurantStore.restaurantGetter;
const tables = ref(restaurant.tableRestaurantSet);
const selectedTable = ref('');

const addPopup = ref(false);
const editPopup = ref(false);
const deletePopup = ref(false);
const qrcodePopup = ref(false);
const qrcodeUrl = ref('');

const tableId = ref(0);
const tableNumber = ref(0);
const tableCapacity = ref(0);

const filteredTables = computed(() => {
	if (!selectedTable.value) {
		return tables.value;
	}
	return tables.value.filter((table) => `Table ${table.number}` === selectedTable.value);
});
async function handleDelete() {
	await useFetch(`/api/table/${tableId.value}`);
	tables.value = tables.value.filter((x) => x.id !== tableId.value);
	deletePopup.value = false;
}

const getTable = computed<Table>(() => {
	return tables.value.filter((x) => x.id === tableId.value)[0];
});

const tableUrl = computed(() => getTable.value.url);

async function handleEdit() {
	const requestBody = {
		id: tableId.value,
		number: tableNumber.value,
		capacity: tableCapacity.value,
		restaurantId: 1,
	};
	await useFetch(`/api/table/update`, {
		method: 'PUT',
		body: requestBody,
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const index = tables.value.findIndex((x) => x.id === tableId.value);
	tables.value.splice(index, 1, {
		id: tableId.value,
		number: tableNumber.value,
		capacity: tableCapacity.value,
		url: tableUrl.value,
	});
	editPopup.value = false;
}

function handleAdd() {
	const requestBody = {
		number: tableNumber.value,
		capacity: tableCapacity.value,
		restaurantId: 1,
	};
	useFetch<Table>('/api/table/add', {
		method: 'POST',
		body: requestBody,
		headers: {
			'Content-Type': 'application/json',
		},
	}).then((response) => {
		tables.value.push({
			id: tableId.value,
			number: tableNumber.value,
			capacity: tableCapacity.value,
			url: response.data.value?.url === undefined ? 'Not there yet' : response.data.value.url,
		});
		addPopup.value = false;
	});
}

watchEffect(() => {
	const selected = getTable.value;
	if (selected) {
		tableNumber.value = selected.number;
		tableCapacity.value = selected.capacity;
	}
});
</script>

<template>
	<ClientOnly>
		<Teleport to="body">
			<el-dialog v-model="editPopup" width="20%" style="border-radius: 5%; height: 22%">
				<div class="edit">
					<div><span>Table Number: </span><input v-model="tableNumber" class="specialInput" /></div>
					<div style="padding-top: 2%">
						<span>Table Capacity: </span><input v-model="tableCapacity" class="specialInput" />
					</div>
					<div style="padding-top: 5%">
						<el-button color="#ED5087" plain round @click="editPopup = false">Cancel</el-button>
						<el-button color="#ED5087" plain round @click="handleEdit()">Save</el-button>
					</div>
				</div>
			</el-dialog>
		</Teleport>
		<Teleport to="body">
			<el-dialog v-model="deletePopup" width="20%" style="border-radius: 5%; height: 20%">
				<div class="delete">
					Are you sure you want to delete this table?
					<div id="bottomButtons">
						<el-button color="#ED5087" plain round @click="deletePopup = false">No</el-button>
						<el-button color="#ED5087" plain round @click="handleDelete()">Yes</el-button>
					</div>
				</div>
			</el-dialog>
		</Teleport>
		<Teleport to="body">
			<el-dialog v-model="qrcodePopup" width="10%" style="border-radius: 10%; height: 20%">
				<div class="qrcode"><img :src="qrcodeUrl" /></div>
			</el-dialog>
		</Teleport>
		<Teleport to="body">
			<el-dialog v-model="addPopup" width="20%" style="border-radius: 5%; height: 22%">
				<div id="addTablePopup" class="edit">
					<div>
						<span>Table Number: </span
						><input id="addtableInput1" v-model="tableNumber" class="specialInput" />
					</div>
					<div style="padding-top: 2%">
						<span>Table Capacity: </span
						><input id="addtableInput2" v-model="tableCapacity" class="specialInput" />
					</div>
					<div style="padding-top: 5%">
						<el-button color="#ED5087" plain round @click="addPopup = false">Cancel</el-button>
						<el-button id="addTableButtonConfirm" color="#ED5087" plain round @click="handleAdd()"
							>Add</el-button
						>
					</div>
				</div>
			</el-dialog>
		</Teleport>
	</ClientOnly>
	<div>
		<PageTitle title="Tables"></PageTitle>
		<main>
			<div id="buttonContainer">
				<SearchBar v-model="selectedTable" :options="tables.map((x) => 'Table ' + x.number)" />
				<el-button id="addTableButton" color="#ED5087" plain round @click="addPopup = true"
					>Add Table</el-button
				>
			</div>
			<div id="tableContainer">
				<TableComponent
					v-for="table in filteredTables"
					:id="table.id"
					:number="table.number"
					:capacity="table.capacity"
					:url="table.url"
					@edit="
						(x) => {
							editPopup = true;
							tableId = x;
						}
					"
					@delete="
						(x) => {
							deletePopup = true;
							tableId = x;
						}
					"
					@qr-code="
						(x) => {
							qrcodePopup = true;
							qrcodeUrl = x;
						}
					"
				/>
			</div>
		</main>
	</div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans');

* {
	font-family: 'Open Sans';
}
#header {
	font-weight: bolder;
	font-size: 3vw;
}
#bottomButtons {
	display: flex;
	justify-content: space-between;
	position: relative;
	width: 40%;
	left: 30%;
	top: 3.5vh;
}
#bottomButtons2 {
	position: fixed;
}
.edit {
	display: flex;
	flex-direction: column;
	text-align: center;
	font-size: 1.2vw;
	font-weight: 300;
	color: black;
}
.delete {
	text-align: center;
	font-size: 0.85vw;
	font-weight: 300;
	color: black;
}
.qrcode {
	position: relative;
	display: grid;
	align-self: center;
	justify-self: center;
	align-content: center;
	justify-content: center;
	bottom: 2.5vh;
}
header {
	height: 10vh;
	display: flex;
	justify-content: left;
	padding-left: 4%;
	align-items: center;
	border-bottom: 8px solid #ff5c78 !important;
	border-color: black;
}
#buttonContainer {
	display: flex;
	padding-top: 1%;
	padding-left: 5%;
	padding-right: 5%;
	justify-content: space-between;
	align-items: center;
	font-family: 'Open Sans';
}
#tableContainer {
	display: grid;
	justify-items: center;
	align-items: center;
	height: 45.75vh;
	grid-template-columns: repeat(5, 20%);
	grid-auto-rows: 61%;
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
	width: 6%;
}
</style>
