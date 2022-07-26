<template>
  <div class="course-page vue-component">
    <course-description
      :title="courseRes.name"
      :image="require('@/assets/imgs/some-person.png')"
      :description="courseRes.description"
      :courseInfo="courseInfo"
      :result="true"
    />
    <div class="course-page__block" v-if="coursePrograms.length">
      <div class="course-page__block-title">Программа курса</div>
      <div class="course-page__grid">
        <course-program-card
          v-for="(courseProgram, index) in coursePrograms"
          :key="index"
          :title="courseProgramm.title"
          :rating="courseProgramm.rating"
          :duration="courseProgramm.duration"
          :start_time="courseProgramm.start_time"
          :link="'#'"
        />
      </div>
    </div>
    <div class="course-page__block">
      <div class="course-page__block-title">Курс состоит из 6 модулей</div>
      <div class="course-page__block-info">
        <div class="course-page__info-title">
          В каждом модуле для <b>максимального эффекта:</b>
        </div>
        <div class="course-page__info-list">
          <span class="course-page__list-item">
            уроки
          </span>
          <span class="course-page__list-item">
            разговорные фразы
          </span>
          <span class="course-page__list-item">
            дополнительные материалы
          </span>
        </div>
        <div>для увлекательного изучения английского</div>
      </div>
      <div class="course-page__svg-wrapper">
        <img
          src="~@/assets/svg/course-results-frame.svg"
          alt="Карта прохождения курса"
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
      coursePrograms: {},
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
    async setCoursePrograms() {
      const result = await this.getCourseInfo(this.$route.params.id);
      console.log("set course program", result);
      this.coursePrograms = result.data.lessons;
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
    this.setCoursePrograms();
    this.setTariffes();
  }
};
</script>

<style scoped="scoped" lang="sass">
@import "@/assets/styles/variables.sass"

.course-page
  width: 100%
  &__block
    padding-top: 40px
    @media ($media_md)
      padding-top: 30px
  &__block-title
    font-size: 24px
    font-weight: 700
    @media ($media_md)
      font-size: 20px
  &__block-info
    padding-top: 16px
  &__info-list
    display: flex
  &__list-item
    position: relative
    padding-left: 26.5px
  &__list-item + &__list-item
    padding-left: 44px
    &:before
      left: 17.5px
  &__list-item::before
    content: ""
    position: absolute
    top: 0
    left: 0px
    width: 21px
    height: 21px
    background-image: url("~@/assets/imgs/icons/star-3.svg")
    background-position: center
    background-size: contain
    background-repeat: no-repeat
  &__svg-wrapper
    margin-top: 35px
    img
      width: 100%
  &__grid
    padding-top: 16px
    display: grid
    grid-template-columns: 1fr 1fr 1fr
    grid-gap: 20px
    @media ($media_xxl)
      grid-template-columns: 1fr 1fr
    @media ($media_md)
      grid-template-columns: 1fr
</style>
