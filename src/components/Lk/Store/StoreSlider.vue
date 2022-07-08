<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide
      class="merch-slider__item"
      v-for="(slide, index) in 3"
      :key="index"
    >
      <div class="slider__text">
        <h3 class="slider__subtitle">Купи новый мерч от CHICAGA</h3>

        <div>
          <div class="slider__title">Стану акулой</div>
          <br />
          <div class="slider__title">в английском</div>
        </div>

        <button class="slider__btn">Подробнее</button>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper/src";
import "swiper/swiper-bundle.min.css";

export default {
  name: "StoreSlider",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1
        // spaceBetween: 20
      }
    };
  }
};
</script>

<style lang="sass" scoped>
@import "@/assets/styles/variables.sass"
.swiper
  width: 100%
  @media ($media_md2)
    display: none
.merch-slider__item
  display: flex
  align-items: center
  position: relative
  background: url("~@/assets/imgs/swiper-image.png") no-repeat, linear-gradient(180deg, #FFE2E4 0%, #F2F7FB 100%)
  background-position: bottom 100% right 10%, center, left
  border-radius: 20px
  padding: 28px 0 15px 25px
  width: 100%
  height: auto

  @media ($media_xl)
    height: auto

.shop__slide
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%

.slider__text
  position: relative
  z-index: 2
  color: $white


.slider__subtitle
  font-family: Manrope, sans-serif
  font-weight: 500
  font-size: 12px
  margin-bottom: 15px
  color: #000000

.slider__title
  font-family: Manrope, sans-serif
  font-weight: 700
  font-size: 22px
  color: $black

  display: inline-block
  margin-bottom: 1px
  padding: 4px 5px

  background: $white

.slider__btn
  margin-top: 15px
  background: $white
  box-shadow: 0px 4px 10px rgba(164, 164, 164, 0.2)
  border-radius: 10px
  padding: 10px 30px

  font-size: 12px
  font-weight: 600
  color: #323232

.slider__dots
  display: flex
  justify-content: center
  align-items: center

  position: relative
  z-index: 2

.dots__item
  background: $white
  width: 7px
  height: 7px
  border-radius: 50%
  margin-right: 15px

  cursor: pointer

  &--modal
    background: $gray

    width: 8px
    height: 8px

  &:last-child
    margin-right: 0

  &.active
    width: 10px
    height: 10px
    background: none
    border: 2px solid $white

  &--modal.active
    width: 12px
    height: 12px
    border: 2px solid $gray
</style>
