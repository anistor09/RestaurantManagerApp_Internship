<script lang="ts" setup>
const ApexCharts = defineAsyncComponent(() => import('vue3-apexcharts'));
const props = defineProps({
	title: {
		type: String,
		required: true,
	},
    itemNames: {
        type: Array as () => String[],
        required: true
    },
    itemValues: {
        type: Array as () => Number[],
        required: true
    }
});

const chartOptions = ref({
	chart: {
		type: 'bar',
		height: 380,
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
        show: false
    },
	colors: [
  '#ED5087',
  '#F5847A',
  '#F8A869',
  '#FDC460'
],
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
		categories: props.itemNames
	},
	yaxis: {
		labels: {
			show: false,
		},
	},
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
});

const series = reactive([
	{
		data: props.itemValues
	},
]);
</script>

<!-- Analytics card component containing a title and the actual graph -->
<template>
	<el-card id="card" shadow="always">
		<ClientOnly>
			<ApexCharts type="bar" height="400" :options="chartOptions" :series="series"></ApexCharts>
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
