export default {
  namespaces: true,
  mutations: {
    setActiveLevel(state, levelId) {
      state.activeLevel = levelId;
    },
    setActiveLevelIndex(state, index) {
      state.activeLevelIndex = index;
    }
  },
  state: {
    activeLevel: "",
    activeLevelIndex: 0
  },
  getters: {
    activeLevel: state => state.activeLevel,
    activeLevelIndex: state => state.activeLevelIndex
  }
};
