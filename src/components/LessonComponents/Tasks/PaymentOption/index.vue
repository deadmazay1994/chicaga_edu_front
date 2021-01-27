<template>
  <div class="payment-option vue-component">
    <description :index="index">{{ inputCopy.description }}</description>
    <div class="task-wrap" v-for="level in inputCopy.levels" :key="level.id">
      <template v-if="activeLevel == level.id">
        <div class="payment__slider-wrap">
          <div class="payment__slider" :style="'width:' + sliderWidth">
            <div
              class="payment__slider-item"
              :style="'width: ' + 100 / level.offers.length + '%'"
              v-for="(group, index) in level.offers"
              :key="index"
            >
              <div class="payment__wrap">
                <div class="d-flex justify-center">
                  <div class="payment__title" v-html="group.title"></div>
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
                v-if="
                  index < inputCopy.levels[activeLevelIndex].offers.length - 1
                "
                class="payment__arrows"
                @click.native="Do('slide', 'next')"
              />
              <arrows
                v-if="index > 0"
                class="payment__arrows payment__arrows--reverse"
                @click.native="Do('slide', 'back')"
              />
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Description from "./../TasksDescription";
import Card from "./Card";
import Arrows from "@/components/Icons/SliderArrows";

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
    slide(direction) {
      if (direction == "next") {
        this.activeIndex++;
      } else {
        this.activeIndex--;
      }
      this.$el
        .querySelectorAll(".task-wrap")
        [this.activeLevelIndex].querySelector(".payment__slider").style[
        "margin-left"
      ] = -(this.activeIndex * 100) + "%";
    }
  },
  computed: {
    ...mapGetters(["socket", "activeLevel", "activeLevelIndex"]),
    sliderWidth() {
      for (let i = 0; i < this.inputCopy.levels.length; i++) {
        if (this.inputCopy.levels[i].id == this.activeLevel) {
          return this.inputCopy.levels[i].offers.length * 100 + "%";
        }
      }
      return "";
    }
  },
  watch: {
    activeLevelIndex: function() {
      this.activeIndex = 0;
    }
  },
  beforeMount() {
    this.onDo("slide");
  },
  components: {
    Description,
    Arrows,
    Card
  },
  props: ["input", "index"],
  mounted() {}
};
</script>

<style scoped="scoped" lang="sass">
.payment
  &__slider-wrap
    overflow: hidden
  &__slider
    transition: 0.5s
    display: flex
    align-items: center
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
    background: rgba(255, 255, 255, 0.8)
    text-align: center
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
      left: 20px
      right: auto
      transform: rotate(180deg)
</style>
