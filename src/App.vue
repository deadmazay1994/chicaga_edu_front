<template>
  <v-app>
    <header-app />
    <navigation />
    <v-main style="width: calc(100vw - 56px); margin-left: 56px">
      <router-view />
    </v-main>
    <modals />
    <snackbars />
  </v-app>
</template>

<script>
import HeaderApp from "@/components/Base/Header";
import Modals from "@/components/Base/Modals";
import Snackbars from "@/components/Base/Snackbars";
import Navigation from "@/components/Lk/Navigation";

export default {
  name: "App",
  components: {
    HeaderApp,
    Modals,
    Snackbars,
    Navigation
  }
};
</script>

<style lang="sass">
@import "@/components/Sass/Varibles.sass"

#app
  background: #F5F5DC
.main-color
  background: $main-color !important
  &--text
    color: white !important
.pointer
  cursor: pointer
</style>
