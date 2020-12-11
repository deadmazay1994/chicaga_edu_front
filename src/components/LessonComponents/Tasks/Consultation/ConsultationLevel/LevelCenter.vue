<template>
  <div ref="btn" class="level-center icon vue-component">
    <svg width="122" height="122" viewBox="0 0 122 122" fill="none">
      <g filter="url(#filter0_d)">
        <circle cx="59" cy="59" r="56" fill="url(#paint0_linear)" />
      </g>
      <circle cx="59.5" cy="58.5" r="49" stroke="url(#paint1_linear)" />
      <path
        d="M97 49.5C92.662 33.6687 77.7406 22 60 22C42.2594 22 27.338 33.6687 23 49.5M97 68.5C92.662 84.3314 77.7406 96 60 96C42.2594 96 27.338 84.3314 23 68.5"
        stroke="#C3CBCD"
        stroke-dasharray="2 2"
      />
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="0"
          width="122"
          height="122"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            tFype="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx="2" dy="2" />
          <feGaussianBlur stdDeviation="2.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <linearGradient
          v-if="hover"
          id="paint0_linear"
          x1="59"
          y1="3"
          x2="59"
          y2="115"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E9E9E9" />
          <stop offset="1" stop-color="white" />
        </linearGradient>
        <linearGradient
          v-else
          id="paint0_linear"
          x1="59"
          y1="3"
          x2="59"
          y2="115"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="#F0F0F0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="59.5"
          y1="9"
          x2="59.5"
          y2="108"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#C3CBCD" />
          <stop offset="1" stop-color="white" />
        </linearGradient>
      </defs>
    </svg>
    <div class="level-center__text">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "level-center-hover",
  data: function() {
    return {
      hover: false
    };
  },
  methods: {},
  computed: {},
  components: {},
  props: [],
  mixins: {},
  mounted() {
    this.$refs.btn.onmouseover = () => (this.hover = true);
    this.$refs.btn.onmouseout = () => (this.hover = false);
  }
};
</script>

<style scoped="scoped" lang="sass">
.level-center
  display: flex
  align-items: center
  justify-content: center
  font-weight: bold
  border-radius: 100%
  cursor: pointer
  font-size: 18px
  svg
    width: 100%
    height: 100%
    display: block
    position: absolute
  &__text
    z-index: 10
</style>
