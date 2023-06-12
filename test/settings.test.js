import { vi, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import restaurants from '../mockData/restaurants.json';
import SettingsPage from '../pages/settings.vue';
import PageTitle from '../components/page-title.vue';
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
it('renders settings page', () => {
	const wrapper = mount(SettingsPage);
	expect(wrapper.exists()).toBe(true);
});

it('title works', () => {
	const wrapper = mount(SettingsPage);
	const title = wrapper.findComponent(PageTitle);
	expect(title.exists()).toBe(true);
	expect(title.props('title')).toBe('Restaurant Overview');
});

it('descriptionPrefix', () => {
	const wrapper = mount(SettingsPage);
	const name = wrapper.find('#descriptionIdPrefix');
	expect(name.exists()).toBe(true);
	expect(name.text()).toBe('Description:');
});


it('phonePrefix', () => {
	const wrapper = mount(SettingsPage);
	const name = wrapper.find('#phoneIdPrefix');
	expect(name.exists()).toBe(true);
	expect(name.text()).toBe('Phone Number:');
});


it('emailPrefix', () => {
	const wrapper = mount(SettingsPage);
	const name = wrapper.find('#mailIdPrefix');
	expect(name.exists()).toBe(true);
	expect(name.text()).toBe('Email:');
});

it('categoryPrefix', () => {
	const wrapper = mount(SettingsPage);
	const name = wrapper.find('#categoryIdPrefix');
	expect(name.exists()).toBe(true);
	expect(name.text()).toBe('Category:');
});

it('hoursPrefix', () => {
	const wrapper = mount(SettingsPage);
	const name = wrapper.find('#hoursId');
	expect(name.exists()).toBe(true);
	expect(name.text()).toBe('Working Hours:');
});

it('Name correct', () => {
    const wrapper = mount(SettingsPage);
    const name = wrapper.find('#nameId');
	expect(name.exists()).toBe(true)
    expect(name.element.value).toBe('Mocked Restaurant');
});


it('Address correct', () => {
    const wrapper = mount(SettingsPage);
    const address = wrapper.find('#addressId');
	expect(address.exists()).toBe(true)
    expect(address.element.value).toBe('Address of Mocked Restaurant');
});

it('Description correct', () => {
    const wrapper = mount(SettingsPage);
    const description = wrapper.find('#descriptionId');
	expect(description.exists()).toBe(true)
    expect(description.element.value).toBe('The Commons is a central spot where all members of our TSH family can come to together to share drinks, food and the things they have in common.');
});


it('Phone correct', () => {
    const wrapper = mount(SettingsPage);
    const phone = wrapper.find('#phoneId');
	expect(phone.exists()).toBe(true)
    expect(phone.element.value).toBe('0123456789');
});

it('Email correct', () => {
    const wrapper = mount(SettingsPage);
    const mail = wrapper.find('#mailId');
	expect(mail.exists()).toBe(true)
    expect(mail.element.value).toBe('mocked@gmail.com');
});

it('Category correct', () => {
    const wrapper = mount(SettingsPage);
    const category = wrapper.find('#categoryId');
	expect(category.exists()).toBe(true)
    expect(category.element.value).toBe('italian');
});
