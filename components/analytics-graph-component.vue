<script lang="ts" setup>
const ApexCharts = defineAsyncComponent(() => import('vue3-apexcharts'));
const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	subtitle: {
		type: String,
		required: false,
		default: ""
	},
	shortTitle: {
		type: String,
		required: true,
	},
	graphTimes: {
        type: Array as () => String[],
        required: true
    },
    graphValues: {
        type: Array as () => Number[],
        required: true
    }
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
		align: 'center',
		style: {
			fontWeight: 'bolder',
			fontFamily: 'Open Sans',
			color: '#ED5087',
			fontSize: '18'
		},
	},
	subtitle: {
		text: props.subtitle,
		align: 'center',
		style: {
			fontWeight: 'bold',
			fontFamily: 'Open Sans',
			color: '#242424',
			fontSize: '15'
		},
	},
	xaxis: {
		categories: props.graphTimes,
	},
	tooltip: {
		theme: 'light',
		x: {
			show: false,
		},
		y: {
			title: props.shortTitle
		},
	},
});

const series = reactive([
	{
		name: props.shortTitle,
		data: props.graphValues,
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
