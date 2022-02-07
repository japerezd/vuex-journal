// export const myGetter = (state) => {
//     return state.somthing
// }

export const getEntriesByTerm = (state) => (term = '') => {
  if (term.length === 0) return state.entries;
  return state.entries.filter((entry) =>
    entry.text.toLowerCase().includes(term.toLocaleLowerCase())
  );
};

export const getEntryById = (state) => (id = '') => {
  const entry = state.entries.find(ent => ent.id === id);
  if (!entry) return;
  return { ...entry };
};
