<script>
import { useRestaurantStore } from '../store/restaurant';
import { Restaurant } from '../interfaces/Restaurant';
const restaurantStore = useRestaurantStore();
const restaurant = restaurantStore.restaurantGetter;
console.log(restaurant.name)
</script>

<template>
    <div>{{useRestaurantStore().restaurantGetter.name}}</div>
</template>