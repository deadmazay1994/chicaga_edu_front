<template>
  <div class="progress-item" :style="progressItemWidth">
    <span class="progress-item__title">{{ timestamp.title }}</span>
    <div class="progress-item__element" :style="progressItemElementWidth"></div>
  </div>
</template>

<script>
export default {
  name: "ProgressItem",
  props: ["currentTime", "fullTime", "timestamps", "timestamp", "index"],
  computed: {
    progress() {
      if (this.currentTime && this.fullTime)
        return (this.currentTime * 100) / this.fullTime;
      return 0;
    },
    // progressItemWidth - отвечает за ширину одного таймкода (полоса таймкода)
    progressItemWidth() {
      return {
        width: this.returnStampWidth(this.index) + "%"
      };
    },
    // progressItemElementWidth - отвечает за ширину самого прогрессбара
    progressItemElementWidth() {
      return {
        width: this.returnProgress(this.index) + "%"
      };
    }
  },
  methods: {
    // возвращает значение Number, которые используется для ширины одного таймкода в процентах
    returnStampWidth(index) {
      let currentTimeStampTime = this.timestamps[index];
      let curr = (currentTimeStampTime.time * 100) / this.fullTime;
      let prev =
        index > 0 ? (this.timestamps[index - 1].time * 100) / this.fullTime : 0;

      return curr - prev;
    },
    // возвращает значение Number, которые используется для ширины прогрессбара в процентах
    returnProgress(index) {
      const FULL_PROGRESS = 100;
      const EMPTY_PROGRESS = 0;

      let currentTimeStampTime = this.timestamps[index];
      let previousTimeStampTime =
        index > 0 ? this.timestamps[index - 1].time : 0;
      let BooleanIsCurrentRange =
        this.currentTime > previousTimeStampTime &&
        this.currentTime < currentTimeStampTime.time;

      if (BooleanIsCurrentRange) {
        return (
          ((index > 0
            ? this.currentTime - this.timestamps[index - 1].time
            : this.currentTime) *
            100) /
          (index > 0
            ? currentTimeStampTime.time - this.timestamps[index - 1].time
            : currentTimeStampTime.time)
        );
      } else if (this.currentTime > previousTimeStampTime) return FULL_PROGRESS;
      else return EMPTY_PROGRESS;
    }
  }
};
</script>

<style lang="sass" scoped>
.progress-item
  background: rgba(255, 255, 255, 0.33)
  cursor: pointer

  &:hover
    .progress-item__title
      opacity: 1
  & + .progress-item
    margin-left: 2px

  .progress-item__element
    height: 8px
    width: 0%
    background: #FF0000

  .progress-item__title
    opacity: 0
    position: absolute
    margin-top: -33px
    drop-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 1)
</style>
