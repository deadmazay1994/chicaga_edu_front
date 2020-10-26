import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import PortalVue from "portal-vue";

import TaskFunctions from "@/mixins/tasks";

import VueZoomer from "vue-zoomer";

Vue.use(VueZoomer);

Vue.config.productionTip = false;

Vue.mixin({
  data() {
    return {
      IMGSTORE: "https://edu.chicaga.ru/public/images/"
    };
  }
});

Vue.use(PortalVue);

// Стандарные функции тасков
Vue.mixin(TaskFunctions);

const VueObject = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

Vue.directive("ligthbox", {
  inserted: function(el) {
    el.style = "cursor: pointer";
    el.onclick = () => {
      VueObject.$store.commit("setLightboxImg", el.src);
      VueObject.$store.commit("toggleLightbox", true);
    };
  }
});
