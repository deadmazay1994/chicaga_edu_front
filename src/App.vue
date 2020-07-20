<template>
  <v-app>
    <header-app />
    <v-main>
      <!-- <router-view /> -->
      <lesson />
    </v-main>
    <modals />
  </v-app>
</template>

<script>
import HeaderApp from "@/components/Base/Header";
import Modals from "@/components/Base/Modals";

import Lesson from "@/components/Lesson.vue";

export default {
  name: "App",
  components: {
    HeaderApp,
    Modals,
    Lesson
  }
};
</script>

<style lang="sass" scoped>
#app
  background: #F5F5DC
</style>
