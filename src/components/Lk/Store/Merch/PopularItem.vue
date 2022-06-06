<template>
  <div class="merch__item popular__item">
    <div class="popular__item-text">
      <h3 class="popular__item-title">{{ itemTitle }}</h3>
      <p class="merch__item-price">
        <svg class="merch__svg">
          <use xlink:href="#coin"></use>
        </svg>

        <span>1000 т.</span>
      </p>
    </div>

    <div class="popular__item-img">
      <img :src="itemImg" alt="image" />
    </div>
  </div>
</template>

<script>
export default {
  name: "PopularItem",
  props: {
    itemImg: String,
    itemTitle: String
  }
};
</script>

<style lang="sass">
@import "@/assets/styles/variables.sass"

.merch__item
  background: $white
  box-shadow: 0px 4px 10px rgba(128, 128, 128, 0.2)
  border-radius: 15px
  overflow: hidden

  cursor: pointer

.popular__item
  padding: 15px
  margin-right: 15px

  flex-basis: 31%

  display: flex
  justify-content: space-between

  @media(min-width: 700px)
    &:last-child
      margin-right: 0

  @media($media_md)
    flex-basis: 32%


  @media($media_md2)
    width: 50%
    margin: 0 auto 10px auto


  @media($media_xs)
    width: 70%

.popular__item-text
  margin-right: 15px

.popular__item-title
  font-family: Manrope, sans-serif
  font-weight: 900 !important
  font-size: 12px

  margin-bottom: 10px

.popular__item-img
  width: 40px
  height: 50px

.merch__item-price
  font-family: Manrope, sans-serif
  font-weight: 900 !important
  font-size: 12px

  display: flex
  align-items: center

  &--order
    font-family: Manrope, sans-serif
    font-weight: 700 !important
    font-size: 16px

.merch__svg
  width: 15px
  height: 15px

  margin-right: 6px
</style>
