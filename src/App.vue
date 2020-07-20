<template>
  <v-app>
    <header-app />
    <v-main>
      <!-- <router-view /> -->
      <lesson />
    </v-main>
    <modals />
    <snackbars />
  </v-app>
</template>

<script>
import HeaderApp from "@/components/Base/Header";
import Modals from "@/components/Base/Modals";
import Snackbars from "@/components/Base/Snackbars";

import Lesson from "@/components/Lesson.vue";

export default {
  name: "App",
  components: {
    HeaderApp,
    Modals,
    Snackbars,
    Lesson
  }
};
</script>

<style lang="sass" scoped>
#app
  background: #F5F5DC
</style>
