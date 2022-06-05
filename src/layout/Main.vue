<template>
  <main class='main vue-component'>
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
      <c-content class="main__content">
        <template v-slot:header>
          <header-app class="main__header" />
        </template>
        <template v-slot:default>
          <router-view class="main__body"/>
        </template>
      </c-content>
    <calendar-modal />
    <svg-sprite />
  </main>
</template>

<script>
import SvgSprite from "@/components/Icons/Sprite"
import Content from "@/components/Base/Content"

import HeaderApp from "@/components/Base/Header";
import Navigation from "@/components/Lk/Navigation";
import vClickOutside from "v-click-outside";
import CalendarModal from "@/components/Calendar/CalendarModal";
import SidebarComponent from "@/components/Lk/SidebarComponent";
import MobileMenu from "@/components/Lk/MobileMenu";
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
    'c-content': Content
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
  }
};
</script>

<style scoped='scoped' lang='sass'>
.main
  background: url(/img/red-bg.ccf9e38d.jpg) no-repeat
  background-attachment: fixed
  background-size: 100% 100%
  min-height: 100vh
  width: 100%
  overflow: auto
  &__content
    width: calc(100vw - 150px)
    height: calc(100vh - 40px) 
    margin: 20px 20px 20px auto
    overflow: auto
    display: flex
    flex-direction: column
  &__header
    margin-bottom: 25px
  &__body
    margin: 0 20px
</style>
