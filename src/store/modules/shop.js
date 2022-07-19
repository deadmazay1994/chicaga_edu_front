import api from "@/mixins/api";

export default {
  namespaces: true,
  actions: {
    async setShopProductInfo({ commit }, id) {
      let result = api.methods.getProductInfo(id);
      commit("setShopModalData", result);
    }
  },
  mutations: {
    setShopModalData(state, payload) {
      state.shopModalData = payload;
    },
    toggleShopModale(state) {
      state.shopModal = !state.shopModal;
    }
  },
  state: {
    shopModal: false,
    shopModalData: null
  },
  getters: {
    getShopModal(state) {
      return state.shopModal;
    },
    getShopModalData(state) {
      return state.shopModalData;
    }
  }
};
