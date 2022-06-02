<template>
  <transition name="fade">
    <div class="store-modal vue-component" v-if="getModal">
      <ProductCard />
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

import ProductCard from "./ProductCard";

export default {
  name: "store-modal",
  components: {
    ProductCard
  },
  data: function() {
    return {};
  },
  props: [],
  computed: {
    ...mapGetters(["getShopModal"])
  },
  methods: {}
};
</script>

<style scoped="scoped" lang="sass">
.fade-enter-active, .fade-leave-active
  transition: opacity .2s
.fade-enter, .fade-leave-to
  opacity: 0
</style>
