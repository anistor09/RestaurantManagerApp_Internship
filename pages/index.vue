<script lang="ts" setup>
import AnalyticsBarComponent from '~/components/analytics-bar-component.vue';

// Props for bar chart (most sold item), hardcoded until server is ready
const barTitle = 'Most Sold Item';
const itemValues = [400, 430, 448, 470, 540, 580, 690];
const itemNames = [
	'Burger',
	'Coca Cola',
	'Prosecco',
	'French Fries',
	'Ice Cream',
	'Pizza',
	'Salad',
];

// Props for graph chart (total revenue)
const graphTitle = 'Total Generated Revenue';
const graphShortTitle = 'revenue';
const graphTimes = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];
const graphValues = [50, 75, 32, 68, 89, 43, 57, 81, 23, 95, 42, 66];

// Props for graph chart (revenue per item)
const graphTitle2 = 'Revenue per Item';
const graphShortTitle2 = 'revenue';
const graphSubtitle2 = 'Coca Cola';
const graphTimes2 = ['00:00', '01:30', '02:30', '03:30', '04:30', '05:30', '06:30'];
const graphValues2 = [31, 40, 28, 51, 42, 109, 100];
</script>

<template>
	<PageTitle title="Home"></PageTitle>
	<div style="padding-top: 0.5vh; padding-left: 2vw; padding-right: 2vw">
		<RestaurantComponent></RestaurantComponent>
	</div>
	<el-row>
		<el-col :span="6" :offset="0">
			<AnalyticsGraphComponent
				:title="graphTitle"
				:short-title="graphShortTitle"
				:graph-times="graphTimes"
				:graph-values="graphValues"
			/>
		</el-col>
		<el-col :span="6" :offset="2">
			<AnalyticsBarComponent
				:item-names="itemNames"
				:item-values="itemValues"
				:title="barTitle"
			></AnalyticsBarComponent>
		</el-col>
		<el-col :span="6" :offset="2">
			<AnalyticsGraphComponent
				:title="graphTitle2"
				:subtitle="graphSubtitle2"
				:short-title="graphShortTitle2"
				:graph-times="graphTimes2"
				:graph-values="graphValues2"
			/>
		</el-col>
	</el-row>
</template>

<style scoped></style>
