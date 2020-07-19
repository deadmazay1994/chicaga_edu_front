export default {
  namespaces: true,
  actions: {
    login({ commit }, formdata) {
      let response = formdata;
      commit("setUser", response);
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  state: {
    user: false
  },
  getters: {
    user: state => {
      return state.user;
    }
  }
};
