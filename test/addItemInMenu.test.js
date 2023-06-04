import { vi, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import AddItemInMenu from '../components/add-item-in-menu-component.vue';


import restaurants from '../mockData/restaurants.json';


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

it('Renders popup', () => {
	const wrapper = mount(AddItemInMenu);
	expect(wrapper.exists()).toBe(true);
});

it('Category subtitle', () => {
    const wrapper = mount(AddItemInMenu);
	const prefix = wrapper.find('#categoryIdPrefix');
    expect(prefix.exists()).toBe(true);
    expect(prefix.text()).toBe("Category:")
});

it('SubCategory subtitle', () => {
    const wrapper = mount(AddItemInMenu);
	const prefix = wrapper.find('#subcategoryIdPrefix');
    expect(prefix.exists()).toBe(true);
    expect(prefix.text()).toBe("Subcategory:")
});

it('Item subtitle', () => {
    const wrapper = mount(AddItemInMenu);
	const prefix = wrapper.find('#itemIdPrefix');
    expect(prefix.exists()).toBe(true);
    expect(prefix.text()).toBe("Item:")
});