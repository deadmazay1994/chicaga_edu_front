<template>
  <div class="rewind-svg vue-component">
    <svg
      v-if="right"
      class="right-rewind"
      width="120"
      height="120"
      viewBox="0 0 150 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="150" height="150" rx="70" fill="black" fill-opacity="0.2" />
      <path
        d="M73 88L83.5 81.5V68.5L73 62V88ZM83.5 81.5L94 75L83.5 68.5V81.5Z"
        fill="white"
        fill-opacity="0.5"
      />
      <path
        d="M104 83L110.5 79V71L104 67V83ZM110.5 79L117 75L110.5 71V79Z"
        fill="white"
        fill-opacity="0.5"
      />
      <path
        d="M34 93L48.5 84V66L34 57V93ZM48.5 84L63 75L48.5 66V84Z"
        fill="white"
        fill-opacity="0.5"
      />
    </svg>
    <svg
      v-if="left"
      class="left-rewind"
      width="120"
      height="120"
      viewBox="0 0 150 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="150" height="150" rx="70" fill="black" fill-opacity="0.2" />
      <path
        d="M73 88L83.5 81.5V68.5L73 62V88ZM83.5 81.5L94 75L83.5 68.5V81.5Z"
        fill="white"
        fill-opacity="0.5"
      />
      <path
        d="M104 83L110.5 79V71L104 67V83ZM110.5 79L117 75L110.5 71V79Z"
        fill="white"
        fill-opacity="0.5"
      />
      <path
        d="M34 93L48.5 84V66L34 57V93ZM48.5 84L63 75L48.5 66V84Z"
        fill="white"
        fill-opacity="0.5"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "rewind-svg",
  components: {},
  data: function() {
    return {};
  },
  props: {
    left: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    }
  },
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="sass">
.rewind-svg
  display: flex
  align-items: center
  justify-content: center
.left-rewind
  transform: rotate(180deg)
</style>
