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
    },
  },
  components: {
    Notifications,
  },
};
</script>

<style>
body,
html {
  height: auto !important;
}
.red-btn {
  cursor: pointer;
  pointer-events: all !important;
  background: rgba(255, 53, 53);
}
</style>
