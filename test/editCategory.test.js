import {vi, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import restaurants from '../mockData/restaurants.json';
import categories from '../mockData/categories.json';
import AddCategory from '../pages/editCategoryView/index.vue';
import EditCategoryComponent from '../components/edit-category.vue';
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
vi.mock('../store/category.ts', () => {
    return {
        useCategoryStore: vi.fn(() => {
            return {
                categoryGetter: categories,
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
it('Renders add category page', () => {
    const wrapper = mount(AddCategory);
    expect(wrapper.exists()).toBe(true);
});
it('Renders add edit-category component EDIT new category', () => {
    const wrapper = mount(EditCategoryComponent,{
        propsData: {
            addCategory: true,
            categoryId : 1
        }
      });
    expect(wrapper.exists()).toBe(true);
});
it('Renders add edit-category component EDIT new category', () => {
    const wrapper = mount(EditCategoryComponent,{
        propsData: {
            categoryId : 16,
            addCategory: false,
        }
      });
    expect(wrapper.exists()).toBe(true);
});
it('Check if category name is displayed', () => {
    const wrapper = mount(EditCategoryComponent,{
        propsData: {
            categoryId : 16,
            addCategory: false,
        }
      });
    const name = wrapper.find('#category-name');
    expect(name.text()).toBe('Name');
});
it('Check if category description is displayed', () => {
    const wrapper = mount(EditCategoryComponent,{
        propsData: {
            categoryId : 27,
            addCategory: false,
        }
      });
    const name = wrapper.find('#category-description');
    expect(name.text()).toBe('Description');
});
it('Check if category order in menu  is displayed', () => {
    const wrapper = mount(EditCategoryComponent,{
        propsData: {
            categoryId : 16,
            addCategory: false,
        }
      });
    const name = wrapper.find('#category-orderinmenu');
    expect(name.text()).toBe('Presentation Order');
});
// it('Check if subcategory name  is displayed in pop up', () => {
//     const wrapper = mount(EditCategoryComponent,{
//         propsData: {
//             categoryId : 14,
//             addCategory: false,
//         }
//       });
//     wrapper.find('#add-subcategory-button').trigger("click");
//     expect(wrapper.emitted('click')).toBeTruthy();
//     expect(wrapper.find('#addSubCategoryPopUp').exists()).toBe(true);
//     // const name = wrapper.find('#subcategory-name');
//     // expect(name.text()).toBe('Name: ');
// });
it('Check if category name is displayed', () => {
    const wrapper = mount(EditCategoryComponent,{
        propsData: {
            categoryId : 14,
            addCategory: false,
        }
      });
    const name = wrapper.find('#input-category-name');
   
    expect(name.element.value).toBe('Small bites');
});
it('Check if input category name is displayed', () => {
    const wrapper = mount(EditCategoryComponent,{
        propsData: {
            categoryId : 14,
            addCategory: false,
        }
      });
    const name = wrapper.find('#input-category-name');
   
    expect(name.element.value).toBe('Small bites');
});

it('Check if input category description is displayed', () => {
    const wrapper = mount(EditCategoryComponent,{
        propsData: {
            categoryId : 27,
            addCategory: false,
        }
      });
    const name = wrapper.find('#input-category-description');
   
    expect(name.element.value).toBe('We serve fresh, hand-stretched pizza topped with only the very best of ingredients');
});

it('Check if input category order is displayed', () => {
    const wrapper = mount(EditCategoryComponent,{
        propsData: {
            categoryId : 14,
            addCategory: false,
        }
      });
    const name = wrapper.find('#input-category-order');
   
    expect(name.element.value).toBe('2');
});

