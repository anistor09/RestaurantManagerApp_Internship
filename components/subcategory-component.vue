<script lang="ts" setup>
import { computed, ref } from 'vue';
import { ItemWrapper } from '~/interfaces/ItemWrapper';

const props = defineProps({
	subcategoryName: {
		type: String,
		required: true,
	},
	items: {
		type: Array as () => ItemWrapper[],
		required: true,
	},
});
const localItems = ref(props.items);
const deletedItemId = ref(0);
const search = ref('');

const filterTableData = computed(() =>
	localItems.value.filter(
		(data) => !search.value || data.item.name.toLowerCase().includes(search.value.toLowerCase()),
	),
);

function handleDelete() {
	localItems.value = localItems.value.filter((wrapper) => wrapper.item.id !== deletedItemId.value);
}

function deleteItem(id: number) {
	const itemWrapper = localItems.value.find((wrapper) => wrapper.item.id === id);
	if (itemWrapper) {
		itemWrapper.showDelete = true;
		deletedItemId.value = id;
	}
}

watch(
	() => props.items,
	(newItems) => {
		localItems.value = newItems;
	},
);
</script>

<!-- Card component containing the subcategory, along with a list of items -->
<template>
	<el-card id="subcategory-card" shadow="always" :body-style="{ padding: '0px' }">
		<el-collapse>
			<el-collapse-item :title="subcategoryName" name="1">
				<el-table id="subcategory-table" :data="filterTableData">
					<el-table-column align="center" label="Image">
						<template #default="{ row }">
							<img
								id="subcategory-image"
								:src="
									row.item.imageUrl ||
									'https://i.pinimg.com/originals/fd/80/ec/fd80ecec48eba2a9adb76e4133905879.png'
								"
								alt="Image"
							/>
						</template>
					</el-table-column>
					<el-table-column align="center" label="Name" prop="item.name" />
					<el-table-column align="center" label="Description" prop="item.description" />
					<el-table-column align="center" label="Price" prop="item.price" />
					<el-table-column align="center">
						<template #header>
							<el-input v-model="search" size="default" placeholder="Search by item" />
						</template>
						<template #default="{ row }">
							<el-button id="button" color="#ED5087" plain round @click="deleteItem(row.item.id)"
								>Delete</el-button
							>
							<Teleport to="body">
								<el-dialog v-model="row.showDelete" width="20%" class="subcategory-delete-popup">
									<div>
										Are you sure you want to delete "{{ row.item.name }}" from this menu?
										<div id="subcategory-bottom-button">
											<el-button color="#ED5087" plain round @click="handleDelete()">Yes</el-button>
										</div>
									</div>
								</el-dialog>
							</Teleport>
						</template>
					</el-table-column>
				</el-table>
			</el-collapse-item>
		</el-collapse>
	</el-card>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans');

#subcategory-card {
	width: 77vw;
	height: auto;
	border-radius: 40px;
	border-color: #ed5087;
	border-width: 0.2vw;
	font-family: 'Open Sans';
}

.subcategory-delete-popup {
	font-family: 'Open Sans';
	text-align: center;
	font-size: 0.8vw;
	font-weight: bold;
	color: black;
	border-radius: 40px;
	border: 0.15vw solid #ed5087 !important;
}

.el-dialog__headerbtn:focus .el-dialog__close,
.el-dialog__headerbtn:hover .el-dialog__close {
	color: #ed5087;
}

#subcategory-bottom-button {
	display: flex;
	padding-top: 8%;
	justify-content: center;
}

.el-collapse-item__header {
	margin-left: 2vw;
	font-size: 1.5vw;
	font-weight: bolder;
	color: #ed5087;
}

.el-table .cell {
	word-break: normal;
}

#subcategory-table {
	width: 100%;
	align-items: center;
}

#subcategory-image {
	width: 5vw;
	height: 5vw;
	border-radius: 90%;
	box-shadow: 0.2vh 0.1vw 0.7vh 0.2vw rgba(0, 0, 0, 0.1);
}

.el-table .el-table__cell.is-right {
	text-align: center !important;
}

.el-input__wrapper.is-focus {
	box-shadow: 0 0 0 1px #ed5087 inset !important;
}

.el-input__wrapper {
	border-radius: 30px !important;
}

@media only screen and (max-width: 500px) {
	#subcategory-card {
		border-radius: 9vw;
		width: 65vw;
		height: 37vh;
	}
}
</style>
