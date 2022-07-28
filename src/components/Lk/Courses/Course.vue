<template>
  <div class="course-page vue-component">
    <div class="course-page__block-title">Познакомьтесь с курсом</div>
    <course-description
      class="course-page__description"
      :title="'Курс Elementary'"
      :image="require('@/assets/imgs/some-person.png')"
      :description="course.description"
      :courseInfo="courseInfo"
      :kind="kind"
    />
    <div class="course-page__modules-block">
      <div class="course-page__block-title">
        Курс состоит из 6 модулей
      </div>
      <div class="course-page__modules-content">
        <div class="course-page__modules-title">
          В каждом модуле для <b>максимального эффекта:</b>
        </div>
        <div class="course-page__modules-list">
          <span class="course-page__modules-item">
            уроки
          </span>
          <span class="course-page__modules-item">
            разговорные фразы
          </span>
          <span class="course-page__modules-item">
            дополнительные материалы
          </span>
        </div>
        <div>для увлекательного изучения английского</div>
      </div>
      <div class="course-page__image-wrapper">
        <img
          class="course-page__modules-img"
          src="~@/assets/svg/course-results-frame.svg"
          alt="Карта прохождения курса"
        />
      </div>
    </div>
    <div class="course-page__programs-block">
      <div class="course-page__block-title">Программа курса</div>
      <div class="course-page__grid" v-if="coursePrograms">
        <course-program-card
          class="course-page__program"
          v-for="(courseProgram, index) in coursePrograms"
          :key="index"
          :title="courseProgram.title"
          :rating="courseProgram.rating"
          :duration="courseProgram.duration"
          :start_time="courseProgram.start_time"
          :link="'#'"
          :kind="kind"
          :grammar="grammar"
          :vocabulary="vocabulary"
        />
      </div>
      <div class="course-page__more-wrapper">
        <span class="course-page__more"
          >развернуть
          <svg class="course-page__more-icon">
            <use :xlink:href="'#arrow-down'"></use>
          </svg>
        </span>
      </div>
    </div>
    <div class="course-page__tariffes-block">
      <div class="course-page__block-title course-page__block-title--with-icon">
        Тарифы для любых задач
      </div>
      <div class="course-page__grid course-page__grid--3fr">
        <div
          v-for="(tariff, index) in tariffes"
          :key="index"
          class="course-page__tariff-wrapper"
        >
          <tariff class="course-page__tariff" :tariffData="tariff" />
          <button class="course-page__tariff-button">
            ЗАБРОНИРОВАТЬ ЗА 2000 ₽
          </button>
        </div>
      </div>
    </div>
    <div class="course-page__final-block">
      <div class="course-page__final">
        <div class="course-page__final-left">
          <div class="course-page__final-title">
            Или просто оставьте заявку
          </div>
          <ul class="course-page__list">
            <li>Позвоним, расскажем о курсе</li>
            <li>Поможем определиться с тарифом</li>
          </ul>
        </div>
        <div class="course-page__final-right">
          <button class="course-page__final-btn">
            ОСТАВИТЬ ЗАЯВКУ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CourseProgramCard from "../../CourseProgram/CourseProgramCard.vue";
import CourseDescription from "../Courses/CourseDescription.vue";
import Tariff from "@/components/Tariff";

import api from "@/mixins/api";

export default {
  name: "course-page",
  data: function() {
    return {
      tariffes: {}
    };
  },
  methods: {
    async setTariffes() {
      const result = await this.getTariffesData();
      this.tariffes = result.tariffes;
    }
  },
  components: {
    CourseProgramCard,
    CourseDescription,
    Tariff
  },
  props: {
    course: Object,
    courseInfo: Array,
    coursePrograms: Array,
    kind: String,
    vocabulary: String,
    grammar: String
  },
  mixins: [api],
  beforeMount() {
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
  &__description
    margin-top: 17px
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