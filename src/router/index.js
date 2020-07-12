import Vue from "vue";
import VueRouter from "vue-router";
import Lesson from "@/components/Lesson.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/lesson",
    name: "Lesson",
    component: Lesson
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
