<template>
  <v-app>
    <header-app />
    <navigation v-if="user" />
    <v-main class="v-main" :class="{ 'v-main--resize': user }">
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

import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    HeaderApp,
    Modals,
    Snackbars,
    Navigation,
    BgComponent
  },
  computed: {
    ...mapGetters(["user"])
  },
  beforeMount() {}
};
</script>

<style lang="sass">
@import "@/components/Sass/Varibles.sass"

#app
  background: $bg_color
.v-main
  width: 100%
  margin-top: 64px
  &--resize
    width: calc(100vw - 56px)
    margin-left: 56px
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
