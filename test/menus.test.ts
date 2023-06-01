import { vi, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import restaurants from '../mockData/restaurants.json';
import testPage from '../pages/menus.vue';
import EditMenuComponent from '../components/edit-menu-component.vue';
import AddItemInMenuComponent from '../components/add-item-in-menu-component.vue';
import AddMenuComponent from '../components/add-menu-component.vue';

vi.mock('../store/restaurant.ts', () => {
	return {
		useRestaurantStore: vi.fn(() => {
			return {
				restaurantGetter: restaurants[0],
				getRestaurant: vi.fn(),
			};
		}),
	};
});

it('renders menus page', () => {
	const wrapper = mount(testPage);
	expect(wrapper.exists()).toBe(true);
});
