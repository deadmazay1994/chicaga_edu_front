<template>
  <div class="cart-total" :class="{ 'cart-total--total': showSubmit }">
    <div class="cart-total__content">
      <div class="cart-total__title">Итого:</div>
      <div class="cart-total__price-box">
        <svg class="cart-total__price-icon" width="19" height="19">
          <use xlink:href="#coin"></use>
        </svg>
        <span class="cart-total__price">{{ getBasketItemsTotal }} м.</span>
      </div>
    </div>
    <router-link
      :to="{ name: 'order' }"
      tag="button"
      class="cart-total__btn"
      id="order-btn"
      v-if="showSubmit"
      type="button"
    >
      <span>Оформление заказа</span>
      <svg class="cart-total__btn-icon" width="34" height="12">
        <use xlink:href="#long-arrow"></use>
      </svg>
    </router-link>
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
  &--total
    padding: 20px 15px 25px
    background-color: $gray_light
    border-radius: 15px
  &__content
    display: flex
    align-items: center
    justify-content: space-between
    border-bottom: 1.5px solid $white
    padding-bottom: 11px
    margin-bottom: 24px
  &__title
    margin-right: 10px
    font-weight: 600
    font-size: 20px
  &__price-box
    display: flex
    font-weight: 700
    font-size: 16px
  &__price-icon
    width: 19px
    height: 19px
    margin-right: 10px
  &__btn
    display: flex
    align-items: center
    margin-right: auto
    margin-left: auto
    padding: 13px 32px
    font-weight: 700
    font-size: 14px
    color: #ffffff
    background-color: $red
    border-radius: 10px
    box-shadow: 0 4px 10px rgba(164, 164, 164, 0.2)
  &__btn-icon
    width: 34px
    height: 12px
    margin-left: 16px
</style>
