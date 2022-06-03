<template>
  <div class='main vue-component'>
    <div class="page">
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
      <c-content>
        <template v-slot:header>
          <header-app />
        </template>
      </c-content>
    </div>
    <calendar-modal />
    <svg-sprite />
  </div>
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

export default {
  name: 'main',
  data: function() {
    return {}
  },
  methods: {},
  computed: {},
  components: {
    SvgSprite,
    'c-content': Content,
    HeaderApp,
    Navigation,
    CalendarModal,
    SidebarComponent,
    MobileMenu
  },
  props: [],
  mixins: {},
  directives: {
    clickOutside: vClickOutside.directive
  },
  beforeMount() {}
}
</script>

<style scoped='scoped' lang='sass'></style>
