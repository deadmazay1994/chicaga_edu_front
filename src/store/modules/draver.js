export default {
  namespaces: true,
  actions: {},
  mutations: {
    toggleDraver(state) {
      state.draver = !state.draver;
    },
    setDraverState(state, val) {
      state.draver = val;
    }
  },
  state: {
    draver: false
  },
  getters: {
    draver: state => state.draver
  }
};
