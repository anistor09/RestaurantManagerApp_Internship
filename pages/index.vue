<script lang="ts" setup>
import PageTitle from '../components/page-title.vue';
import AnalyticsBarComponent from '../components/analytics-bar-component.vue';
import AnalyticsGraphComponent from '../components/analytics-graph-component.vue';
import RestaurantComponent from '../components/restaurant-component.vue';

// Props for bar chart (most sold item), hardcoded until server is ready
const barTitle = 'Most Sold Items';
// Mock data, will be deleted once server is ready
const itemValues = [
	[1, 2, 3, 4, 5, 6, 7],
	[8, 9, 10, 11, 12, 13, 14],
	[15, 16, 17, 18, 19, 20, 21],
	[22, 23, 24, 25, 26, 27, 28],
];
const itemNames = [
	['Burger', 'Cheeseburger', 'Chicken Sandwich', 'Fish and Chips', 'Salad', 'Pasta', 'Pizza'],
	['Coca Cola', 'Sprite', 'Fanta', 'Iced Tea', 'Lemonade', 'Mojito', 'Water'],
	['Wine', 'Beer', 'Cocktail', 'Mocktail', 'Whiskey', 'Rum', 'Vodka'],
	[
		'French Fries',
		'Onion Rings',
		'Mozzarella Sticks',
		'Chicken Wings',
		'Nachos',
		'Garlic Bread',
		'Bruschetta',
	],
];

// Props for graph chart (total revenue)
const graphTitle = 'Total Generated Revenue';
const graphShortTitle = 'revenue';
// Mock data, will be deleted once server is ready
const graphValues = [
	[1660191600000, 41.28],
	[1660278000000, 37.89],
	[1660537200000, 43.12],
	[1660623600000, 38.45],
	[1660710000000, 39.72],
	[1660796400000, 42.61],
	[1660882800000, 40.83],
	[1661228400000, 37.99],
	[1661314800000, 41.77],
	[1661401200000, 43.34],
	[1661487600000, 39.55],
	[1661746800000, 42.11],
	[1661833200000, 38.59],
	[1661919600000, 40.6],
];

// Props for graph chart (average order price)
const graphTitle2 = 'Average Basket Price';
const graphShortTitle2 = 'price';
// Mock data, will be deleted once server is ready
const graphValues2 = [
	[1660191600000, 34.12],
	[1660278000000, 36.78],
	[1660537200000, 35.65],
	[1660623600000, 33.92],
	[1660710000000, 32.76],
	[1660796400000, 37.21],
	[1660882800000, 36.43],
	[1661228400000, 35.67],
	[1661314800000, 37.89],
	[1661401200000, 34.98],
	[1661487600000, 32.54],
	[1661746800000, 36.78],
	[1661833200000, 33.91],
	[1661919600000, 35.42],
];
</script>

<template>
	<PageTitle title="Home"></PageTitle>
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
		<el-carousel-item>
			<AnalyticsGraphComponent
				:title="graphTitle"
				:short-title="graphShortTitle"
				:graph-values="graphValues"
			/>
		</el-carousel-item>
		<el-carousel-item>
			<AnalyticsBarComponent
				:item-names="itemNames"
				:item-values="itemValues"
				:title="barTitle"
			></AnalyticsBarComponent>
		</el-carousel-item>
		<el-carousel-item>
			<AnalyticsGraphComponent
				:title="graphTitle2"
				:short-title="graphShortTitle2"
				:graph-values="graphValues2"
			/>
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
