import Vue from "vue";
import Vuex from "vuex";

import chat from "./modules/chat";
import user from "./modules/user";
import modals from "./modules/modals";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    chat,
    user,
    modals
  }
});
