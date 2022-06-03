<template>
  <div
    class="star-icon vue-component"
    @click="$emit('click')"
    @mouseenter="$emit('mouseenter')"
    @mouseleave="$emit('mouseleave')"
  >
    <svg
      width="32"
      height="29"
      viewBox="0 0 32 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M31.3213 11.0121C31.2156 10.6895 30.9344 10.4546 30.5959 10.4059L21.0872 9.03634L16.8347 0.496444C16.6833 0.192379 16.3709 0 16.0288 0C15.6868 0 15.3744 0.192379 15.223 0.496444L10.9702 9.03628L1.46166 10.4059C1.12323 10.4546 0.841905 10.6895 0.736287 11.012C0.630549 11.3345 0.718734 11.6884 0.963639 11.925L7.84398 18.5724L6.21999 27.9587C6.16218 28.293 6.3008 28.6306 6.57752 28.8299C6.85424 29.0291 7.22099 29.0555 7.52389 28.8977L16.0288 24.4659L24.5334 28.8976C24.6649 28.9661 24.8084 28.9999 24.9515 28.9999C25.1378 28.9999 25.3233 28.9426 25.4798 28.8299C25.7565 28.6306 25.8951 28.2929 25.8373 27.9587L24.2128 18.5724L31.0939 11.925C31.3389 11.6884 31.427 11.3344 31.3213 11.0121Z"
        fill="#D2D2D2"
      />
      <defs>
        <radialGradient
          id="starGradient"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(15.3365 14.5) rotate(90) scale(14.5 15.3365)"
        >
          <stop stop-color="#FFA048" />
          <stop offset="0.0001" stop-color="#FFCA7B" />
          <stop offset="1" stop-color="#FFA048" />
        </radialGradient>
      </defs>
    </svg>
  </div>
</template>

<script>
export default {
  name: "star-icon",
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
.star-icon
  cursor: pointer
</style>
