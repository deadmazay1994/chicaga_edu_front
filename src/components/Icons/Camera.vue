<template>
  <svg class="talk__svg">
    <use xlink:href="#camera"></use>
    <polygon
      v-show="cameraOff"
      class="st0"
      points="90.54,96.96 52.3,58.11 54.83,55.62 47.74,55.57 47.8,48.48 40.72,48.43 40.77,41.34 40.77,41.34
38.25,43.83 0,4.98 5.06,0 43.3,38.85 40.77,41.34 40.77,41.34 47.85,41.4 47.8,48.48 54.88,48.54 54.83,55.62 57.36,53.13
95.6,91.98 "
      style="transform: scale(0.5)"
    />
  </svg>
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
