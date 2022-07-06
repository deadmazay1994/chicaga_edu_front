<template>
  <div class="store vue-component">
    <div class="store__content">
      <div class="store__content-inner">
        <router-view />
      </div>
      <shop-cart :showTotal="false" />
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

    &-inner
      width: 50%
      overflow-y: auto
</style>
