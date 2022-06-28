<template>
  <div class="play-pause-animation vue-component">
    <transition name="fade" class="play-pause-animation__element" tag="div">
      <PlayVideoCenterVue style="z-index: 10" v-if="videoJustPlayed" />
    </transition>
    <transition name="fade" class="play-pause-animation__element" tag="div">
      <PauseVideoCenterVue style="z-index: 10" v-if="videoJustPaused" />
    </transition>
  </div>
</template>

<script>
import PlayVideoCenterVue from "../Icons/PlayVideoCenter.vue";
import PauseVideoCenterVue from "../Icons/PauseVideoCenter.vue";

export default {
  name: "play-pause-animation",
  components: {
    PlayVideoCenterVue,
    PauseVideoCenterVue
  },
  data: function() {
    return {};
  },
  props: {
    videoJustPlayed: Boolean,
    videoJustPaused: Boolean
  },
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="sass">
.play-pause-animation
  display: flex
  align-items: center
  justify-content: center
</style>
