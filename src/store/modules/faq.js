import api from "@/mixins/api";

export default {
  namespaces: true,
  actions: {
    async setFaq({ commit }) {
      let data = await api.methods.getFaq();
      commit("setFaq", data);
    }
  },
  mutations: {
    setFaq(state, faq) {
      state.faq = faq;
    }
  },
  state: {
    faq: []
  },
  getters: {
    faq: state => state.faq
  }
};
