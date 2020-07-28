import api from "@/mixins/api.js";

export default {
  namespaces: true,
  actions: {
    async setSavedTasks({ commit }, id) {
      let data = await api.methods.getLessonProgress(id);
      commit("setSavedTasks", data);
    },
    async setClearTasks({ commit }, id) {
      let data = await api.methods.getLesson(id);
      commit("setClearTasks", data);
    }
  },
  mutations: {
    setClearTasks(state, data) {
      state.clearTasks = data;
    },
    setSavedTasks(state, data) {
      state.savedTasks = data;
    }
  },
  state: {
    clearTasks: [],
    savedTasks: []
  },
  getters: {
    clearTasks: state => {
      return state.clearTasks;
    },
    savedTasks: state => {
      return state.savedTasks;
    }
  }
};
