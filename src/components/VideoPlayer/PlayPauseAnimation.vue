<template>
  <div class="play-pause-animation vue-component">
    <transition name="fade">
      <PlayVideoCenterVue
        class="play-pause-animation__element"
        style="z-index: 10"
        v-show="videoJustPlayed"
      />
    </transition>
    <transition name="fade">
      <PauseVideoCenterVue
        class="play-pause-animation__element"
        style="z-index: 10"
        v-show="videoJustPaused"
      />
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
  position: relative
  display: flex
  align-items: center
  justify-content: center
  &__element
    position: absolute

.fade-enter-active, .fade-leave-active
  transition: opacity 0.5s
.fade-enter, .fade-leave-to
  opacity: 0
</style>
