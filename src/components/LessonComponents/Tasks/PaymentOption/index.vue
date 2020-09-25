<template>
  <div class="payment-option vue-component">
    <description :index="index">{{ inputCopy.description }}</description>
    <div class="task-wrap">
      <div class="payment__slider-wrap">
        <div class="payment__slider" ref="slider">
          <div
            class="payment__slider-item"
            v-for="(group, index) in inputCopy.offers"
            :key="index"
          >
            <div class="payment__wrap">
              <div class="d-flex justify-center">
                <div class="payment__title">{{ group.title }}</div>
              </div>
              <div class="payment__cards">
                <div
                  class="offer-card__wrap"
                  v-for="(offer, i) in group.content"
                  :key="i"
                >
                  <card :offer="offer" />
                </div>
              </div>
            </div>
            <arrows
              class="payment__arrows"
              :class="{ 'payment__arrows--reverse': index == 1 }"
              @click.native="slide()"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Description from "./../TasksDescription";
import Card from "./Card";
import Arrows from "@/components/Icons/SliderArrows";

import Methods from "@/mixins/tasks";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "payment-option",
  data: function() {
    return {
      inputCopy: {},
      activeIndex: 0,
      error: false
    };
  },
  methods: {
    ...mapMutations(["saveTask"]),
    slide() {
      if (this.activeIndex <= this.inputCopy.offers.length - 2) {
        this.activeIndex++;
      } else {
        this.activeIndex--;
      }
      this.$refs.slider.style["margin-left"] = -(this.activeIndex * 100) + "%";
    }
  },
  computed: {
    ...mapGetters(["socket"])
  },
  components: {
    Description,
    Arrows,
    Card
  },
  props: ["input", "index"],
  mixins: [Methods],
  mounted() {
    this.$refs.slider.style["width"] = this.inputCopy.offers.length * 100 + "%";
  }
};
</script>

<style scoped="scoped" lang="sass">
.payment
  &__slider-wrap
    overflow: hidden
  &__slider
    transition: 0.5s
  &__slider-item
    display: inline-block
    width: 50%
    position: relative
  &__wrap
    background: url("/imgs/PaymentBg.png")
    background-position: center
    background-size: 100% 100%
    border-radius: 15px
    padding: 25px 0
  &__title
    margin: 0 auto
    font-size: 18px
    font-weight: bold
    padding: 7px 30px
    border-radius: 13px
    display: inline-block
    text-transform: uppercase
    background: rgba(255, 255, 255, 0.8)
  &__cards
    margin-top: 20px
    display: flex
    flex-wrap: wrap
    justify-content: center
  &__card
    margin: 0 5px
  &__arrows
    position: absolute
    top: 50%
    right: 20px
    cursor: pointer
    &--reverse
      transform: rotate(180deg)
</style>
