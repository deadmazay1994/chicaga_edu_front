<template>
  <div class="page-title vue-component">
    <div class="text-subtitle-2 mt-2 front relative">{{ subtitle }}</div>
  </div>
</template>

<script>
export default {
  name: "page-title",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
  props: ["title", "subtitle"],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass"></style>
