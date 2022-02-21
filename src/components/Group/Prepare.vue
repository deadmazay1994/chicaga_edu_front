<template>
  <div class="prepare">
    <div class="title">{{ (isPositive) ? titlePrepare : titleLate }}</div>
    <div class="buttons">
      <router-link
        :to="redirect"
        tag="button"
        :disabled="timeStrGetMinutes(time) > 10"
        >Присоединиться</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Prepare",
  props: ["event", "time", "titleText"],
  data() {
    return {
      courseId: 0,
      redirect: {
        name: "lesson",
      },
      titlePrepare: "Готовы присоединиться?",
      titleLate: "Занятие уже началось"
    };
  },
  computed: {
    isPositive() {
      return Boolean((this.time % 3600) / 60 > 0)
    }
  },
  methods: {
    timeStrGetMinutes(seconds) {
      return Math.floor((seconds % 3600) / 60);
    },
  },
  mounted() {
    this.courseId =
      this.event.course_id !== null && this.event.course_id !== undefined
        ? this.event.course_id
        : 0;
    this.redirect.params = {
      courseId: this.courseId,
      userid: this.$route.params.code,
      id: this.event.uniq_id,
    };
  },
};
</script>

<style lang="scss" scoped>
.prepare {
  margin-top: 1rem;
  background: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .title {
    font-size: 18px;
    text-align: center;
  }
  .sub-title {
    font-size: 14px;
    margin-top: 0.5rem;
    text-align: center;
  }
  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      background: #ff0000;
      border-radius: 40px;
      margin-top: 1rem;
      padding: 0.5rem 1.5rem;
      transition: all 0.5s ease;
      color: #ffffff;
      -webkit-box-shadow: 3px 3px 15px 3px #ffffff80 inset;
      -moz-box-shadow: 3px 3px 15px 3px #ffffff80 inset;
      box-shadow: 3px 3px 15px 3px #ffffff80 inset;
      &:disabled {
        background: #fab5b4;
        -webkit-box-shadow: inset 3px 3px 15px 3px rgba(255, 245, 245, 0.5);
        -moz-box-shadow: inset 3px 3px 15px 3px rgba(255, 245, 245, 0.5);
        box-shadow: inset 3px 3px 15px 3px rgba(255, 245, 245, 0.5);
        pointer-events: none;
      }
    }
  }
}
</style>