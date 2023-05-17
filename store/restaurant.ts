import { defineStore } from 'pinia'
import { Restaurant } from '~/interfaces/Restaurant';

interface RestaurantState{
    id: Number,
    restaurant: Restaurant,
    loading: boolean
}

export const useRestaurantStore = defineStore({
    id: 'restaurant-store',
    state: (): RestaurantState => ({
        id: 1,
        restaurant: null,
        loading: true,
    }),
    actions: {
        async getRestaurant() {
            try {
                const response = await fetch(`https://dev-api.ewai.fr/restaurant/${this.id}`, { mode: 'no-cors' });
                const data = await response.json();
                this.restaurant = data;
            } catch (error) {
                console.log(error);
            } finally {
                this.loading = false;
            }
        }
    },
    getters: {
        restaurantGetter: state => state.restaurant,
        restaurantIdGetter: state => state.id,
        loadingGetter: state => state.loading
    }
})