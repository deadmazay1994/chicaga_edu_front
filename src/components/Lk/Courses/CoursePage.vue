<template>
  <div class="course-page vue-component">
    <course-description
      :title="courseRes.name"
      :image="require('@/assets/imgs/some-person.png')"
      :description="courseRes.description"
      :courseInfo="courseInfo"
    />
    <div class="course-page__block">
      <div class="course-page__block-title">Программа курса</div>
      <div class="course-page__grid">
        <course-program-card
          v-for="(courseProgramm, index) in courseProgramms"
          :key="index"
          :title="courseProgramm.title"
          :rating="courseProgramm.rating"
          :duration="courseProgramm.duration"
          :start_time="courseProgramm.start_time"
        />
      </div>
    </div>
    <div class="course-page__block">
      <div class="course-page__block-title">Тарифы</div>
      <div class="course-page__grid">
        <Tariff
          class="course-page__tariff"
          v-for="(tariff, index) in tariffes"
          :key="index"
          :tariffData="tariff"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CourseProgramCard from "../../CourseProgram/CourseProgramCard.vue";
import CourseDescription from "../Courses/CourseDescription.vue";
import Tariff from "@/components/Tariff";

import api from "@/mixins/api";
import { mapGetters } from "vuex";

export default {
  name: "course-page",
  data: function() {
    return {
      courseRes: {},
      courseProgramms: {},
      tariffes: {},
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
    },
    async setTariffes() {
      const result = await this.getTariffesData();
      this.tariffes = result.tariffes;
    }
  },
  computed: {
    ...mapGetters(["course"])
  },
  components: {
    CourseProgramCard,
    CourseDescription,
    Tariff
  },
  props: [],
  mixins: [api],
  beforeMount() {
    this.setCourse();
    this.setCourseProgramms();
    this.setTariffes();
  }
};
</script>

<style scoped="scoped" lang="sass">
.course-page
  width: 100%
  &__block
    padding-top: 40px
  &__block-title
    font-size: 24px
    font-weight: 700
  &__grid
    padding-top: 16px
    display: grid
    grid-template-columns: 1fr 1fr 1fr
    grid-gap: 20px
</style>
