import { it, expect } from "vitest";
import { mount } from "@vue/test-utils"
import MenusPage from '../pages/menus.vue';
import EditMenuComponent from '../components/edit-menu-component.vue';
import AddItemInMenuComponent from '../components/add-item-in-menu-component.vue';
import AddMenuComponent from '../components/add-menu-component.vue';


it('renders menus page', () => {
	const wrapper = mount(MenusPage);
	expect(wrapper.exists()).toBe(true);
});

it('selects a menu', async () => {
	const wrapper = mount(MenusPage);
	const selectMenu = wrapper.find('[data-testid="select-menu"]');
	await selectMenu.setValue('ALL DAY MENU');
	expect(selectMenu.element.value).toBe('ALL DAY MENU');
});

it('opens add menu dialog', async () => {
	const wrapper = mount(MenusPage);
	const addMenuButton = wrapper.find('[data-testid="add-menu-button"]');
	await addMenuButton.trigger('click');
	const addMenuComponent = wrapper.findComponent(AddMenuComponent);
	expect(addMenuComponent.exists()).toBe(true);
});

it('opens edit menu dialog', async () => {
	const wrapper = mount(MenusPage);
	const editMenuButton = wrapper.find('[data-testid="edit-menu-button"]');
	await editMenuButton.trigger('click');
	const editMenuComponent = wrapper.findComponent(EditMenuComponent);
	expect(editMenuComponent.exists()).toBe(true);
});

it('opens add item dialog', async () => {
	const wrapper = mount(MenusPage);
	const addItemButton = wrapper.find('[data-testid="place-item-button"]');
	await addItemButton.trigger('click');
	const addItemComponent = wrapper.findComponent(AddItemInMenuComponent);
	expect(addItemComponent.exists()).toBe(true);
});

it('renders add menu component', () => {
	const wrapper = mount(MenusPage);
	const addMenuComponent = wrapper.findComponent(AddMenuComponent);
	expect(addMenuComponent.exists()).toBe(true);
});