// const API_URL = "https://eng-test.avead.dev/api/";
const API_URL = "https://dev.edu.chicaga.ru/api/";

import Axios from "axios";

async function responseProcessing(response, method, error = "") {
  let res = false;
  await response.then(data => {
    let d = data.data;
    if ("errors" in d) {
      console.error(error, method, d.errors);
      res = {
        error: d.errors
      };
    } else {
      res = d;
    }
  });
  return res;
}

async function get(method, data = "", token = localStorage.getItem("token")) {
  let query = data ? "/" + data : "";
  let r = Axios({
    method: "GET",
    url: API_URL + method + query,
    headers: {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    }
  });
  return responseProcessing(r, method);
}

async function post(method, data, token = localStorage.getItem("token")) {
  let r = Axios({
    method: "POST",
    url: API_URL + method,
    data,
    headers: {
      Authorization: "Bearer " + token
    }
  });
  return responseProcessing(r, method);
}

async function put(method, data, token = localStorage.getItem("token")) {
  let r = Axios({
    method: "PUT",
    url: API_URL + method,
    data,
    headers: {
      Authorization: "Bearer " + token
    }
  });
  return responseProcessing(r);
}

async function del(method, data, token = localStorage.getItem("token")) {
  let r = Axios({
    method: "DELETE",
    url: API_URL + method + "/" + data,
    headers: {
      Authorization: "Bearer " + token
    },
    crossDomain: true
  });
  return responseProcessing(r);
}

import { mapGetters } from "vuex";

