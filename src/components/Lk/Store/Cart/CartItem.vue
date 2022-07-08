<template>
  <div class="cart-item">
    <div class="cart-item__content">
      <div class="cart-item__image">
        <img :src="item.src" alt="Изображение товара" />
      </div>
      <div class="cart-item__text">
        <h3 class="cart-item__title">{{ item.title }}</h3>
        <span class="cart-item__amount"
          >{{ item.count }} шт./Размер: {{ item.size }}</span
        >
      </div>
    </div>

    <div class="cart-item__price">
      <p class="cart-item__price-text">
        <svg class="cart-item__price-svg">
          <use xlink:href="#coin"></use>
        </svg>

        <span>{{ item.price }}</span>
      </p>

      <div class="cart-item__controls">
        <div class="cart-item__amount-controls">
          <button @click="$emit('decrease')">-</button>
          <span class="cart-item__amount-number">{{ item.count }}</span>
          <button @click="$emit('increase')">+</button>
        </div>

        <button>
          <svg class="cart-item__cart-bin" @click="$emit('clickTrashButton')">
            <use xlink:href="#bin"></use>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    item: Object
  },
  mounted() {}
};
</script>

<style lang="sass" scoped>
@import "@/assets/styles/variables.sass"

.cart-item
  background: $gray_light
  border-radius: 15px
  padding: 15px
  margin-bottom: 10px
  &--total
    margin-top: 20px
    padding-bottom: 25px
  @media ($media_md)
    padding: 10px
  &__content
    display: flex
    align-items: flex-start
    border-bottom: 2px solid $white
    padding-bottom: 15px
    margin-bottom: 15px
  &__amount
    font-family: Manrope, sans-serif
    font-weight: 500
    color: $gray
    font-size: 12px
  &__image
    background: #FFFFFF
    border-radius: 10px
    padding: 5px 10px
    margin-right: 10px
    width: 65px
    height: 65px
    display: flex
    align-items: center
    justify-content: center
    img
      max-height: 100%
  &__title
    font-family: Manrope, sans-serif
    font-weight: 900 !important
    font-size: 12px
    margin-bottom: 7px

  &__price
    display: flex
    align-items: center
    justify-content: space-between
  &__price-text
    display: flex
    align-items: center
  &__price-svg
    width: 15px
    height: 15px
    margin-right: 6px
  &__controls
    display: flex
    align-items: center
  &__amount-controls
    display: flex
    align-items: center
    padding: 3px 10px
    margin-right: 15px
    background: $white
    border-radius: 10px
    color: $gray
    font-size: 12px
    button
      color: $gray
      font-size: 13px
    @media ($media_lg)
      margin-right: 0
      padding: 3px
  &__amount-number
    margin: 0 13px
    @media ($media_md)
      margin: 0 8px
  &__cart-bin
    width: 19px
    height: 19px
    margin-left: 10px
</style>
