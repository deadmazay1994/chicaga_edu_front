<template>
  <div
    class="video-substrate vue-component"
    :class="{ 'video-substrate--active': active }"
  >
    <div class="video-substrate__block"></div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "video-substrate",
  data: function() {
    return {
      active: false,
      timeout: null
    };
  },
  methods: {
    updateDisabledTimeout() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => (this.active = false), this.duration);
    },
    mousemoveEventInit() {
      if (!this.playerElement) return;
      let fireFunction = () => {
        this.active = true;
        this.updateDisabledTimeout();
      }
      let clickEvent
      this.playerElement.addEventListener("mousemove", fireFunction);
      this.playerElement.addEventListener("click", e => {
        clickEvent = e
        setTimeout(() => {
          if (clickEvent.detail === 1) fireFunction()
        }, 100)
      });
    }
  },
  computed: {},
  components: {},
  props: {
    playerElement: {},
    duration: {
      default: 3000
    }
  },
  watch: {
    playerElement() {
      this.mousemoveEventInit();
    }
  },
  mixins: {},
  beforeMount() {},
  mounted() {
    this.mousemoveEventInit();
  }
};
</script>

<style scoped="scoped" lang="sass">
.video-substrate
  top: 0
  width: 100%
  height: 100%
  pointer-events: none
  transition: .2s
  opacity: 1
  & > *
    opacity: 0
  position: absolute
  &--active
    background: #0005
    pointer-events: all
    opacity: 1
    & > *
      opacity: 1
</style>
