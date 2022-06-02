<template>
  <div class="stand vue-component">
    <div>
      <product-order></product-order>
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
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
.stand>div
  width: 100%
.stand-inner
  width: 100%
  position: relative
</style>
