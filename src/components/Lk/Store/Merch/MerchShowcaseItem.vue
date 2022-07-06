<template>
  <div class="merch-showcase-item" @click="openModal(item.id)">
    <div class="merch-showcase-item__price">
      <svg class="merch-showcase-item__svg">
        <use xlink:href="#coin"></use>
      </svg>
      <span>{{ item.price }} т.</span>
    </div>

    <img
      class="merch-showcase-item__img"
      :src="item.src"
      :alt="`hoodie + ${index}`"
    />
    <h3 class="merch-showcase-item__title">{{ item.title }}</h3>

    <div class="merch-showcase-item__text">
      <span>Подробнее</span>
      <svg class="merch-showcase-item__svg">
        <use xlink:href="#arrow-down"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  name: "MerchShowcaseItem",
  props: {
    item: Object,
    index: Number
  },
  methods: {
    ...mapMutations(["toggleShopModale"]),
    ...mapActions(["setShopProductInfo"]),
    openModal(id) {
      this.setShopProductInfo(id);
      this.toggleShopModale();
    }
  }
};
</script>

<style lang="sass" scoped>
@import "@/assets/styles/variables.sass"
.merch-showcase-item
  position: relative
  display: flex
  align-items: center
  flex-direction: column
  justify-content: center
  flex-basis: 32%
  padding: 42px 0 25px
  background: #FFFFFF
  box-shadow: 0px 4px 10px rgba(128, 128, 128, 0.2)
  border-radius: 15px
  overflow: hidden
  cursor: pointer
  @media($media_md2)
    width: 50%
    margin: 0 auto 10px
  @media($media_xs)
    width: 70%
  &:before
    content: ''
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: rgba($gray, .1)
    border: 1.5px solid rgba($red, .8)
    border-radius: 15px
    opacity: 0
    transition: opacity .3s
    cursor: pointer
  &:hover
    &:before
      opacity: 1
    .hoodie__hover-text
      opacity: 1
  &__price
    display: flex
    align-items: center
    background: rgba($red, .8)
    font-family: Manrope, sans-serif
    font-weight: 600
    font-size: 12px
    color: #FFFFFF
    border-top-left-radius: 15px
    border-bottom-right-radius: 15px
    padding: 6px 15px
  &__svg
    width: 15px
    height: 15px
    margin-right: 6px
  &__text
    position: absolute
    top: 50%
    left: 50%
    margin-right: -50%
    transform: translate(-50%, -50%)
    display: flex
    align-items: center
    z-index: 4
    padding: 10px 20px
    background: #FFFFFF
    box-shadow: 0px 4px 10px rgba(164, 164, 164, 0.2)
    border-radius: 10px
    opacity: 0
    cursor: pointer
    transition: opacity .3s
  &__price
    position: absolute
    top: 0
    left: 0
  &__title
    font-family: Manrope, sans-serif
    font-weight: 900
    font-size: 14px
    text-align: center
    margin-top: 15px
</style>
