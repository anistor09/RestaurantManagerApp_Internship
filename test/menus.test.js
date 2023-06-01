import { shallowMount } from '@vue/test-utils';
import mockRestaurants from '../mockData/restaurants.json';
import MenusPage from '../pages/menus.vue';
import EditMenuComponent from '../components/edit-menu-component.vue';
import AddItemInMenuComponent from '../components/add-item-in-menu-component.vue';
// import SubcategoryComponent from '../components/subcategory-component.vue';
import AddMenuComponent from '../components/add-menu-component.vue';

jest.mock('../store/restaurant', () => ({
	useRestaurantStore: jest.fn(() => ({
		restaurantGetter: mockRestaurants[0],
		getRestaurant: jest.fn(),
	})),
}));

test('renders menus page', () => {
	const wrapper = shallowMount(MenusPage);
	expect(wrapper.exists()).toBe(true);
});

test('selects a menu', async () => {
	const wrapper = shallowMount(MenusPage);
	const selectMenu = wrapper.find('[data-testid="select-menu"]');
	await selectMenu.setValue('ALL DAY MENU');
	expect(selectMenu.element.value).toBe('ALL DAY MENU');
});

test('opens add menu dialog', async () => {
	const wrapper = shallowMount(MenusPage);
	const addMenuButton = wrapper.find('[data-testid="add-menu-button"]');
	await addMenuButton.trigger('click');
	const addMenuComponent = wrapper.findComponent(AddMenuComponent);
	expect(addMenuComponent.exists()).toBe(true);
});

test('opens edit menu dialog', async () => {
	const wrapper = shallowMount(MenusPage);
	const editMenuButton = wrapper.find('[data-testid="edit-menu-button"]');
	await editMenuButton.trigger('click');
	const editMenuComponent = wrapper.findComponent(EditMenuComponent);
	expect(editMenuComponent.exists()).toBe(true);
});

test('opens add item dialog', async () => {
	const wrapper = shallowMount(MenusPage);
	const addItemButton = wrapper.find('[data-testid="place-item-button"]');
	await addItemButton.trigger('click');
	const addItemComponent = wrapper.findComponent(AddItemInMenuComponent);
	expect(addItemComponent.exists()).toBe(true);
});

test('renders add menu component', () => {
	const wrapper = shallowMount(MenusPage);
	const addMenuComponent = wrapper.findComponent(AddMenuComponent);
	expect(addMenuComponent.exists()).toBe(true);
});
