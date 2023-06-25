import { vi, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import EditMenu from '../components/edit-menu-component.vue';
import restaurants from '../mockData/restaurants.json';
import languages from '../mockData/languages.json';

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
it('Renders popup', () => {
	const wrapper = mount(EditMenu, {
		propsData: {
			restaurant: restaurants[0],
			menu: restaurants[0].carteSet[1],
		},
	});
	expect(wrapper.exists()).toBe(true);
});

it('Buttons', () => {
	const wrapper = mount(EditMenu, {
		propsData: {
			restaurant: restaurants[0],
			menu: restaurants[0].carteSet[1],
		},
	});
	const buttons = wrapper.findAll('.specialPhotoButton');
	expect(buttons.length).toBe(3);
	expect(buttons[0].text()).toBe('Delete');
	expect(buttons[1].text()).toBe('Save menu');
	expect(buttons[2].text()).toBe('Delete menu');
});

it('Name subtitle', () => {
	const wrapper = mount(EditMenu, {
		propsData: {
			restaurant: restaurants[0],
			menu: restaurants[0].carteSet[1],
		},
	});
	const name = wrapper.find('#nameIdPrefix');
	expect(name.exists()).toBe(true);
	expect(name.text()).toBe('Name');
});

it('Description subtitle', () => {
	const wrapper = mount(EditMenu, {
		propsData: {
			restaurant: restaurants[0],
			menu: restaurants[0].carteSet[1],
		},
	});
	const description = wrapper.find('#descriptionIdPrefix');
	expect(description.exists()).toBe(true);
	expect(description.text()).toBe('Description');
});

it('Name', () => {
	const wrapper = mount(EditMenu, {
		propsData: {
			restaurant: restaurants[0],
			menu: restaurants[0].carteSet[1],
		},
	});
	const name = wrapper.find('#nameId');
	expect(name.exists()).toBe(true);
	expect(name.element.value).toBe('Carte du soir');
});

it('Description subtitle', () => {
	const wrapper = mount(EditMenu, {
		propsData: {
			restaurant: restaurants[0],
			menu: restaurants[0].carteSet[1],
		},
	});
	const description = wrapper.find('#descriptionId');
	expect(description.exists()).toBe(true);
	expect(description.element.value).toBe("Ceci est la carte du soir que l'on utilise le soir");
});
