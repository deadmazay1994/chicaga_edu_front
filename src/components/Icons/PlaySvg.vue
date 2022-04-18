<template>
  <div class="play-svg" @click="clickElem">
    <svg
      v-if="onPause"
      width="12"
      height="16"
      viewBox="0 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 16L6 12V4L0 0V16ZM6 12L12 8L6 4V12Z" fill="white" />
    </svg>
    <svg
      v-if="!onPause"
      width="12"
      height="16"
      viewBox="0 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 0H0V16H4V0Z" fill="white" />
      <path d="M12 0H8V16H12V0Z" fill="white" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "PlaySvg",
  props: {
    onPause: Boolean
  },
  methods: {
    clickElem() {
      this.$emit("clickElem");
    }
  }
};
</script>

<style lang="sass" scoped>
.play-svg
  display: flex
  align-items: center
  justify-content: center
</style>
