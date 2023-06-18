import { vi, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import restaurants from '../mockData/restaurants.json';
import languages from '../mockData/languages.json';
import SettingsPage from '../pages/settings.vue';
import PageTitle from '../components/page-title.vue';
import currencies from '../mockData/currecyMock.json';
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
const wrapper = mount(SettingsPage);

it('renders settings page', () => {
	expect(wrapper.exists()).toBe(true);
});

it('title works', () => {
	const title = wrapper.findComponent(PageTitle);
	expect(title.exists()).toBe(true);
	expect(title.props('title')).toBe('Restaurant Overview');
});

it('descriptionPrefix', () => {
	const name = wrapper.find('#descriptionIdPrefix');
	expect(name.exists()).toBe(true);
	expect(name.text()).toBe('Description:');
});


it('phonePrefix', () => {
	const name = wrapper.find('#phoneIdPrefix');
	expect(name.exists()).toBe(true);
	expect(name.text()).toBe('Phone Number:');
});


it('emailPrefix', () => {
	const name = wrapper.find('#mailIdPrefix');
	expect(name.exists()).toBe(true);
	expect(name.text()).toBe('Email:');
});

it('categoryPrefix', () => {
	const name = wrapper.find('#categoryIdPrefix');
	expect(name.exists()).toBe(true);
	expect(name.text()).toBe('Category:');
});

it('hoursPrefix', () => {
	const name = wrapper.find('#hoursId');
	expect(name.exists()).toBe(true);
	expect(name.text()).toBe('Working Hours:');
});

it('backgroundPrefix', () => {
	const name = wrapper.find('#backgroundPrefix');
	expect(name.exists()).toBe(true);
	expect(name.text()).toBe('Background Image:');
});

it('Name correct', () => {
    const name = wrapper.find('#nameId');
	expect(name.exists()).toBe(true)
    expect(name.element.value).toBe('Mocked Restaurant');
});


it('Address correct', () => {
    const address = wrapper.find('#addressId');
	expect(address.exists()).toBe(true)
    expect(address.element.value).toBe('Address of Mocked Restaurant');
});

it('Description correct', () => {
    const description = wrapper.find('#descriptionId');
	expect(description.exists()).toBe(true)
    expect(description.element.value).toBe('The Commons is a central spot where all members of our TSH family can come to together to share drinks, food and the things they have in common.');
});


it('Phone correct', () => {
    const phone = wrapper.find('#phoneId');
	expect(phone.exists()).toBe(true)
    expect(phone.element.value).toBe('0123456789');
});

it('Email correct', () => {
    const mail = wrapper.find('#mailId');
	expect(mail.exists()).toBe(true)
    expect(mail.element.value).toBe('mocked@gmail.com');
});

it('Category correct', () => {
    const category = wrapper.find('#categoryId');
	expect(category.exists()).toBe(true)
    expect(category.element.value).toBe('italian');
});

it('Buttons for logo are rendered', () => {
    const changeButton = wrapper.find('[data-testid="changeLogoButton"]');
	expect(changeButton.exists()).toBe(true)
    const deleteButton = wrapper.find('[data-testid="deleteLogoButton"]');
	expect(deleteButton.exists()).toBe(true)
});

it('Buttons for background are rendered', () => {
    const changeButton = wrapper.find('[data-testid="changeBackButton"]');
	expect(changeButton.exists()).toBe(true)
    const deleteButton = wrapper.find('[data-testid="deleteBackButton"]');
	expect(deleteButton.exists()).toBe(true)
});
