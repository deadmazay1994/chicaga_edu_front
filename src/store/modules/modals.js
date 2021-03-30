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
    setStateSignIn: (state, val) => (state.signInOpen = val),
    toggleReportModal: (state, val = null) => {
      if (val === null) {
        state.reportOpen = !state.reportOpen;
      } else {
        state.reportOpen = val;
      }
    },
    setReportData: (state, data) => (state.reportData = data)
  },
  state: {
    signInOpen: false,
    reportOpen: false,
    reportData: {
      taskIndex: "",
      comment: "",
      pageName: "",
      lessonLink: ""
    }
  },
  getters: {
    signInOpen: state => {
      return state.signInOpen;
    },
    reportOpen: state => {
      return state.reportOpen;
    },
    reportData: state => state.reportData
  }
};
