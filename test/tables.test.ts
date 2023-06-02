import { vi, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import restaurants from '../mockData/restaurants.json';
import TablesPage from '../pages/tables.vue';

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

it('renders tables page', () => {
	const wrapper = mount(TablesPage);
	expect(wrapper.exists()).toBe(true);
});

it('opens add menu dialog', () => {
	const wrapper = mount(TablesPage);
	const buttonContainer = wrapper.find('#buttonContainer');
	expect(buttonContainer.exists()).toBe(true);
	expect(buttonContainer.text()).toContain('Add Table');
});
