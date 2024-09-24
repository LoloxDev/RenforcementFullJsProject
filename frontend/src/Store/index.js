import { createStore } from 'vuex';
import jwtDecode from 'jwt-decode';

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    }
  },
  actions: {
    async signup({ commit }, payload) {
      try {
        const response = await fetch('http://localhost:3000/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            role: payload.role,
          }),
        });

        if (!response.ok) {
          throw new Error('Inscription KO');
        }

        const data = await response.json();

        const user = { email: payload.email, role: payload.role };
        commit('SET_USER', user);

        return data;
      } catch (error) {
        throw new Error(error.message || 'Inscription KO');
      }
    },

    login({ commit }, payload) {
      const token = payload.token;
      localStorage.setItem('token', token);
    
      const user = { email: payload.email };
      commit('SET_USER', user);
    },

    checkAuth({ commit }) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const user = { email: decodedToken.email, role: decodedToken.role };
          commit('SET_USER', user);
        } catch (error) {
          console.error('Décodage token KO:', error);
          localStorage.removeItem('token');
          commit('CLEAR_USER');
        }
      } else {
        commit('CLEAR_USER');
      }
    },

  },
  getters: {
    isAuthenticated(state) {
      return !!state.user;
    },
  }
});
