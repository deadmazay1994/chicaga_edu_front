<template>
  <div class="stand vue-component">
    <audio-player-vue></audio-player-vue>
  </div>
</template>

<script>
import AudioPlayerVue from "./AudioPLayer";

export default {
  name: "stand",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: { AudioPlayerVue },
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass"></style>
