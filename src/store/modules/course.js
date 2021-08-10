import api from "@/mixins/api";

export default {
  namespaces: true,
  actions: {
    async setMyCourses({ commit }) {
      let response = await api.methods.getMyCourses();
      if (!response.data) return;
      commit("endLoadingMyCourses");
      let data = response.data;
      // Даем понять фронту, что курс куплен
      data.map(e => (e.buyed = true));
      let idsCourses = [];
      const removeRepeat = arr =>
        arr.filter(item => {
          let repeat = idsCourses.find(id => id == item.id);
          if (!repeat) {
            idsCourses.push(item.id);
          }
          return !repeat;
        });
      commit("setMyCourses", removeRepeat(data));
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
    async setCurrentCourse({ commit }, { id, publicC }) {
      let response = await api.methods.getCourseInfo({ id, publicC });
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
    },
    endLoadingMyCourses(state) {
      state.myCoursesLoaded = true;
    }
  },
  state: {
    myCourses: [],
    myCoursesLoaded: false,
    catalogCourses: [],
    allCourses: [],
    currentCourse: {},
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
    },
    myCoursesLoaded: state => state.myCoursesLoaded
  }
};
