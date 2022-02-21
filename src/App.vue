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
</style>
