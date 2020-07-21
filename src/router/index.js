import Vue from "vue";
import VueRouter from "vue-router";
import Lesson from "@/components/Lesson";
import Lk from "@/components/Lk";
import Settings from "@/components/Lk/Settings";
import CatalogCourses from "@/components/Lk/Courses/CatalogCourses";
import MyCourses from "@/components/Lk/Courses/MyCourses";

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
      },
      {
        path: "catalog-coursers",
        component: CatalogCourses
      },
      {
        path: "my-coursers",
        component: MyCourses
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
