<template>
  <div class="lesson-starts" v-show="lesson">
    <div class="d-flex justify-content-center center">
      <counter class="counter" :current-time="timeToLesson" />
    </div>
    <div class="date-info">
      <span class="main--text"
        ><img src="@/assets/svg/cal_icon.svg" alt="" />
        {{ dateLesson }}</span
      >
      <span class="main--text"
        ><img src="@/assets/svg/time_icon.svg" alt="" />
        {{ timeLesson }}</span
      >
    </div>
  </div>
</template>

<script>
import Counter from "./Counter.vue";

export default {
  name: "LessonStarts",
  components: { Counter },
  props: {
    dateLesson: String,
    timeLesson: String,
    lesson: Boolean
  }
};
</script>

<style lang="scss" scoped>
.lesson-starts {
  display: inline-block;
  background: #f8f8f8;
  border-radius: 12px;
  width: 100%;
  text-align: center;
  padding: 23px 50px 19px 50px;
  margin-bottom: 8px;
  h4 {
    padding: 7px 0;
  }
}
</style>