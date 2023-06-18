import { vi, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import restaurants from '../mockData/restaurants.json';
import languages from '../mockData/languages.json';
import TablesPage from '../pages/tables.vue';
import PageTitle from '../components/page-title.vue';
import SearchBar from '../components/search-bar.vue';

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
        useCurrencyStore: vi.fn(() => {
            return {
                languageGetter: languages[0],
				idGetter: 0
            };
        }),
    };
});


it('Renders tables page', () => {
	const wrapper = mount(TablesPage);
	expect(wrapper.exists()).toBe(true);
});

it('Check if search bar and add table buttons exist', () => {
	const wrapper = mount(TablesPage);
	const buttonContainer = wrapper.find('#buttonContainer');
	expect(buttonContainer.exists()).toBe(true);
	expect(buttonContainer.text()).toContain('Add Table');
});

it('Check if title is passed correctly', () => {
	const wrapper = mount(TablesPage);
	const title = wrapper.findComponent(PageTitle);
	expect(title.exists()).toBe(true);
	expect(title.props('title')).toBe('Tables');
});

it('Check if the number of table components is correct', () => {
	const wrapper = mount(TablesPage);
	const container = wrapper.find('#tableContainer');
	expect(container.exists()).toBe(true);
	expect(container.element.childElementCount).toBe(restaurants[0].tableRestaurantSet.length);
});

it('Check if selecting a table xists', () => {
	const wrapper = mount(TablesPage);
	const searchBar = wrapper.findComponent(SearchBar);
	expect(searchBar.exists()).toBe(true);
});
