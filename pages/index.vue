<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';
import PageTitle from '../components/page-title.vue';
import AnalyticsBarComponent from '../components/analytics-bar-component.vue';
import AnalyticsGraphComponent from '../components/analytics-graph-component.vue';
import RestaurantComponent from '../components/restaurant-component.vue';
import { MostSoldItems } from '~/interfaces/MostSoldItems';
import { TimePrice } from '~/interfaces/TimePrice';
import translations from '~/mockData/translations.json'
import { useLanguageStore } from '../store/language';
const languageStore = useLanguageStore();

const computedLanguageId = computed(() => languageStore.idGetter);


const barTitle = computed(() => translations[computedLanguageId.value].mostSoldItems);

const itemNames = ref<string[][]>([]);
const itemValues = ref<number[][]>([]);
const isLoading = ref(true); // Loading state
const isLoading1 = ref(true); // Loading state
const isLoading2 = ref(true); // Loading state

onBeforeMount(async () => {
	await loadMostSoldItems();
	await loadTotalRevenue();
	await loadAveragePerPerson();
});

// Props for graph chart (total revenue)
const graphTitle = computed(() => translations[computedLanguageId.value].totalGeneratedRevenue);
const graphShortTitle = computed(() => translations[computedLanguageId.value].revenue);

const graphValues = ref<number[][]>([]);

// Props for graph chart (average order price)
const graphTitle2 = computed(() => translations[computedLanguageId.value].averageBasketPrice);
const graphShortTitle2 = computed(() => translations[computedLanguageId.value].price);

const graphValues2 = ref<number[][]>([]);

async function loadAveragePerPerson() {
	try {
		const response = await fetch('/api/analytics/averagePerPerson');
		if (response.ok) {
			const responseData = (await response.json()) as TimePrice[];
			graphValues2.value = responseData.map((x) =>
				Array.of(x.time * 1000, parseFloat(x.price.toFixed(2))),
			);
		} else {
			throw new Error('Failed to fetch data');
		}
	} catch (error) {
		console.error(error);
	} finally {
		isLoading2.value = false; // Set loading state to false after data is fetched
	}
}

async function loadTotalRevenue() {
	try {
		const response = await fetch('/api/analytics/totalRevenue');
		if (response.ok) {
			const responseData = (await response.json()) as TimePrice[];
			graphValues.value = responseData.map((x) =>
				Array.of(x.time * 1000, parseFloat(x.price.toFixed(2))),
			);
		} else {
			throw new Error('Failed to fetch data');
		}
	} catch (error) {
		console.error(error);
	} finally {
		isLoading1.value = false; // Set loading state to false after data is fetched
	}
}

async function loadMostSoldItems() {
	try {
		const response = await fetch('/api/analytics/mostSoldItems');
		if (response.ok) {
			const responseData = (await response.json()) as MostSoldItems;
			itemNames.value = Array.of(
				responseData.lastWeek.map((x) => x.name),
				responseData.lastMonth.map((x) => x.name),
				responseData.last6Months.map((x) => x.name),
				responseData.lastYear.map((x) => x.name),
			);
			itemValues.value = Array.of(
				responseData.lastWeek.map((x) => x.count),
				responseData.lastMonth.map((x) => x.count),
				responseData.last6Months.map((x) => x.count),
				responseData.lastYear.map((x) => x.count),
			);
		} else {
			throw new Error('Failed to fetch data');
		}
	} catch (error) {
		console.error(error);
	} finally {
		isLoading.value = false; // Set loading state to false after data is fetched
	}
}

const svg = `
		<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
			<circle cx="50" cy="50" r="45"/>
		</svg>
      `;
</script>

<template>
	<PageTitle :title=translations[computedLanguageId].home></PageTitle>
	<div style="padding-top: 0.5vh; padding-left: 2vw; padding-right: 2vw">
		<RestaurantComponent></RestaurantComponent>
	</div>
	<el-carousel
		:interval="0"
		trigger="click"
		type="card"
		height="50vh"
		arrow="always"
		style="padding-top: 3vw; margin-left: 4vw; margin-right: 4vw"
	>
		<el-carousel-item v-loading="isLoading1" :element-loading-spinner="svg">
			<template v-if="!isLoading1">
				<AnalyticsGraphComponent
					:title="graphTitle"
					:short-title="graphShortTitle"
					:graph-values="graphValues"
				/>
			</template>
			<template v-else>
				<AnalyticsGraphComponent
					:title="graphTitle"
					:short-title="graphShortTitle"
					:graph-values="graphValues"
				/>
			</template>
		</el-carousel-item>
		<el-carousel-item v-loading="isLoading" :element-loading-spinner="svg">
			<template v-if="!isLoading">
				<AnalyticsBarComponent
					:item-names="itemNames"
					:item-values="itemValues"
					:title="barTitle"
				></AnalyticsBarComponent>
			</template>
			<template v-else>
				<AnalyticsBarComponent
					:item-names="itemNames"
					:item-values="itemValues"
					:title="barTitle"
				></AnalyticsBarComponent>
			</template>
		</el-carousel-item>
		<el-carousel-item v-loading="isLoading2" :element-loading-spinner="svg">
			<template v-if="!isLoading2">
				<AnalyticsGraphComponent
					:title="graphTitle2"
					:short-title="graphShortTitle2"
					:graph-values="graphValues2"
				/>
			</template>
			<template v-else>
				<AnalyticsGraphComponent
					:title="graphTitle2"
					:short-title="graphShortTitle2"
					:graph-values="graphValues2"
				/>
			</template>
		</el-carousel-item>
	</el-carousel>
</template>

<style scoped>
.el-carousel__item {
	border-radius: 30px;
	width: 49.2%;
	border: solid #ed5087;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
