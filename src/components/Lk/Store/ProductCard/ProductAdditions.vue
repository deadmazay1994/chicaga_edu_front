<template>
  <div class="product-additions vue-component">
    <div class="product-additions__inner">
      <button class="product-additions__item">
        <svg class="product-additions__svg">
          <use xlink:href="#help"></use>
        </svg>
        <span>Помощь</span>
      </button>

      <button class="product-additions__item">
        <svg class="product-additions__svg">
          <use xlink:href="#delivery"></use>
        </svg>
        <span>Доставка</span>
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

.product-additions {
  overflow: hidden;

  &__inner {
    display: flex;
    flex-wrap: wrap;
    margin: -5px -25px;
  }

  &__item {
    display: flex;
    align-items: center;
    margin: 5px 25px;
    padding: 0;
    color: $gray;
    background-color: transparent;
    border-width: 0;
    transition-property: color;
    transition-duration: 0.3s;
    outline: none;
  }

  &__item:focus-visible {
    color: $black;
  }

  &__item:hover {
    color: $red_dark;
  }

  &__item:active {
    color: $red;
  }

  &__svg {
    width: 25px;
    height: 25px;
    margin-right: 10px;
  }
}
</style>
