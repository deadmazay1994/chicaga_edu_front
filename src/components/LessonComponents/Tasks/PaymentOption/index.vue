<template>
  <div class="payment-option vue-component">
    <description :index="index"
      >Какой из 3 вариантов оплаты <br />
      для вас наиболее удобен</description
    >
    <div class="payment__slider-wrap">
      <div class="payment__slider" ref="slider">
        <div
          class="payment__slider-item"
          v-for="(group, index) in offers"
          :key="index"
        >
          <div class="payment__wrap">
            <div class="d-flex justify-center">
              <div class="payment__title">{{ group.title }}</div>
            </div>
            <div class="payment__cards">
              <div
                class="offer-card payment__card"
                :class="'offer-card__' + offer.style"
                v-for="(offer, i) in group.content"
                :key="i"
              >
                <div>
                  <div class="offer-card__title">{{ offer.title }}</div>
                  <div class="offer-card__subtitle">{{ offer.subTitle }}</div>
                </div>
                <div>
                  <div class="offer-card__offer">{{ offer.offer }}</div>
                  <div class="offer-card__description">
                    {{ offer.description }}
                  </div>
                </div>
                <span><checkbox /></span>
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
</template>

<script>
import Description from "./../TasksDescription";

import Checkbox from "./../Checkbox";
import Arrows from "@/components/Icons/SliderArrows";

import Methods from "@/mixins/tasks";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "payment-option",
  data: function() {
    return {
      inputCopy: {},
      activeIndex: 0,
      error: false,
      offers: [
        {
          title: "ГРУППОВЫЕ ЗАНЯТИЯ",
          content: [
            {
              title: "1 месяц",
              subTitle: "",
              offer: "7000",
              description: "р/месяц",
              style: ""
            },
            {
              title: "3 месяца",
              subTitle: "Половина курса",
              offer: "5900",
              description: "р/месяц",
              style: "silver"
            },
            {
              title: "6 месяцев",
              subTitle: "Весь курс",
              offer: "5300",
              description: "р/месяц",
              style: "gold"
            }
          ]
        },
        {
          title: "ИНДИВИДУАЛЬНЫЕ ЗАНЯТИЯ",
          content: [
            {
              title: "1 месяц",
              subTitle: "",
              offer: "7000",
              description: "р/месяц",
              style: ""
            },
            {
              title: "3 месяца",
              subTitle: "Половина курса",
              offer: "5900",
              description: "р/месяц",
              style: "silver"
            },
            {
              title: "6 месяцев",
              subTitle: "Весь курс",
              offer: "5300",
              description: "р/месяц",
              style: "gold"
            }
          ]
        }
      ]
    };
  },
  methods: {
    ...mapMutations(["saveTask"]),
    slide() {
      if (this.activeIndex <= this.offers.length - 2) {
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
    Checkbox,
    Arrows
  },
  props: ["input", "index"],
  mixins: [Methods],
  mounted() {
    this.$refs.slider.style["width"] = this.offers.length * 100 + "%";
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
.offer-card
  width: 125px
  background: #f3f3f3
  text-align: center
  padding: 15px
  border-radius: 20px
  min-height: 145px
  display: flex
  flex-wrap: wrap
  flex-direction: column
  justify-content: space-between
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
  &__silver
    background: linear-gradient(111.41deg, #BEBDBD 5.63%, #FFFFFF 26.74%, #CBCACA 49.72%, #FFFDFD 72.7%, #CCCACA 95.69%)
  &__gold
    background: linear-gradient(109.42deg, #E7A148 5.44%, #FCE2C1 25.87%, #EDA74E 49.08%, #FADFBC 72.3%, #E5A451 94.59%)
</style>
