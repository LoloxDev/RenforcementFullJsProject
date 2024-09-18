const state = {
    myData: [],
  };
  
  const mutations = {
    setMyData(state, data) {
      state.myData = data;
    },
  };
  
  const actions = {
    fetchMyData({ commit }) {
      // Exemple d'appel au back
      fetch('/api/my-endpoint')
        .then(response => response.json())
        .then(data => {
          commit('setMyData', data);
        });
    },
  };
  
  const getters = {
    getMyData(state) {
      return state.myData;
    },
  };
  
  export default {
    state,
    mutations,
    actions,
    getters,
  };
  