import { shallowMount } from '@vue/test-utils';
import Entry from '@/modules/daybook/components/Entry.vue';
import daybookRouter from '@/modules/daybook/router';

describe('Pruebas en Entry component', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const wrapper = shallowMount(Entry, {
    props: {
      entry: {
        id: '-MiJYhNIHihlBvVuDr_5',
        date: 1630284981723,
        text: 'segunda entrada',
      },
    },
    global: {
      mocks: {
        $router: mockRouter,
      },
    },
  });
  test('debe de hacer match con el snapshot ', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('debe de redireccionar al hacer click en el entry-container', () => {
      const container = wrapper.find('.entry-container')
      container.trigger('click');
        expect(mockRouter.push).toHaveBeenCalledWith({
            name: 'entry',
            params: {
                id: wrapper.props().entry.id
            }
        });
  });

  test('pruebas en las propiedades computadas', () => {
    //   console.log(wrapper.vm)
    expect(wrapper.vm.day).toBe(29);
    expect(wrapper.vm.month).toBe('Agosto');
    expect(wrapper.vm.yearDay).toBe('2021, Domingo');
  });
});
