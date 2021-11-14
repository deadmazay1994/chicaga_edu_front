import api from "@/mixins/api.js";

export default {
  namespaces: true,
  actions: {
    async setSavedTasks({ commit }, data) {
      let response = await api.methods.getLessonProgress(
        data.courseId,
        data.lessonId
      );
      let homeworkProgress = false;
      if (response.data.home_work_progress == null) {
        homeworkProgress = [];
      } else {
        homeworkProgress = response.data.home_work_progress;
      }
      let lessonProgress = false;
      if (Object.keys(response.data.progress).length == 0) {
        lessonProgress = [];
      } else {
        lessonProgress = response.data.progress;
      }
      commit("setSavedTasks", lessonProgress);
      commit("setSavedHomework", homeworkProgress);
    },
    async setLesson({ commit }, lessonId) {
      let res = await api.methods.getLesson(lessonId);
      commit("setLesson", res);
    },
    async setProgressForTeacher({ commit }, data) {
      let response = await api.methods.getProgressForTeacher(
        data.courseId,
        data.lessonId,
        data.userId
      );
      commit("setSavedTasks", response.data.progress);
      commit("setSavedHomework", response.data.home_work_progress);
    },
    async saveProgressLesson({ getters }, data) {
      await api.methods.saveProgressLesson({
        progress: getters.savedTasks,
        lessonId: data.lessonId,
        courseId: data.courseId,
        userId: getters.user.id,
      });
    },
    async saveProgressHomework({ getters }, data) {
      await api.methods.saveProgressHomework({
        progress: getters.savedTasks,
        lessonId: data.lessonId,
        courseId: data.courseId,
        userId: getters.user.id,
      });
    },
  },
  mutations: {
    setLesson(state, data) {
      console.log(data);
      state.lesson = data;
    },
    setHomework(state, data) {
      state.homework = data;
    },
    setClearTasks(state, data) {
      state.clearTasks = data;
    },
    setSavedTasks(state, data) {
      state.savedTasks = data;
    },
    setSavedHomework(state, data) {
      state.savedHomework = data;
    },
    setMaterials(state, materials) {
      state.materials = materials;
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
    },
    clearTasks(state) {
      state.lesson = [];
      state.homework = [];
      state.savedTasks = [];
      state.materials = false;
      console.log(state.lesson);
    },
    setLessonId(state, lessonId) {
      state.lessonId = lessonId;
    },
    setActiveGroupLesson(state, index) {
      state.activeGroupIndexLesson = index;
    },
    setActiveGroupHomework(state, index) {
      state.activeGroupIndexHomework = index;
    },
    collectGroupsNamesLesson(state) {
      state.groupsNamesLesson = collectGroupsNames(state.lesson);
    },
    collectGroupsNamesHomework(state) {
      state.groupsNamesHomework = collectGroupsNames(state.lesson.dz);
    },
  },
  state: {
    lesson: [],
    lessonId: "",
    homework: [],
    savedTasks: [],
    savedHomework: [],
    teacherId: "",
    materials: false,
    activeGroupIndexLesson: 0,
    groupsNamesLesson: [],
    activeGroupIndexHomework: 0,
    groupsNamesHomework: [],
  },
  getters: {
    lesson: (state) => {
      return state.lesson;
    },
    homework: (state) => {
      return state.lesson.dz;
    },
    lessonTasks: (state) => {
      console.log(state);
      return state.lesson;
    },
    savedTasks: (state) => {
      return state.savedTasks;
    },
    savedHomework: (state) => {
      return state.savedHomework;
    },
    materials: (state) => {
      return state.materials;
    },
    teacherId: (state) => {
      return state.teacherId;
    },
    lessonId: (state) => state.lessonId,
    activeGroupIndexLesson: (state) => state.activeGroupIndexLesson,
    groupsLesson: (state) => state.groupsNamesLesson,
    activeGroupIndexHomework: (state) => state.activeGroupIndexHomework,
    groupsHomework: (state) => state.groupsNamesHomework,
  },
};

const collectGroupsNames = (groups) => {
  if (groups) {
    return groups.map((group) => group.group_name);
  } else {
    return [];
  }
};
