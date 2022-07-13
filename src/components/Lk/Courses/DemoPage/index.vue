<template>
  <div class="demo-page vue-component">
    <demo-description class="demo-page__description" />
    <div class="demo-page__grid-title">
      Мини-курсы можно пройти уже сейчас:
    </div>
    <div class="demo-page__grid">
      <minicourse-card></minicourse-card>
      <minicourse-card></minicourse-card>
      <minicourse-card></minicourse-card>
    </div>
  </div>
</template>

<script>
import DemoDescription from "./DemoDescription.vue";
import MinicourseCard from "@/components/Lk/Courses/MinicourseCard.vue";

export default {
  name: "demo-page",
  components: {
    DemoDescription,
    MinicourseCard
  },
  data: function() {
    return {};
  },
  props: [],
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="sass">
.demo-page
  padding: 32px
  font-weight: 400
  font-size: 16px
  line-height: 1.5
  color: #323232
  &__description
    margin-bottom: 40px
  &__grid-title
    margin-bottom: 16px
    font-weight: 700
    font-size: 24px
    line-height: 1.3
  &__grid
    display: grid
    grid-template-columns: 1fr 1fr
    grid-gap: 16px
</style>
