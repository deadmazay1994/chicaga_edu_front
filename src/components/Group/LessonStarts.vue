<template>
  <div class="lesson-starts" v-show="event">
    <div class="d-flex justify-content-center center">
      <counter class="counter" :current-time="time" />
    </div>
    <div class="date-info">
      <span class="main--text"
        ><img src="@/assets/svg/cal_icon.svg" alt="" /> {{ date }}</span
      >
      <span class="main--text"
        ><img src="@/assets/svg/time_icon.svg" alt="" /> {{ exactTime }}</span
      >
    </div>
  </div>
</template>

<script>
import Counter from "./Counter.vue";

export default {
  name: "LessonStarts",
  components: { Counter },
  props: ["date", "exactTime", "time", "event"]
};
</script>

<style lang="scss" scoped>
.lesson-starts {
  display: inline-block;
  background: #f8f8f8;
  border-radius: 12px;
  text-align: center;
  padding: 23px 50px 19px 50px;
  margin-bottom: 8px;
  h4 {
    padding: 7px 0;
  }

  .date-info {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 12px 0;
    span {
      display: flex;
      align-items: center;
      margin: 0 12px;
      img {
        margin-right: 5px;
      }
    }
  }
}
</style>
