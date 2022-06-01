import Vue from "vue";
import VueRouter from "vue-router";

import Lesson from "@/components/Lesson";
import LessonRecord from "@/components/LessonRecord";
import Homework from "@/components/Homework";
import LessonPreview from "@/components/LessonPreview";

import Auth from "@/components/Lk/Auth/index.vue";
import Login from "@/components/Lk/Auth/Login";
import Register from "@/components/Lk/Auth/Register";
import Recover from "@/components/Lk/Auth/Recover";

import CourseListTeacher from "@/components/Teacher/CourseListTeacher";
import UpcomingLesson from "@/components/LessonComponents/Upcoming";
import Lk from "@/components/Lk";
import Settings from "@/components/Lk/Settings";
import CatalogCourses from "@/components/Lk/Courses/CatalogCourses";
import MyCourses from "@/components/Lk/Courses/MyCourses";
import WebinarsComponent from "@/components/Group/WebinarsComponent";
import CoursePage from "@/components/Lk/Courses/CoursePage";
import Dictionary from "@/components/Lk/Dictionary";
import PrivateRoom from "@/components/LessonComponents/PrivateRoom/PrivateRoom";
import PrivateRoomUpcoming from "@/components/LessonComponents/PrivateRoom/Upcoming";
import Group from "@/components/Group/Group";
import FAQ from "@/components/FAQ/";
import Agree from "@/components/Lk/UserArgree";

import Page404 from "Base/404";

import store from "@/store";

import api from "@/mixins/api";
import Stand from "@/components/Stand";

Vue.use(VueRouter);
const routes = [
  {
    path: "/stand",
    component: Stand
  },
  {
    path: "/",
    redirect: "/lk/my-coursers"
  },
  {
    path: "/lesson/:id/",
    name: "lesson_record",
    component: LessonRecord,
    meta: {
      requiresAuth: true,
      breadcrumb: async route => {
        let r = await api.methods.getFullLesson(route.params.id);
        return r.name;
      }
    }
  },
  {
    path: "/lesson/:id/:groupKey/:webinarMode?",
    name: "lesson_teacher",
    component: Lesson,
    meta: {
      requiresAuth: true,
      breadcrumb: async route => {
        let r = await api.methods.getFullLesson(route.params.id);
        return r.name;
      }
    }
  },
  // {
  //   path: "/lesson/:id/",
  //   name: "lesson",
  //   component: Lesson,
  //   meta: {
  //     requiresAuth: true,
  //     checkAccess: true,
  //     breadcrumb: async route => {
  //       let r = await api.methods.getFullLesson(route.params.id);
  //       return r.name;
  //     }
  //   }
  // },
  {
    path: "/homework/:courseId/:id",
    name: "homework_teacher",
    component: Homework,
    meta: {
      requiresAuth: true,
      breadcrumb: `Домашняя работа`
    }
  },
  {
    path: "/homework/:courseId/:id/:userid",
    name: "homework",
    component: Homework,
    meta: {
      requiresAuth: true,
      breadcrumb: `Домашняя работа`
    }
  },
  {
    path: "/lesson-preview/:id",
    name: "lesson-preview",
    component: LessonPreview,
    meta: {
      // forTeacher: true,
      requiresAuth: true,
      breadcrumb: `Превью урока`
    }
  },
  {
    path: "/course-list-teacher",
    name: "course-list-teacher",
    component: CourseListTeacher,
    meta: {
      // forTeacher: true,
      requiresAuth: true,
      breadcrumb: "Список курсов"
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
      guest: false,
      breadcrumb: "Личный кабинет"
      // {
      //   label: "Личный кабинет"
      // }
    },
    children: [
      {
        path: "settings",
        component: Settings,
        meta: {
          breadcrumb: "Настройки"
        }
      },
      {
        path: "catalog-coursers",
        component: CatalogCourses,
        meta: {
          breadcrumb: "Каталог курсов"
        }
      },
      {
        path: "my-coursers",
        component: MyCourses,
        meta: {
          breadcrumb: "Мои курсы"
        }
      },
      {
        path: "course/:id",
        component: CoursePage,
        meta: {
          breadcrumb: routeParams => `Курс ${routeParams.id}`
        }
      },
      {
        path: "dictionary",
        component: Dictionary,
        meta: {
          breadcrumb: "Словарь"
        }
      },
      {
        path: "my-groups",
        component: Group,
        meta: {
          breadcrumb: "Расписание"
        }
      },
      {
        path: "webinars",
        component: WebinarsComponent,
        meta: {
          breadcrumb: "Вебинары"
        }
      },
      {
        path: "upcoming/:id/:code/:startTime",
        name: "upcoming-lesson",
        component: UpcomingLesson,
        props: {
          showComponent: true
        },
        meta: {
          breadcrumb: `Комната ожидания`
        }
      },
      {
        path: "webinar-upcoming/:id/:code",
        name: "upcoming-webinar",
        component: UpcomingLesson,
        meta: {
          breadcrumb: "Комната ожидания"
        }
      }
    ]
  },
  {
    path: "/conference/:room",
    name: "private-room-upcoming",
    component: PrivateRoomUpcoming,
    meta: {
      requiresAuth: true,
      breadcrumb: "Частная комната"
    }
  },
  {
    path: "/conference/room/:room",
    name: "private-room",
    component: PrivateRoom,
    meta: {
      requiresAuth: true,
      breadcrumb: "Частная комната"
    }
  },
  {
    path: "/faq",
    name: "faq",
    component: FAQ,
    meta: {
      requiresAuth: true,
      breadcrumb: "FAQ"
    }
  },
  {
    path: "/agree",
    name: "agree",
    component: Agree,
    meta: {
      breadcrumb: "Согласие"
    }
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
  let access = false;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // этот путь требует авторизации, проверяем залогинен ли
    // пользователь, и если нет, перенаправляем на страницу логина
    if (!localStorage.getItem("token")) {
      localStorage.setItem("to", to.fullPath);
      next({
        path: "/auth/login"
      });
      store.commit("pushShuckbar", {
        val: "Пожалуйста, авторизируйтесь",
        success: false
      });
      access = false;
    } else {
      access = true;
    }
  }
  if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem("token")) {
      next({
        path: "/lk/my-coursers",
        query: { redirect: to.fullPath }
      });
      access = false;
    } else {
      access = true;
    }
  }
  if (to.matched.some(record => record.meta.forTeacher)) {
    if (store.getters.user.role != "teacher") {
      next({
        path: "/lk/my-coursers",
        query: { redirect: to.fullPath }
      });
      store.commit("pushShuckbar", {
        val: "Пожалуйста, авторизируйтесь под аккаунтом учителя",
        success: false
      });
      access = false;
    } else {
      access = true;
    }
  } else {
    access = true;
  }
  if (to.matched.some(record => record.meta.checkAccess)) {
    if (api.methods.checkAccess(to.params.id)) access = true;
    else {
      store.commit("pushShuckbar", {
        val: "access denied",
        success: false
      });
      access = false;
    }
  }
  if (access) next();
});

export default router;
