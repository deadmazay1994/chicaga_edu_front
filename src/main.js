import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

import PerfectScrollbar from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";
Vue.use(PerfectScrollbar);

Vue.mixin({
  data() {
    return {
      IMGSTORE: "https://edu.chicaga.ru/public/images/"
    };
  }
});

new Vue({
  router,
  store,
  vuetify,
  PerfectScrollbar,
  render: h => h(App)
}).$mount("#app");
