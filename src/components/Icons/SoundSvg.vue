<template>
  <div class="sound-svg" @click="clickElem">
    <svg
      v-if="!muted"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 11.77H4L9 16.77V0.77L4 5.77H0V11.77ZM11 4.77V12.77C12.48 12.09 13.5 10.54 13.5 8.77C13.5 7.03 12.48 5.51 11 4.77ZM11 2.06C13.89 2.92 16 5.6 16 8.77C16 11.94 13.89 14.62 11 15.48V17.54C15.01 16.63 18 13.05 18 8.77C18 4.49 15.01 0.91 11 0V2.06Z"
        fill="white"
      />
    </svg>
    <svg
      v-if="muted"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 0.5L1.5 0L0 1.5L4.20793 5.70793L4 5.92132H0V12.0787H4L9 17.2098V10.5L11 12.5V13.1049C11.1348 13.0413 11.2658 12.9704 11.3925 12.8925L13.2264 14.7264C12.5659 15.2407 11.8139 15.6374 11 15.886V18C12.3676 17.6815 13.6165 17.0443 14.6687 16.1687L16.5 18L18 16.5L16.1313 14.6313L14.6876 13.1876L12.8676 11.3676L11 9.5L9 7.5L5.68852 4.18852L2 0.5ZM7.16911 2.66911L9 4.5V0.790194L7.16911 2.66911ZM11 6.5L13.5 9C13.5 7.21437 12.48 5.6545 11 4.8951V6.5ZM15.6736 11.1736L17.2334 12.7334C17.7263 11.592 18 10.3289 18 9C18 4.60775 15.01 0.933865 11 0V2.11403C13.89 2.99658 16 5.74686 16 9C16 9.75753 15.8856 10.4878 15.6736 11.1736Z"
        fill="white"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "SoundSvg",
  props: {
    muted: Boolean,
  },
  methods: {
    clickElem() {
      this.$emit("clickElem");
    }
  }
};
</script>

<style lang="sass" scoped>
.sound-svg
  display: flex
  align-items: center
  justify-content: center
</style>