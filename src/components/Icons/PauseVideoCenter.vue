<template>
  <div class="pause-video-center vue-component" @click="$emit('click')">
    <svg
      width="150"
      height="150"
      viewBox="0 0 150 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="150" height="150" rx="70" fill="black" fill-opacity="0.2" />
      <path d="M52 104V46L66 45.9996V104L52 104Z" fill="white" />
      <path d="M99 46V104L85 104V45.9996L99 46Z" fill="white" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "pause-video-center",
  components: {},
  data: function() {
    return {};
  },
  props: [],
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="sass"></style>
