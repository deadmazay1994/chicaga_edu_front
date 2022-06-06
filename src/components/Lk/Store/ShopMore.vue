<template>
  <div class="shop-more vue-component">
    <router-link
      class="shop__more shop__more--merch"
      tag="button"
      to="/lk/store"
      >Вернуться</router-link
    >
    <div class="shop-more__grid">
      <ShopMoreItem
        v-for="(item, index) in products"
        :key="index"
        :item="item"
      />
    </div>
  </div>
</template>

<script>
import api from "@/mixins/api";
import ShopMoreItem from "./Merch/MerchShowcaseItem.vue";

export default {
  name: "shop-more",
  components: {
    ShopMoreItem
  },
  data: function() {
    return {
      products: undefined
    };
  },
  props: [],
  computed: {},
  methods: {
    setProducts() {
      this.products = api.methods.getProducts();
    }
  },
  mounted() {
    this.setProducts();
  }
};
</script>

<style scoped="scoped" lang="sass">
@import "@/assets/styles/variables.sass"
.shop__more
  font-family: Manrope, sans-serif
  font-weight: 900
  font-size: 12px
  color: $gray

  cursor: pointer

  &--merch
    @media($media_md2)
      display: none

.shop-more__grid
  display: grid
  grid-template-columns: 1fr 1fr 1fr
  grid-gap: 2rem
  margin-top: 1.5rem
</style>
