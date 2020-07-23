import Vue from "vue";
import VueRouter from "vue-router";

import Lesson from "@/components/Lesson";

import Auth from "@/components/Lk/Auth/index.vue";
import Login from "@/components/Lk/Auth/Login";
import Register from "@/components/Lk/Auth/Register";

import Lk from "@/components/Lk";
import Settings from "@/components/Lk/Settings";
import CatalogCourses from "@/components/Lk/Courses/CatalogCourses";
import MyCourses from "@/components/Lk/Courses/MyCourses";
import CoursePage from "@/components/Lk/Courses/CoursePage";
import Dictionary from "@/components/Lk/Dictionary";

Vue.use(VueRouter);

const routes = [
  {
    path: "/lesson/:id",
    name: "Lesson",
    component: Lesson
  },
  {
    path: "/auth",
    name: "auth",
    component: Auth,
    children: [
      {
        path: "login",
        component: Login
      },
      {
        path: "",
        component: Login
      },
      {
        path: "register",
        component: Register
      }
    ]
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
      },
      {
        path: "course/:id",
        component: CoursePage
      },
      {
        path: "dictionary",
        component: Dictionary
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
