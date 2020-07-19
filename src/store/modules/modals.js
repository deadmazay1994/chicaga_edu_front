export default {
  namespaces: true,
  actions: {},
  mutations: {
    toggleSignIn: state => {
      state.signInOpen = !state.signInOpen;
    },
    showSignIn: state => {
      state.signInOpen = true;
    },
    hiddenSignIn: state => {
      state.signInOpen = false;
    },
    setStateSignIn: (state, val) => (state.signInOpen = val)
  },
  state: {
    signInOpen: false
  },
  getters: {
    signInOpen: state => {
      return state.signInOpen;
    }
  }
};
