import api from "@/mixins/api";

export default {
  namespaces: true,
  actions: {
    async setMyCourses({ commit }) {
      let response = await api.methods.getMyCourses();
      console.log(response);
      let data = response.data;
      // Даем понять фронту, что курс куплен
      data.map(e => (e.buyed = true));
      commit("setMyCourses", data);
    },
    async setCatalogCourses({ commit }) {
      let response = await api.methods.getCatalogCaourses();
      let data = response.data;
      // Даем понять фронту, что курс не куплен
      data.map(e => (e.buyed = false));
      commit("setCatalogCourse", data);
    },
    async setAllCourses({ dispatch, commit }) {
      await dispatch("setMyCourses");
      await dispatch("setCatalogCourses");
      commit("setAllCourses");
    },
    async setCurrentCourse({ commit }, id) {
      let response = await api.methods.getCourseInfo(id);
      commit("setCurrentCourse", response.data);
    },
    async setCoursesForTeacher({ commit }) {
      let response = await api.methods.getProgressForTeacher();
      commit("setProgressTeacher", response.data);
    }
  },
  mutations: {
    setMyCourses(state, data) {
      state.myCourses = data;
    },
    setCatalogCourse(state, data) {
      state.catalogCourses = data;
    },
    setAllCourses(state) {
      state.allCourses = [...state.myCourses, ...state.catalogCourses];
    },
    setCurrentCourse(state, currentCourse) {
      state.currentCourse = currentCourse;
    },
    setProgressTeacher(state, data) {
      state.progressForTeacher = Object.values(data);
    }
  },
  state: {
    myCourses: [],
    catalogCourses: [],
    allCourses: [],
    currentCourse: false,
    progressForTeacher: {}
  },
  getters: {
    myCourses: state => {
      return state.myCourses;
    },
    catalogCourses: state => {
      return state.catalogCourses;
    },
    currentCourse: state => {
      return state.currentCourse;
    },
    course: state => id => {
      return state.allCourses.find(course => course.id == id);
    },
    progressForTeacher: state => {
      return state.progressForTeacher;
    }
  }
};
