import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import Swal from 'sweetalert2';
import journal from '@/modules/daybook/store/journal';
import { journalState } from '../../../mock-data/test-journal-state';

import EntryView from '@/modules/daybook/views/EntryView.vue';

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  });

// utilizando las propiedades que utiliza el sweetalert2
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  close: jest.fn(),
}));

describe('Pruebas en el EntryView component', () => {
  const store = createVuexStore(journalState);
  store.dispatch = jest.fn();

  const mockRouter = {
    push: jest.fn(),
  };

  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(EntryView, {
      props: {
        id: '-MiJYhNIHihlBvVuDr_5',
      },
      global: {
        mocks: {
          $router: mockRouter,
        },

        plugins: [store],
      },
    });
  });

  test('debe de sacar al usuario porque el id no existe', () => {
    const wrapper = shallowMount(EntryView, {
      props: {
        id: 'Este id no existe en el store',
      },
      global: {
        mocks: {
          $router: mockRouter,
        },

        plugins: [store],
      },
    });

    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' });
  });

  test('debe de mostrar la entrada correctamente', () => {
    expect(wrapper.html()).toMatchSnapshot();
    expect(mockRouter.push).not.toHaveBeenCalledWith({ name: 'no-entry' });
  });

  test('debe de borrar la entrada y salir', async () => {
    Swal.fire.mockReturnValueOnce(Promise.resolve({ isConfirmed: true }));
    await wrapper.find('.btn-danger').trigger('click');
    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Esta seguro?',
      text: 'Una vez borrado, no se puede recuperar',
      showDenyButton: true,
      confirmButtonText: 'Si, estoy seguro',
    });

    // setTimeout(() => {
    expect(mockRouter.push).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith('journal/deleteEntry', '-MiJYhNIHihlBvVuDr_5')
    //       done();
    // }, 1)
  });
});
