<template>
  <div class="navigation">
    <template v-for="(item, k) in links">
      <router-link
        :key="k"
        :to="item.url + (item.params ? item.params() : '')"
        :aria-label="item.name"
        class="router-link"
        :class="{ 'router-link--disabled': item.disabled }"
        v-if="item.showCondition ? item.showCondition() : false"
      >
        <component :is="item.icon" />
      </router-link>
    </template>
    <span title="Выход" class="router-link exit-link" @click="exit()">
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
import WebinarIconSvg from "../Icons/WebinarIconSvg.vue";
import TimetableIconSvg from "../Icons/TimetableIconSvg.vue";
import ShoppingBasketSvg from "../Icons/ShoppingBasketSvg.vue";
import TabletIconSvg from "../Icons/TabletIconSvg.vue";

export default {
  data() {
    return {
      links: [
        {
          name: "Каталог курсов",
          url: "/lk/catalog-coursers",
          icon: "CoursesIcon",
          showCondition: () => true,
          disabled: false
        },
        {
          name: "Мои курсы",
          url: "/lk/my-courses",
          icon: "EducationIcon",
          showCondition: () => true,
          disabled: false
        },
        {
          name: "Вебинары",
          url: "/lk/webinars",
          icon: "WebinarIconSvg",
          showCondition: () => true,
          limitedAccess: true,
          disabled: false
        },
        {
          name: "Конференц-комнаты",
          url: "/conference/",
          params: () => {
            return this.generateRoomId;
          },
          src: require("@/assets/svg/question.svg"),
          icon: "GroupIcon",
          showCondition: () => {
            return this.user.role === "teacher";
          },
          limitedAccess: true,
          disabled: false
        },
        {
          name: "Консультация",
          url: "/lk/consultation",
          icon: "TabletIconSvg",
          showCondition: () => true,
          disabled: false
        },
        {
          name: "Расписание",
          url: "/lk/my-groups",
          icon: "TimetableIconSvg",
          showCondition: () => true,
          disabled: false
        },
        {
          name: "Магазин",
          url: "/store",
          icon: "ShoppingBasketSvg",
          showCondition: () => true,
          disabled: false
        },
        {
          name: "Настройки",
          url: "/lk/settings",
          icon: "SettingsIcon",
          showCondition: () => true,
          disabled: false
        },
        {
          name: "FAQ",
          url: "/faq",
          icon: "QuestionIcon",
          showCondition: () => true,
          disabled: false
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
    QuestionIcon,
    WebinarIconSvg,
    TimetableIconSvg,
    ShoppingBasketSvg,
    TabletIconSvg
  },
  computed: {
    ...mapGetters(["user", "draver", "isDemo"]),
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
  },
  beforeMount() {
    console.log("это демо?:", this.isDemo);
    if (this.isDemo) {
      this.links
        .filter(link => link.limitedAccess)
        .map(link => (link.disabled = true));
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
    position: relative
    width: 47px
    height: 47px
    display: flex
    align-items: center
    justify-content: center
    background: #fff
    margin-top: 12px
    border-radius: 15px
    transition: all .15s ease-in-out

    &-active
      box-shadow: inset 3px 0px 1px rgba(147, 43, 31, 0.5)

    &:hover
      background: #D9D9D9

    &[aria-label]:hover::after
      content: attr(aria-label)
      position: absolute
      left: calc( 100% + 4px )
      font-family: "Manrope", sans-serif
      font-weight: 600
      font-size: 12px
      white-space: nowrap
      color: #FF6440
      background-color: #ffffff
      box-shadow: 0px 4px 20px rgba(128, 128, 128, 0.2)
      border-radius: 15px
      padding: 6px 16px
      z-index: 999

  .exit-link
    cursor: pointer
</style>

<style lang="sass">
.router-link-active
  .icon
    path
      fill: #E84145
    .filled-path
      fill: #E84145
.router-link--disabled
  pointer-events: none
  .icon
    path
      fill: #A9A9A9
    .filled-path
      fill: #A9A9A9
</style>
