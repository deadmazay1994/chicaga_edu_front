<template>
  <div class="popular-item" @click="openModal(item.id)">
    <div class="popular-item__info">
      <div class="popular-item__title">{{ item.title }}</div>
      <div class="popular-item__price-box">
        <svg class="popular-item__icon" width="15" height="15">
          <use xlink:href="#coin"></use>
        </svg>
        <span class="popular-item__price">{{ item.price }} м.</span>
      </div>
    </div>
    <div class="popular-item__img-box">
      <img
        class="popular-item__img"
        :src="item.image"
        width="54"
        height="54"
        :alt="item.alt"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  name: "PopularItem",
  props: {
    item: Object
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

$line-height: 16px

.popular-item
  display: flex
  align-items: center
  justify-content: space-between
  padding: 15px 20px
  font-size: 12px
  line-height: $line-height
  background-color: #ffffff
  border-radius: 15px
  box-shadow: 0 4px 10px rgba(128, 128, 128, 0.2)
  overflow: hidden
  cursor: pointer
  &__info
    flex-grow: 0
    flex-basis: 105px
    margin-right: 10px
  &__title
    display: -webkit-box
    -webkit-box-orient: vertical
    height: calc( $line-height * 2 )
    margin-bottom: 6px
    font-weight: 500
    -webkit-line-clamp: 2
    text-overflow: ellipsis
    overflow: hidden
  &__price-box
    display: flex
    align-items: center
    font-weight: 700
  &__icon
    width: 15px
    height: 15px
    margin-right: 6px
  &__price
    white-space: nowrap
  &__img-box
    display: flex
    align-items: center
    justify-content: center
    flex-shrink: 0
    width: 54px
    height: 54px
  &__img
    width: 100%
    height: 100%
    object-fit: contain
</style>
