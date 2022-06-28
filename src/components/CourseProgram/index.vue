<template>
  <div class="course-program vue-component">
    <div class="course-program__inner">
      <card class="course-program__card" :kind="'teacher'"></card>
      <card class="course-program__card" :kind="'lesson'"></card>
      <card class="course-program__card" :kind="'lesson'"></card>
      <card class="course-program__card" :kind="'practical'"></card>
      <card class="course-program__card" :kind="'lesson'"></card>
      <card class="course-program__card" :kind="'lesson'"></card>
      <card class="course-program__card" :kind="'test'"></card>
      <card class="course-program__card" :kind="'lesson'"></card>
      <card class="course-program__card" :kind="'lesson'"></card>
    </div>
  </div>
</template>

<script>
import Card from "./CourseProgramCard";
export default {
  name: "",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {
    Card
  },
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
.course-program
  &__inner
    display: flex
    flex-wrap: wrap
    margin: -10px
  &__card
    flex-basis: 33.3%
    padding: 10px
    @media (max-width: 1300px)
      flex-basis: 50%
    @media (max-width: 1000px)
      flex-basis: 100%
</style>
