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
    },
    setTeacherId(state, teacherId) {
      state.teacherId = teacherId;
    },
    saveTask(state, data) {
      state.savedTasks[data.index] = data.taskData;
      state.savedTasks[data.index].child = [];
    },
    saveChildTask(state, data) {
      state.savedTasks[data.parentIndex].child.push(data.childData);
      // console.log(JSON.stringify(state.savedTasks[data.parentIndex]));
    }
  },
  state: {
    clearTasks: [],
    savedTasks: [],
    teacherId: ""
  },
  getters: {
    clearTasks: state => {
      return state.clearTasks;
    },
    savedTasks: state => {
      return state.savedTasks;
    },
    teacherId: state => {
      return state.teacherId;
    }
  }
};
