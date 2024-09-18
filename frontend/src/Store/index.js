import { createStore } from 'vuex';

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
        // Appel au backend pour l'inscription
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

        // Vérifie si la requête est réussie
        if (!response.ok) {
          throw new Error('Erreur lors de l\'inscription');
        }

        // Récupère la réponse JSON
        const data = await response.json();

        // Met à jour le store avec l'utilisateur
        const user = { email: payload.email, role: payload.role };
        commit('SET_USER', user);

        return data; // Renvoie les données pour gérer l'affichage dans le composant
      } catch (error) {
        throw new Error(error.message || 'Erreur lors de l\'inscription');
      }
    },

    login({ commit }, payload) {
      const user = { email: payload.email };
      commit('SET_USER', user);
    }
  },
  getters: {
    isAuthenticated(state) {
      return !!state.user;
    },
  }
});
