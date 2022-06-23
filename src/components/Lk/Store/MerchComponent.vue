<template>
  <div class="store-component">
    <div class="shop__content">
      <div class="shop__content-inner merch__content active">
        <div class="merch__content__inner">
          <store-slider />
          <div class="merch__block merch__popular">
            <h2 class="shop__title shop__title--merch mb20">
              Популярные товары
            </h2>
            <popular-content />
            <merch-showcase />
          </div>
        </div>
      </div>
      <shop-cart :showTotal="true" />
    </div>
    <store-modal />
  </div>
</template>

<script>
import StoreSlider from "./StoreSlider.vue";
import PopularContent from "./Merch/PopularContent.vue";
import MerchShowcase from "./Merch/MerchShowcase.vue";
import ShopCart from "./Cart/ShopCart.vue";
import StoreModal from "@/components/Lk/Store/StoreModal";

export default {
  name: "MerchComponent",
  components: {
    StoreSlider,
    PopularContent,
    MerchShowcase,
    ShopCart,
    StoreModal
  }
};
</script>

<style lang="sass" scoped>
@import "./sass/shop.scss"
@import "./sass/merch.scss"
@import "./sass/merch-slider.scss"
@import "@/assets/styles/variables.sass"

p
  margin-bottom: 0 !important

.merch__slider
  width: 100%

.swiper
  width: 100%
  .swiper-slide
    width: 100%

.store-component
  height: 100%
.shop__content
  display: flex
  justify-content: space-between
  height: 100%
  width: 100%

  @media ($media_md2)
    padding: 0 15px

.merch__content
  height: 100%
  overflow: hidden
.merch__content__inner
  height: 100%
  overflow-y: auto
  padding-right: 20px
  padding: 32px 32px 42px 32px
.shop__content-inner
  // flex-grow: 1;
  width: 50%
  margin-top: 0

.shop__cart
  display: flex
  flex-direction: column
  justify-content: space-between
  background: $white
  box-shadow: 0px 4px 10px rgba(128, 128, 128, 0.2)
  border-radius: 20px
  padding: 25px

  margin: 0 0 0 15px
  flex-basis: 40%

  @media ($media_xl)
    margin: 50px 0 0 15px
    padding: 20px 15px

  @media ($media_md)
    margin: 50px 0 0 10px
    padding: 15px 5px 15px 10px


  @media ($media_md2)
    display: none
</style>
