// export const myMutation = (state) => {

// }

export const setEntries = (state, entries) => {
  state.entries = [...state.entries, ...entries];
  state.isLoading = false;
};

export const updateEntry = (state, entry) => {
  const entryIndex = state.entries.findIndex((ent) => ent.id === entry.id);
  state.entries[entryIndex] = entry;
};

export const addEntry = (state, entry) => {
  state.entries = [entry, ...state.entries]
};

export const deleteEntry = (state, id) => {
    state.entries = state.entries.filter(entry => entry.id !== id);
};
