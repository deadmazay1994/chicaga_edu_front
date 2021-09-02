<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
export default {
  computed: {
    layout() {
      return this.$route.meta.layout || "default-layout";
    }
  }
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
