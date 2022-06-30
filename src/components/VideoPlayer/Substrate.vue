<template>
  <div
    class="video-substrate vue-component"
    :class="{ 'video-substrate--active': active }"
  >
    <div class="video-substrate__inner">
      <slot />
    </div>
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
      };
      let clickEvent;
      this.playerElement.addEventListener("mousemove", fireFunction);
      this.playerElement.addEventListener("click", e => {
        clickEvent = e;
        setTimeout(() => {
          if (clickEvent.detail === 1) fireFunction();
        }, 100);
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
  display: flex
  flex-direction: column
  justify-content: flex-end
  background-color: #00000000
  opacity: 0
  transition-property: background-color, opacity
  transition-duration: 0.2s
  pointer-events: none
  &--active
    background-color: #00000050
    opacity: 1
    pointer-events: all
</style>
