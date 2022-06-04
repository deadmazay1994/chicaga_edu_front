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
      <cart-item
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
    </div>
    <cart-total v-if="showTotal" />
  </div>
</template>

<script>
import api from "@/mixins/api";

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
    showTotal: Boolean
  },
  methods: {
    async setBasketItems() {
      this.cartItems = await api.methods.getBasketItems();
    },
    async deleteBasketItem(index, data) {
      this.cartItems.splice(index, 1);
      let result = await this.api.deleteitemFromBasket(data);
      console.log(result);
    },
    async decreaseBasketItemsCount(index, data) {
      if (this.cartItems[index].count <= 1) return;
      this.cartItems[index].count -= 1;
      let result = await this.api.decreaseBasketItemsCount(data);
      console.log(result);
    },
    async increaseBasketItemsCount(index, data) {
      this.cartItems[index].count += 1;
      let result = await this.api.increaseBasketItemsCount(data);
      console.log(result);
    }
  },
  mounted() {
    this.setBasketItems();
  }
};
</script>

<style lang="sass" scoped>
@import "@/assets/styles/variables.sass"

.shop__cart
  display: flex
  flex-direction: column
  justify-content: space-between

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
  max-height: 600px
  overflow-y: auto

  margin-top: 10px

  /* width */
  &::-webkit-scrollbar
    width: 5px

  /* Handle */
  &::-webkit-scrollbar-thumb
    background: rgba(128, 128, 128, 0.1)
    border-radius: 40p
</style>
