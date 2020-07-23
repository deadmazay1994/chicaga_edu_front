<template>
  <v-app>
    <header-app />
    <navigation />
    <v-main
      style="width: calc(100vw - 56px); margin-left: 56px; margin-top: 64px;"
    >
      <router-view class="main-view" />
    </v-main>
    <modals />
    <snackbars />
    <bg-component />
  </v-app>
</template>

<script>
import HeaderApp from "@/components/Base/Header";
import Modals from "@/components/Base/Modals";
import Snackbars from "@/components/Base/Snackbars";
import Navigation from "@/components/Lk/Navigation";
import BgComponent from "@/components/Base/Background";

export default {
  name: "App",
  components: {
    HeaderApp,
    Modals,
    Snackbars,
    Navigation,
    BgComponent
  }
};
</script>

<style lang="sass">
@import "@/components/Sass/Varibles.sass"

#app
  background: $bg_color
.main-color
  background: $main-color !important
  &--text
    color: white !important
  &-text
    color: darken($main-color, 15%) !important
.pointer
  cursor: pointer
.front
  z-index: 1
  opacity: 0.99
.relative
  position: relative
</style>
