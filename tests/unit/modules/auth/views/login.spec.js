import { shallowMount } from '@vue/test-utils';
import Login from '@/modules/auth/views/Login.vue';
import createVuexStore from '../../../mock-data/mock-store';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  close: jest.fn(),
}));

const mockRouter = {
  push: jest.fn(),
};

jest.mock('vue-router', () => ({
  useRouter: () => mockRouter,
}));

describe('Pruebas en el login component', () => {
  const store = createVuexStore({
    status: 'not-authenticated',
    user: null,
    idToken: null,
    refreshToken: null,
  });

  store.dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debe hacer match con snapshot', () => {
    const wrapper = shallowMount(Login, {
      global: {
        plugins: [store],
        stubs: ['router-link'],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('credenciales incorrectas, disparar error del SWAL', async () => {
    store.dispatch.mockReturnValueOnce({
      ok: false,
      message: 'Error en credenciales',
    });

    const wrapper = shallowMount(Login, {
      global: {
        plugins: [store],
        stubs: ['router-link'],
      },
    });

    await wrapper.find('form').trigger('submit');
    expect(store.dispatch).toHaveBeenCalledWith('auth/signInUser', {
      email: '',
      password: '',
    });

    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'Error en credenciales',
      'error'
    );
  });

  test('debe de redirigir a la ruta no-entry', async () => {
    store.dispatch.mockReturnValueOnce({
      ok: true,
    });

    const wrapper = shallowMount(Login, {
      global: {
        plugins: [store],
        stubs: ['router-link'],
      },
    });

    const [txtEmail, txtPassword] = wrapper.findAll('input');
    await txtEmail.setValue('beto@gmail.com');
    await txtPassword.setValue('123456');

    await wrapper.find('form').trigger('submit');
    expect(store.dispatch).toHaveBeenCalledWith('auth/signInUser', {
      email: 'beto@gmail.com',
      password: '123456',
    });

    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' })
  });
});
