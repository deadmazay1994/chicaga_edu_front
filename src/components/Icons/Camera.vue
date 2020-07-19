<template>
  <div class="camera icon vue-component">
    <svg
      version="1.1"
      id="Слой_1"
      x="0px"
      y="0px"
      viewBox="0 0 95.6 96.96"
      style="enable-background:new 0 0 95.6 96.96;"
      xml:space="preserve"
    >
      <polygon
        v-show="cameraOff"
        class="st0"
        points="90.54,96.96 52.3,58.11 54.83,55.62 47.74,55.57 47.8,48.48 40.72,48.43 40.77,41.34 40.77,41.34 
	38.25,43.83 0,4.98 5.06,0 43.3,38.85 40.77,41.34 40.77,41.34 47.85,41.4 47.8,48.48 54.88,48.54 54.83,55.62 57.36,53.13 
	95.6,91.98 "
      />
      <path
        class="st0"
        d="M62.08,81.2H0.79v-64.2h7.09v57.1h54.19V81.2L62.08,81.2z M16.59,13.04v7.09h39.03v16.62h12.11l15.95-16.62
	h2.69v53.97H75.33v7.09h18.13V13.04H80.69L64.74,29.66h-2.02V13.04H16.59z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "camera",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
  props: ["cameraOff"],
  mixins: {},
  beforeMount() {}
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
