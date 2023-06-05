<script lang="ts" setup>
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
});

const chartOptions = ref({
	chart: {
		height: 350,
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
		align: 'left',
		style: {
			fontWeight: 'bolder',
			fontFamily: 'Open Sans',
			color: '#ED5087',
		},
	},
	xaxis: {
		categories: ['00:00', '01:30', '02:30', '03:30', '04:30', '05:30', '06:30'],
	},
	tooltip: {
		x: {
			format: 'dd/MM/yy HH:mm',
		},
	},
});

const series = reactive([
	{
		name: props.shortTitle,
		data: [31, 40, 28, 51, 42, 109, 100],
	},
]);
</script>

<!-- Analytics card component containing a title and the actual graph -->
<template>
	<el-card id="card" shadow="always">
		<ClientOnly>
			<ApexCharts type="area" height="400" :options="chartOptions" :series="series"></ApexCharts>
		</ClientOnly>
	</el-card>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans');

* {
	font-family: 'Open Sans';
}

#card {
	border-radius: 3vw;
	width: 25vw;
	height: 48vh;
	cursor: pointer;
}

#title {
	color: #ed5087;
}
</style>
