<template>
  <div class="audio-progress" ref="bar" @click="clickProgressBar">
    <div
      class="audio-progress__track"
      :style="[{ width: currentPosition + 'px' }, { background: color }]"
    ></div>
    <span
      class="audio-progress__handle"
      :style="[{ left: currentPosition + 'px' }, { background: color }]"
      @mousedown="dragStart($event, 0)"
    ></span>
  </div>
</template>

<script>
export default {
  name: "audio-progress",
  data: function() {
    return {
      dragging: false,
      width: null,
      offset: null
    };
  },
  props: {
    currentTime: Number,
    duration: Number,
    color: String
  },
  computed: {
    currentPosition() {
      return (this.currentTimePercent * this.width) / 100;
    },
    currentTimePercent() {
      return (this.currentTime * 100) / this.duration;
    }
  },
  methods: {
    bindListener() {
      document.addEventListener("mousemove", this.drag);
      document.addEventListener("mouseup", this.dragEnd);
    },
    getPosition(event) {
      return event.clientX - this.offset;
    },
    setPosition(position) {
      this.$emit("setProgressPosition", position);
    },
    drag(event) {
      if (!this.dragging) return;
      let position = this.getPosition(event);
      if (position > 0 && position < this.width) {
        this.setPosition((position * 100) / this.width);
      }
    },
    dragStart() {
      this.dragging = true;
    },
    dragEnd() {
      if (!this.dragging) return;
      this.dragging = false;
    },
    clickProgressBar(event) {
      const position = this.getPosition(event);
      this.setPosition((position * 100) / this.width);
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.width = this.$refs.bar.offsetWidth;
      this.offset = this.$refs.bar.getBoundingClientRect().left;
      this.bindListener();
    });
  }
};
</script>

<style scoped='scoped' lang='sass'>
.audio-progress
  position: relative
  width: 100%
  height: 6px
  border-radius: 4px
  background: linear-gradient(180deg, #D6D1DF 0%, #F2F2F2 100%)
  cursor: pointer
  &__track
    position: absolute
    top: 0
    left: 0
    width: 0
    height: 6px
    border-radius: 4px 0 0 4px
  &__handle
    position: absolute
    top: -3px
    left: 0
    margin-left: -2px
    width: 12px
    height: 12px
    border-radius: 50%
    z-index: 2
</style>
