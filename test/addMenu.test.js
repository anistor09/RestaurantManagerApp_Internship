import { vi, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import AddMenu from '../components/add-menu-component.vue';


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
	const wrapper = mount(AddMenu);
	expect(wrapper.exists()).toBe(true);
});

it('Buttons', () => {
    const wrapper = mount(AddMenu);
	const buttons = wrapper.findAll(".specialPhotoButton");
    expect(buttons.length).toBe(3);
    expect(buttons[0].text()).toBe("Change")
    expect(buttons[1].text()).toBe("Delete")
    expect(buttons[2].text()).toBe("Add")
});

it('Name subtitle', () => {
    const wrapper = mount(AddMenu);
	const name = wrapper.find('#nameIdPrefix');
    expect(name.exists()).toBe(true);
    expect(name.text()).toBe("Name")
});

it('Description subtitle', () => {
    const wrapper = mount(AddMenu);
	const description = wrapper.find('#descriptionIdPrefix');
    expect(description.exists()).toBe(true);
    expect(description.text()).toBe("Description:")
});