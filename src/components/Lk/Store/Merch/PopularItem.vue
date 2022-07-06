<template>
  <div class="popular-item">
    <div class="popular-item__info">
      <h3 class="popular-item__title">{{ item.title }}</h3>
      <p class="popular-item__price">
        <svg class="popular-item__svg">
          <use xlink:href="#coin"></use>
        </svg>

        <span>{{ item.price }}</span>
      </p>
    </div>

    <div class="popular-item__img">
      <img :src="item.image" :alt="item.alt" />
    </div>
  </div>
</template>

<script>
export default {
  name: "PopularItem",
  props: {
    item: Object
  }
};
</script>

<style lang="sass" scoped>
@import "@/assets/styles/variables.sass"

.popular-item
  display: flex
  align-items: center
  justify-content: space-between
  flex-basis: 31%
  padding: 15px
  margin-right: 15px
  background-color: #FFFFFF
  box-shadow: 0px 4px 10px rgba(128, 128, 128, 0.2)
  border-radius: 15px
  overflow: hidden
  cursor: pointer
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
  &__info
    margin-right: 15px
  &__title
    font-family: Manrope, sans-serif
    font-weight: 900
    font-size: 12px
    margin-bottom: 10px
  &__img
    width: 50px
    display: flex
    align-items: center
    justify-content: center
    img
      width: 100%
  &__price
    font-family: Manrope, sans-serif
    font-weight: 900
    font-size: 12px
    display: flex
    align-items: center
  &__svg
    width: 15px
    height: 15px
    margin-right: 6px
</style>
