<template>
  <div class="navigation">
    <router-link
      class="navigation__logo-link"
      :to="{
        name: 'index'
      }"
    >
      <sidebar-logo class="navigation__logo" />
    </router-link>
    <template v-for="(item, k) in links">
      <router-link
        :key="k"
        :to="{ path: item.url + (item.params ? item.params() : '') }"
        :aria-label="item.name"
        class="navigation__link"
        :class="{ 'navigation__link--disabled': item.disabled }"
        v-if="item.showCondition ? item.showCondition() : false"
      >
        <component :is="item.icon" />
      </router-link>
    </template>
  </div>
</template>

<script>
import SidebarLogo from "@/components/Icons/SidebarLogo.vue";
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
      // "disabled" - свойство по
      // которому ссылка становится некликабельной
      // "limitedAccess" - элементы с этим свойством
      // не отображаются при store.state.isDemo = true
      links: [
        {
          name: "Каталог курсов",
          url: "/lk/catalog-courses",
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
          disabled: false,
          limitedAccess: true
        },
        {
          name: "Расписание",
          url: "/lk/my-groups",
          icon: "TimetableIconSvg",
          showCondition: () => true,
          disabled: false,
          limitedAccess: true
        },
        {
          name: "Магазин",
          url: "/store",
          icon: "ShoppingBasketSvg",
          showCondition: () => true,
          disabled: false,
          limitedAccess: true
        },
        {
          name: "FAQ",
          url: "/faq",
          icon: "QuestionIcon",
          showCondition: () => true,
          disabled: false,
          limitedAccess: true
        }
      ],
      mobileDetected: false
    };
  },
  props: ["mobilemenuopen"],
  components: {
    SidebarLogo,
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
    ...mapMutations(["setDraverState"])
  },
  beforeMount() {
    if (this.isDemo) {
      this.links
        .filter(link => link.limitedAccess)
        .map(link => (link.disabled = true));
    }
  }
};
</script>

<style lang="sass" scoped>
@import "@/assets/styles/variables.sass"

.navigation
  display: flex
  align-items: center
  flex-direction: column
  @media ($media_lg2)
    flex-direction: row
    justify-content: space-between
    width: 100%
  &__logo-link
    display: flex
    align-items: center
    justify-content: center
    width: 40px
    height: 40px
    margin-bottom: 39px
    @media ($media_lg2)
      width: 48px
      height: 48px
      margin-bottom: 0
  &__logo
    width: 100%
    height: 100%
    @media ($media_lg2)
      width: 28px
      height: 28px
  &__link
    position: relative
    width: 48px
    height: 48px
    display: flex
    align-items: center
    justify-content: center
    background-color: #fff
    border-radius: 15px
    transition: background-color 0.15s ease-in-out
    @media ($media_lg2)
      background-color: transparent
      transition: none
  &__link:not(:last-child)
    margin-bottom: 12px
    @media ($media_lg2)
      margin-bottom: 0
  &__link-active
    box-shadow: inset 3px 0 1px rgba(147, 43, 31, 0.5)
  &__link:hover
    background-color: #d9d9d9
    @media ($media_lg2)
      background-color: transparent
  &__link[aria-label]:hover::after
    content: attr(aria-label)
    position: absolute
    left: calc( 100% + 4px )
    padding: 6px 16px
    font-weight: 600
    font-size: 12px
    white-space: nowrap
    color: #FF6440
    background-color: #ffffff
    border-radius: 15px
    box-shadow: 0 4px 20px rgba(128, 128, 128, 0.2)
    z-index: 999
    @media ($media_lg2)
      content: none
</style>

<style lang="sass">
.navigation__link-active
  .icon
    path
      fill: #E84145
    .filled-path
      fill: #E84145
.navigation__link--disabled
  pointer-events: none
  .icon
    path, rect
      fill: #A9A9A9
    .filled-path
      fill: #A9A9A9
</style>
