<template>
  <div class="merch-showcase">
    <div class="merch-showcase__head">
      <div class="merch-showcase__title">Худи</div>
      <router-link
        class="merch-showcase__more-link"
        tag="button"
        to="/lk/shop-more"
        >Смотреть всё</router-link
      >
    </div>
    <div class="merch-showcase__body">
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
  &__more-link
    font-family: Manrope, sans-serif
    font-weight: 900
    font-size: 12px
    color: $gray
    cursor: pointer
  &__body
    display: flex
    justify-content: space-between
    @media($media_md2)
      display: none
      &.active
        display: block
</style>
