import { mount } from '@vue/test-utils';
import mockRestaurants from '../mockData/restaurants.json';
import MenusPage from '../pages/menus.vue';


describe('MenusPage', () => {
	it('renders the page correctly', async () => {
	  const { page } = await createViteTest();
	  
	  await page.goto('http://localhost:3000'); // Replace with the actual URL of your page
  
	  const wrapper = mount(MenusPage);
  
	  // Assert that the page title is rendered correctly
	  expect(wrapper.findComponent({ name: 'PageTitle' }).text()).toBe('Menus');
  
	  // Assert that the "Select menu" dropdown is rendered
	  expect(wrapper.find('[data-testid="select-menu"]').exists()).toBe(true);
  
	  // Assert that the "Create new menu" button is rendered
	  expect(wrapper.find('[data-testid="add-menu-button"]').text()).toBe('Create new menu');
  
	  // Assert that the "Edit menu" button is rendered
	  expect(wrapper.find('[data-testid="edit-menu-button"]').text()).toBe('Edit menu');
  
	  // Assert that the "Add item to menu" button is rendered
	  expect(wrapper.find('[data-testid="place-item-button"]').text()).toBe('Add item to menu');
  
	  // Assert that the instructions and steps are rendered correctly
	  expect(wrapper.find('#menus-instructions').text()).toContain('Manage and customize your menus easily');
	  expect(wrapper.find('#menus-steps').text()).toContain('Step 1: Select your menu');
  
	  await page.close();
	});
  });
