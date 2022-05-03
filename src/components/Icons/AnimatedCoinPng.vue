<template>
  <div class="animated-coin-png coin" ref="coin"></div>
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
      this.$emit("click");
      let pos = 25;
      const interval = 250;
      const diff = 25;

      this.timerId = setInterval(() => {
        this.$refs.coin.style.backgroundPosition = `-${pos}px 0px`;
        if (pos < 200) pos = pos + diff;
        else {
          pos = 0;
          this.$refs.coin.style.backgroundPosition = `-${pos}px 0px`;
          clearInterval(this.timerId);
        }
      }, interval);
    }
  }
};
</script>

<style lang="sass" scoped>
.animated-coin-png
  cursor: pointer

.coin
  width: 25px
  height: 25px
  background-image: url("~@/assets/imgs/coin-sprites.png")
  background-position: 0px 0px
</style>
