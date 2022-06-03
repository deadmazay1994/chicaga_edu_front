<template>
  <div class="stand vue-component">
    <LessonLeftSideComponentVue class="stand__item" />
    <div class="some-block stand__item"></div>
  </div>
</template>

<script>
import LessonLeftSideComponentVue from "./LessonComponents/LessonLeftSideComponent.vue";

export default {
  name: "stand",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {
    LessonLeftSideComponentVue
  },
  props: [],
  mixins: {},
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
