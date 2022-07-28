<template>
  <div class="course-page vue-component">
    <course
      :course="courseData"
      :courseInfo="courseInfo"
      :courseProgramms="coursePrograms"
    />
  </div>
</template>

<script>
import Course from "./Course.vue";

import api from "@/mixins/api";
import { mapGetters } from "vuex";

export default {
  name: "course-page",
  data: function() {
    return {
      courseData: {},
      courseInfo: [],
      coursePrograms: []
    };
  },
  methods: {
    async setCourse() {
      // Данный метод работает только если мы еще не запрашивали курсы
      await this.$store.dispatch("setAllCourses");
      this.courseData = this.course(this.$route.params.id);
    },
    async setCoursePrograms() {
      const result = await this.getCourseInfo(this.$route.params.id);
      this.coursePrograms = result.data.lessons;
    },
    async setCourseInfo() {
      const result = [
        { icon: "calendar", text: "Обучение 4 месяца" },
        { icon: "school", text: "32 урока" },
        { icon: "brains", text: "6 доп. уроков с фразами для общения" },
        { icon: "list-check", text: "6 тестов + финальный тест" },
        { icon: "star", text: "свидетельство / сертификат о прохождении курса" }
      ];
      this.courseInfo = result;
    }
  },
  computed: {
    ...mapGetters(["course"])
  },
  components: {
    Course
  },
  props: [],
  mixins: [api],
  mounted() {
    this.setCourse();
    this.setCoursePrograms();
    this.setCourseInfo();
  }
};
</script>
