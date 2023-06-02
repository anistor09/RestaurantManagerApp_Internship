import { vi, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import restaurants from '../mockData/restaurants.json';
import MenusPage from '../pages/menus.vue';
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
	const wrapper = mount(MenusPage);
	expect(wrapper.exists()).toBe(true);
});

it('opens add menu dialog', async () => {
	const wrapper = mount(MenusPage);
	const addMenuButton = wrapper.find('#menus-steps');
	expect(addMenuButton.exists()).toBe(true);
	expect(addMenuButton.text()).toBe(
		'Step 1: Select your menu \nStep 2: Choose the category \nStep 3: Choose the subcategory \nStep 4: Happy editing!',
	);
});