export default {
  methods: {
    // Courses
    async getCatalogCaourses() {
      return get("courses");
    },
    async getMyCourses() {
      return get("user/courses");
    },
    async getCourseInfo(id) {
      return get("user/course", id);
    },
    async getProgressForTeacher() {
      return get("teacher/courses");
    },
    // Group
    async getAcademicGroups() {
      return get("user/groups");
    },
    async getAcademicGroup(id) {
      return get("user/group", id);
    },
    // Lesson
    async getLesson(id) {
      let response = await get("lesson", id);
      return {
        lesson: response.lesson,
        dz: response.dz
      };
    },
    async getFullLesson(id) {
      return get("lesson", id);
    },
    async getLessonProgress(courseId, lesonId) {
      return await get(`user/course/${courseId}/lesson/${lesonId}`);
    },
    async saveProgressLesson(data) {
      return post(
        `user/course/${data.courseId}/lesson/${data.lessonId}/lesson-progress`,
        {
          progress: data.progress,
          id: data.userId
        }
      );
    },
    async saveProgressHomework(data) {
      return post(
        `user/course/${data.courseId}/lesson/${data.lessonId}/home-work-progress`,
        {
          home_work_progress: data.progress,
          id: data.userId
        }
      );
    },
    async getProgressOfCourse(courseId) {
      return get("teacher/course/" + courseId);
    },
    // Проверка доступа пользователя к уроку
    checkAccess(id) {
      // Мок
      console.log("lessonId checkAccess id:", id);
      if (!id) return true;
      else {
        this.$store.commit("pushShuckbar", {
          success: false,
          val: "access denied"
        });
        return false;
      }
    },
    async getUserPoints() {
      let r = await get(`user/points`);
      console.log("r user:", await get("user"));
      console.log("r:", r);
      return r;
      // return {
      //   smile: 100,
      //   star: 200,
      //   brain: 300,
      //   lamp: 400,
      //   coins: 999,
      //   time: 1649937589
      // };
    },
    // Calendar
    async getWebinarEvents() {
      let otherEvents = get("user/events/others");
      let onlyMyEvents = get("user/events/mine");
      return Promise.all([otherEvents, onlyMyEvents]).then(webinars => {
        webinars[0].data.forEach(e => (e.subscribed = false));
        webinars[1].data.forEach(e => (e.subscribed = true));
        return [...webinars[0].data, ...webinars[1].data];
      });
      // return [
      //   {
      //     date: 1647959401,
      //     title:
      //       "Lorem Ipsum has been the indus Lorem Ipsum has been the indus",
      //     subtitle:
      //       "Lorem Ipsum has been the industry's standard Lorem Ipsum has been the indus",
      //     poster: null,
      //     price: 0,
      //     responsible: "user_id",
      //     subEvents: [
      //       {
      //         date: 1647959401,
      //         title: "Lorem Ipsum has been the indus...",
      //         subtitle: "Lorem Ipsum has been the industry's standard...",
      //         poster: null,
      //         price: 0,
      //         responsible: "user_id",
      //         subscribed: false,
      //         bodyOfEvent: null
      //       },
      //       {
      //         date: 1647959401,
      //         title: "Lorem Ipsum has been the indus...",
      //         subtitle: "Lorem Ipsum has been the industry's standard...",
      //         poster: null,
      //         price: 0,
      //         responsible: "user_id",
      //         subscribed: true,
      //         bodyOfEvent: null
      //       }
      //     ],
      //     subscribed: true,
      //     bodyOfEvent: null
      //   },
      //   {
      //     date: 1648034654,
      //     title: "Lorem Ipsum has been the indus...",
      //     subtitle: "Lorem Ipsum has been the industry's standard...",
      //     poster: null,
      //     price: 0,
      //     responsible: "user_id",
      //     subscribed: false,
      //     bodyOfEvent: null
      //   },
      //   {
      //     date: 1648207454,
      //     title: "Lorem Ipsum has been the indus...",
      //     subtitle: "Lorem Ipsum has been the industry's standard...",
      //     poster: null,
      //     price: 0,
      //     responsible: "user_id",
      //     subscribed: true,
      //     bodyOfEvent: null
      //   }
      // ];
    },
    async getWebinar(id) {
      return get(`events/${id}`).then(r => {
        if (r.data) return r.data;
        return { r };
      });
    },
    async subscribeToEvent(eventId) {
      let r = await post("user/events/subscribe", { id: eventId });
      console.log("api-test user/events/subscribe:", r);
      return r;
    },
    async storeEvent(data) {
      let r = await post("admin/events", data);
      console.log("api-test admin/events", r);
      return r;
    },
    // User
    async register(userData) {
      return post("user", userData);
    },
    async login(userData) {
      return post("user/login", userData);
    },
    async updateUser(userData) {
      return put("user", userData);
    },
    async reLogin() {
      return get("user");
    },
    async recoverPassword(email) {
      return post("user/password/email", {
        email
      });
    },
    async setNewPassword(password, passwordConfirmed, token) {
      let r = await post("user/password/reset", {
        token,
        password,
        password_confirmation: passwordConfirmed
      });
      return r;
    },
    // Task check
    async taskCheck(lessonId, data) {
      let test = false;
      if (test)
        return [Math.random() < 0.5, Math.random() < 0.5, Math.random() < 0.5];
      else {
        console.log("task check answers:", data);
        let result = await post(`user/lesson/${lessonId}/task-check`, data);
        console.log("answer check response api result:", result);
        return result;
      }
    },
    // Vocalibry (Dictionary)
    async addToVocalibry(word, transcription) {
      return post("user/vocabulary", {
        word,
        transcription
      });
    },
    async getVocalibry() {
      return get("user/vocabularies");
    },
    async deleteWordFronVacalibry(id) {
      return del("user/vocabulary", id);
    },
    // Chat
    async createChannel(channelName) {
      return post("channel", {
        name: channelName
      });
    },
    // Payment
    async getPayCourseLink(id, type = "course", count = 1) {
      // Если покупаем курс, то автоматически выставляем количество 1
      count = type == "course" ? 1 : count;
      console.log({
        type: type,
        id,
        count
      });
      return post("payment", {
        type: type,
        id,
        count
      });
    },
    // FAQ
    async getFaq() {
      let r = await get("faq");
      if ("success" in r) {
        return r.data;
      } else {
        this.$store.commit("pushShuckbar", {
          success: false,
          val: "Не получилось получить вопросы и ответы. Попробуйте позже"
        });
        return [];
      }
    },
    // Outher
    getErrorText(response) {
      let errorText = "";
      if ("error" in response) {
        for (const key in response.error) {
          let e = response.error[key];
          if (typeof e == "object") {
            e.forEach(eText => {
              errorText += eText + " ";
            });
          } else {
            errorText = e;
          }
        }
      }
      return errorText;
    }
  },
  computed: {
    ...mapGetters(["user"])
  }
};
