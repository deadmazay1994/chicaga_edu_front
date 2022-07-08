<template>
  <div class="store vue-component">
    <div class="store__content">
      <interlayer-vue class="store__interlayer" :title="'Магазин'">
        <router-view />
      </interlayer-vue>

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
  &__interlayer
    padding: 32px
    padding-right: 20px
    width: 60%
    overflow-y: auto
    overflow-x: visible
  &__shop-cart-wrapper
    padding: 32px
    padding-left: 0px
    flex-basis: 40%
  &__shop-cart
    height: 100%
</style>
