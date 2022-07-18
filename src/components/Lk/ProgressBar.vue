<template>
  <div
    class="progress-bar__wrapper"
    :class="{ 'progress-bar__wrapper--full-width': fullWidth }"
  >
    <div class="progress-bar" :style="backgroundDashes">
      <div class="progress-bar__main" :style="barStyle"></div>
      <div class="progress-bar__ending" v-if="barStyle.width != '100%'"></div>
      <div class="progress-bar__number-wrapper">
        <span class="progress-bar__number"
          >{{ Math.round((value / numbers) * 100) }}%</span
        >
      </div>
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
    },
    fullWidth: Boolean
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
  }
};
</script>

<style lang="sass" scoped>
.progress-bar__wrapper
  padding: 7px 8px 9px 8px
  border-radius: 26px
  border-bottom: 1px dashed #c4c4c4
  width: 314px
  &--full-width
    width: 100%

.progress-bar
  position: relative
  display: flex
  background-color: #F8F8F8
  background-repeat: no-repeat
  width: 100%
  height: 20px
  border: 1px solid rgba(128, 128, 128, 1)
  border-radius: 10px
  overflow: hidden
  position: relative

  &__main
    height: 100%
    width: 1%
    background: linear-gradient(0.21deg, #B5D637 0%, #E9FE97 99.63%)

  &__ending
    height: 100%
    width: 6px
    background-image: url('~@/assets/svg/progress-gradient.svg')

  .progress-bar__number-wrapper
    position: absolute
    display: flex
    align-items: center
    justify-content: center
    height: 100%
    width: 100%
    .progress-bar__number
      display: inline
      text-align: center
      vertical-align: bottom
      font-weight: 600
      font-size: 14px
      line-height: normal
</style>
