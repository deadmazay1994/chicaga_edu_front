import Vue from "vue";
import VueRouter from "vue-router";
import Lesson from "@/components/Lesson.vue";
import Tasks from "@/components/Tasks/Tasks.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/lesson",
    name: "Lesson",
    component: Lesson
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: Tasks
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
