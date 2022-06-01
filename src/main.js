import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import PortalVue from "portal-vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import TaskFunctions from "@/mixins/tasks";
import SocketFunctions from "@/mixins/socket";

import VueKonva from "vue-konva";

import DefaultLayout from "./layout/DefaultLayout";
import AuthWrapper from "./layout/AuthWrapper";

Vue.component("default-layout", DefaultLayout);
Vue.component("auth-wrapper", AuthWrapper);
Vue.component("c-btn", () => import("./components/UiElements/C-btn"));
Vue.component("c-input", () => import("./components/UiElements/Input"));
Vue.component("c-textarea", () => import("./components/UiElements/Textarea"));

Vue.use(VueKonva);

Vue.config.productionTip = false;

Vue.mixin({
  data() {
    return {
      IMGSTORE: "https://edu.chicaga.ru/images/"
    };
  }
});

Vue.use(PortalVue);

const options = {
  position: "bottom-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
};

Vue.use(Toast, options);

// Стандарные функции тасков
Vue.mixin(TaskFunctions);
// Стандартные функции сокетов
Vue.mixin(SocketFunctions);

export const eventBus = new Vue();

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
