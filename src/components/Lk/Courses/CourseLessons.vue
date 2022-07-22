<template>
  <div class="course-lessons vue-component">
    <div class="course-lessons__section">
      <div class="course-lessons__section-title">
        Следующий урок:
      </div>
      <CourseProgramCardVue
        class="course-lessons__card"
        :key="index"
        :title="currentCourse.lessons[0].name"
        :rating="4.8"
        :duration="40"
        :start_time="1656454829"
        :link="`/lesson/${currentCourse.lessons[0].uniq_id}`"
      />
    </div>
    <div class="course-lessons__section">
      <div class="course-lessons__section-title">
        Уроки курса:
      </div>
      <CourseProgramCardVue
        class="course-lessons__card"
        v-for="(lesson, index) in currentCourse.lessons"
        :key="index"
        :title="lesson.name"
        :rating="4.8"
        :duration="40"
        :start_time="1656454829"
        :link="`/lesson/${lesson.uniq_id}`"
      />
    </div>
  </div>
</template>

<script>
import CourseProgramCardVue from "@/components/CourseProgram/CourseProgramCard.vue";

import api from "@/mixins/api";

export default {
  name: "course-lessons",
  components: {
    CourseProgramCardVue
  },
  mixins: [api],
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
      const result = await this.getCourseInfo(this.$route.params.id);
      this.currentCourse = result.data;
    },
    async setCourseProgramms() {
      this.courseProgramms = await this.getCourseProgramms();
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
@import "@/assets/styles/variables.sass"

.course-lessons
  padding: 24px 32px
  @media ($media_md)
    padding: 16px
  &__section:not(:last-child)
    margin-bottom: 40px
    @media ($media_md)
      margin-bottom: 30px
    @media ($media_sm)
      margin-bottom: 20px
  &__section-title
    margin-bottom: 16px
    font-weight: 700
    font-size: 24px
    color: #323232
    @media ($media_md)
      font-size: 20px
    @media ($media_sm)
      margin-bottom: 8px
  &__card:not(:last-child)
    margin-bottom: 20px
    @media ($media_sm)
      margin-bottom: 10px
</style>
