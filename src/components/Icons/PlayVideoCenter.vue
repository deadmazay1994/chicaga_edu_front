<template>
  <div class="play-video-center vue-component" @click="$emit('click')">
    <svg
      width="150"
      height="150"
      viewBox="0 0 150 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="150" height="150" rx="70" fill="black" fill-opacity="0.2" />
      <path
        d="M52 104L75.5 89.5V60.5L52 46V104ZM75.5 89.5L99 75L75.5 60.5V89.5Z"
        fill="white"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "play-video-center",
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
