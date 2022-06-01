<template>
  <div class="schevron-svg" @click="clickElem">
    <svg
      v-if="on"
      width="11"
      height="17"
      viewBox="0 0 11 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.78947 17L11 17L5.21053 8.5L11 0L5.78948 -4.55519e-07L7.43094e-07 8.5L5.78947 17Z"
        :fill="'#' + fill"
      />
    </svg>
    <svg
      v-if="!on"
      width="11"
      height="17"
      viewBox="0 0 11 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.21053 0H0L5.78947 8.5L0 17H5.21053L11 8.5L5.21053 0Z"
        :fill="'#' + fill"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "SchevronSvg",
  props: {
    on: Boolean,
    fill: {
      type: String,
      default: "323232"
    }
  },
  methods: {
    clickElem() {
      this.$emit("clickElem");
    }
  }
};
</script>

<style lang="sass" scoped>
.schevron-svg
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer
</style>
