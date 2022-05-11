<template>
  <div class="progress-bar__wrapper">
    <div class="progress-bar" :style="backgroundDashes">
      <div class="progress-bar__main" :style="barStyle"></div>
      <div class="progress-bar__ed" v-if="barStyle.width != '100%'"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    value: {
      // Количество пройденных уроков
      type: Number,
      default: 0
    },
    numbers: {
      // Общее количество уроков
      type: Number,
      default: 0
    }
  },
  computed: {
    barStyle() {
      return {
        width: (this.value / this.numbers) * 100 + "%"
      };
    },
    backgroundDashes() {
      let backgroundImages = "";
      let backgroundPositions = "";

      for (let i = 0; i < this.numbers; i++) {
        backgroundImages +=
          "url(" + require("@/assets/svg/progress-punktir.svg") + ")";
        backgroundPositions += `${(i / this.numbers) * 100}%`;
        if (i !== this.numbers - 1) {
          backgroundImages += ",";
          backgroundPositions += ",";
        }
      }

      return {
        backgroundColor: "#f8f8f8",
        backgroundImage: backgroundImages,
        backgroundPositionX: backgroundPositions,
        backgroundRepeat: "no-repeat"
      };
    }
  },
  mounted() {
    setTimeout(() => {
      this.ready = true;
    }, 0);
  }
};
</script>

<style lang="sass" scoped>
.progress-bar__wrapper
  padding: 7px 8px 9px 8px
  border-radius: 26px
  border-bottom: 1px dashed #c4c4c4
  width: 314px
.progress-bar
  display: flex
  background-color: #F8F8F8
  background-repeat: no-repeat
  width: 100%
  height: 20px
  border: 1px solid #c4c4c4
  border-radius: 10px
  overflow: hidden
  position: relative

  &__main
    height: 100%
    width: 1%
    background: linear-gradient(0.21deg, #B5D637 0%, #E9FE97 99.63%)

  &__ed
    height: 100%
    width: 6px
    background-image: url('~@/assets/svg/progress-gradient.svg')
</style>
