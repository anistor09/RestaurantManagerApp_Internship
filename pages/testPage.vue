<script lang="ts" setup>
import { useRestaurantStore } from '../store/restaurant';
const restaurantStore = useRestaurantStore();
const restaurant = restaurantStore.restaurantGetter;
console.log(restaurant.carteSet)
</script>

<template>
	<div>{{ restaurant.carteSet }}</div>
</template>
