<template>
  <div class="lesson-upcoming vue-component">
    <upcoming
      :link="{
        name: 'lesson_teacher',
        params: {
          id: $route.params.id,
          groupKey: $route.params.code
        }
      }"
      :disabled="timeToLesson > 600"
      class="upcoming"
    >
      <lesson-starts
        style="margin: 0 auto"
        :event="lesson"
        :date="dateLesson"
        :exactTime="timeLesson"
        :time="timeToLesson"
      />
    </upcoming>
  </div>
</template>

<script>
import Upcoming from "@/components/Group/Upcoming";
import LessonStarts from "@/components/Group/LessonStarts.vue";

import moment from "moment";
import dateFormat from "dateformat";
import api from "@/mixins/api";

export default {
  name: "lesson-upcoming",
  data: function() {
    return {
      timeToLesson: Infinity,
      dateLesson: String,
      timeLesson: String,
      timerId: false,
      lesson: null,
      DateLessonTime: new Date()
    };
  },
  methods: {
    ready() {
      this.$emit("ready");
    },
    startTimer() {
      if (!this.lesson) return;
      this.timeToLesson = Math.floor(
        (+this.DateLessonTime - +new Date()) / 1000
      );
      this.timerId = setInterval(() => {
        // this.redirectToLessonIfLessonStart();
        this.timeToLesson--;
      }, 1000);
    },
    setDateAndTime() {
      let d = this.DateLessonTime;
      this.dateLesson = dateFormat(d, "yyyy.mm.dd");
      this.timeLesson = dateFormat(d, "HH:MM");
    },
    // Get lesson by academig croup id
    async setLesson() {
      let r = await this.getFullLesson(this.$route.params.id);
      if (r.success && r.start) {
        this.lesson = r;
        this.lesson.start = parseInt(r.start) * 1000; // convert to ms
      } else {
        this.lesson = r;
        this.lesson["start"] = Date.now() + 1;
      }
      return true;
    }
  },
  computed: {},
  components: {
    Upcoming,
    LessonStarts
  },
  props: [],
  mixins: [api],
  async beforeMount() {
    await this.setLesson();
    if (this.$route.params.startTime) {
      this.DateLessonTime = moment(
        new Date(parseInt(this.$route.params.startTime))
      ).valueOf();
    }
    this.startTimer();
    this.setDateAndTime();
  }
};
</script>

<style scoped="scoped" lang="sass"></style>
