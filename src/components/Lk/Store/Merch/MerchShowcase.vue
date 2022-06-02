<template>
  <div class="merch__block merch__hoodie">
    <div class="shop__more-inner">
      <h2 class="shop__title shop__title--merch">Худи</h2>
      <button class="shop__more shop__more--merch">Смотреть всё</button>
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
      let result = await api.methods.getGoods();
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

.shop__more-inner
  display: flex
  justify-content: space-between
  margin-bottom: 20px

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
