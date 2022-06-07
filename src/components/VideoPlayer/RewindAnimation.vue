<template>
  <div class="rewind-animation vue-component">
    <div class="show-rewind-svgs__elem">
      <transition name="fade">
        <rewind-svg-vue :left="true" v-if="hasRewindLeft" />
      </transition>
    </div>
    <div class="show-rewind-svgs__elem">
      <transition name="fade">
        <rewind-svg-vue :right="true" v-if="hasRewindRight" />
      </transition>
    </div>
  </div>
</template>

<script>
import RewindSvgVue from '../Icons/RewindSvg.vue';

export default {
  name: "rewind-animation",
  components: {
    RewindSvgVue
  },
  data: function() {
    return {};
  },
  props: [],
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="sass"></style>
