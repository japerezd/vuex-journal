// export const myGetter = (state) => {
//   return state
// }

export const getCurrentState = (state) => {
  return state.status
}

export const getUsername = (state) => {
  return state.user?.name || ''
}