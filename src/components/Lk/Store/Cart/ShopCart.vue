<template>
  <div class="shop-cart">
    <div class="shop-cart__header">
      <div class="shop-cart__title">
        Корзина <span class="shop-cart__number">{{ cartItemsLength }}</span>
      </div>
      <svg class="shop-cart__icon" width="20" height="20">
        <use xlink:href="#cart"></use>
      </svg>
    </div>

    <div class="shop-cart__content">
      <transition-group name="list" tag="div" class="shop-cart__list">
        <cart-item
          class="shop-cart__item"
          v-for="(item, index) in cartItems"
          :key="index"
          :item="item"
          @clickTrashButton="deleteBasketItem(index, item)"
          @decrease="decreaseBasketItemsCount(index, item)"
          @increase="increaseBasketItemsCount(index, item)"
        />
      </transition-group>
    </div>
    <cart-total :showSubmit="showSubmit" :cartGoods="cartItems" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import CartItem from "./CartItem.vue";
import CartTotal from "./CartTotal.vue";

export default {
  name: "ShopCart",
  components: {
    CartItem,
    CartTotal
  },
  data() {
    return {
      cartItems: undefined
    };
  },
  props: {
    showSubmit: Boolean
  },
  computed: {
    ...mapGetters(["getBasketItems"]),
    cartItemsLength() {
      return this.getBasketItems.reduce((acc, item) => acc + item.count, 0);
    }
  },
  methods: {
    ...mapActions([
      "requestBasketItems",
      "requestDeleteBasketItem",
      "requestDecreaseBasketItemsCount",
      "requestIncreaseBasketItemsCount"
    ]),
    async setBasketItems() {
      await this.requestBasketItems();
      console.log("setBasketItems", this.getBasketItems);
      this.cartItems = this.getBasketItems;
    },
    deleteBasketItem(index, data) {
      this.requestDeleteBasketItem({ index: index, data: data });
    },
    decreaseBasketItemsCount(index, data) {
      this.requestDecreaseBasketItemsCount({ index: index, data: data });
    },
    increaseBasketItemsCount(index, data) {
      this.requestIncreaseBasketItemsCount({ index: index, data: data });
    }
  },
  mounted() {
    this.setBasketItems();
  }
};
</script>

<style lang="sass" scoped>
@import "@/assets/styles/variables.sass"
.shop-cart
  display: flex
  flex-direction: column
  padding: 24px
  background-color: #ffffff
  border-radius: 20px
  box-shadow: 0 4px 10px rgba(128, 128, 128, 0.2)
  overflow: hidden
  &__header
    display: flex
    justify-content: space-between
    margin-bottom: 24px
  &__title
    margin-right: 20px
    font-weight: 600
    font-size: 20px
    line-height: 1.3
  &__number
    border-left: 1.5px solid rgba($gray, 0.1)
    padding-left: 10px
    margin-left: 5px
  &__icon
    width: 20px
    height: 20px
  &__content
    flex-grow: 1
    max-height: 600px
    margin-bottom: 40px
    padding-right: 5px
    overflow: hidden auto
  &__content::-webkit-scrollbar
    width: 5px
  &__content::-webkit-scrollbar-thumb
    background-color: rgba(128, 128, 128, 0.1)
  &__item:not(:last-child)
    margin-bottom: 10px

.list-enter-active, .list-leave-active
  transition: all 1s
.list-enter, .list-leave-to
  opacity: 0
  transform: translateY(30px)
</style>
