// export const myAction = async ({commit}) => {}

import journalApi from '@/api/journalApi';

export const loadEntries = async ({ commit }) => {
  const { data } = await journalApi.get('/entries.json');
  if (!data) {
    return commit('setEntries', [])
  }
  const entries = [];
  for (let id of Object.keys(data)) {
    entries.push({
      id,
      ...data[id],
    });
  }
  commit('setEntries', entries);
};

export const updateEntry = async ({ commit }, entry) => {
    const id = entry.id;
    const dataToSave = {
      date: entry.date,
      text: entry.text,
      picture: entry.picture,
    }
    dataToSave.id = entry.id
    await journalApi.put(`/entries/${id}.json`, dataToSave);
    commit('updateEntry', {...dataToSave})
};

export const createEntry = async ({ commit }, entry) => {
  const dataToSave = {...entry}
  const { data } = await journalApi.post(`/entries.json`, dataToSave);
  entry.id = data.name
  commit('addEntry', entry)
  return data.name;
};

export const deleteEntry = async ({ commit }, id) => {
  await journalApi.delete(`/entries/${id}.json`);
  commit('deleteEntry',id )
};
