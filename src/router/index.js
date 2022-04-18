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
import Upcoming from "@/components/Group/Upcoming";
import Lk from "@/components/Lk";
import Settings from "@/components/Lk/Settings";
import CatalogCourses from "@/components/Lk/Courses/CatalogCourses";
import MyCourses from "@/components/Lk/Courses/MyCourses";
import WebinarsComponent from "@/components/Group/WebinarsComponent";
import CoursePage from "@/components/Lk/Courses/CoursePage";
import Dictionary from "@/components/Lk/Dictionary";
import PrivateRoom from "@/components/LessonComponents/PrivateRoom/PrivateRoom";
import Group from "@/components/Group/Group";
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
    path: "/lesson/:id/:groupKey/",
    name: "lesson_teacher",
    component: Lesson,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/lesson/:id/",
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
      layout: "auth-wrapper",
      requiresAuth: false
    },
    children: [
      {
        path: "login",
        name: "login",
        component: Login,
        meta: {
          layout: "auth-wrapper"
        }
      },
      {
        path: "",
        component: Login,
        meta: {
          layout: "auth-wrapper"
        }
      },
      {
        path: "register",
        component: Register,
        meta: {
          layout: "auth-wrapper"
        }
      },
      {
        path: "recover",
        component: Recover,
        meta: {
          layout: "auth-wrapper"
        }
      },
      {
        path: "recover/:hash",
        component: Recover,
        meta: {
          layout: "auth-wrapper"
        }
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
      },
      {
        path: "my-groups",
        component: Group
      },
      {
        path: "webinars",
        component: WebinarsComponent
      },
      {
        path: "upcoming/:id/:code/:startTime",
        name: "upcoming-lesson",
        component: Upcoming,
        props: {
          showComponent: true
        }
      },
      {
        path: "webinar-upcoming/:id/:code/:startTime",
        name: "upcoming-webinar",
        component: Upcoming,
        props: {
          showComponent: false
        }
      },
      {
        path: "private-room/:room",
        name: "private-room",
        component: PrivateRoom
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

export const router = new VueRouter({
  mode: "hash",
  // mode: "history",
  // base: process.env.BASE_URL,
  base: process.env.BASE_URL + "/edu/",
  routes
});

// Скрываем страницы от не авторизированных пользователей
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // этот путь требует авторизации, проверяем залогинен ли
    // пользователь, и если нет, перенаправляем на страницу логина
    if (!localStorage.getItem("token")) {
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
});

export default router;
