<template>
  <div class="timetable-icon icon vue-component">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 3H19V1H17V3H7V1H5V3H4C2.9 3 2 3.9 2 5V21C2 22.1 2.9 23 4 23H20C21.1 23 22 22.1 22 21V5C22 3.9 21.1 3 20 3ZM20 21H4V8H20V21Z"
        fill="#323232"
      />
      <rect x="6" y="10" width="3" height="3" fill="#323232" />
      <rect x="10" y="11" width="8" height="1" fill="#323232" />
      <rect x="10" y="16" width="8" height="1" fill="#323232" />
      <rect x="6" y="15" width="3" height="3" fill="#323232" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "timetable-icon",
  components: {},
  data: function() {
    return {};
  },
  props: [],
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="sass">
.timetable-icon
  display: flex
  align-items: center
  justify-content: center
</style>
