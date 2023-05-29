import { defineStore } from 'pinia';
import { Restaurant } from '~/interfaces/Restaurant';

interface RestaurantState {
	restaurant: Restaurant;
	loading: boolean;
}

export const useRestaurantStore = defineStore({
	id: 'restaurant-store',
	state: (): RestaurantState => ({
		restaurant: {} as Restaurant,
		loading: true,
	}),
	actions: {
		async getRestaurant() {
			try {
				const response = await fetch('/api/store');
				const data = await response.json();
				this.restaurant = data;
			} catch (error) {
				console.log(error);
			} finally {
				this.loading = false;
			}
		},
	},
	getters: {
		restaurantGetter: (state) => state.restaurant,
		loadingGetter: (state) => state.loading,
	},
});
