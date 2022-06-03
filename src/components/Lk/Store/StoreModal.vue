<template>
  <transition name="fade">
    <div class="store-modal vue-component" v-if="getShopModal">
      <ProductCard
        :productInfo="getShopModalData"
        v-click-outside="onClickOutside"
      />
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import vClickOutside from "v-click-outside";

import ProductCard from "./ProductCard";

export default {
  name: "store-modal",
  components: {
    ProductCard
  },
  data: function() {
    return {
      productInfo: undefined
    };
  },
  props: [],
  computed: {
    ...mapGetters(["getShopModal", "getShopModalData"])
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  methods: {
    ...mapMutations(["toggleShopModale"]),
    onClickOutside() {
      this.toggleShopModale();
    }
  },
  mounted() {
    console.log("getShopModalData", this.getShopModalData);
  }
};
</script>

<style scoped="scoped" lang="sass">
.store-modal
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: rgba(85, 85, 85, 0.25)
  z-index: 9998
  display: flex
  align-items: center
  justify-content: center

.fade-enter-active, .fade-leave-active
  transition: opacity .2s
.fade-enter, .fade-leave-to
  opacity: 0
</style>
