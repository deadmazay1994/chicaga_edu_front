<template>
  <div class="stand vue-component">
    <Record class="stand__item" />
    <div class="some-block stand__item"></div>
  </div>
</template>

<script>

import Record from "./LessonComponents/Record.vue";

export default {
  name: "stand",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {
    Record
  },
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
.stand
  display: flex
  gap: 20px
  &__item
    flex: 1
    height: 100%
</style>
