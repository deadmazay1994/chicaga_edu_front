<template>
  <div @click="toggle" style="cursor: pointer">
    <div
      class="offer-card offer-card--front"
      :class="'offer-card__' + offer.style"
      :style="frontStyle"
    >
      <div>
        <div class="offer-card__title">{{ offer.title }}</div>
        <div class="offer-card__subtitle">
          {{ offer.subTitle }}
        </div>
      </div>
      <div>
        <div class="offer-card__offer">{{ offer.offer }}</div>
        <div class="offer-card__description">
          {{ offer.description }}
        </div>
      </div>
      <!-- Для правильного позиционирования -->
      <span></span>
      <checkbox @click.native="toggle" class="offer-card__checkbox" />
    </div>
    <div
      class="offer-card offer-card--back"
      :class="'offer-card__' + offer.style"
      :style="backStyle"
    >
      <checkbox class="offer-card__checkbox" :disabled="true" />
    </div>
  </div>
</template>

<script>
import Checkbox from "./../Checkbox";

export default {
  name: "offer-card",
  data: function() {
    return {
      side: "back"
    };
  },
  methods: {
    toggle() {
      if (this.side == "front") {
        this.side = "back";
      } else {
        this.side = "front";
      }
    }
  },
  computed: {
    frontStyle() {
      if (this.side == "front") {
        return {
          transform: "rotateY(0)"
        };
      } else {
        return {
          transform: "rotateY(180deg)"
        };
      }
    },
    backStyle() {
      if (this.side == "back") {
        return {
          transform: "rotateY(0)"
        };
      } else {
        return {
          transform: "rotateY(180deg)"
        };
      }
    }
  },
  components: {
    Checkbox
  },
  props: ["offer"],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
.offer-card
  width: 125px
  background: transparent
  background-position: -2px
  background-image: url("/imgs/tasksBgs/price.png")
  background-size: 100% 100%
  text-align: center
  padding: 15px
  padding-bottom: 0
  border-radius: 20px
  min-height: 145px
  display: flex
  flex-wrap: wrap
  flex-direction: column
  justify-content: space-between
  position: relative
  transition: .5s
  backface-visibility: hidden
  &__wrap
    position: relative
    perspective: 1000px
  &--back
    margin-top: calc(-100% - 20px)
  &--front
    transform: rotateY(180deg)
  &__title
    font-size: 16px
    line-height: 16px
  &__subtitle
    font-size: 12px
    line-height: 14px
  &__offer
    font-weight: 500
    font-size: 26px
    line-height: 18px
  &__description
    font-size: 14px
  &__checkbox
    position: absolute
    bottom: 0px
    left: calc(50% - 12px)
  &__silver
    background-image: url("/imgs/tasksBgs/silver.png")
  &__gold
    background-image: url("/imgs/tasksBgs/gold.png")
</style>
