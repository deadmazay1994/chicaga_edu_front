export default {
  namespaces: true,
  mutations: {
    setChatDriver(state, driver) {
      state.chatDriver = driver;
    }
  },
  state: {
    chatDriver: null
  },
  getters: {
    chatDriver: store => store.chatDriver
  }
};
