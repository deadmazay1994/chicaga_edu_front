<template>
  <div class="animated-svg-wrapper">
    <div class="animated-star-svg">
      <svg
        width="70"
        height="70"
        viewBox="0 0 70 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref="star"
      >
        <path
          d="M69.8998 26.5809C69.6587 25.8024 69.0169 25.2352 68.2444 25.1177L46.5441 21.8119L36.8392 1.19831C36.4937 0.464363 35.7809 0 35.0002 0C34.2197 0 33.5067 0.464363 33.1612 1.19831L23.4558 21.8117L1.75587 25.1177C0.983543 25.2352 0.341509 25.8024 0.100474 26.5806C-0.140836 27.3591 0.0604149 28.2135 0.619323 28.7845L16.3212 44.83L12.6151 67.4866C12.4831 68.2934 12.7995 69.1083 13.431 69.5895C14.0625 70.0703 14.8995 70.1339 15.5908 69.753L35.0001 59.0557L54.4089 69.7528C54.709 69.9182 55.0366 69.9998 55.363 69.9998C55.7882 69.9998 56.2115 69.8615 56.5686 69.5895C57.2001 69.1083 57.5165 68.2931 57.3846 67.4866L53.6773 44.83L69.3809 28.7845C69.9399 28.2133 70.1411 27.359 69.8998 26.5809Z"
          fill="#FFCA7B"
        />
        <path
          d="M69.9 26.5809C69.6588 25.8024 69.017 25.2352 68.2446 25.1177L46.5442 21.8119L36.8393 1.19831C36.4939 0.464363 35.781 0 35.0003 0V59.0559L54.4091 69.753C54.7092 69.9184 55.0368 69.9999 55.3633 69.9999C55.7885 69.9999 56.2118 69.8616 56.5689 69.5896C57.2004 69.1085 57.5168 68.2933 57.3848 67.4868L53.6774 44.8301L69.381 28.7845C69.94 28.2133 70.1413 27.359 69.9 26.5809Z"
          fill="#FFBB7E"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnimatedStarSvg",
  methods: {
    animate() {
      this.$emit("click");
      let star = this.$refs.star;
      let keyframes = [
        { transform: "scale(2)" },
        { transform: "rotateY(0.5turn)" },
        { transform: "rotateY(0turn)" }
      ];
      let options = { duration: 1000, iterations: 1 };

      star.animate(keyframes, options);
    }
  }
};
</script>

<style lang="sass" scoped>
.animated-svg-wrapper
  position: relative
  width: 25px
  height: 25px

.animated-star-svg
  cursor: pointer
  width: 100%
  height: 100%
  position: absolute

  svg
    width: 100%
    height: 100%
</style>
