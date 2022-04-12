export default {
  namespaces: true,
  actions: {},
  mutations: {
    toggleModal(state) {
      state.modal = !state.modal;
    },
    setEventData(state, payload) {
      state.eventData = payload;
    }
  },
  state: {
    modal: false,
    eventData: null
  },
  getters: {
    getModal(state) {
      return state.modal;
    },
    getEventData(state) {
      return state.eventData;
    }
  }
};
