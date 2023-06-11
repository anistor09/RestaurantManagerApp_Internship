import { vi, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import Home from '../pages/index.vue';

import PageTitle from '../components/page-title.vue';
import AnalyticsBarComponent from '../components/analytics-bar-component.vue';
import AnalyticsGraphComponent from '../components/analytics-graph-component.vue';
import RestaurantComponent from '../components/restaurant-component.vue';
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

vi.mock('vue3-apexcharts')

// Basic UI tests

it('Renders page', () => {
	const wrapper = mount(Home);
	expect(wrapper.exists()).toBe(true);
});

it('Check if title is passed correctly', () => {
	const wrapper = mount(Home);
	const title = wrapper.findComponent(PageTitle);
	expect(title.exists()).toBe(true);
	expect(title.props('title')).toBe('Home');
});

it('Find bar analytic on page', () => {
	const wrapper = mount(Home);
	const analytic = wrapper.findComponent(AnalyticsBarComponent);
	expect(analytic.exists()).toBe(true);
});

it('Find graph analytic on page', () => {
	const wrapper = mount(Home);
	const analytic = wrapper.findComponent(AnalyticsGraphComponent);
	expect(analytic.exists()).toBe(true);
});

it('Find restaurant component on page', () => {
	const wrapper = mount(Home);
	const analytic = wrapper.findComponent(RestaurantComponent);
	expect(analytic.exists()).toBe(true);
});
