<template>
  <div class="auth-title vue-component">
    <div class="text-h4 mb-3">
      <slot />
    </div>
    <v-divider class="mb-3" />
  </div>
</template>

<script>
export default {
  name: "auth-title",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass"></style>
