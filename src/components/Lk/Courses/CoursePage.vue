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
  &__modules-block
    padding-top: 80px
  &__modules-content
    padding-top: 16px
  &__modules-list
    display: flex
  &__modules-item
    position: relative
    padding-left: 26.5px
  &__modules-item + &__modules-item
    padding-left: 44px
  &__modules-item + &__modules-item::before
    left: 17.5px
  &__modules-item::before
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
  &__image-wrapper
    margin-top: 35px
  &__modules-img
    width: 100%
  &__programs-block
    padding-top: 14px
  &__more-wrapper
    padding-top: 32px
    display: flex
    justify-content: center
  &__more
    color: #A9A9A9
    font-weight: 700
    font-size: 16px
    cursor: pointer
  &__more-icon
    width: 14px
    height: 8px
  &__tariffes-block
    padding-top: 40px
  &__block-title--with-icon
    position: relative
    display: flex
    align-items: center
    padding-left: 142px
    padding-top: 34.5px
    padding-bottom: 34.5px
  &__block-title--with-icon::before
    content: ""
    position: absolute
    left: 0
    width: 118px
    height: 107px
    background-image: url("~@/assets/svg/look-toucan.svg")
    background-position: center
    background-size: contain
    background-repeat: no-repeat
  &__tariff-wrapper
    display: flex
    flex-direction: column
    justify-content: space-between
  &__tariff-button
    margin-top: 24px
    background: linear-gradient(180deg, #F67A84 0%, #E35056 100%)
    padding: 16px 62px
    color: #FFFFFF
    box-shadow: 0px 3px 0px 0px #D63437
    border-radius: 10px
  &__final-block
    padding-top: 60px
    display: flex
    justify-content: center
  &__final
    display: flex
    border: 2px dashed #BFC2DD
    border-radius: 20px
    width: 972px
  &__final-right
    flex-grow: 1
    display: flex
    align-items: center
    justify-content: center
  &__final-left
    flex-grow: 1
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    padding: 24px 0
  &__final-title
    font-weight: 600
    font-size: 24px
  &__list
    padding-top: 16px
    list-style: inside
  &__final-btn
    padding: 16px 32px
    border: 2px solid #E84145
    color: #E84145
    border-radius: 10px
    font-weight: 700
  &__grid
    padding-top: 16px
    display: grid
    grid-template-columns: 1fr 1fr
    grid-gap: 20px
    @media ($media_xxl)
      grid-template-columns: 1fr 1fr
    @media ($media_md)
      grid-template-columns: 1fr
  &__grid--3fr
    grid-template-columns: 1fr 1fr 1fr
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