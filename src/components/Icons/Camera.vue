<template>
  <div class="icon">
    <svg
      width="22"
      height="22"
      viewBox="0 0 21 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      v-show="!cameraOff"
    >
      <path
        d="M16.3333 5.625V1.25C16.3333 0.5625 15.8083 0 15.1667 0H1.16667C0.525 0 0 0.5625 0 1.25V13.75C0 14.4375 0.525 15 1.16667 15H15.1667C15.8083 15 16.3333 14.4375 16.3333 13.75V9.375L21 14.375V0.625L16.3333 5.625Z"
        fill="white"
      />
    </svg>
    <svg
      width="22"
      height="22"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      v-show="cameraOff"
      style="transform: scale(1.07, 1.17);"
    >
      <path
        d="M22 5.21053L17.3684 9.84211V5.78947C17.3684 5.15263 16.8474 4.63158 16.2105 4.63158H9.05474L22 17.5768V5.21053ZM1.47053 0L0 1.47053L3.16105 4.63158H2.31579C1.67895 4.63158 1.15789 5.15263 1.15789 5.78947V17.3684C1.15789 18.0053 1.67895 18.5263 2.31579 18.5263H16.2105C16.4537 18.5263 16.6621 18.4337 16.8358 18.3179L20.5295 22L22 20.5295L1.47053 0Z"
        fill="white"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "camera",
  data: function () {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
  props: ["cameraOff"],
  mixins: {},
  beforeMount() {},
};
</script>

<style scoped="scoped" lang="sass">
.camera
  svg
    width: 100%
.st0
  fill-rule: evenodd
  clip-rule: evenodd
</style>
