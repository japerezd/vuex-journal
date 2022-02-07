import { shallowMount } from '@vue/test-utils'
import About from '@/views/About'

describe('Pruebas en el About View', () => {
    test('Debe de renderizar el componente correctamente', () => {
        const wrapper = shallowMount(About)
        expect(wrapper.html()).toMatchSnapshot();
    })
    
})
