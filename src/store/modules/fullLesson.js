import api from "@/mixins/api";

export default {
  namespaces: true,
  actions: {
    async getLesson(commit, lessonId) {
      let r = await api.methods.getFullLesson(lessonId);
      commit("setLesson", r);
    }
  },
  mutations: {
    setLesson(state, payload) {
      state.lesson = payload;
    }
  },
  state: {
    lesson: null
  },
  getters: {
    getLesson(state) {
      return state.lesson;
    },
    getLessonForTask(state) {
      console.log("vuex", state.lesson);
      return {
        // type: state.lesson.lesson[this.activeGroupIndexLesson].tasks[0].type,
        // section:
        //   state.lesson.lesson[this.activeGroupIndexLesson].tasks[0].section,
        id: state.lesson.lesson.id
      };
    }
  }
};
