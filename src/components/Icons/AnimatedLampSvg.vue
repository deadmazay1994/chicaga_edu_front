<template>
  <div class="animated-lamp-svg">
    <svg
      width="71"
      height="83"
      viewBox="0 0 71 83"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        ref="light"
        class="light"
        cx="35.5"
        cy="35.5"
        r="35.5"
        fill="url(#paint0_radial_3_11)"
      />
      <path
        d="M26.5909 74.2501C26.5909 79.0827 30.5797 83.0001 35.5 83.0001C40.4202 83.0001 44.4091 79.0827 44.4091 74.2501V73.7896H26.5909V74.2501Z"
        fill="#808080"
        fill-opacity="0.6"
      />
      <path
        d="M35.5 68.2627H32.6866H26.5909V73.789H44.4091V68.2627H38.3134H35.5Z"
        fill="#808080"
      />
      <path
        ref="leftSide"
        d="M32.6866 50.3772C28.362 49.171 25.1842 45.2604 25.1842 40.6317H30.811C30.811 43.171 32.9145 45.237 35.5 45.237C35.5 33.6027 35.5 20.4138 35.5 13C21.9691 13 11 23.773 11 37.0626C11 45.9797 15.9386 53.7636 23.276 57.9207L26.5909 68.2634H32.6866V50.3772Z"
        fill="#FFAE65"
      />
      <path
        ref="rightSide"
        d="M35.5 13C35.5 20.4138 35.5 33.6027 35.5 45.237C38.0855 45.237 40.189 43.171 40.189 40.6317H45.8158C45.8158 45.2604 42.638 49.171 38.3134 50.3772V68.2634H44.4091L47.724 57.9207C55.0614 53.7637 60 45.9799 60 37.0626C60 23.773 49.0309 13 35.5 13Z"
        fill="#FFD9A0"
      />
      <path
        d="M30.8114 40.6316H25.1846C25.1846 45.2603 28.3624 49.1709 32.687 50.3771V68.2633H38.3138V50.3771C42.6384 49.1709 45.8162 45.2603 45.8162 40.6316H40.1894C40.1894 43.1709 38.0859 45.2369 35.5004 45.2369C32.9149 45.2369 30.8114 43.1709 30.8114 40.6316Z"
        fill="#FF9999"
      />
      <defs>
        <radialGradient
          id="paint0_radial_3_11"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(35.5 35.5) rotate(90) scale(35.5)"
        >
          <stop offset="0.649278" stop-color="#FFECC7" />
          <stop offset="1" stop-color="#FFECC7" stop-opacity="0" />
        </radialGradient>
      </defs>
    </svg>
  </div>
</template>

<script>
export default {
  name: "AnimatedLampSvg",
  methods: {
    animate() {
      this.$emit("click");
      this.$refs.light.animate(
        [{ transform: "scale(1.0)" }, { transform: "scale(0.6)" }],
        { duration: 1000, iteration: 1 }
      );
      this.$refs.leftSide.animate([{ fill: "#FFD9A0" }, { fill: "#FFAE65" }], {
        duration: 1000,
        iteration: 1
      });
      this.$refs.rightSide.animate([{ fill: "#FFAE65" }, { fill: "#FFD9A0" }], {
        duration: 1000,
        iteration: 1
      });
    }
  }
};
</script>

<style lang="sass" scoped>
.animated-lamp-svg
  cursor: pointer
  width: 25px
  height: 25px

  svg
    width: 100%
    height: 100%

  .light
    transform: scale(0.6)
    transform-origin: 50% 50%
</style>
