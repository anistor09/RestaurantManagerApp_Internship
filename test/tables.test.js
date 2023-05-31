import { mount } from '@vue/test-utils'
import searchBar from '../components/search-bar.vue'

test('renders a todo', () => {
    const wrapper = mount(searchBar)
  
    expect(wrapper.html()).toBe(`<div>Hello</div>`)
  })