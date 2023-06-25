<script lang="ts" setup>
import { ref, defineAsyncComponent, computed, watch, reactive } from "vue"

import { useLanguageStore } from '../store/language';
import translations from '../mockData/translations.json';


const languageStore = useLanguageStore();

const computedLanguageId = computed(() => languageStore.idGetter);


const ApexCharts = defineAsyncComponent(() => import('vue3-apexcharts'));

const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	shortTitle: {
		type: String,
		required: true,
	},
	graphValues: {
		type: Array as () => number[][],
		required: true,
	},
});

// The timeframe selection reference
const selection = ref(translations[computedLanguageId.value].allDataThisYear);
const chart = ref(Object() as ApexCharts);

const chartOptions = computed(() => ({
	chart: {
		id: 'area-datetime',
		type: 'area',
		zoom: {
			enabled: false,
		},
	},
	dataLabels: {
		enabled: false,
	},
	stroke: {
		curve: 'smooth',
	},
	colors: ['#ED5087'],
	title: {
		text: props.title,
		align: 'center',
		style: {
			fontWeight: 'bolder',
			fontFamily: 'Open Sans',
			color: '#ED5087',
			fontSize: '18',
		},
	},
	subtitle: {
		text: selection.value,
		align: 'center',
		style: {
			fontWeight: 'bold',
			fontFamily: 'Open Sans',
			color: '#242424',
			fontSize: '15',
		},
	},
	xaxis: {
		type: 'datetime',
		tickAmount: 6,
		labels: {
			datetimeFormatter: {
				year: 'yyyy',
				month: "MMM 'yy",
				day: 'd MMM',
				hour: 'HH:mm',
			},
		},
	},

	tooltip: {
		theme: 'light',
		x: {
			format: 'd MMM yyyy',
		},
		y: {
			title: props.shortTitle,
		},
	},
}));

const series = reactive([
	{
		name: props.shortTitle,
		data: props.graphValues,
	},
]);

// Function for updating the graph based on the selected time. The dates are calculated based on last received timestamp
const updateDate = (timeline: string) => {
	selection.value = timeline;
	const total = props.graphValues.length;
	const lastTime = Date.now();
	switch (timeline) {
		case translations[computedLanguageId.value].thisWeek:
			chart.value.zoomX(lastTime - 604800000, lastTime);
			break;
		case translations[computedLanguageId.value].thisMonth:
			chart.value.zoomX(lastTime - 2629743000, lastTime);
			break;
		case translations[computedLanguageId.value].sixMonths:
			chart.value.zoomX(lastTime - 15778463000, lastTime);
			break;
		case translations[computedLanguageId.value].thisYear:
			chart.value.zoomX(lastTime - 31556926000, lastTime);
			break;
		case translations[computedLanguageId.value].allDataThisYear:
			chart.value.zoomX(props.graphValues[0][0], props.graphValues[total - 1][0]);
			break;
		default:
	}
};

watch(selection, (newValue) => {
	chartOptions.value.subtitle.text = newValue;
});
</script>

<!-- Analytics card component containing a title and the actual graph -->
<template>
	<ClientOnly>
		<ApexCharts
			ref="chart"
			style="width: 100%"
			type="area"
			height="80%"
			:options="chartOptions"
			:series="series"
		></ApexCharts>
		<div class="button-container">
			<el-button default-active="true" color="#ED5087" plain round @click="updateDate(translations[computedLanguageId].thisWeek)">
				{{ translations[computedLanguageId].thisWeek }}
			</el-button>
			<el-button color="#ED5087" plain round @click="updateDate(translations[computedLanguageId].thisMonth)">
				{{ translations[computedLanguageId].thisMonth }}
			</el-button>

			<el-button color="#ED5087" plain round @click="updateDate(translations[computedLanguageId].sixMonths)">
				{{ translations[computedLanguageId].sixMonths }}
			</el-button>

			<el-button color="#ED5087" plain round @click="updateDate(translations[computedLanguageId].thisYear)">
				{{ translations[computedLanguageId].thisYear }}
			</el-button>
		</div>
		<div class="all-data-button">
			<el-button
				style="width: 7vw"
				color="#ED5087"
				plain
				round
				@click="updateDate(translations[computedLanguageId].allDataThisYear)"
			>
				{{ translations[computedLanguageId].allDataThisYear }}
			</el-button>
		</div>
	</ClientOnly>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans');
* {
	font-family: 'Open Sans';
}

.button-container {
	position: absolute;
	bottom: 2%;
	width: 100%;
	display: flex;
	justify-content: center;
}

.all-data-button {
	position: absolute;
	top: 2%;
	left: 2%;
	width: 100%;
}

.el-button {
	width: 5vw;
	height: 2.5vh;
	font-size: 0.8vw;
	font-weight: bold;
}
</style>
