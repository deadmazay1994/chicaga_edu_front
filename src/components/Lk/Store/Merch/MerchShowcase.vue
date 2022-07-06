<template>
  <!-- <div class="merch__block merch__hoodie"> -->
  <div class="merch-showcase">
    <div class="merch-showcase__head">
      <div class="merch-showcase__title">Худи</div>
      <router-link
        class="shop__more shop__more--merch"
        tag="button"
        to="/lk/shop-more"
        >Смотреть всё</router-link
      >
    </div>

    <div class="hoodie__content active">
      <merch-showcase-item
        v-for="(item, index) in storeGoods"
        :key="index"
        :item="item"
        :index="index"
      />
    </div>
  </div>
</template>

<script>
import api from "@/mixins/api";
import MerchShowcaseItem from "./MerchShowcaseItem.vue";

export default {
  name: "MerchShowcase",
  components: {
    MerchShowcaseItem
  },
  data() {
    return {
      storeGoods: undefined
    };
  },
  methods: {
    async setGoods() {
      let result = await api.methods.getProducts();
      this.storeGoods = result;
    }
  },
  mounted() {
    this.setGoods();
  }
};
</script>

<style lang="sass" scoped>
@import "@/assets/styles/variables.sass"
.merch-showcase
  &__head
    display: flex
    justify-content: space-between
    margin-bottom: 20px
  &__title
    font-family: Manrope, sans-serif
    font-weight: 600
    font-size: 20px
.shop__more
  font-family: Manrope, sans-serif
  font-weight: 900
  font-size: 12px
  color: $gray

  cursor: pointer

  &--merch
    @media($media_md2)
      display: none

.hoodie__content
  display: flex
  justify-content: space-between

  @media($media_md2)
    display: none

    &.active
      display: block
</style>
