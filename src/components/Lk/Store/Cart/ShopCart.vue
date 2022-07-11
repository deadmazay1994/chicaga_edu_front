<template>
  <div class="shop-cart">
    <div class="shop-cart__header">
      <h3 class="shop-cart__title">
        Корзина <span class="shop-cart__number">{{ cartItemsLength }}</span>
      </h3>
      <svg class="shop-cart__svg">
        <use xlink:href="#cart"></use>
      </svg>
    </div>

    <div class="shop-cart__content">
      <transition-group name="list">
        <cart-item
          class="list-item"
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
  // justify-content: space-between
  background: #FFFFFF
  box-shadow: 0px 4px 10px rgba(128, 128, 128, 0.2)
  border-radius: 20px
  padding: 25px
  margin: 0 0 0 35px
  @media ($media_xl)
    margin: 50px 0 0 15px
    padding: 20px 15px
  @media ($media_md)
    margin: 50px 0 0 10px
    padding: 15px 5px 15px 10px
  @media ($media_md2)
    display: none
  &__header
    display: flex
    justify-content: space-between
  &__svg
    width: 20px
    height: 20px
    .cart__path
      fill: $white
  &__number
    border-left: 1.5px solid rgba($gray, 0.1)
    padding-left: 10px
    margin-left: 5px
  &__content
    padding-right: 5px
    flex-grow: 1
    max-height: 600px
    overflow-y: auto
    margin-top: 10px
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
