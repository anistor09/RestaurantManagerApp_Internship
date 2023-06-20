import {vi, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import restaurants from '../mockData/restaurants.json';
import AddItem from '../pages/editItemView/index.vue';
import EditItemComponent from '../components/edit-item.vue';
import languages from '../mockData/languages.json';

// import optionComponent from '../components/option-component.vue';

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
vi.mock('../store/category.ts', () => {
    return {
        useCategoryStore: vi.fn(() => {
            return {
                categoryGetter: [],
                // getCategory: vi.fn(),
            };
        }),
    };
});
vi.mock('../store/item.ts', () => {
    return {
        useItemStore: vi.fn(() => {
            return {
                itemGetter: [],
                // getCategory: vi.fn(),
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
it('Renders add Item page', () => {
    const wrapper = mount(AddItem);
    expect(wrapper.exists()).toBe(true);
});

it('Renders add edit-item component ADD new item', () => {
    const wrapper = mount(EditItemComponent,{
        propsData: {
            addItem: true,
            itemId : 1
        }
      });
    expect(wrapper.exists()).toBe(true);
});

it('Renders add edit-item component EDIT new item', () => {
    const wrapper = mount(EditItemComponent,{
        propsData: {
            addItem: false,
            itemId : 85
        }
      });
    expect(wrapper.exists()).toBe(true);
});
it('Check if item name is displayed', () => {
    const wrapper = mount(EditItemComponent,{
        propsData: {
            itemId : 85,
            addItem: false,
        }
      });
    const name = wrapper.find('#item-name');
    expect(name.text()).toBe('Name');
});
it('Check if item description is displayed', () => {
    const wrapper = mount(EditItemComponent,{
        propsData: {
            itemId : 85,
            addItem: false,
        }
      });
    const name = wrapper.find('#item-description');
    expect(name.text()).toBe('Description:');
});

it('Check if item ai button description is displayed', () => {
    const wrapper = mount(EditItemComponent,{
        propsData: {
            itemId : 85,
            addItem: false,
        }
      });
    const button = wrapper.find('#item-ai-description');
    expect(button.text()).toBe('✨Write with AI');
});

it('Check if item category is displayed', () => {
    const wrapper = mount(EditItemComponent,{
        propsData: {
            itemId : 85,
            addItem: false,
        }
      });
    const name = wrapper.find('#item-category');
    expect(name.text()).toBe('Category:');
});


it('Check if item add category button is displayed', () => {
    const wrapper = mount(EditItemComponent,{
        propsData: {
            itemId : 85,
            addItem: false,
        }
      });
    const button = wrapper.find('#item-add-category');
    expect(button.text()).toBe('Add category');
});

it('Check if item subcategory is displayed', () => {
    const wrapper = mount(EditItemComponent,{
        propsData: {
            itemId : 85,
            addItem: false,
        }
      });
    const name = wrapper.find('#item-subcategory');
    expect(name.text()).toBe('Subcategory:');
});

it('Check if item add subcategory button is displayed', () => {
    const wrapper = mount(EditItemComponent,{
        propsData: {
            itemId : 85,
            addItem: false,
        }
      });
    const button = wrapper.find('#item-add-subcategory');
    expect(button.text()).toBe('Add subcategory');
});

it('Check if item delete button is displayed', () => {
    const wrapper = mount(EditItemComponent,{
        propsData: {
            itemId : 85,
            addItem: true,
        }
      });
    const button = wrapper.find('#item-cancel-button');
    expect(button.text()).toBe('Cancel');
});

it('Check if item delete button is displayed', () => {
    const wrapper = mount(EditItemComponent,{
        propsData: {
            itemId : 85,
            addItem: false,
        }
      });
    const button = wrapper.find('#item-delete-button');
    expect(button.text()).toBe('Delete');
});

it('Check if item sidedishes is displayed', () => {
    const wrapper = mount(EditItemComponent,{
        propsData: {
            itemId : 85,
            addItem: false,
        }
      });
    const name = wrapper.find('#item-sidedishes');
    expect(name.text()).toBe('Side-dishes');
});

it('Check if item options is displayed', () => {
    const wrapper = mount(EditItemComponent,{
        propsData: {
            itemId : 85,
            addItem: false,
        }
      });
    const name = wrapper.find('#item-options');
    expect(name.text()).toBe('Options');
});

it('Check if item add option button is displayed', () => {
    const wrapper = mount(EditItemComponent,{
        propsData: {
            itemId : 85,
            addItem: false,
        }
      });
    const button = wrapper.find('#item-add-option');
    expect(button.text()).toBe('Add option');
});

it('Check if item presentation is displayed', () => {
    const wrapper = mount(EditItemComponent,{
        propsData: {
            itemId : 85,
            addItem: false,
        }
      });
    const name = wrapper.find('#item-presentation');
    expect(name.text()).toBe('Presentation Order');
});

it('Check if item price is displayed', () => {
    const wrapper = mount(EditItemComponent,{
        propsData: {
            itemId : 85,
            addItem: false,
        }
      });
    const name = wrapper.find('#item-price');
    expect(name.text()).toBe('Price');
});

it('Check if item long description is displayed', () => {
    const wrapper = mount(EditItemComponent,{
        propsData: {
            itemId : 85,
            addItem: false,
        }
      });
    const name = wrapper.find('#item-long-description');
    expect(name.text()).toBe('Long Description');
});

it('Check if item ai long description button is displayed', () => {
    const wrapper = mount(EditItemComponent,{
        propsData: {
            itemId : 85,
            addItem: false,
        }
      });
    const button = wrapper.find('#item-ai-long-description');
    expect(button.text()).toBe('✨Write with AI');
});

it('Check if item photo is displayed', () => {
    const wrapper = mount(EditItemComponent,{
        propsData: {
            itemId : 85,
            addItem: false,
        }
      });
    const name = wrapper.find('#item-photo');
    expect(name.text()).toBe('Photo');
});

it('Check if item delete photo button is displayed', () => {
    const wrapper = mount(EditItemComponent,{
        propsData: {
            itemId : 85,
            addItem: false,
        }
      });
    const button = wrapper.find('#item-photo-delete');
    expect(button.text()).toBe('Delete');
});

it('Check if item allergens is displayed', () => {
    const wrapper = mount(EditItemComponent,{
        propsData: {
            itemId : 85,
            addItem: false,
        }
      });
    const name = wrapper.find('#item-allergens');
    expect(name.text()).toBe('Alergens');
});

it('Check if item save button is displayed', () => {
    const wrapper = mount(EditItemComponent,{
        propsData: {
            itemId : 85,
            addItem: false,
        }
      });
    const button = wrapper.find('#item-save-button');
    expect(button.text()).toBe('Save');
});
