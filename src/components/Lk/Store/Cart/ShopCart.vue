<template>
  <div class="shop__cart">
    <div class="cart__header">
      <h3 class="cart__title">
        Корзина <span class="cart__number">{{ cartItems.length }}</span>
      </h3>
      <svg class="cart__svg">
        <use xlink:href="#cart"></use>
      </svg>
    </div>

    <div class="cart__content">
      <transition-group name="list">
        <cart-item
          class="list-item"
          v-for="(item, index) in cartItems"
          :key="index"
          :image="item.src"
          :title="item.title"
          :price="item.price"
          :count="item.count"
          @clickTrashButton="deleteBasketItem(index, item)"
          @decrease="decreaseBasketItemsCount(index, item)"
          @increase="increaseBasketItemsCount(index, item)"
        />
      </transition-group>
    </div>
    <cart-total :cartGoods="cartItems" />
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
  computed: {
    ...mapGetters(["getBasketItems"])
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

.cart__header
  display: flex
  justify-content: space-between

.cart__svg
  width: 20px
  height: 20px

  .cart__path
    fill: $white

.cart__number
  border-left: 1.5px solid rgba($gray, 0.1)
  padding-left: 10px
  margin-left: 5px

.cart__content
  padding-right: 5px
  flex-grow: 1
  max-height: 400px
  overflow-y: auto

  margin-top: 10px

  /* width */
  &::-webkit-scrollbar
    width: 5px

  /* Handle */
  &::-webkit-scrollbar-thumb
    background: rgba(128, 128, 128, 0.1)
    border-radius: 40p

.list-enter-active, .list-leave-active
  transition: all 1s

.list-enter, .list-leave-to
  opacity: 0
  transform: translateY(30px)
</style>
