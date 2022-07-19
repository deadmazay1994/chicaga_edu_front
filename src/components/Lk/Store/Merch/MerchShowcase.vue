<template>
  <div class="merch-showcase">
    <div class="merch-showcase__head">
      <div class="merch-showcase__title">Худи</div>
      <router-link
        class="merch-showcase__more-link"
        tag="button"
        to="/lk/shop-more"
        >Смотреть все</router-link
      >
    </div>
    <div class="merch-showcase__body">
      <merch-showcase-item
        class="merch-showcase__item"
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
    align-items: flex-end
    justify-content: space-between
    margin-bottom: 13px
  &__title
    margin-right: 1em
    font-weight: 600
    font-size: 20px
  &__more-link
    flex-shrink: 0
    font-weight: 500
    font-size: 12px
    color: $gray
    outline-width: 0
    cursor: pointer
    transition-property: color
    transition-duration: 0.3s
  &__more-link:focus-visible,
  &__more-link:hover
    color: inherit
  &__more-link:active
    opacity: 0.8
  &__body
    display: flex
    justify-content: space-between
  &__item
    flex-basis: 33.33%
  &__item:not(:last-child)
    margin-right: 10px
</style>
