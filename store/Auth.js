export const state = () => ({
  isAdmin: false,
  user: {
    EM_ID: ""
  }
});

export const getters = {
  isAdmin: (state) => state.isAdmin,
  user: (state) => state.user
};

export const mutations = {

  setToken(state, token) {
    state.token = token;
  },

  setUser(state, payload) {
    state.user = payload;
  },

  setAdmin(state, payload) {
    state.isAdmin = payload;
  }
};

export const actions = {




};
