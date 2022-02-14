<template>
  <component :is="layout">
    <router-view />
    <snuckbars />
  </component>
</template>

<script>
import Snuckbars from "@/components/Base/Snackbars";
export default {
  computed: {
    layout() {
      return this.$route.meta.layout || "default-layout";
    },
  },
  components: {
    Snuckbars,
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
