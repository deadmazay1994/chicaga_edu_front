<template>
  <component :is="layout">
    <router-view />
    <snuckbars />
    <notifications />
  </component>
</template>

<script>
import Snuckbars from "@/components/Base/Snackbars";
import Notifications from "./components/Base/Notifications.vue";

export default {
  computed: {
    layout() {
      return this.$route.meta.layout || "default-layout";
    },
  },
  components: {
    Snuckbars,
    Notifications
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
