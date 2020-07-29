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

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    chat,
    user,
    modals,
    snackbars,
    course,
    dictionary,
    tasks,
    socket
  }
});
