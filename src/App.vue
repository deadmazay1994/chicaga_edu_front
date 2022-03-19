<template>
  <component :is="layout">
    <router-view />
    <snuckbars />
    <notifications />
  </component>
</template>

<script>
import Notifications from "./components/Base/Notifications.vue";

export default {
  computed: {
    layout() {
      return this.$route.meta.layout || "default-layout";
    }
  },
  components: {
    Notifications
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/main.sass";
</style>
