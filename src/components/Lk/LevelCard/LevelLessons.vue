<template>
  <div class="level-lessons vue-component">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "",
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

<style scoped="scoped" lang="sass">
.level-lessons
  display: flex
  flex-direction: column
</style>
