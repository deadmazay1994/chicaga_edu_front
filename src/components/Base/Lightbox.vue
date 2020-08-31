<template>
  <div class="lightbox vue-component" v-if="lightboxOpen">
    <close
      color="white"
      class="lightbox__close"
      @click.native="toggleLightbox(false)"
    />
    <v-zoomer class="lightbox__zoomer">
      <img class="lightbox__img" :src="lightboxImg" />
    </v-zoomer>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import ClickOutside from "vue-click-outside";
import Close from "@/components/Icons/Close";

export default {
  name: "lightbox",
  data: function() {
    return {};
  },
  methods: {
    ...mapMutations(["toggleLightbox", "setLightboxImg"])
  },
  computed: {
    ...mapGetters(["lightboxOpen", "lightboxImg"]),
    lightboxOpenModel: {
      get() {
        return this.lightboxOpen;
      },
      set(val) {
        this.toggleLightbox(val);
      }
    }
  },
  directives: {
    ClickOutside
  },
  components: {
    Close
  },
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
.lightbox
  position: fixed
  z-index: 999999
  background: #000a
  left: 0
  top: 0
  width: 100vw
  height: 100vh
  display: flex
  align-items: center
  justify-content: center
  &__close
    width: 40px
    height: 40px
    position: absolute
    right: 40px
    top: 20px
    cursor: pointer
    z-index: 9999999
  &__zoomer
    width: 100%
    height: 100%
    display: flex
    align-items: center
    justify-content: center
  &__img
    display: block
    max-height: 100%
    width: auto
    margin: 0 auto
</style>

<style lang="sass">
.zoomer
  display: flex
  align-items: center
</style>
