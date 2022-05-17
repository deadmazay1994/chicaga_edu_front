<template>
  <div class="progress-item">
    <div
      class="stamp"
      v-for="(stamp, index) in timestamps"
      :key="index"
      :style="{
        width: returnStampWidth(index) + '%'
      }"
    >
      <span class="stamp__title">{{ stamp.title }}</span>
      <div
        class="stamp__element"
        :style="{ width: returnProgress(index) + '%' }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressItem",
  props: ["currentTime", "fullTime", "timestamps"],
  computed: {
    progress() {
      if (this.currentTime && this.fullTime)
        return (this.currentTime * 100) / this.fullTime;
      return 0;
    }
  },
  methods: {
    returnStampWidth(index) {
      let curr = (this.timestamps[index].time * 100) / this.fullTime;
      let prev =
        index > 0 ? (this.timestamps[index - 1].time * 100) / this.fullTime : 0;
      return curr - prev;
    },
    returnProgress(index) {
      if (
        this.currentTime > (index > 0 ? this.timestamps[index - 1].time : 0) &&
        this.currentTime < this.timestamps[index].time
      ) {
        return (
          ((index > 0
            ? this.currentTime - this.timestamps[index - 1].time
            : this.currentTime) *
            100) /
          (index > 0
            ? this.timestamps[index].time - this.timestamps[index - 1].time
            : this.timestamps[index].time)
        );
      } else if (
        this.currentTime > (index > 0 ? this.timestamps[index - 1].time : 0)
      )
        return 100;
      else return 0;
    }
  }
};
</script>

<style lang="sass" scoped>
.progress-item
  width: 100%
  height: 100%
  display: flex

.stamp
  background: rgba(255, 255, 255, 0.33)
  cursor: pointer

  &:hover
    .stamp__title
      opacity: 1
  & + .stamp
    margin-left: 2px

  .stamp__element
    height: 8px
    width: 0%
    background: #FF0000

  .stamp__title
    opacity: 0
    position: absolute
    margin-top: -33px
    drop-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 1)
</style>
