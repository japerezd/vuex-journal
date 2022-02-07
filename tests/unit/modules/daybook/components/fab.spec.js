import { shallowMount } from '@vue/test-utils';
import Fab from '@/modules/daybook/components/Fab';

describe('Pruebas en el Fab component', () => {
  test('debe de mostrar el icono por defecto', () => {
    const wrapper = shallowMount(Fab);
    const icon = wrapper.find('i');
    expect(icon.classes('fa-plus')).toBe(true);
  });

  test('debe de mostrar el icono por argumento: fa-circle', () => {
    const wrapper = shallowMount(Fab, {
      props: {
        icon: 'fa-circle',
      },
    });

    const icon = wrapper.find('i');
    expect(icon.classes()).toContain('fa-circle');
  });

  test('debe de emitir el evento on-click cuando se hace click', async () => {
    const wrapper = shallowMount(Fab);
    const button = wrapper.find('button');
    await button.trigger('click');
    expect(wrapper.emitted('on-click')).toHaveLength(1)
  });
});
