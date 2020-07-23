import Vue from "vue";
import VueRouter from "vue-router";

import Lesson from "@/components/Lesson";

import Auth from "@/components/Lk/Auth/index.vue";
import Login from "@/components/Lk/Auth/Login";
import Register from "@/components/Lk/Auth/Register";
import Recover from "@/components/Lk/Auth/Recover";

import Lk from "@/components/Lk";
import Settings from "@/components/Lk/Settings";
import CatalogCourses from "@/components/Lk/Courses/CatalogCourses";
import MyCourses from "@/components/Lk/Courses/MyCourses";
import CoursePage from "@/components/Lk/Courses/CoursePage";
import Dictionary from "@/components/Lk/Dictionary";

import store from "@/store/index.js";

Vue.use(VueRouter);
const routes = [
  {
    path: "/lesson/:id",
    name: "Lesson",
    component: Lesson,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/auth",
    name: "auth",
    component: Auth,
    meta: {
      guest: true
    },
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
      },
      {
        path: "recover",
        component: Recover
      }
    ]
  },
  {
    path: "/lk",
    name: "Lk",
    component: Lk,
    meta: {
      requiresAuth: true
    },
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

// Скрываем страницы от не авторизированных пользователей
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // этот путь требует авторизации, проверяем залогинен ли
    // пользователь, и если нет, перенаправляем на страницу логина
    if (!store.getters.user) {
      next({
        path: "/auth/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  }
  if (to.matched.some(record => record.meta.guest)) {
    if (store.getters.user) {
      next({
        path: "/lk/my-coursers",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  }
});

export default router;
