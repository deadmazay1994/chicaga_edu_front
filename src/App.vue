<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
export default {
  computed: {
    layout() {
      return this.$route.meta.layout || "main-layout";
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/main.sass";
</style>
