import { it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import languages from '../mockData/languages.json';
import NameNeededPopUp from '../components/nameNeededPopUp.vue';

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
it('Renders pop-up', () => {
    const wrapper = mount(NameNeededPopUp,{
        propsData: {
            message: 'restaurant',
            
        }
      });
    expect(wrapper.exists()).toBe(true);
});

it('Renders text correctly', () => {
    const wrapper = mount(NameNeededPopUp,{
        propsData: {
            message: 'restaurant',
            
        }
      });
    const input = wrapper.find('#text');  
    expect(input.text()).toBe('Please input the name before you request an AI restaurant description. Ok');
});
it('Ok/Close Button is visible', () => {
    const wrapper = mount(NameNeededPopUp,{
        propsData: {
            message: 'restaurant',
            
        }
      });
    const ok = wrapper.find('#change-bottom-button');  
  
    expect(ok.exists()).toBe(true);
});


