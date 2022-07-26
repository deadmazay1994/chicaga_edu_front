<template>
  <div class="main vue-component">
    <sidebar-component
      class="main__sidebar"
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
      class="main__mobile-menu"
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
              <span class="header-level" v-if="$route.meta.lesson === true"
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
    <modals-wrapper />
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
import BreadcrumbsComponent from "@/components/Base/BreadcrumbsComponent";
import ModalsWrapper from "@/components/Modals/ModalsWrapper.vue";
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
    ModalsWrapper,
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
@import "@/assets/styles/variables.sass"

$header-height: 76px

.main
  display: flex
  flex-direction: column
  width: 100%
  height: 100vh
  padding-left: 90px
  background-color: #f5f5f5
  background-image: url(~@/assets/imgs/bg/1.svg), url(~@/assets/imgs/bg/2.svg)
  background-attachment: fixed
  background-position: left bottom, right top
  background-size: 30% 70%
  background-repeat: no-repeat
  overflow: hidden
  @media ($media_lg2)
    padding-top: 50px
    padding-bottom: 60px
    padding-left: 0
  @media ($media_sm2)
    background-image: none
  &__sidebar
    position: fixed
    top: 0
    left: 0
    width: auto
    height: 100%
    z-index: 2
    @media ($media_lg2)
      top: auto
      bottom: 0
      width: 100%
      height: auto
  &__mobile-menu
    display: none
    @media ($media_lg2)
      position: fixed
      top: 0
      left: 0
      z-index: 3
      display: block
      width: 100%
  &__content
    position: relative
    z-index: 1
    display: flex
    flex-direction: column
    flex-grow: 1
    width: 100%
    height: 100%
    padding: 20px 40px
    @media ($media_lg2)
      padding: 10px 20px
    @media ($media_sm)
      padding-right: 10px
      padding-left: 10px
    @media ($media_sm2)
      padding: 0
  &__content-block
    @media ($media_sm2)
      border-radius: 0
  &__header-wrap
    position: relative
    width: 100%
    height: $header-height
    z-index: 2
    @media ($media_lg2)
      display: none
  &__header
    width: 100%
    height: 100%
  &__body-wrap
    position: relative
    flex-grow: 1
    width: 100%
    height: calc( 100% - #{$header-height} )
    z-index: 1
    @media ($media_lg2)
      height: 100%
  &__body
    width: 100%
    height: 100%
    overflow-x: hidden
    overflow-y: auto

.header-level
  width: 100%
  height: 100%
  font-weight: 600
  font-size: 40px
  line-height: 56px
  color: #95B423
  overflow: hidden
  white-space: nowrap
  text-overflow: ellipsis
  @media ($media_lg2)
    font-size: 32px
  @media ($media_sm)
    font-size: 24px
</style>
