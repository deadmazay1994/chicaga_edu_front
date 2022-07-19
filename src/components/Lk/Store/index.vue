<template>
  <div class="store vue-component">
    <div class="store__content">
      <interlayer-vue class="store__interlayer" :title="'Магазин'">
        <router-view />
      </interlayer-vue>

      <div class="store__cart-wrapper">
        <shop-cart :showSubmit="true" class="store__cart" />
      </div>
    </div>
    <store-modal />
  </div>
</template>

<script>
import ShopCart from "./Cart/ShopCart.vue";
import StoreModal from "@/components/Lk/Store/StoreModal";
import InterlayerVue from "../../Interlayer.vue";

export default {
  name: "store",
  components: {
    ShopCart,
    StoreModal,
    InterlayerVue
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
@import "./sass/merch.scss"
@import "./sass/merch-slider.scss"
@import "@/assets/styles/variables.sass"

$cart-width: 408px
.store
  padding: 32px
  color: #0d0d0d
  @media ($media_xl)
    padding: 20px
  @media ($media_md)
    padding: 10px
  &__content
    display: flex
    width: 100%
    height: 100%
    @media ($media_xl)
      display: block
      height: auto
      padding: 0
  &__interlayer
    flex-grow: 1
    width: calc( 100% - #{$cart-width} )
    @media ($media_xl)
      flex-grow: 0
      width: auto
  &__cart-wrapper
    flex-shrink: 0
    flex-basis: $cart-width
    padding-left: 20px
    @media ($media_xl)
      flex-basis: auto
      padding-top: 20px
      padding-left: 0
  &__cart
    height: 100%
</style>
