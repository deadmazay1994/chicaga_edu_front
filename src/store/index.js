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

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    draver: false
  },
  mutations: {
    toggleDraver(state) {
      state.draver = !state.draver;
    }
  },
  getters: {
    draver: state => {
      return state.draver;
    }
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
    videoChat
  }
});
