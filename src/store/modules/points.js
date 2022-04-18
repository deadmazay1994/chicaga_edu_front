import api from "@/mixins/api";

export default {
  namespaces: true,
  actions: {
    async setUserPoints({ commit }) {
      console.log("actions in action!");
      let response = await api.methods.getUserPoints();
      let data = response.data;
      commit("setUserPoints", data);
    }
  },
  mutations: {
    setUserPoints(state, data) {
      state.points = data;
    }
  },
  state: {
    points: null
  },
  getters: {
    getUserPoints(state) {
      return state.points;
    }
  }
};
