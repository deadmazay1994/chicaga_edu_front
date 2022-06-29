<template>
  <div class="rewind-svgs vue-component">
    <div class="rewind-svgs__elem">
      <transition name="fade">
        <rewind-svg-vue :left="true" v-show="hasRewindLeft" />
      </transition>
    </div>
    <div class="rewind-svgs__elem">
      <transition name="fade">
        <rewind-svg-vue :right="true" v-show="hasRewindRight" />
      </transition>
    </div>
  </div>
</template>

<script>
import RewindSvgVue from "../Icons/RewindSvg.vue";

export default {
  name: "rewind-animation",
  components: {
    RewindSvgVue
  },
  data: function() {
    return {};
  },
  props: {
    hasRewindLeft: Boolean,
    hasRewindRight: Boolean
  },
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="sass">
.rewind-svgs
  &__elem
    display: flex
    align-items: center
    justify-content: center
    width: 50%

.fade-enter-active, .fade-leave-active
  transition: opacity 0.5s
.fade-enter, .fade-leave-to
  opacity: 0
</style>
