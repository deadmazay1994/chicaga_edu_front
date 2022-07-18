<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(slide, index) in 3" :key="index">
      <div
        class="merch-slide"
        style="background-color: #ffe2e4; background-image: linear-gradient(180deg, #ffe2e4 0%, #f2f7fb 100%)"
      >
        <div class="merch-slide__content">
          <div class="merch-slide__title-box">
            <span class="merch-slide__title"
              >Стану акулой<br />в английском</span
            >
          </div>
          <div class="merch-slide__subtitle">
            Купи новый мерч от CHICAGA
          </div>
          <div class="merch-slide__btn-box">
            <button class="merch-slide__btn" type="button">
              Подробнее
            </button>
          </div>
        </div>
        <div class="merch-slide__img-box">
          <img
            class="merch-slide__img"
            src="@/assets/imgs/swiper-image.png"
            width="380"
            height="201"
            alt="Худи 'Стану акулой в английском'"
          />
        </div>
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
        slidesPerView: 1,
        followFinger: false
      }
    };
  }
};
</script>

<style lang="sass" scoped>
.merch-slide
  position: relative
  display: flex
  justify-content: space-between
  font-size: 12px
  line-height: 16px
  color: #323232
  &__content
    display: flex
    flex-direction: column
    flex-shrink: 0
    flex-basis: 182px
    padding: 28px 10px 28px 25px
  &__title-box,
  &__subtitle
    display: -webkit-box
    -webkit-box-orient: vertical
    text-overflow: ellipsis
    overflow: hidden
  &__title-box
    height: calc( 29px * 2 )
    -webkit-line-clamp: 2
    margin-bottom: 15px
    font-weight: 700
    font-size: 22px
    line-height: 29px
    color: #0d0d0d
  &__title
    display: inline
    padding-right: 8px
    padding-left: 5px
    box-decoration-break: clone
    background-image: linear-gradient(0, transparent 0.15em, #ffffff 0.15em, #ffffff 1.25em, transparent 1.25em)
  &__subtitle
    order: -1
    height: 16px
    -webkit-line-clamp: 1
    margin-bottom: 14px
    font-weight: 500
  &__btn
    padding: 8px 32px
    font-weight: 600
    background-color: #ffffff
    outline: 1px solid transparent
    outline-offset: -1px
    border-radius: 10px
    box-shadow: 0 4px 10px rgba(164, 164, 164, 0.2), inset 0 4px 10px rgba(164, 164, 164, 0)
    transition-property: outline-color, box-shadow
    transition-duration: 0.3s
  &__btn:focus-visible,
  &__btn:hover
    outline-color: #d9d9d9
  &__btn:active
    outline-color: transparent
    box-shadow: 0 4px 10px rgba(164, 164, 164, 0), inset 0 4px 10px rgba(164, 164, 164, 0.2)
    transition-duration: 0.1s
  &__img-box
    display: flex
    flex: 1 0 380px
    height: 201px
  &__img
    width: 100%
    height: 100%
    object-fit: contain
</style>
