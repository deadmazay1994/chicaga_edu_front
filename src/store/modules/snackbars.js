export default {
  namespaces: true,
  actions: {},
  mutations: {
    pushShuckbar(state, params) {
      if (!params.timeout) {
        params.timeout = 5000
      }
      console.log(params.success)
      state.snuckbars.push({
        ...params,
        active: true,
        pos: state.snuckbars.length,
        state: params.success ? "success" : (params.success === false) ? "error" : "default"
      });
      state.snuckbars.filter(elem => elem.active).reverse().forEach(element => {
        setTimeout(() => {
          element.active = false
        }, params.timeout)
      });
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
