<template>
  <div class="product-colors vue-component">
    <div class="product-colors__inner">
      <button
        class="product-colors__item"
        :class="[
          'product-colors__item--' + color.color,
          { 'product-colors__item--active': color.active }
        ]"
        v-for="(color, index) in colors"
        :key="index"
        @click="changeColor(index)"
      >
        <span class="sr-only">
          {{ color.title }}
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "",
  data: function() {
    return {
      colors: undefined
    };
  },
  methods: {
    ...mapMutations(["setActiveColor"]),
    changeColor(index) {
      this.colors.map(color => (color.active = false));
      // Какой-то непонятный костыль из-за непоятной проблемы
      // Реактивность с colors пока не работает
      // Почему? Не знаю...
      this.colors[index].active = true;
      let newObj = this.colors[index];
      this.$set(this.colors, index, newObj);
      this.setActiveColor(newObj.title);
    }
  },
  computed: {},
  components: {},
  props: {
    colorsArray: Array
  },
  mixins: {},
  beforeMount() {},
  mounted() {
    this.colors = this.colorsArray.map((color, i) => {
      if (i == 0) color.active = true;
      else color.active = false;
      return color;
    });
    let activeColor = this.colorsArray.find(color => color.active);
    this.setActiveColor(activeColor.title);
  }
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
