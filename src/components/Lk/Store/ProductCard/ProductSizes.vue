<template>
  <div class="product-sizes vue-component">
    <div class="product-sizes__inner">
      <button class="product-sizes__item product-sizes__item--active">
        xs
      </button>
      <button class="product-sizes__item">
        s
      </button>
      <button class="product-sizes__item">
        m
      </button>
      <button class="product-sizes__item">
        l
      </button>
      <button class="product-sizes__item">
        xl
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

.product-sizes {
  overflow: hidden;

  &__inner {
    display: flex;
    flex-wrap: wrap;
    margin: -6px -13px;
  }

  &__item {
    display: block;
    margin: 0;
    padding: 6px 13px;
    text-transform: uppercase;
    background-color: transparent;
    border-width: 0;
    transition-property: color;
    transition-duration: 0.3s;
    outline: none;
  }

  &__item:focus-visible {
    text-shadow: 1px 0 2px $red_light, 0 1px 2px $red_light,
      -1px 0 2px $red_light, 0 -1px 2px $red_light;
  }

  &__item:hover {
    color: $red_dark;
  }

  &__item:active {
    color: $red;
  }

  &__item--active {
    color: $red;
  }
}
</style>
