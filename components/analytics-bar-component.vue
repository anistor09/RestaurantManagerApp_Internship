<script lang="ts" setup>
import { ref, defineAsyncComponent, computed, watch } from 'vue';

const ApexCharts = defineAsyncComponent(() => import('vue3-apexcharts'));
const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	itemNames: {
		type: Array as () => string[][],
		required: true,
	},
	itemValues: {
		type: Array as () => number[][],
		required: true,
	},
});

const selection = ref('This year');

const chartOptions = computed(() => ({
	chart: {
		type: 'bar',
		height: '80%',
	},
	plotOptions: {
		bar: {
			barHeight: '100%',
			distributed: true,
			horizontal: true,
			dataLabels: {
				position: 'bottom',
			},
		},
	},
	legend: {
		show: false,
	},
	colors: ['#ED5087', '#F5847A', '#F8A869', '#FDC460'],
	dataLabels: {
		enabled: true,
		textAnchor: 'start',
		style: {
			colors: ['#242424'],
			fontFamily: 'Open Sans',
		},
		formatter: function (val: any, opt: any) {
			return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val;
		},
		offsetX: 0,
	},
	stroke: {
		width: 1,
		colors: ['#fff'],
	},
	xaxis: {
		categories: props.itemNames[3] === undefined ? [] : props.itemNames[3],
	},
	yaxis: {
		labels: {
			show: false,
		},
	},
	noData: {
		text: 'No data for selected period',
		align: 'center',
		verticalAlign: 'middle',
		style: {
			color: '#ED5087',
			fontSize: '25',
			fontFamily: 'Open Sans',
		},
	},
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
	tooltip: {
		theme: 'light',
		x: {
			show: false,
		},
		y: {
			title: {
				formatter: function () {
					return '';
				},
			},
		},
	},
}));

const series = ref([
	{
		data: props.itemValues[3] === undefined ? [] : props.itemValues[3],
	},
]);

const updateDate = (timeline: string) => {
	selection.value = timeline;
	switch (timeline) {
		case 'This week':
			series.value = [{ data: props.itemValues[0] }];
			break;
		case 'This month':
			series.value = [{ data: props.itemValues[1] }];
			break;
		case 'Six months':
			series.value = [{ data: props.itemValues[2] }];
			break;
		case 'This year':
			series.value = [{ data: props.itemValues[3] }];
			break;
		default:
	}
};

watch(selection, (newValue) => {
	chartOptions.value.subtitle.text = newValue;
	switch (newValue) {
		case 'This week':
			chartOptions.value.xaxis.categories = props.itemNames[0];
			break;
		case 'This month':
			chartOptions.value.xaxis.categories = props.itemNames[1];
			break;
		case 'Six months':
			chartOptions.value.xaxis.categories = props.itemNames[2];
			break;
		case 'This year':
			chartOptions.value.xaxis.categories = props.itemNames[3];
			break;
	}
});
</script>

<!-- Analytics card component containing a title and the actual graph -->
<template>
	<ClientOnly>
		<ApexCharts
			style="width: 100%"
			type="bar"
			height="80%"
			:options="chartOptions"
			:series="series"
		></ApexCharts>
		<div class="button-container">
			<el-button default-active="true" color="#ED5087" plain round @click="updateDate('This week')">
				This Week
			</el-button>
			<el-button color="#ED5087" plain round @click="updateDate('This month')">
				This Month
			</el-button>

			<el-button color="#ED5087" plain round @click="updateDate('Six months')">
				Six Months
			</el-button>

			<el-button color="#ED5087" plain round @click="updateDate('This year')">
				This Year
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
	bottom: 4%;
	width: 100%;
	display: flex;
	justify-content: center;
}

.el-button {
	width: 5vw;
	height: 2.5vh;
	font-size: 0.8vw;
	font-weight: bold;
}
</style>
