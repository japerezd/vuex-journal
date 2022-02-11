import { createStore } from 'vuex';
import journal from '@/modules/daybook/store/journal';
import { journalState } from '../../../../mock-data/test-journal-state';
import authApi from '@/api/authApi';

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  });

describe('Vuex - pruebas en el journal module', () => {

  beforeAll(async () => {
    const { data } = await authApi.post(':signInWithPassword', {
      email: 'test@test.com',
      password: '123456',
      returnSecureToken: true,
    });

    localStorage.setItem('idToken', data.idToken);
  })

  // Basicas ================
  test('este es el estado inicial, debe de tener este state', () => {
    const store = createVuexStore(journalState);
    const { isLoading, entries } = store.state.journal;
    expect(isLoading).toBeFalsy();
    expect(entries).toEqual(journalState.entries);
  });

  // Mutations ================
  test('mutation: setEntries', () => {
    const store = createVuexStore({ isLoading: true, entries: [] });

    store.commit('journal/setEntries', journalState.entries);
    expect(store.state.journal.entries.length).toBe(2);
    expect(store.state.journal.isLoading).toBeFalsy();
  });

  test('mutation: updateEntry', () => {
    const store = createVuexStore(journalState);
    const updatedEntry = {
      id: '-MiHcxWZ9yMhl_fG8t-X',
      date: 1630252812085,
      text: 'Hola mundo desde pruebas',
    };

    const storeEntries = store.state.journal.entries;
    store.commit('journal/updateEntry', updatedEntry);
    expect(storeEntries.length).toBe(2);
    expect(storeEntries.find((e) => e.id === updatedEntry.id)).toEqual(
      updatedEntry
    );
  });

  test('mutation: addEntry deleteEntry', () => {
    const store = createVuexStore(journalState);
    const entry = {
      id: 'abc-123',
      date: 1630252812045,
      text: 'Test from mutation: addEntry',
    };

    store.commit('journal/addEntry', entry);
    const storeEntries = store.state.journal.entries;
    expect(storeEntries.length).toBe(3);
    expect(storeEntries.find((e) => e.id === entry.id)).toBeTruthy();

    store.commit('journal/deleteEntry', entry.id);

    expect(store.state.journal.entries.length).toBe(2);
    expect(
      store.state.journal.entries.find((e) => e.id === entry.id)
    ).toBeFalsy();
  });

  // Getters ================
  test('getters: getEntriesByTerm getEntryById', () => {
    const store = createVuexStore(journalState);
    const [entry1, entry2] = journalState.entries;

    expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2);
    expect(store.getters['journal/getEntriesByTerm']('segunda').length).toBe(1);

    expect(store.getters['journal/getEntriesByTerm']('segunda')).toEqual([
      entry2,
    ]);

    expect(store.getters['journal/getEntryById'](entry1.id)).toEqual(entry1);
  });

  // Actions ================
  test('actions: loadEntries', async () => {
    const store = createVuexStore({ isLoading: true, entries: [] });
    
    await store.dispatch('journal/loadEntries');
    expect(store.state.journal.entries.length).toBe(2);
    // TODO: buscar en el curso por que no me salen que sean 2

  });

  test('actions: updateEntry', async () => {
    const store = createVuexStore(journalState);

    const updatedEntry = {
      id: '-MiHcxWZ9yMhl_fG8t-X',
      date: 1630252812085,
      text: 'Hola mundo desde mock data',
      otroCampo: true,
      otroMas: { a: 1 },
    };

    await store.dispatch('journal/updateEntry', updatedEntry);
    expect(store.state.journal.entries.length).toBe(2);
    expect(
      store.state.journal.entries.find((e) => e.id === updatedEntry.id)
    ).toEqual({
      id: '-MiHcxWZ9yMhl_fG8t-X',
      date: 1630252812085,
      text: 'Hola mundo desde mock data',
    });
    
  });

  test('actions: createEntry deleteEntry', async () => {
    const store = createVuexStore(journalState);
    const newEntry = {
      date: 1630284981723,
      text: 'Nueva entrada desde las pruebas',
    }
    const id = await store.dispatch('journal/createEntry', newEntry);
    expect(typeof id).toBe('string')
    const {id: idEntry} = store.state.journal.entries.find(e => e.id === id)
    expect(id).toBe(idEntry);
    expect(idEntry).toBeTruthy()

    
    await store.dispatch('journal/deleteEntry', idEntry)
    const deletedId = store.state.journal.entries.find(e => e.id === idEntry)
    expect(deletedId).toBeFalsy()
  })
});
