<template>
  <v-app class="v-app" v-if="canRenderChild">
    <header-app />
    <navigation v-if="user" />
    <v-main class="v-main" :class="{ 'v-main--resize': user }">
      <router-view class="main-view" />
    </v-main>
    <modals />
    <snackbars />
    <lightbox />
    <bg-component />
  </v-app>
</template>

<script>
import HeaderApp from "@/components/Base/Header";
import Modals from "@/components/Base/Modals";
import Snackbars from "@/components/Base/Snackbars";
import Navigation from "@/components/Lk/Navigation";
import BgComponent from "@/components/Base/Background";
import Lightbox from "@/components/Base/Lightbox";

import { mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      canRenderChild: false
    };
  },
  components: {
    HeaderApp,
    Modals,
    Snackbars,
    Navigation,
    BgComponent,
    Lightbox
  },
  computed: {
    ...mapGetters(["user"])
  },
  async beforeMount() {
    // Если у пользователя есть токен, то авторизация происходит при помощи него
    await this.$store.dispatch("login");
    // Пока авторизация не закончена мы не создаем дочерних компонентов
    this.canRenderChild = true;
  }
};
</script>

<style lang="sass">
@import "@/components/Sass/Varibles.sass"

body
  overflow-x: hidden
.v-main
  width: 100%
  margin-top: 64px
  &--resize
    @media (min-width: 1200px)
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
.response-content
  display: block
  max-width: 100%
  height: auto
.rotate-180
  transform: rotate(180deg)
.pre
  white-space: pre-wrap
  white-space: -moz-pre-wrap
  white-space: -pre-wrap
  white-space: -o-pre-wrap
  word-wrap: break-word
.zoom-wrapper
  overflow: auto
.checkbox
  position: absolute
  bottom: -7px
  left: calc(50% - 12px)
</style>

// Magnifier
<style>
.img-magnifier-container {
  position: relative;
}
.img-magnifier-glass {
  position: absolute;
  border: 3px solid #000;
  border-radius: 50%;
  cursor: none;
  /*Set the size of the magnifier glass:*/
  width: 100px;
  height: 100px;
}
.task-wrap {
  padding: 0 20px;
}
</style>
