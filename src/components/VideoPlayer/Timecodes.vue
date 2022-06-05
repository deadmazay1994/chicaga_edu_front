<template>
  <div class="timecodes vue-component">
    <div class="timecodes__title">Таймкод:</div>
    <div class="timecodes__grid">
      <div
        class="timecodes__item"
        v-for="(timecode, index) in timecodesArray"
        :key="index"
      >
        <span class="timecodes__time" @click="clickTime(index)">{{
          returnformattedTime(index)
        }}</span>
        <span class="timecodes__title">{{ timecode.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "timecodes",
  components: {},
  data: function() {
    return {};
  },
  props: {
    timecodesArray: Array
  },
  computed: {},
  methods: {
    returnformattedTime(index) {
      let time = index === 0 ? 0 : this.timecodesArray[index - 1].time;
      return moment.utc(time * 1000).format("HH:mm:ss");
    },
    clickTime(index) {
      let time = index === 0 ? 0 : this.timecodesArray[index - 1].time;
      this.$emit("clickTimecode", time);
    }
  }
};
</script>

<style scoped="scoped" lang="sass">
.timecodes
  padding: 0 .5rem
  &__grid
    display: grid
    grid-template-columns: 1fr 1fr
    grid-column-start: 1
    grid-column-end: 2
  &__item
    display: flex
    align-items: center
    font-size: 16px
    font-family: Manrope, sans-serif
  &__time
    font-weight: 400
    color: #007EFF
    cursor: pointer
  &__title
    margin-left: 10px
    font-weight: 300
</style>
