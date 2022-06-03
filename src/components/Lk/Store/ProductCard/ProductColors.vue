<template>
  <div class="product-colors vue-component">
    <div class="product-colors__inner">
      <button
        v-for="(color, index) in colorsArray"
        class="product-colors__item"
        :class="{ 'product-colors__item--active': color.active }"
        :style="{ backgroundColor: color.color }"
        :key="index"
        @click="$emit('changeColor', index)"
      >
        <span class="sr-only">
          {{ color.title }}
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "product-colors",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
  props: {
    colorsArray: Array
  },
  mixins: {},
  beforeMount() {},
  mounted() {}
};
</script>

<style scoped="scoped" lang="scss">
@import "@/assets/styles/variables.sass";

.product-colors {
  overflow: hidden;

  &__inner {
    display: flex;
    flex-wrap: wrap;
    margin: -5px;
  }

  &__item {
    display: block;
    width: 35px;
    height: 35px;
    margin: 5px;
    padding: 0;
    background-color: transparent;
    border: 2px solid $gray;
    border-radius: 50%;
    transition-property: border-color;
    transition-duration: 0.3s;
    outline: none;
  }

  &__item:focus-visible {
    border-color: $black;
  }

  &__item:hover {
    border-color: $gray_light2;
  }

  &__item:active {
    border-color: $red;
  }

  &__item--active {
    border-color: $red;
  }

  // &__item--peach {
  //   background-color: #f4dfc5;
  // }

  // &__item--white {
  //   background-color: $white;
  // }

  // &__item--black {
  //   background-color: $black;
  // }

  // &__item--red {
  //   background-color: rgba(255, 0, 0, 0.8);
  // }
}
</style>
