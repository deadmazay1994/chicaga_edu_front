<template>
  <div class="order-component vue-component">
    <product-order />
    <shop-cart :showTotal="false" />
  </div>
</template>

<script>
import ProductOrder from './ProductOrder.vue';
import ShopCart from './Cart/ShopCart.vue';

export default {
  name: "order-component",
  components: {
    ProductOrder,
    ShopCart
  },
  data: function() {
    return {};
  },
  props: [],
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="sass">
.order-component
  display: flex
  justify-content: space-between
  height: 100%
</style>
