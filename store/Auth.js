export const state = () => ({
  isAdmin: false,
  token : '',
  user : {
    EM_ID : '',
  }
})

export const getters = {
  isAdmin: (state) => state.isAdmin,
  user: (state) => state.user,
}

export const mutations = {

  setToken(state, token) {
    state.token = token
  },

  setUser(state, payload) {
    state.user = payload
  }
}

export const actions = {


}
