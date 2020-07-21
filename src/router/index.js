import Vue from "vue";
import VueRouter from "vue-router";
import Lesson from "@/components/Lesson";
import Lk from "@/components/Lk";
import Settings from "@/components/Lk/Settings";

Vue.use(VueRouter);

const routes = [
  {
    path: "/lesson",
    name: "Lesson",
    component: Lesson
  },
  {
    path: "/lk",
    name: "Lk",
    component: Lk,
    children: [
      {
        path: "settings",
        component: Settings
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
