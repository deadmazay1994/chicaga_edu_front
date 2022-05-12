<template>
  <div class="animated-svg-wrapper">
    <div class="animated-coin-png coin" ref="coin"></div>
  </div>
</template>

<script>
export default {
  name: "AnimatedCoinPng",
  data() {
    return {
      timerId: undefined
    };
  },
  methods: {
    animate() {
      let timerId = undefined;
      this.$emit("click");
      this.$refs.coin.animate(
        [{ transform: "scale(2)" }, { transform: "scale(1)" }],
        { duration: 1000, iterations: 1 }
      );
      let pos = 25;
      const interval = 200;
      const diff = 25;

      timerId = setInterval(() => {
        this.$refs.coin.style.backgroundPosition = `-${pos}px 0px`;
        if (pos < 200) pos = pos + diff;
        else {
          pos = 0;
          this.$refs.coin.style.backgroundPosition = `-${pos}px 0px`;
          clearInterval(timerId);
        }
      }, interval);
    }
  }
};
</script>

<style lang="sass" scoped>
.animated-svg-wrapper
  position: relative
  width: 25px
  height: 25px

.animated-coin-png
  cursor: pointer

.coin
  position: absolute
  width: 25px
  height: 25px
  background-image: url("~@/assets/imgs/coin-sprites.png")
  background-position: 0px 0px
  background-size: cover
</style>
