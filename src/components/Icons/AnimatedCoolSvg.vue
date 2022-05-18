<template>
  <div class="animated-svg-wrapper">
    <div class="animated-cool-svg">
      <svg
        width="70"
        height="70"
        viewBox="0 0 70 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref="svg"
      >
        <path
          d="M59.7488 10.2512C53.1381 3.64058 44.3489 0 35 0C25.6511 0 16.8619 3.64058 10.2512 10.2512C3.64058 16.8619 0 25.6511 0 35C0 44.3489 3.64058 53.1381 10.2512 59.7488C16.8619 66.3594 25.6511 70 35 70C44.3489 70 53.1381 66.3594 59.7488 59.7488C66.3594 53.1381 70 44.3489 70 35C70 25.6511 66.3593 16.8619 59.7488 10.2512Z"
          fill="#FFCA7B"
        />
        <path
          d="M59.7488 10.2512C53.1381 3.64058 44.3489 0 35 0V70C44.3489 70 53.1381 66.3594 59.7488 59.7488C66.3594 53.1381 70 44.3489 70 35C70 25.6511 66.3593 16.8619 59.7488 10.2512Z"
          fill="#FFBB7E"
        />
        <path
          ref="lMouth"
          d="M34.9998 60.4774C28.5398 60.4774 22.5644 57.5431 18.6059 52.427L21.85 49.917C25.026 54.0216 29.8189 56.3757 34.9998 56.3757C40.1809 56.3757 44.9738 54.0216 48.1496 49.917L51.3938 52.427C47.4352 57.5431 41.4598 60.4774 34.9998 60.4774Z"
          fill="#808080"
        />
        <path
          ref="lGlasses"
          d="M38.921 26.5505H31.0815L7.05055 24.9043L8.68319 35.984C9.03443 38.3671 10.232 40.5465 12.0552 42.1207C13.8785 43.695 16.2091 44.562 18.618 44.562H23.0199C28.5571 44.562 33.062 40.0571 33.062 34.5199V30.6521H36.9406V34.5199C36.9406 40.0571 41.4454 44.562 46.9826 44.562H51.3845C53.7933 44.562 56.1241 43.695 57.9473 42.1207C59.7705 40.5465 60.9681 38.3671 61.3194 35.984L62.952 24.9043L38.921 26.5505Z"
          fill="#404040"
        />
        <path
          ref="rMouth"
          d="M51.394 52.4259L48.1498 49.9159C44.974 54.0205 40.1811 56.3746 35 56.3746V60.4764C41.46 60.4764 47.4354 57.5421 51.394 52.4259Z"
          fill="#404040"
        />
        <path
          ref="rGlasses"
          d="M38.9213 26.5498H35V30.6516H36.9408V34.5194C36.9408 40.0566 41.4456 44.5615 46.9829 44.5615H51.3847C53.7936 44.5615 56.1243 43.6945 57.9475 42.1202C59.7708 40.546 60.9683 38.3666 61.3196 35.9835L62.9522 24.9038L38.9213 26.5498Z"
          fill="#0D0D0D"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnimatedCoolSvg",
  methods: {
    animate() {
      let lMouth = this.$refs.lMouth;
      let lGlasses = this.$refs.lGlasses;
      let rMouth = this.$refs.rMouth;
      let rGlasses = this.$refs.rGlasses;

      let options = { duration: 1000, iterations: 1, easing: "ease-in-out" };
      let keyframes = [
        { transform: "translateY(-10.91px)" },
        { transform: "translateY(0px)" }
      ];

      this.$refs.svg.animate(
        [{ transform: "scale(2)" }, { transform: "scale(1)" }],
        {
          duration: 1000,
          iterations: 1,
          easing: "ease"
        }
      );
      lMouth.animate(keyframes, options);
      lGlasses.animate(keyframes, options);
      rMouth.animate(keyframes, options);
      rGlasses.animate(keyframes, options);
      this.$emit("animate");
    }
  }
};
</script>

<style lang="sass" scoped>
.animated-svg-wrapper
  position: relative
  width: 25px
  height: 25px

.animated-cool-svg
  cursor: pointer
  width: 25px
  height: 25px
  position: absolute

  svg
    width: 100%
    height: 100%

  .animate
    animation-duration: .5s
    animation-name: updown
    animation-iteration-count: 2

@keyframes updown
  0%
    transform: translateY(-10.91)
  100%
    transform: translateY(10.91)
</style>
