<template>
  <div
    class="demo-lesson-results vue-component"
    :class="'demo-lesson-results--' + kind"
  >
    <div class="demo-lesson-results__head">
      <div class="demo-lesson-results__head-content">
        <div class="demo-lesson-results__head-title">Поздравляем!</div>
        <div class="demo-lesson-results__head-subtitle">
          Вы прошли вводный урок уровня
          <span class="demo-lesson-results__subtitle-level">Elementary</span>
        </div>
        <div class="demo-lesson-results__progress">
          <span>Заработано за вводный урок:</span>
          <div class="demo-lesson-results__scores-wrapper">
            <scores-vue class="demo-lesson-results__scores" />
          </div>
        </div>
        <div class="demo-lesson-results__trade">
          <div>
            Вы можете:
          </div>
          <ul class="demo-lesson-results__trade-list">
            <li class="demo-lesson-results__trade-item">
              продолжить копить баллы для покупки более ценных призов
            </li>
            <li class="demo-lesson-results__trade-item">
              или обменять их на
              <span class="demo-lesson-results__coin">монеты</span
              ><button class="demo-lesson-results__trade-button">
                Обменять на монеты
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="demo-lesson-results__image-box">
        <img src="~@/assets/svg/hey-how-are-you.png" alt="Hey! How are you?" />
      </div>
    </div>
    <div class="demo-lesson-results__access-block">
      <div class="demo-lesson-results__access-title">
        и получить доступ к уроку уже сейчас
      </div>
      <div class="demo-lesson-results__access-body">
        <course-program-card-vue
          class="demo-lesson-results__program-wrapper"
          :title="'Урок. Разбор песни'"
          :duration="392"
          :start_time="1659060146"
        />
        <div class="demo-lesson-results__access-right">
          <button class="demo-lesson-results__access-button">
            <p>
              ПОТРАТИТЬ МОНЕТЫ
            </p>
            <p>
              И ПОЛУЧИТЬ ДОСТУП К УРОКУ
            </p>
          </button>
          <span class="demo-lesson-results__access-info"
            ><p>данное предложение действительно только</p>
            <p>пока вы находитесь на данной странице</p></span
          >
        </div>
      </div>
    </div>
    <div class="demo-lesson-results__gift-block">
      <span class="demo-lesson-results__gift-text">
        Ваш подарок был отправлен вам на почту
      </span>
    </div>
    <course
      class="demo-lesson-results__course"
      :course="{ name: 'test', description: 'test' }"
      :courseInfo="courseInfo"
      :coursePrograms="coursePrograms"
      :grammar="'Verb be +, subject pronouns: I, you, etc.'"
      :vocabulary="'Days of the week, numbers 0-20'"
      kind="result"
    />
  </div>
</template>

<script>
import CourseProgramCardVue from "@/components/CourseProgram/CourseProgramCard.vue";
import ScoresVue from "@/components/LessonComponents/Scores.vue";
import Course from "./Courses/Course.vue";
import api from "@/mixins/api";

export default {
  name: "demo-lesson-results",
  components: {
    CourseProgramCardVue,
    ScoresVue,
    Course
  },
  data: function() {
    return {
      kind: "elementary",
      course: {},
      coursePrograms: [],
      tariffes: [],
      courseInfo: [
        { icon: "calendar", text: "Обучение 4 месяца" },
        { icon: "school", text: "32 урока" },
        { icon: "brains", text: "6 доп. уроков с фразами для общения" },
        { icon: "list-check", text: "6 тестов + финальный тест" },
        { icon: "star", text: "свидетельство / сертификат о прохождении курса" }
      ]
    };
  },
  props: [],
  mixins: [api],
  computed: {},
  methods: {
    async setCourse() {
      const response = await this.getCatalogCaourses();
      this.course = response.data;
    },
    async setCoursePrograms() {
      this.coursePrograms = [
        {
          title: "Урок 1. Elementary. Welcome to the class"
        },
        {
          title: "Урок 1. Elementary. Welcome to the class"
        },
        {
          title: "Урок 1. Elementary. Welcome to the class"
        },
        {
          title: "Урок 1. Elementary. Welcome to the class"
        }
      ];
    },
    async setTariffes() {
      const result = await this.getTariffesData();
      this.tariffes = result.tariffes;
    }
  },
  beforeMount() {
    this.setCourse();
    this.setCoursePrograms();
    this.setTariffes();
  }
};
</script>

<style scoped="scoped" lang="sass">
@import "@/assets/styles/variables.sass"
.demo-lesson-results
  &__head
    display: flex
  &__image-box
    flex-grow: 1
    display: flex
    justify-content: center
  &__head-title
    font-size: 32px
    font-weight: 700
  &__head-subtitle
    font-size: 24px
    font-weight: 700
  &--elementary &__subtitle-level
    color: #B5D637
  &__block-title
    font-size: 36px
    font-weight: 700
  &__progress
    display: flex
    align-items: center
    font-size: 20px
    font-weight: 400
    padding-top: 24px
  &__scores-wrapper
    background-color: #f8f8f8
    box-shadow: 0 4px 20px rgba(128, 128, 128, 0.2)
    border-radius: 20px
    margin-left: 32px
  &__trade-list
    list-style: inside
    padding-left: .5rem
  &__trade-item:last-child
    padding-top: 16px
    font-weight: 600
  &__coin
    position: relative
    display: inline-flex
    align-items: center
    padding-left: 40px
  &__coin::before
    content: "",
    position: absolute
    left: 5px
    width: 30px
    height: 30px
    background-image: url("~@/assets/svg/coin.svg")
    background-position: center
    background-size: contain
    background-repeat: no-repeat
  &__trade-button
    padding: 14px 16px
    background-color: #74C67C
    border-radius: 20px
    color: #FFFFFF
    font-size: 14px
    font-weight: 700
    line-height: 18.2px
    margin-left: 40px
  &__access-title
    font-size: 24px
    font-weight: 600
  &__access-block
    padding: 21px 32px
    background-color: #FFFFFF
    border-radius: 30px
    box-shadow: 0 4px 20px rgba(128, 128, 128, 0.2)
  &__access-body
    display: flex
    padding-top: 13px
    gap: 43px
  &__program-wrapper
    flex-basis: 50%
  &__access-right
    flex-basis: 50%
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
  &__access-button
    padding: 24px 52px
    background: linear-gradient(180deg, #F77A84 0%, #E35056 100%), linear-gradient(360deg, #FF0000 -20.31%, #FFA3A3 120.31%)
    box-shadow: inset 0px 0px 6px #FFFFFF
    border-radius: 16px
    color: #FFFFFF
    font-weight: 700
    font-size: 16px
    line-height: 18px
  &__access-info
    font-size: 12px
    font-weight: 400
    line-height: 17px
    padding-top: 17px
    text-align: center
  &__gift-block
    padding-top: 32px
    display: flex
    justify-content: center
  &__gift-text
    padding-top: 7px
    padding-bottom: 7px
    position: relative
    display: inline-flex
    align-items: center
    padding-right: 44px
    color: #A9A9A9
  &__gift-text::after
    content: ""
    position: absolute
    right: 0
    width: 36px
    height: 36px
    background-image: url("~@/assets/svg/open-gift-box.svg")
    background-position: center
    background-size: contain
    background-repeat: no-repeat
  &__scores
    justify-content: space-evenly
    @media ($media_xl)
      padding-right: 0
      padding-left: 0
  &__course
    margin-top: 47px
</style>
