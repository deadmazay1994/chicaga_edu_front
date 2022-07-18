<template>
  <div class="main vue-component">
    <sidebar-component
      :mobilemenuopen="showBurger"
      v-click-outside="
        () => {
          clickedOutside(true);
        }
      "
    >
      <navigation @clicked-outside="closeMenu" @clicked-router="closeMenu" />
    </sidebar-component>
    <mobile-menu
      @click="openBurgerMenu()"
      v-click-outside="
        () => {
          clickedOutside(true);
        }
      "
    />
    <div class="main__content">
      <c-content class="main__content-block">
        <template v-slot:header>
          <div class="main__header-wrap">
            <header-app class="main__header">
              <span class="header__lavel" v-if="$route.meta.lesson === true"
                >Elementary</span
              >
              <breadcrumbs-component v-else />
            </header-app>
          </div>
        </template>
        <template v-slot:default>
          <div class="main__body-wrap">
            <router-view class="main__body" />
          </div>
        </template>
      </c-content>
    </div>
    <calendar-modal />
    <svg-sprite />
  </div>
</template>

<script>
import SvgSprite from "@/components/Icons/Sprite";
import Content from "@/components/Base/Content";

import HeaderApp from "@/components/Base/Header";
import Navigation from "@/components/Lk/Navigation";
import vClickOutside from "v-click-outside";
import CalendarModal from "@/components/Calendar/CalendarModal";
import SidebarComponent from "@/components/Lk/SidebarComponent";
import MobileMenu from "@/components/Lk/MobileMenu";
import BreadcrumbsComponent from "../components/Base/BreadcrumbsComponent";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "MainLayout",
  data() {
    return {
      canRenderChild: false,
      showBurger: false
    };
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  components: {
    HeaderApp,
    Navigation,
    CalendarModal,
    SidebarComponent,
    MobileMenu,
    SvgSprite,
    BreadcrumbsComponent,
    "c-content": Content
  },
  methods: {
    ...mapMutations(["checkIsConsultation"]),
    openBurgerMenu() {
      this.showBurger = !this.showBurger;
    },
    closeMenu() {
      this.showBurger = false;
    },
    clickedOutside(bool) {
      if (bool) return;
      this.showBurger = false;
    }
  },
  computed: {
    ...mapGetters(["user"])
  },
  async beforeMount() {
    // Если у пользователя есть токен, то авторизация происходит при помощи него
    await this.$store.dispatch("login");
    // Пока авторизация не закончена мы не создаем дочерних компонентов
    this.canRenderChild = true;
    this.checkIsConsultation();
  },
  mounted() {
    console.log("route", this.$route.meta.lesson);
  }
};
</script>

<style scoped="scoped" lang="sass">
$header-height: 76px

.main
  display: flex
  flex-direction: column
  width: 100%
  height: 100vh
  padding-left: 87px
  background-color: #ffffff
  background-image: url(~@/assets/imgs/red-bg.jpg)
  background-attachment: fixed
  background-size: 100% 100%
  background-repeat: no-repeat
  overflow: hidden
  &__content
    display: flex
    flex-direction: column
    flex-grow: 1
    width: 100%
    height: 100%
    padding: 20px 40px
  &__header-wrap
    position: relative
    width: 100%
    height: $header-height
    z-index: 2
  &__header
    width: 100%
    height: 100%
  &__body-wrap
    position: relative
    flex-grow: 1
    width: 100%
    height: calc( 100% - #{$header-height} )
    z-index: 1
  &__body
    width: 100%
    height: 100%
    overflow-x: hidden
    overflow-y: auto
.header__lavel
  width: 100%
  height: 100%
  font-weight: 600
  font-size: 40px
  line-height: 56px
  color: #95B423
  overflow: hidden
  white-space: nowrap
  text-overflow: ellipsis
</style>
