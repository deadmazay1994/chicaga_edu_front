<template>
  <div class="cart-total" :class="{ 'cart-total--total': showSubmit }">
    <div class="cart-total__content">
      <h2 class="cart-total__title">Итого:</h2>

      <p class="cart-total__price">
        <svg class="cart-total__svg">
          <use xlink:href="#coin"></use>
        </svg>

        <span class="cart-total__price-text">{{ getBasketItemsTotal }} т.</span>
      </p>
    </div>

    <button class="cart-total__btn" id="order-btn" v-if="showSubmit">
      <router-link :to="{ name: 'order' }" tag="span"
        >Оформление заказа</router-link
      >
      <svg class="cart-total__bin">
        <use xlink:href="#long-arrow"></use>
      </svg>
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CartTotal",
  data() {
    return {};
  },
  props: {
    showSubmit: Boolean
  },
  computed: {
    ...mapGetters(["getBasketItemsTotal"])
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="sass" scoped>
@import "@/assets/styles/variables.sass"
.cart-total
  border-radius: 15px
  padding: 15px
  margin-top: 17px
  margin-bottom: 10px
  &--total
    background: $gray_light
    margin-top: 20px
    padding-bottom: 25px
  @media ($media_md)
    padding: 10px
  &__btn
    background: $red
    box-shadow: 0px 4px 10px rgba(164, 164, 164, 0.2)
    border-radius: 10px
    padding: 10px 15px
    margin: 0 auto
    color: #FFFFFF
    display: flex
    align-items: center
    &--about
      margin: 0 auto 35px
  &__bin
    width: 19px
    height: 19px
    margin-left: 10px
  &__title
    font-family: Manrope, sans-serif
    font-weight: 600
    font-size: 20px
  &__price
    display: flex
    align-items: center
  &__price-text
    font-family: Manrope, sans-serif
    font-weight: 700
    font-size: 16px
  &__content
    display: flex
    align-items: flex-start
    justify-content: space-between
    border-bottom: 2px solid $white
    padding-bottom: 15px
    margin-bottom: 15px
    &--total
      justify-content: space-between
  &__svg
    width: 15px
    height: 15px
    margin-right: 6px
</style>
