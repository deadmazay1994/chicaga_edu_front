import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/user";
import modals from "./modules/modals";
import snackbars from "./modules/snackbars";
import course from "./modules/course";
import dictionary from "./modules/dictionary";
import tasks from "./modules/tasks";
import socket from "./modules/socket";
import lightbox from "./modules/lightbox";
import faq from "./modules/faq";
import notifications from "./modules/notifications";
import points from "./modules/points";
import fullLesson from "./modules/fullLesson";
import calendar_modal from "./modules/calendar_modal";
import shop from "./modules/shop";
import basket from "./modules/basket";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isConsultation: false
  },
  mutations: {
    checkIsConsultation(state) {
      state.isConsultation = window.location.href.includes("consultation");
    }
  },
  getters: {
    isConsultation: state => state.isConsultation
  },
  actions: {},
  modules: {
    user,
    modals,
    snackbars,
    course,
    dictionary,
    tasks,
    socket,
    lightbox,
    faq,
    notifications,
    points,
    fullLesson,
    calendar_modal,
    shop,
    basket
  }
});
