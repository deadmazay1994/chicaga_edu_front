<template>
  <div class="cart__item cart__item--total">
    <div class="cart__item-content cart__item-content--total">
      <h2 class="total__title">Итого:</h2>

      <p class="merch__item-price">
        <svg class="merch__svg">
          <use xlink:href="#coin"></use>
        </svg>

        <span class="total__price">1000 т.</span>
      </p>
    </div>

    <button class="cart__btn" id="order-btn">
      <span>Оформление заказа</span>
      <svg class="cart__bin">
        <use xlink:href="#long-arrow"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: "CartTotal"
};
</script>

<style lang="sass" scoped>
@import "@/assets/styles/variables.sass"

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

.total__title
  font-family: Manrope, sans-serif
  font-weight: 600
  font-size: 20px

.total__price
  font-family: Manrope, sans-serif
  font-weight: 700
  font-size: 16px

.shop__cart-sm
  background: $white
  border-top: 1.5px solid $gray_light
  padding: 10px 35px

  position: fixed
  bottom: 0
  left: 0
  z-index: 1000
  width: 100%
  display: none

  @media ($media_md2)
    display: flex

.cart-sm__btn
  background: rgba($red, 0.8)
  border-radius: 10px
  padding: 15px
  align-items: center
  justify-content: space-between

  font-family: Manrope, sans-serif
  font-weight: 600
  font-size: 20px
  color: $white

  cursor: pointer

  @media ($media_xs)
    font-size: 15px

  .controls__item
    margin: 0

.cart-sm__p
  margin-left: 10px

.cart-sm__inner
  display: flex
  align-items: center

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
</style>
