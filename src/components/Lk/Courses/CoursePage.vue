<template>
  <div class="course-page vue-component">
    <!-- <page-title v-if="courseRes.name" :title="courseRes.name" />
    <v-skeleton-loader v-else type="heading" class="mb-5" /> -->
    <!-- <course-my v-if="courseRes.buyed" :course="courseRes" />
    <v-row v-else class="d-flex justify-center">
      <v-col cols="12">
        <course-catalog :course="courseRes" />
      </v-col>
    </v-row> -->
    {{ courseRes }}
    <course-description
      :title="courseRes.name"
      :image="require('@/assets/imgs/some-person.png')"
      :description="courseRes.description"
      :courseInfo="courseInfo"
    />
    <div class="course-page__grid-wrapper">
      <div class="course-page__grid__title">Программа курса</div>
      <div class="course-page__grid">
        <course-program-card
          v-for="(courseProgramm, index) in courseProgramms"
          :key="index"
          :courseProgramm="courseProgramm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CourseProgramCard from "../../CourseProgram/CourseProgramCard.vue";
import CourseDescription from "../Courses/CourseDescription.vue";
// import CourseMy from "./CoursePageMy";
// import CourseCatalog from "./CoursePageCatalog";

import api from "@/mixins/api";
import { mapGetters } from "vuex";

export default {
  name: "course-page",
  data: function() {
    return {
      courseRes: {},
      courseProgramms: {},
      subtitle: "",
      // Пока нет данных с сервера
      // передаем фейковые данные courseInfo
      courseInfo: [
        { icon: "calendar", text: "Обучение 4 месяца" },
        { icon: "school", text: "32 урока" },
        { icon: "brains", text: "6 доп. уроков с фразами для общения" },
        { icon: "list-check", text: "6 тестов + финальный тест" },
        { icon: "star", text: "свидетельство / сертификат о прохождении курса" }
      ]
    };
  },
  methods: {
    async setCourse() {
      // Данный метод работает только если мы еще не запрашивали курсы
      await this.$store.dispatch("setAllCourses");
      this.courseRes = this.course(this.$route.params.id);
    },
    async setCourseProgramms() {
      this.courseProgramms = await this.getCourseProgramms();
    }
  },
  computed: {
    ...mapGetters(["course"])
  },
  components: {
    // CourseMy,
    // CourseCatalog
    CourseProgramCard,
    CourseDescription
  },
  props: [],
  mixins: [api],
  beforeMount() {
    this.setCourse();
    this.setCourseProgramms();
  }
};
</script>

<style scoped="scoped" lang="sass">
.course-page__grid-wrapper
  .course-page__grid
    padding-top: 16px
    padding-bottom: 1.5rem
    display: grid
    grid-template-columns: auto auto auto
    grid-gap: 20px
    &__title
      padding-top: 40px
      font-size: 24px
      font-weight: 700
</style>
