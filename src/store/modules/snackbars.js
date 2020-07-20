export default {
  namespaces: true,
  actions: {},
  mutations: {
    pushShuckbar(state, text) {
      state.snuckbars.push({
        text,
        active: true
      });
      console.log(state.snuckbars);
    }
  },
  state: {
    snuckbars: []
  },
  getters: {
    snuckbars: state => {
      return state.snuckbars;
    },
    snuckbarsActive: state => {
      return state.snuckbars.filter(snack => snack.active);
    },
    lastBar: state => {
      return state.snuckbars[state.snuckbars.length - 1];
    }
  }
};
