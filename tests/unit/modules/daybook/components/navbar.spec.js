import { shallowMount } from '@vue/test-utils';
import Navbar from '@/modules/daybook/components/Navbar.vue';

import createVuexStore from '../../../mock-data/mock-store';

const mockRouter = {
  push: jest.fn(),
};

jest.mock('vue-router', () => ({
  useRouter: () => mockRouter,
}));

describe('Pruebas en el navbar component', () => {
  const store = createVuexStore({
    user: {
      name: 'Maria',
      email: 'maria@gmail.com',
    },

    status: 'authenticated',
    idToken: 'ABC-123',
    refreshToken: 'XYZ-456',
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Debe de mostrar el componente correctamente', () => {
    // se usa el store por que de ahi saca el nombre que se tiene en el Navbar
    const wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test('click en logout, debe cerrar sesion y redireccionar', async () => {
    const wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.find('button').trigger('click');
    // este test puede hacerse tambien con la libreria vue-router-mock para composition API. Clase 294
    expect(mockRouter.push).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith({name: 'login'});

    expect(store.state.auth).toEqual({
      user: null,
      status: 'not-authenticated',
      idToken: null,
      refreshToken: null,
    });
  });
});
