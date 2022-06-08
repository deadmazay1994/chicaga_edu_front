<template>
  <div class="stand vue-component">
    <div>
      <product-order></product-order>
      <input type="tel" ref="input" v-mask="'+7 (___) ___ __ __'" />
    </div>
  </div>
</template>

<script>
import ProductOrder from "@/components/Lk/Store/ProductOrder.vue";


export default {
  name: "stand",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {
    ProductOrder
  },
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass"></style>
