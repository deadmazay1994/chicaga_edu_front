<template>
  <div class="progress-item" :style="progressItemWidth">
    <div class="progress-item__title">{{ timestamp.title }}</div>
    <div class="progress-item__element" :style="progressItemElementWidth"></div>
  </div>
</template>

<script>
export default {
  name: "ProgressItem",
  props: ["currentTime", "duration", "timestamps", "timestamp", "index"],
  computed: {
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
      if (this.timestamps.type === "default") return 100;
      let currentTimeStampTime = this.timestamps[index].time;
      let curr = (currentTimeStampTime * 100) / this.duration;
      let prev =
        index > 0 ? (this.timestamps[index - 1].time * 100) / this.duration : 0;
      return curr - prev;
    },
    // возвращает значение Number, которые используется для ширины прогрессбара в процентах
    returnProgress(index) {
      const FULL_PROGRESS = 100;
      const EMPTY_PROGRESS = 0;

      let currentTimeStampTime = this.timestamps[index].time;
      let previousTimeStampTime =
        index > 0 ? this.timestamps[index - 1].time : 0;
      let BooleanIsCurrentRange =
        this.currentTime > previousTimeStampTime &&
        this.currentTime < currentTimeStampTime;

      if (BooleanIsCurrentRange) {
        return (
          ((index > 0
            ? this.currentTime - this.timestamps[index - 1].time
            : this.currentTime) *
            100) /
          (index > 0
            ? currentTimeStampTime - this.timestamps[index - 1].time
            : currentTimeStampTime)
        );
        // при отстутсвии таймкодов высчитываем прогресс по умолчанию
      } else if (this.timestamps.type === "default") {
        return (this.currentTime * 100) / this.duration;
      } else if (this.currentTime > previousTimeStampTime) return FULL_PROGRESS;
      else return EMPTY_PROGRESS;
    }
  }
};
</script>

<style lang="sass" scoped>
.progress-item
  position: relative
  background-color: rgba(255, 255, 255, 0.33)
  cursor: pointer
  &__title
    position: absolute
    margin-top: -33px
    font-weight: 500
    font-size: 16px
    color: #ffffff
    text-shadow: 0 0 5px rgba(0, 0, 0, 1)
    opacity: 0
    transition-property: opacity
    transition-duration: 0.2s
  &:hover &__title
    opacity: 1
  &__element
    width: 0
    height: 8px
    background-color: #ff0000
</style>
