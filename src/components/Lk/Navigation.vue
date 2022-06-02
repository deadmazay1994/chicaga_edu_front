<template>
  <div class="navigation">
    <template v-for="(item, k) in links">
      <router-link
        :key="k"
        :to="item.url + (item.params ? item.params() : '')"
        class="router-link"
        v-if="item.showCondition ? item.showCondition() : false"
      >
        <component :is="item.icon" />
      </router-link>
    </template>
    <span class="router-link exit-link" @click="exit()">
      <img src="@/assets/svg/exit.svg" alt="Выйти" />
    </span>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import CoursesIcon from "@/components/Icons/CoursesIcon";
import EducationIcon from "@/components/Icons/EducationIcon";
import GroupIcon from "@/components/Icons/GroupIcon";
import BookIcon from "@/components/Icons/BookIcon";
import SettingsIcon from "@/components/Icons/SettingsIcon";
import QuestionIcon from "@/components/Icons/QuestionIcon";

export default {
  data() {
    return {
      links: [
        {
          name: "Каталог курсов",
          url: "/lk/catalog-coursers",
          src: require("@/assets/svg/courses.svg"),
          icon: "CoursesIcon",
          showCondition: () => true
        },
        {
          name: "Мои курсы",
          url: "/lk/my-coursers",
          src: require("@/assets/svg/education.svg"),
          icon: "EducationIcon",
          showCondition: () => true
        },
        {
          name: "Вебинары",
          url: "/lk/webinars",
          src: require("@/assets/svg/group.svg"),
          icon: "GroupIcon",
          showCondition: () => true
        },
        {
          name: "Уроки",
          url: "/lk/my-groups",
          src: require("@/assets/svg/book.svg"),
          icon: "EducationIcon",
          showCondition: () => true
        },
        // {
        //   name: "Словарь",
        //   url: "#",
        //   src: require("@/assets/svg/book.svg"),
        //   icon: "BookIcon"
        // },
        {
          name: "Настройки",
          url: "/lk/settings",
          src: require("@/assets/svg/settings.svg"),
          icon: "SettingsIcon",
          showCondition: () => true
        },
        {
          name: "Вопросы и ответы",
          url: "/faq",
          src: require("@/assets/svg/question.svg"),
          icon: "QuestionIcon",
          showCondition: () => true
        },
        {
          name: "Создать комнату",
          url: "/conference/",
          params: () => {
            return this.generateRoomId;
          },
          src: require("@/assets/svg/question.svg"),
          icon: "QuestionIcon",
          showCondition: () => {
            return this.user.role === "teacher";
          }
        }
      ],
      mobileDetected: false
    };
  },
  props: ["mobilemenuopen"],
  components: {
    CoursesIcon,
    EducationIcon,
    GroupIcon,
    BookIcon,
    SettingsIcon,
    QuestionIcon
  },
  computed: {
    ...mapGetters(["user", "draver"]),
    access() {
      // предоставить доступ только учителю
      return this.user.role == "teacher";
    },
    draverComputed: {
      get() {
        return this.draver;
      },
      set(value) {
        this.setDraverState(value);
      }
    },
    generateRoomId() {
      return (
        String(this.user.id) +
        "__" +
        (Math.random() + 1).toString(36).substring(7)
      );
    }
  },
  methods: {
    ...mapMutations(["logout", "setDraverState"]),
    exit() {
      this.logout();
      this.$router.push("/auth/login");
      this.$store.commit("pushShuckbar", {
        val: "Вы успешно вышли из личного кабинета",
        success: true
      });
    }
  }
};
</script>

<style lang="sass" scoped>
.navigation
  display: flex
  align-items: center
  flex-direction: column

  .router-link
    width: 47px
    height: 47px
    display: flex
    align-items: center
    justify-content: center
    background: #fff
    border-radius: 15px
    margin-top: 12px
    transition: all .15s ease-in-out

    &-active
      box-shadow: inset 3px 0px 1px rgba(147, 43, 31, 0.5)

    &:hover
      background: #D9D9D9

  .exit-link
    cursor: pointer
</style>

<style lang="sass">
.router-link-active
  .icon
    path
      fill: #E84145
</style>
