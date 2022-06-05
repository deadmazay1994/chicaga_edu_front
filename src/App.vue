<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
export default {
  computed: {
    layout() {
      console.log(this.$route)
      return this.$route.meta.layout || "default-layout";
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/main.sass";
</style>
