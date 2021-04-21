import Vue from "vue";
import VueRouter from "vue-router";

import Lesson from "@/components/Lesson";
import Homework from "@/components/Homework";
import LessonPreview from "@/components/LessonPreview";

import Auth from "@/components/Lk/Auth/index.vue";
import Login from "@/components/Lk/Auth/Login";
import Register from "@/components/Lk/Auth/Register";
import Recover from "@/components/Lk/Auth/Recover";

import CourseListTeacher from "@/components/Teacher/CourseListTeacher";

import Lk from "@/components/Lk";
import Settings from "@/components/Lk/Settings";
import CatalogCourses from "@/components/Lk/Courses/CatalogCourses";
import MyCourses from "@/components/Lk/Courses/MyCourses";
import CoursePage from "@/components/Lk/Courses/CoursePage";
import Dictionary from "@/components/Lk/Dictionary";

import FAQ from "@/components/FAQ/";
import Agree from "@/components/Lk/UserArgree";

import Page404 from "Base/404";

import store from "@/store";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: "/lk/my-coursers"
  },
  {
    path: "/lesson/:courseId/:id",
    name: "lesson_teacher",
    component: Lesson,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/lesson/:courseId/:id/:roomId",
    name: "lesson_teacher_room",
    component: Lesson,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/lesson/:courseId/:id/:userid",
    name: "lesson",
    component: Lesson,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/homework/:courseId/:id",
    name: "homework_teacher",
    component: Homework,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/homework/:courseId/:id/:userid",
    name: "homework",
    component: Homework,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/lesson-preview/:id",
    name: "lesson-preview",
    component: LessonPreview,
    meta: {
      // forTeacher: true,
      requiresAuth: true
    }
  },
  {
    path: "/course-list-teacher",
    name: "course-list-teacher",
    component: CourseListTeacher,
    meta: {
      // forTeacher: true,
      requiresAuth: true
    }
  },
  {
    path: "/404",
    name: "404",
    component: Page404,
    meta: {
      all: true
    }
  },
  {
    path: "*",
    redirect: "/404"
  },
  {
    path: "/auth",
    component: Auth,
    meta: {
      guest: true,
      requiresAuth: false
    },
    children: [
      {
        path: "login",
        name: "login",
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
      },
      {
        path: "recover/:hash",
        component: Recover
      }
    ]
  },
  {
    path: "/lk",
    name: "Lk",
    component: Lk,
    meta: {
      requiresAuth: true,
      guest: false
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
  },
  {
    path: "/faq",
    name: "faq",
    component: FAQ
  },
  {
    path: "/agree",
    name: "agree",
    component: Agree
  }
];

const beforeRedirect = (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Отрабатывет ситуацию, когда в любом случае нужно перейти на страницу
    let forseRedirect = false;
    console.log(to.params);
    if (to.params.courseId && to.params.id == "consultation")
      forseRedirect = true;
    // этот путь требует авторизации, проверяем залогинен ли
    // пользователь, и если нет, перенаправляем на страницу логина
    if (!localStorage.getItem("token") && !forseRedirect) {
      next({
        path: "/auth/login",
        query: { redirect: to.fullPath }
      });
      store.commit("pushShuckbar", {
        val: "Пожалуйста, авторизируйтесь",
        success: false
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem("token")) {
      next({
        path: "/lk/my-coursers",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.forTeacher)) {
    if (store.getters.user.role != "teacher") {
      next({
        path: "/lk/my-coursers",
        query: { redirect: to.fullPath }
      });
      store.commit("pushShuckbar", {
        val: "Пожалуйста, авторизируйтесь под аккаунтом учителя",
        success: false
      });
    } else {
      next();
    }
  } else {
    next();
  }
};

export const router = new VueRouter({
  mode: "hash",
  // mode: "history",
  // base: process.env.BASE_URL,
  base: process.env.BASE_URL + "/edu/",
  routes,
  beforeEnter: beforeRedirect
});

// Скрываем страницы от не авторизированных пользователей
router.beforeEach(beforeRedirect);

export default router;
