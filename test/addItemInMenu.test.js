import { vi, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import AddItemInMenu from '../components/add-item-in-menu-component.vue';

import languages from '../mockData/languages.json';
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

vi.mock('../store/language.ts', () => {
    return {
        useLanguageStore: vi.fn(() => {
            return {
                languageGetter: languages[0],
				idGetter: 0
            };
        }),
    };
});

const wrapper = mount(AddItemInMenu,{
    propsData: {
        menu: {},
        dummy: "",
    },
});

it('Renders popup', () => {
	expect(wrapper.exists()).toBe(true);
});

it('Category subtitle', () => {
	const prefix = wrapper.find('#categoryIdPrefix');
    expect(prefix.exists()).toBe(true);
    expect(prefix.text()).toBe("Category:")
});

it('SubCategory subtitle', () => {
	const prefix = wrapper.find('#subcategoryIdPrefix');
    expect(prefix.exists()).toBe(true);
    expect(prefix.text()).toBe("Subcategory:")
});

it('Item subtitle', () => {
	const prefix = wrapper.find('#itemIdPrefix');
    expect(prefix.exists()).toBe(true);
    expect(prefix.text()).toBe("Item:")
});