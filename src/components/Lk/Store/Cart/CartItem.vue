<template>
  <div class="cart__item">
    <div class="cart__item-content">
      <div class="cart__item-img">
        <img :src="image" alt="" />
      </div>

      <div class="cart__item-text">
        <h3 class="cart__item-title">{{ title }}</h3>
        <span class="cart__item-amount">1 шт./Размер: S</span>
      </div>
    </div>

    <div class="cart__item-price">
      <p class="merch__item-price">
        <svg class="merch__svg">
          <use xlink:href="#coin"></use>
        </svg>

        <span>{{ price }}</span>
      </p>

      <div class="cart__item-controls">
        <div class="amount__controls">
          <button>-</button>
          <span class="amount__number">1</span>
          <button>+</button>
        </div>

        <button>
          <svg class="cart__bin">
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
    title: String,
    image: String,
    price: Number
  }
};
</script>

<style lang="sass" scoped>
@import "@/assets/styles/variables.sass"

.cart__item
  background: $gray_light
  border-radius: 15px

  padding: 15px
  margin-bottom: 10px

  &--total
    margin-top: 20px
    padding-bottom: 25px

  @media ($media_md)
    padding: 10px

.cart__item-content
  display: flex
  align-items: flex-start

  border-bottom: 2px solid $white
  padding-bottom: 15px
  margin-bottom: 15px

  &--total
    justify-content: space-between

.cart__item-amount
  font-family: Manrope, sans-serif
  font-weight: 500
  color: $gray
  font-size: 12px

.cart__item-img
  background: $white
  border-radius: 10px
  padding: 5px 10px
  margin-right: 10px
  width: 65px
  height: 65px

  img
    max-height: 100%

.cart__item-title
  font-family: Manrope, sans-serif
  font-weight: 900 !important
  font-size: 12px
  margin-bottom: 7px

.cart__item-price
  display: flex
  align-items: center
  justify-content: space-between

  p
    margin-bottom: 0 !important

.cart__item-controls
  display: flex
  align-items: center

.amount__controls
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

.amount__number
  margin: 0 13px

  @media ($media_md)
    margin: 0 8px

.cart__btn
  background: $red
  box-shadow: 0px 4px 10px rgba(164, 164, 164, 0.2)
  border-radius: 10px
  padding: 10px 15px
  margin: 0 auto

  color: $white

  display: flex
  align-items: center

  &--about
    margin: 0 auto 35px

.cart__bin
  width: 19px
  height: 19px

  margin-left: 10px
</style>
