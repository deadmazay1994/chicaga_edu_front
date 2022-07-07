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
import MyCoursesWrapper from "@/components/Lk/Courses/MyCoursesWrapper";
import MyCourses from "@/components/Lk/Courses/MyCourses";
import WebinarsComponent from "@/components/Group/WebinarsComponent";
import CoursePage from "@/components/Lk/Courses/CoursePage";
import CourseLessons from "@/components/Lk/Courses/CourseLessons";
import Dictionary from "@/components/Lk/Dictionary";
import PrivateRoom from "@/components/LessonComponents/PrivateRoom/PrivateRoom";
import PrivateRoomUpcoming from "@/components/LessonComponents/PrivateRoom/Upcoming";
import StoreComponent from "@/components/Lk/Store";
import MerchComponent from "@/components/Lk/Store/MerchComponent";
import ProductOrder from "@/components/Lk/Store/OrderComponent";
import Group from "@/components/Group/Group";
import FAQ from "@/components/FAQ/";
import Agree from "@/components/Lk/UserArgree";
import ShopMore from "@/components/Lk/Store/ShopMore";

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
      breadcrumb: {
        color: () => "#95B423",
        title: async route => {
          let r = await api.methods.getFullLesson(route.params.id);
          return r.name;
        }
      },
      lesson: true,
      layout: "main-layout"
    }
  },
  {
    path: "/lesson/:id/:groupKey/:webinarMode?",
    name: "lesson_teacher",
    component: Lesson,
    meta: {
      requiresAuth: true,
      breadcrumb: {
        color: () => "#95B423",
        title: async route => {
          let r = await api.methods.getFullLesson(route.params.id);
          return r.name;
        }
      },
      lesson: true
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
      breadcrumb: { title: "Личный кабинет" }
      // {
      //   label: "Личный кабинет"
      // }
    },
    children: [
      {
        path: "settings",
        component: Settings,
        meta: {
          breadcrumb: { title: "Настройки" }
        }
      },
      {
        path: "catalog-coursers",
        name: "catalog-courses",
        component: CatalogCourses,
        meta: {
          breadcrumb: { title: "Каталог курсов", color: () => "#0077ff" },
          title: "Каталог курсов"
        }
      },
      {
        path: "my-courses",
        name: "my-courses-wrapper",
        component: MyCoursesWrapper,
        children: [
          {
            path: "",
            name: "my-courses-wrapper",
            component: MyCourses,
            meta: {
              breadcrumb: { title: "Мои курсы" },
              title: "Мои курсы"
            }
          },
          {
            path: "course-lessons/:id",
            name: "course-lessons",
            component: CourseLessons,
            meta: {
              breadcrumb: { title: "Уроки курса", color: "green" },
              layout: "main-layout",
              title: "Elementary"
            }
          }
        ]
      },
      {
        path: "course/:id",
        component: CoursePage,
        meta: {
          breadcrumb: {
            title: () => "Курс"
          },
          layout: "main-layout"
        }
        // breadcrumb: async route => {
        //   let r = await api.methods.getFullLesson(route.params.id);
        //   return r.name;
        // }
      },
      {
        path: "dictionary",
        component: Dictionary,
        meta: {
          breadcrumb: { title: "Словарь" }
        }
      },
      {
        path: "my-groups",
        component: Group,
        meta: {
          breadcrumb: { title: "Расписание" }
        }
      },
      {
        path: "webinars",
        component: WebinarsComponent,
        meta: {
          breadcrumb: { title: "Вебинары" }
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
          breadcrumb: { title: "Комната ожидания" }
        }
      },
      {
        path: "webinar-upcoming/:id/:code",
        name: "upcoming-webinar",
        component: UpcomingLesson,
        meta: {
          breadcrumb: { title: "Комната ожидания" }
        }
      },
      {
        path: "shop-more",
        name: "shop-more",
        component: ShopMore,
        meta: {
          breadcrumb: { title: "Магазин" }
        }
      }
    ]
  },
  {
    path: "/store",
    name: "store",
    component: StoreComponent,
    meta: {
      breadcrumb: `Магазин`
    },
    children: [
      {
        path: "",
        name: "merch",
        component: MerchComponent,
        meta: {
          breadcrumb: "Мерч"
        }
      },
      {
        path: "merch/order",
        name: "order",
        component: ProductOrder,
        meta: {
          breadcrumb: { title: "Магазин" }
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
      breadcrumb: { title: "Частная комната" }
    }
  },
  {
    path: "/conference/room/:room",
    name: "private-room",
    component: PrivateRoom,
    meta: {
      requiresAuth: true,
      breadcrumb: { title: "Частная комната" }
    }
  },
  {
    path: "/faq",
    name: "faq",
    component: FAQ,
    meta: {
      requiresAuth: true,
      breadcrumb: { title: "FAQ" }
    }
  },
  {
    path: "/agree",
    name: "agree",
    component: Agree,
    meta: {
      breadcrumb: { title: "Согласие" }
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
