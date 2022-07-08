<template>
  <div class="merch">
    <store-slider class="merch__slider" />
    <div class="merch__block merch__popular">
      <h2 class="shop__title shop__title--merch mb20">
        Популярные товары
      </h2>
      <popular-content />
      <merch-showcase class="merch__merch-showcase" />
    </div>
  </div>
</template>

<script>
import StoreSlider from "./StoreSlider.vue";
import PopularContent from "./Merch/PopularContent.vue";
import MerchShowcase from "./Merch/MerchShowcase.vue";

export default {
  name: "MerchComponent",
  components: {
    StoreSlider,
    PopularContent,
    MerchShowcase
  }
};
</script>

<style lang="sass" scoped>
@import "./sass/shop.scss"
@import "./sass/merch.scss"
@import "./sass/merch-slider.scss"
@import "@/assets/styles/variables.sass"

.merch
  padding: 32px 32px

  &__merch-showcase
    padding-top: 20px
</style>
