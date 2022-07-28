const API_URL = process.env.VUE_APP_REST_API_URL;

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
    async getCourse(id) {
      return get("course", id);
    },
    async getProgressForTeacher() {
      return get("teacher/courses");
    },
    async getPublicCourse(id) {
      return get("courses/public", id);
    },
    // временный мок для получения программ курса
    async getCourseProgramms() {
      return [
        {
          title: "Урок 1. Elementary. Unit 1A. Ep.1",
          rating: 4.8,
          duration: 23,
          start_time: 1656454829
        },
        {
          title: "Урок 2. Elementary. Unit 1A. Ep.1",
          rating: 3.8,
          duration: 222,
          start_time: 1656454829
        },
        {
          title: "Урок 3. Elementary. Unit 1A. Ep.1",
          rating: 4.5,
          duration: 60,
          start_time: 1656454829
        },
        {
          title: "Урок 4. Elementary. Unit 1A. Ep.1",
          rating: 4.8,
          duration: 132,
          start_time: 1656454829
        },
        {
          title: "Урок 5. Elementary. Unit 1A. Ep.1",
          rating: 5.0,
          duration: 300,
          start_time: 1656454829
        }
      ];
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
        dz: response.dz,
        videoId: response.video_id
      };
    },
    async getFullLesson(id) {
      return await get("lesson", id);
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
    // video
    async getVideo(id) {
      return get(`user/videos/${id}`);
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
    getTimestamps() {
      return [
        {
          title: "Greeting",
          time: 75
        }
        // {
        //   title: "What is in the bag",
        //   time: 60 * 7 + 22
        // },
        // {
        //   title: "Things",
        //   time: 643
        // },
        // {
        //   title: "Articles",
        //   time: 19 * 60 + 41
        // },
        // {
        //   title: "grammar",
        //   time: 28 * 60 + 7
        // }
      ];
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
    // Store
    getProducts() {
      return [
        {
          id: 1,
          title: "Худи CHICAGA“EXPERT” ",
          src: require("@/assets/imgs/shop/merch/hoodie-grey.png"),
          price: 1000,
          count: 1
        },
        {
          id: 2,
          title: "Худи CHICAGA «Стану акулой»",
          src: require("@/assets/imgs/shop/merch/jackets.png"),
          price: 1000,
          count: 1
        },
        {
          id: 3,
          title: "Худи «CHICAGEST»",
          src: require("@/assets/imgs/shop/merch/hoodie-item.png"),
          price: 1000,
          count: 1
        }
      ];
    },
    getProductInfo(id) {
      console.log(id);
      let arr = [
        {
          id: 1,
          title: "Худи CHICAGA “EXPERT” ",
          images: [
            require("@/assets/imgs/shop/merch/hoodie-grey.png"),
            require("@/assets/imgs/shop/merch/hoodie-grey.png"),
            require("@/assets/imgs/shop/merch/hoodie-grey.png")
          ],
          price: 5000,
          count: 1,
          description: `Подробное описание... Худи свободного кроя изготовлено из хлопка...
            Модель с карманами, эластичными манжетами на рукавах и поясе дополнена застёжкой-молнией и капюшоном.`,
          composition: ["хлопок 83%", "полиэстер 17%"],
          colors: [
            { color: "#F4DFC5", title: "Персиковый" },
            { color: "#000000", title: "Чёрный" },
            { color: "#FFFFFF", title: "Белый" },
            { color: "#FF0000", title: "Красный" }
          ],
          sizes: ["XS", "S", "M", "L", "XL"]
        },
        {
          id: 2,
          title: "Худи CHICAGA «Стану акулой»",
          images: [
            require("@/assets/imgs/shop/merch/jackets.png"),
            require("@/assets/imgs/shop/merch/jackets.png"),
            require("@/assets/imgs/shop/merch/jackets.png")
          ],
          price: 3000,
          count: 1,
          description: `Подробное описание... Худи свободного кроя изготовлено из хлопка...
            Модель с карманами, эластичными манжетами на рукавах и поясе дополнена застёжкой-молнией и капюшоном.`,
          composition: ["хлопок 83%", "полиэстер 17%"],
          colors: [
            { color: "#F4DFC5", title: "Персиковый" },
            { color: "#000000", title: "Чёрный" },
            { color: "#FFFFFF", title: "Белый" },
            { color: "#FF0000", title: "Красный" }
          ],
          sizes: ["XS", "S", "M", "L", "XL"]
        },
        {
          id: 3,
          title: "Худи «CHICAGEST»",
          images: [
            require("@/assets/imgs/shop/merch/hoodie-item.png"),
            require("@/assets/imgs/shop/merch/hoodie-item.png"),
            require("@/assets/imgs/shop/merch/hoodie-item.png")
          ],
          price: 3000,
          count: 1,
          description: `Подробное описание... Худи свободного кроя изготовлено из хлопка...
            Модель с карманами, эластичными манжетами на рукавах и поясе дополнена застёжкой-молнией и капюшоном.`,
          composition: ["хлопок 83%", "полиэстер 17%"],
          colors: [
            { color: "#F4DFC5", title: "Персиковый" },
            { color: "#000000", title: "Чёрный" },
            { color: "#FFFFFF", title: "Белый" },
            { color: "#FF0000", title: "Красный" }
          ],
          sizes: ["XS", "S", "M", "L", "XL"]
        },
        {
          id: 4,
          title: "Cертификат OZON",
          images: [
            require("@/assets/imgs/shop/merch/card.png"),
            require("@/assets/imgs/shop/merch/card.png"),
            require("@/assets/imgs/shop/merch/card.png")
          ],
          price: 800,
          count: 1,
          description: `Электронные сертификаты Ozon «Миллион подарков» — идеальный выбор на любой праздник, по поводу и без. Радуйте родных, удивляйте друзей, поздравляйте коллег!

          На сумму электронного сертификата можно выбирать из миллионов товаров и услуг на Ozon: технику, игрушки, косметику, книги, инструменты, мелочи для дома. Даже авиа- и Ж/Д билеты`,
          composition: ["хлопок 83%", "полиэстер 17%"],
          colors: [
            { color: "#F4DFC5", title: "Персиковый" },
            { color: "#000000", title: "Чёрный" },
            { color: "#FFFFFF", title: "Белый" },
            { color: "#FF0000", title: "Красный" }
          ],
          sizes: ["XS", "S", "M", "L", "XL"]
        },
        {
          id: 5,
          title: "Футболка CHICAGA",
          images: [
            require("@/assets/imgs/shop/merch/big-t-shirts.png"),
            require("@/assets/imgs/shop/merch/big-t-shirts.png"),
            require("@/assets/imgs/shop/merch/big-t-shirts.png")
          ],
          price: 2000,
          count: 1,
          description: `Футболка унисекс свободного силуэта оверсайз со спущенной плечевой линией. Выполнена из качественного  хлопка. Материал приятный к телу, хорошо стирается, долговечен в носке, сохраняет цвет ткани.`,
          composition: ["хлопок 83%", "полиэстер 17%"],
          colors: [
            { color: "#F4DFC5", title: "Персиковый" },
            { color: "#000000", title: "Чёрный" },
            { color: "#FFFFFF", title: "Белый" },
            { color: "#FF0000", title: "Красный" }
          ],
          sizes: ["XS", "S", "M", "L", "XL"]
        },
        {
          id: 6,
          title: "Кофе в дрип-пакетах CHICAGA 8шт*10г ",
          images: [
            require("@/assets/imgs/shop/merch/big-drips.png"),
            require("@/assets/imgs/shop/merch/big-drips.png"),
            require("@/assets/imgs/shop/merch/big-drips.png")
          ],
          price: 500,
          count: 1,
          description: `Нетипичный бразильский кофе с комплексной фруктовой и ягодной кислотностью. В аромате вы найдете какао и косточковые фрукты, а во вкусе - ягоды, косточковые фрукты и ноты цитрусовых.
          Отличный вариант фильтр-кофе на каждый день.`,
          composition: ["хлопок 83%", "полиэстер 17%"],
          colors: [
            { color: "#F4DFC5", title: "Персиковый" },
            { color: "#000000", title: "Чёрный" },
            { color: "#FFFFFF", title: "Белый" },
            { color: "#FF0000", title: "Красный" }
          ],
          sizes: ["XS", "S", "M", "L", "XL"]
        }
      ];
      console.log(arr.find(elem => elem.id == id));
      return arr.find(elem => elem.id == id);
    },
    // Basket
    // fake basket items
    pushItemToBasket(data) {
      console.log(data);
    },
    getBasketItems() {
      return [
        {
          id: 1,
          title: "Худи CHICAGA «Стану акулой»",
          src: require("@/assets/imgs/shop/merch/jackets.png"),
          price: 3000,
          count: 1,
          size: "S"
        },
        {
          id: 2,
          title: "Шоппер CHICAGA «Some food »",
          src: require("@/assets/imgs/shop/merch/packets.png"),
          price: 800,
          count: 1
        },
        {
          id: 3,
          title: "Дрип-кофе CHICAGA 8 пакетиков, 25 гр. х 8 шт.",
          src: require("@/assets/imgs/shop/merch/drips.png"),
          price: 1000,
          count: 1
        },
        {
          id: 4,
          title: "Сертификат на обучение английскому 1 месяц",
          src: require("@/assets/imgs/shop/merch/hoodie-item.png"),
          price: 5000,
          count: 1
        }
      ];
    },
    deleteitemFromBasket(data) {
      console.log(data);
    },
    increaseBasketItemsCount(data) {
      console.log(data);
    },
    decreaseBasketItemsCount(data) {
      console.log(data);
    },
    // Tariff
    async getTariffesData() {
      return {
        tariffes: [
          {
            title: "PREMIUM",
            type: "premium",
            info: {
              list: [
                { text: "Доступ на 2 года" },
                {
                  text: "Занятия в месяц",
                  list: [
                    { text: "8 видеоуроков" },
                    { text: "6 доп. уроков с фразами для общения" },
                    { text: "2 вебинара на закрепление" },
                    { text: "4 индивидуальных урока" }
                  ]
                },
                { text: "Помощь в подготовке резюме на английском" },
                { text: "Личный куратор" },
                { text: "Чат-бот для грамматики" },
                {
                  text: "Доп. материалы для увлекательного изучения английского"
                },
                { text: "Упражнения с автоматической проверкой" }
              ],
              basic_attention:
                "Тариф не предполагает обратной связи преподавателя. Полностью самостоятельное прохождение",
              places: 21
            },
            prices: [
              {
                title: "Помесячно",
                price: 56000,
                course_count: 1
              },
              {
                title: "1 курс",
                price: 56000,
                course_count: 1,
                discount: 20
              },
              {
                title: "2 курса",
                price: 112000,
                course_count: 2,
                discount: 25
              }
            ]
          },
          {
            title: "STANDART",
            type: "standart",
            info: {
              list: [
                { text: "Доступ на 1 год" },
                { text: "Чат с дежурным преподавателем" },
                {
                  text:
                    "Свидетельство о прохождении курса по результатам письменного теста + Возможность получить сертификат (дополнительное устное тестирование)"
                },
                {
                  text: "Занятия в месяц",
                  list: [
                    { text: "8 видеоуроков" },
                    { text: "6 доп. уроков с фразами для общения" },
                    { text: "2 вебинара на закрепление" }
                  ]
                },
                { text: "Личный куратор" },
                { text: "Чат-бот для грамматики" },
                {
                  text: "Доп. материалы для увлекательного изучения английского"
                },
                { text: "Упражнения с автоматической проверкой" }
              ],
              basic_attention:
                "Тариф не предполагает обратной связи преподавателя. Полностью самостоятельное прохождение"
            },
            prices: [
              {
                title: "Помесячно",
                price: 36000,
                course_count: 1
              },
              {
                title: "1 курс",
                price: 36000,
                course_count: 1,
                discount: 20
              },
              {
                title: "2 курса",
                price: 67500,
                course_count: 2,
                discount: 25
              }
            ]
          },
          {
            title: "BASIC",
            type: "basic",
            info: {
              list: [
                { text: "Доступ на 6 месяцев" },
                {
                  text:
                    "Свидетельство о прохождении курса по результатам письменного теста"
                },
                {
                  text: "Занятия в месяц",
                  list: [
                    { text: "8 видеоуроков" },
                    { text: "6 доп. уроков с фразами для общения" }
                  ]
                },
                { text: "Личный куратор" },
                { text: "Чат-бот для грамматики" },
                {
                  text: "Доп. материалы для увлекательного изучения английского"
                },
                { text: "Упражнения с автоматической проверкой" }
              ],
              basic_attention:
                "Тариф не предполагает обратной связи преподавателя. Полностью самостоятельное прохождение"
            },
            prices: [
              {
                title: "Помесячно",
                price: 26000,
                course_count: 1
              },
              {
                title: "1 курс",
                price: 26000,
                course_count: 1,
                discount: 20
              },
              {
                title: "2 курса",
                price: 52000,
                course_count: 2,
                discount: 25
              }
            ]
          }
        ]
      };
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
