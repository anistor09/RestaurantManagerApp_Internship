<script lang="ts" setup>
import { useRestaurantStore } from '~/store/restaurant';
const restaurantStore = useRestaurantStore();
const restaurant = restaurantStore.restaurantGetter;
const tables = restaurant.tableRestaurantSet;
</script>

<template>
	<div>
		<header id="header">Tables</header>
		<main>
			<div id="buttonContainer">
				<SearchBar :options="tables.map((x) => 'Table ' + x.number)" />
				<el-button color="#ED5087" plain round>Add Table</el-button>
			</div>
			<div id="tableContainer">
				<TableComponent v-for="table in tables" :number="table.number" :capacity="table.capacity" />
			</div>
		</main>
	</div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans');

* {
	font-family: 'Open Sans';
}
#header {
	font-weight: bolder;
	font-size: 3vw;
}
header {
	height: 10vh;
	display: flex;
	justify-content: left;
	padding-left: 4%;
	align-items: center;
	border-bottom: 8px solid #ff5c78 !important;
	border-color: black;
}
#buttonContainer {
	display: flex;
	padding-top: 2%;
	padding-left: 5%;
	padding-right: 5%;
	justify-content: space-between;
	align-items: center;
	font-family: 'Cairo';
}
#tableContainer {
	display: grid;
	justify-items: center;
	align-items: center;
	grid-template-columns: repeat(5, 20%);
	grid-auto-rows: 60%;
}
</style>
