import { defineStore } from 'pinia';
import { Restaurant } from '~/interfaces/Restaurant';

interface RestaurantState {
	restaurant: Restaurant;
}

export const useRestaurantStore = defineStore({
	id: 'restaurant-store',
	state: (): RestaurantState => ({
		restaurant: {} as Restaurant,
	}),
	actions: {
		async getRestaurant() {
			try {
				const response = await useFetch('/api/store');
				const data = await response.data.value;
				this.restaurant = data;
			} catch (error) {
				console.log(error);
			}
		},
	},
	getters: {
		restaurantGetter: (state) => state.restaurant,
	},
});

