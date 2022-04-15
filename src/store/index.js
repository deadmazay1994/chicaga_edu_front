import Vue from "vue";
import Vuex from "vuex";

import chat from "./modules/chat";
import user from "./modules/user";
import modals from "./modules/modals";
import snackbars from "./modules/snackbars";
import course from "./modules/course";
import dictionary from "./modules/dictionary";
import tasks from "./modules/tasks";
import socket from "./modules/socket";
import lightbox from "./modules/lightbox";
import videoChat from "./modules/video_chat";
import faq from "./modules/faq";
import paint from "./modules/paint";
import draver from "./modules/draver";
import consultation from "./modules/consultation";
import notifications from "./modules/notifications";
import points from "./modules/points";

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
    chat,
    user,
    modals,
    snackbars,
    course,
    dictionary,
    tasks,
    socket,
    lightbox,
    videoChat,
    faq,
    paint,
    draver,
    consultation,
    notifications,
    points
  }
});
