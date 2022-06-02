<template>
  <div class="merch__item hoodie__item">
    <div class="merch__item-price hoodie__price">
      <svg class="merch__svg">
        <use xlink:href="#coin"></use>
      </svg>
      <span>{{ item.price }} т.</span>
    </div>

    <img class="hoodie__img" :src="item.src" :alt="`hoodie + ${index}`" />
    <h3 class="hoodie__title">{{ item.title }}</h3>

    <div class="hoodie__hover-text">
      <span @click="openModal(item.id)">Подробнее</span>
      <svg class="hoodie__svg">
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

.hoodie__price
  font-family: Manrope, sans-serif
  font-weight: 600
  font-size: 12px
  background: rgba($red, .8)
  color: $white

  border-top-left-radius: 15px
  border-bottom-right-radius: 15px
  display: inline-block
  padding: 6px 15px

.hoodie__item
  position: relative
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  flex-basis: 32%

  padding: 42px 0 25px

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

.hoodie__hover-text
  position: absolute
  top: 50%
  left: 50%
  margin-right: -50%
  transform: translate(-50%, -50%)
  z-index: 4

  display: flex
  align-items: center
  background: $white
  box-shadow: 0px 4px 10px rgba(164, 164, 164, 0.2)
  border-radius: 10px
  opacity: 0
  padding: 10px 20px

  transition: opacity .3s
  cursor: pointer

.hoodie__price
  position: absolute
  top: 0
  left: 0

.hoodie__title
  font-family: Manrope, sans-serif
  font-weight: 900
  font-size: 14px
  text-align: center
  margin-top: 15px

.hoodie__svg
  transform: rotate(-90deg)
  width: 12px
  height: 12px

  margin-left: 5px
</style>
