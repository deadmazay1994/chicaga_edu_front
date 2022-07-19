<template>
  <div class="merch">
    <store-slider class="merch__slider" />
    <div class="merch__block">
      <div class="merch__title">
        Популярные товары
      </div>
      <popular-content />
      <merch-showcase class="merch__showcase" />
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
@import "./sass/merch.scss"
@import "./sass/merch-slider.scss"
@import "@/assets/styles/variables.sass"

.merch
  padding: 32px
  &__slider
    border-radius: 20px
  &__block
    padding-top: 40px
  &__title
    margin-bottom: 17px
    font-weight: 600
    font-size: 20px
  &__showcase
    padding-top: 40px
</style>
