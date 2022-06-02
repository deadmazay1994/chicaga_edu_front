<template>
  <div class="product-colors vue-component">
    <div class="product-colors__inner">
      <button
        class="product-colors__item product-colors__item--peach product-colors__item--active"
      >
        <span class="sr-only">
          Персиковый
        </span>
      </button>
      <button class="product-colors__item product-colors__item--white">
        <span class="sr-only">
          Белый
        </span>
      </button>
      <button class="product-colors__item product-colors__item--black">
        <span class="sr-only">
          Черный
        </span>
      </button>
      <button class="product-colors__item product-colors__item--red">
        <span class="sr-only">
          Красный
        </span>
      </button>
    </div>
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

  &__item--peach {
    background-color: #f4dfc5;
  }

  &__item--white {
    background-color: $white;
  }

  &__item--black {
    background-color: $black;
  }

  &__item--red {
    background-color: rgba(255, 0, 0, 0.8);
  }
}
</style>
