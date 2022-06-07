<template>
  <div class="current-time-output">
    <div class="current-time-output__title">
      {{ currentTitle }}
    </div>
    <div class="current-time-output__duration">
      {{ currentVideoTime }}
      <template v-if="formattedDuration">{{ formattedDuration }}</template>
    </div>
  </div>
</template>

<script>
export default {
  name: "current-time-output",
  components: {},
  data: function() {
    return {};
  },
  props: {
    currentTitle: String,
    currentVideoTime: String,
    formattedDuration: [String, Boolean]
  },
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="sass">
.current-time-output
  display: flex
</style>
