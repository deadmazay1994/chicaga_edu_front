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
import MainLayout from "./layout/Main";

Vue.component("default-layout", DefaultLayout);
Vue.component("auth-wrapper", AuthWrapper);
Vue.component("main-layout", MainLayout);
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

Vue.directive("mask", {
  inserted: function(el, binding) {
    let mask = binding.value;
    let first = mask.indexOf("_");
    let clean = mask.replace(/[^0-9_]/gm, "");
    let indexes = [];

    for (let i = 0; i < clean.length; i++) {
      if (!isNaN(clean[i])) {
        indexes.push(i);
      }
    }

    el.value = mask;
    el.clean = mask.replace(/[^0-9]/gm, "");

    function maskIt() {
      let value = el.value;
      let filtered = value.replace(/[^0-9]/gm, "");
      let result = "";

      if (value.length < first) {
        value = mask + value;
        filtered = value.replace(/[^0-9]/gm, "");
      }

      for (let i = 0; i < filtered.length; i++) {
        if (indexes.indexOf(i) === -1) {
          result += filtered[i];
        }
      }

      value = "";
      let cursor = 0;

      for (let i = 0; i < mask.length; i++) {
        if (mask[i] == "_" && result) {
          value += result[0];
          result = result.slice(1);
          cursor = i + 1;
        } else {
          value += mask[i];
        }
      }

      if (cursor < first) {
        cursor = first;
      }

      el.value = value;

      el.clean = el.value.replace(/[^0-9]/gm, "");

      el.setSelectionRange(cursor, cursor);
    }

    el.addEventListener("click", function(event) {
      event.preventDefault();
      let start = el.value.indexOf("_");

      if (start == -1) {
        start = el.value.length;
      }

      el.setSelectionRange(start, start);
    });

    el.addEventListener("paste", function() {
      let start = el.selectionStart;

      if (start < first) {
        el.value = "_" + el.value;
      }
    });

    el.addEventListener("input", function(event) {
      let start = el.selectionStart;
      maskIt(event, start);
    });
  }
});
