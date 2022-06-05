<template>
  <div class="evaluation-component vue-component">
    <div class="evaluation-component__title">
      Оцените урок:
    </div>
    <div class="evaluation-component__points">
      <StarIcon
        class="evaluation-component__star"
        :active="star.active"
        :hover="star.hover"
        v-for="(star, index) in stars"
        :key="index"
        @mouseenter="hoverStars(index)"
        @mouseleave="unHoverStars()"
        @click="selectStar(index)"
      />
    </div>
  </div>
</template>

<script>
import StarIcon from "./StarIcon.vue";

export default {
  name: "evaluation-component",
  components: {
    StarIcon
  },
  data: function() {
    return {
      voted: false,
      stars: [
        { active: false, hover: false },
        { active: false, hover: false },
        { active: false, hover: false },
        { active: false, hover: false },
        { active: false, hover: false }
      ]
    };
  },
  props: [],
  computed: {},
  methods: {
    selectStar(index) {
      this.stars.map(star => (star.active = false));
      for (let i = 0; i <= index; i++) {
        this.stars[i].active = true;
      }
    },
    hoverStars(index) {
      for (let i = 0; i <= index; i++) {
        this.stars[i].hover = true;
      }
    },
    unHoverStars() {
      this.stars.map(star => (star.hover = false));
    }
  }
};
</script>

<style scoped="scoped" lang="sass">
.evaluation-component
  &__title
    font-size: 16px
    font-weight: 700
    font-family: Manrope, sans-serif
  &__points
    margin-top: 8px
    display: flex
  &__star
    padding: 0 8px
    &:first-child
      padding-left: 0px
    &:last-child
      padding-right: 0px
</style>