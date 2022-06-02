export default {
  namespaces: true,
  actions: {},
  mutations: {
    toggleShopModale(state) {
      state.shopModal = !state.shopModal;
    }
  },
  state: {
    shopModal: false
  },
  getters: {
    getShopModal(state) {
      return state.shopModal;
    }
  }
};
