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
    },
    setActiveColor(state, payload) {
      state.activeColor = payload;
    },
    setActiveSize(state, payload) {
      state.activeSize = payload;
    }
  },
  state: {
    shopModal: false,
    shopModalData: null,
    activeColor: null,
    activeSize: null
  },
  getters: {
    getShopModal(state) {
      return state.shopModal;
    },
    getShopModalData(state) {
      return state.shopModalData;
    },
    getActiveColor(state) {
      return state.activeColor;
    },
    getActiveSize(state) {
      return state.activeSize;
    }
  }
};
