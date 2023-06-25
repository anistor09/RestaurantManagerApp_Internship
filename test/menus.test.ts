import { vi, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import restaurants from '../mockData/restaurants.json';
import languages from '../mockData/languages.json';
import MenusPage from '../pages/menus.vue';
import currencies from '../mockData/currecyMock.json'
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
vi.mock('../store/currency.ts', () => {
    return {
        useCurrencyStore: vi.fn(() => {
            return {
                currencyGetter: currencies[0],
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
it('renders menus page', () => {
	const wrapper = mount(MenusPage);
	expect(wrapper.exists()).toBe(true);
});

it('opens add menu dialog', () => {
	const wrapper = mount(MenusPage);
	const addMenuButton = wrapper.find('#menus-steps');
	expect(addMenuButton.exists()).toBe(true);
	expect(addMenuButton.text()).toBe(
		'Step 1: Select your menu \nStep 2: Choose the category \nStep 3: Choose the subcategory \nStep 4: Happy editing!',
	);
});
