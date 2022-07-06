<template>
  <div class="order-component vue-component">
    <product-order class="order-component__order" />
  </div>
</template>

<script>
import ProductOrder from "./ProductOrder.vue";

export default {
  name: "order-component",
  components: {
    ProductOrder,
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
  padding: 32px
  &__order
    flex-grow: 1
    margin-right: 20px
</style>
