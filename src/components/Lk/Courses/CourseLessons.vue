<template>
  <div class="course-lessons vue-component">
    <div class="course-lessons__section">
      <div class="course-lessons__section-title">
        Уроки курса:
      </div>
      <div
        class="course-lessons__lesson"
        v-for="(lesson, index) in currentCourse.lessons"
        :key="index"
      >
        <router-link :to="`/lesson/${lesson.uniq_id}`">
          {{ lesson.name }}
        </router-link>
      </div>
      <!-- <CourseCardVue :course="currentCourse" />
      <CourseProgramCardVue :courseProgramm="courseProgramms" /> -->
    </div>
  </div>
</template>

<script>
// import CourseCardVue from "./CourseCard.vue";
// import CourseProgramCardVue from "../../CourseProgram/CourseProgramCard.vue";

import api from "@/mixins/api";

export default {
  name: "course-lessons",
  components: {
    // CourseCardVue,
    // CourseProgramCardVue
  },
  data: function() {
    return {
      courseProgramms: {},
      currentCourse: {}
    };
  },
  props: {
    course: Object
  },
  computed: {},
  methods: {
    setCourses() {
      this.$store.dispatch("setMyCourses");
    },
    async setCurrentCourse() {
      const result = await api.methods.getCourseInfo(this.$route.params.id);
      this.currentCourse = result.data;
      console.log("lesson", this.currentCourse);
    },
    async setCourseProgramms() {
      this.courseProgramms = await api.methods.getCourseProgramms();
    }
  },
  async beforeMount() {
    this.setCourses();
    this.setCurrentCourse();
    this.setCourseProgramms();
  }
};
</script>

<style scoped="scoped" lang="sass">
.course-lessons
  padding: 24px 32px
  &__section:not(:last-child)
    margin-bottom: 40px
  &__section-title
    margin-bottom: 16px
    font-weight: 700
    font-size: 24px
    color: #323232
  &__lesson:not(:last-child)
    margin-bottom: 20px
</style>
