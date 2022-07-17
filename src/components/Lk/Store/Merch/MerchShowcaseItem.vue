<template>
  <div class="merch-item">
    <div class="merch-item__price-box">
      <svg class="merch-item__price-icon" width="15" height="15">
        <use xlink:href="#coin"></use>
      </svg>
      <span class="merch-item__price">{{ item.price }} т.</span>
    </div>
    <div class="merch-item__img-box">
      <img
        class="merch-item__img"
        :src="item.src"
        width="158"
        height="158"
        :alt="`hoodie + ${index}`"
      />
    </div>
    <div class="merch-item__title">{{ item.title }}</div>
    <div class="merch-item__overlay" tabindex="0">
      <button
        class="merch-item__overlay-btn"
        type="button"
        @click="openModal(item.id)"
      >
        <span class="merch-item__overlay-text">Подробнее</span>
        <svg class="merch-item__overlay-icon" width="12" height="12">
          <use xlink:href="#arrow-simple"></use>
        </svg>
      </button>
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
.merch-item
  position: relative
  display: flex
  flex-direction: column
  align-items: center
  padding: 42px 25px 16px
  text-align: center
  background-color: #ffffff
  border-radius: 15px
  box-shadow: 0 4px 10px rgba(128, 128, 128, 0.2)
  overflow: hidden
  &__price-box
    position: absolute
    top: 0
    left: 0
    display: flex
    align-items: center
    padding: 5px 16px
    font-weight: 600
    font-size: 12px
    color: #ffffff
    background-color: rgba($red, 0.8)
    border-top-left-radius: 15px
    border-bottom-right-radius: 15px
  &__price-icon
    width: 15px
    height: 15px
    margin-right: 6px
  &__img-box
    width: 158px
    height: 158px
    margin-bottom: 5px
  &__img
    width: 100%
    height: 100%
    object-fit: contain
  &__title
    display: -webkit-box
    -webkit-box-orient: vertical
    height: calc( 18px * 2 )
    font-weight: 600
    font-size: 14px
    line-height: 18px
    -webkit-line-clamp: 2
    text-overflow: ellipsis
    overflow: hidden
  &__overlay
    position: absolute
    top: 0
    left: 0
    display: flex
    align-items: center
    justify-content: center
    width: 100%
    height: 100%
    font-weight: 700
    font-size: 12px
    background-color: transparent
    border: 1.5px solid transparent
    border-radius: 15px
    outline-width: 0
    z-index: 1
    transition-property: background-color, border-color
    transition-duration: 0.3s
  &__overlay:focus-visible,
  &__overlay:hover
    background-color: rgba($gray, 0.1)
    border-color: rgba($red, 0.8)
  &__overlay-btn
    display: flex
    align-items: center
    padding: 10px 20px
    background-color: #ffffff
    outline: 1px solid transparent
    outline-offset: -1px
    border-radius: 10px
    box-shadow: 0 4px 10px rgba(164, 164, 164, 0.2), inset 0 4px 10px rgba(164, 164, 164, 0)
    opacity: 0
    cursor: pointer
    transition-property: opacity, outline-color, box-shadow
    transition-duration: 0.3s
  &__overlay:focus-visible &__overlay-btn,
  &__overlay:hover &__overlay-btn
    opacity: 1
  &__overlay-btn:focus-visible,
  &__overlay-btn:hover
    outline-color: #d9d9d9
    opacity: 1
  &__overlay-btn:active
    outline-color: transparent
    box-shadow: 0 4px 10px rgba(164, 164, 164, 0), inset 0 4px 10px rgba(164, 164, 164, 0.2)
    opacity: 1
    transition-duration: 0.1s
  &__overlay-icon
    width: 12px
    height: 12px
    margin-left: 5px
</style>
