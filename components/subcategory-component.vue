<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useCurrencyStore } from '../store/currency';
import { useLanguageStore } from '../store/language';
import translations from '../mockData/translations.json';
import { ItemWrapper } from '~/interfaces/ItemWrapper';
import { Restaurant } from '~/interfaces/Restaurant';


const languageStore = useLanguageStore();

const computedLanguageId = computed(() => languageStore.idGetter);
const currencyStore = useCurrencyStore();
const computedCurrency = computed(() => currencyStore.currencyGetter.currency);
const props = defineProps({
	restaurant: {
		type: Object as () => Restaurant,
		required: true,
	},
	subcategoryName: {
		type: String,
		required: true,
	},
	items: {
		type: Array as () => ItemWrapper[],
		required: true,
	},
	collapsed: {
		type: Boolean,
		required: true,
	},
	menuId: {
		type: Number,
		required: true,
	},
});
const localRestaurant = ref(props.restaurant);
const localItems = ref(props.items);
const deletedItemId = ref(0);
const search = ref('');
const isCollapsed = ref(['1']);

if (!props.collapsed) {
	isCollapsed.value = [];
}

const filterTableData = computed(() =>
	localItems.value.filter(
		(data) => !search.value || data.item.name.toLowerCase().includes(search.value.toLowerCase()),
	),
);

function deleteItem(id: number) {
	const itemWrapper = localItems.value.find((wrapper) => wrapper.item.id === id);
	if (itemWrapper) {
		itemWrapper.showDelete = true;
		deletedItemId.value = id;
	}
}
const handleDelete = async () => {
	// Remove from database
	const data = {
		id: props.menuId,
		itemId: deletedItemId.value,
	};
	await useFetch('/api/menus/removeItemFromMenu', {
		method: 'POST',
		body: data,
		headers: {
			'Content-Type': 'application/json',
		},
	});

	// Remove locally
	localRestaurant.value.carteSet = localRestaurant.value.carteSet.filter((menu) => {
		if (menu.id === props.menuId) {
			menu.itemSet = menu.itemSet.filter((x) => x.id !== deletedItemId.value);
		}
		return true;
	});
};

watch(
	() => props.items,
	(newItems) => {
		localItems.value = newItems;
	},
);
function formatPrice(price: any) {
	return `${price} ${computedCurrency.value}`;
}
</script>

<!-- Card component containing the subcategory, along with a list of items -->
<template>
	<el-card id="subcategory-card" shadow="always" :body-style="{ padding: '0px' }">
		<el-collapse v-model="isCollapsed">
			<el-collapse-item :title="subcategoryName" name="1">
				<el-table id="subcategory-table" :data="filterTableData">
					<el-table-column align="center" :label="translations[computedLanguageId].photo">
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
					<el-table-column
						align="center"
						:label="translations[computedLanguageId].name"
						prop="item.name"
						data-testid="item-name-column"
					/>
					<el-table-column align="center" :label="translations[computedLanguageId].descriptionW" prop="item.description" />
					<!-- <el-table-column align="center" label="Price" prop="item.price" /> -->
					<el-table-column align="center" :label="translations[computedLanguageId].price">
						<template #default="{ row }">
							<span>{{ formatPrice(row.item.price) }}</span>
						</template>
					</el-table-column>
					<el-table-column align="center">
						<template #header>
							<el-input v-model="search" size="default" :placeholder=translations[computedLanguageId].searchByItem />
						</template>
						<template #default="{ row }">
							<el-button id="button" color="#ED5087" plain round @click="deleteItem(row.item.id)"
								>{{translations[computedLanguageId].removeFromMenu}}</el-button
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
