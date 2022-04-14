export default {
  namespaces: true,
  actions: {},
  mutations: {
    pushShuckbar(state, params) {
      if (params.success) this._vm.$toast.success(params.val);
      else this._vm.$toast.error(params.val);
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
