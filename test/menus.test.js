import { vi, it, expect } from 'vitest';
import { ElSelect } from 'element-plus';
import { mount } from '@vue/test-utils';


import Menus from '../pages/menus.vue';
import currencies from '../mockData/currecyMock.json'
import languages from '../mockData/languages.json';
import AddMenuComponent from '../components/add-menu-component.vue';
import PageTitle from '../components/page-title.vue';
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
        useCurrencyStore: vi.fn(() => {
            return {
                languageGetter: languages[0],
				idGetter: 0
            };
        }),
    };
});
// Basic UI tests

it('Renders menus page', () => {
	const wrapper = mount(Menus);
	expect(wrapper.exists()).toBe(true);
});

it('Check if instructions are displayed', () => {
	const wrapper = mount(Menus);
	const instructions = wrapper.find('#menus-instructions');
	expect(instructions.text()).toBe('Manage and customize your menus easily with these steps:');
});

it('Check if steps are displayed', () => {
	const wrapper = mount(Menus);
	const steps = wrapper.find('#menus-steps');
	expect(steps.text()).toBe(
		'Step 1: Select your menu \nStep 2: Choose the category \nStep 3: Choose the subcategory \nStep 4: Happy editing!',
	);
});

it('Check if title is passed correctly', () => {
	const wrapper = mount(Menus);
	const title = wrapper.findComponent(PageTitle);
	expect(title.exists()).toBe(true);
	expect(title.props('title')).toBe('Menus');
})

it('Open Add Menu pop-up on click', async () => {
	const wrapper = mount(Menus)
	const button = wrapper.find('[data-testid="add-menu-button"]')
	await button.trigger('click')

	const popup = wrapper.findComponent(AddMenuComponent);
  	expect(popup.exists()).toBe(true);
})

it('Check if select menu exists', () => {
	const wrapper = mount(Menus)
	const select = wrapper.findComponent(ElSelect)
	expect(select.exists()).toBe(true);
})

  

