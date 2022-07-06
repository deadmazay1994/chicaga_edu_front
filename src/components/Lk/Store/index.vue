<template>
  <div class="store vue-component">
    <div class="store__content">
      <div class="store__content-inner">
        <router-view />
      </div>
      <div class="store__shop-cart-wrapper">
        <shop-cart :showSubmit="true" class="store__shop-cart" />
      </div>
    </div>
    <store-modal />
  </div>
</template>

<script>
import ShopCart from "./Cart/ShopCart.vue";
import StoreModal from "@/components/Lk/Store/StoreModal";

export default {
  name: "store",
  components: {
    ShopCart,
    StoreModal
  },
  data: function() {
    return {};
  },
  props: [],
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="sass">
@import "./sass/shop.scss"
@import "./sass/merch.scss"
@import "./sass/merch-slider.scss"
@import "@/assets/styles/variables.sass"
.store
  height: 100%
  &__content
    display: flex
    justify-content: space-between
    height: 100%
    width: 100%
    @media ($media_md2)
      padding: 0 15px
  &__content-inner
    width: 50%
    overflow-y: auto
  &__shop-cart-wrapper
    padding: 32px
    flex-basis: 40%
  &__shop-cart
    height: 100%
</style>
