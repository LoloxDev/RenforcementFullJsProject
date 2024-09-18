import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    }
  },
  actions: {
    signup({ commit }, payload) {
      const user = { email: payload.email };
      commit('SET_USER', user);
    },
    login({ commit }, payload) {
      const user = { email: payload.email };
      commit('SET_USER', user);
    }
  },
  getters: {
    isAuthenticated(state) {
      return !!state.user;
    }
  }
});
