<template>
  <div class="course-card vue-component">
    <div class="course-card__inner">
      <div class="course-card__img-side">
        <div class="course-card__img-box">
          <animated-brain-svg class="course-card__img" />
        </div>
      </div>
      <div class="course-card__main">
        <div class="course-card__header">
          <div class="course-card__level-box">
            <span class="course-card__level-intro">
              Уровень
            </span>
            <span class="course-card__level">
              Elementary
            </span>
            <span class="course-card__level-age">
              (<span class="course-card__age-text">взрослые</span>)
            </span>
          </div>
          <div class="course-card__data">
            <div class="course-card__data-item">
              <animated-coin-png class="course-card__data-img" />
              <span class="course-card__data-text">
                600
              </span>
            </div>
            <div class="course-card__data-item">
              <timetable-icon-svg class="course-card__data-img" />
              <span class="course-card__data-text">
                03:04
              </span>
            </div>
          </div>
        </div>
        <div class="course-card__title">
          Английский для тех, кто уже немного знаком с английским языком.
        </div>
        <div class="course-card__desc">
          В основу курса заложено изучение времен английского языка: настоящее, прошедшее и настоящее совершенное.
        </div>
        <div class="course-card__footer">
          <div class="course-card__distance">
            <div class="course-card__step-box">
              <span class="course-card__step-passed">
                30
              </span>
              /
              <span class="course-card__step-total">
                30
              </span>
            </div>
            <div class="course-card__passed-box">
              <span class="course-card__passed">
                Пройден
              </span>
            </div>
          </div>
          <div class="course-card__scores-box">
            <scores class="course-card__scores" />
          </div>
        </div>
      </div>
      <div class="course-card__btn-side">
        <div class="course-card__btn-box">
          <div class="course-card__btn">
            <span class="sr-only">
              Показать/скрыть подробности
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AnimatedBrainSvg from "@/components/Icons/AnimatedBrainSvg";
import AnimatedCoinPng from "@/components/Icons/AnimatedCoinPng";
import TimetableIconSvg from "@/components/Icons/TimetableIconSvg";
import Scores from "@/components/LessonComponents/Scores";
export default {
  name: "",
  data: function () {
    return {};
  },
  methods: {},
  computed: {},
  components: {
    AnimatedBrainSvg,
    AnimatedCoinPng,
    TimetableIconSvg,
    Scores
  },
  props: [],
  mixins: {},
  beforeMount() { }
};
</script>

<style scoped="scoped" lang="sass">
.course-card
  font-weight: 500
  font-size: 12px
  line-height: 1.2
  color: #0d0d0d
  &__inner
    display: flex
    align-items: center
    max-width: 513px
    padding: 15px 25px
    background-color: #ffffff
    border-radius: 20px
    filter: drop-shadow(0px 4px 20px rgba(128, 128, 128, 0.2))
  &__img-side
    flex-shrink: 0
    margin-right: 20px
  &__img-box
    width: 60px
    height: 60px
  &__img
    width: 100%
    height: 100%
  &__main
    flex-grow: 1
    margin-right: 20px
  &__btn-side
    flex-shrink: 0
  &__btn-box
    width: 20px
    height: 20px
  &__btn
    width: 100%
    height: 100%
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='20' viewBox='0 0 12 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.5558 9.2196L2.65555 0.31951C2.4497 0.113495 2.1749 0 1.8819 0C1.58889 0 1.3141 0.113495 1.10824 0.31951L0.452802 0.974789C0.0263018 1.40178 0.0263018 2.09576 0.452802 2.52209L7.92656 9.99585L0.44451 17.4779C0.238658 17.6839 0.125 17.9586 0.125 18.2514C0.125 18.5446 0.238658 18.8192 0.44451 19.0254L1.09995 19.6805C1.30597 19.8865 1.5806 20 1.8736 20C2.16661 20 2.4414 19.8865 2.64726 19.6805L11.5558 10.7723C11.7621 10.5656 11.8755 10.2897 11.8748 9.99634C11.8755 9.70187 11.7621 9.4261 11.5558 9.2196Z' fill='%230D0D0D'/%3E%3C/svg%3E%0A")
    background-position: center
    background-size: contain
    background-repeat: no-repeat
    transition-property: transform
    transition-duration: 0.3s
  &__btn--active
    transform: rotate(90deg)
  &__header
    display: flex
    align-items: center
    flex-wrap: wrap
    margin-bottom: 10px
  &__level-box
    flex-grow: 1
    margin-right: 15px
    padding-top: 5px
    padding-bottom: 5px
  &__data
    display: flex
    padding-top: 5px
    padding-bottom: 5px
    font-weight: 600
  &__data-item
    display: flex
    align-items: center
  &__data-item:not(:last-child)
    margin-right: 15px
  &__data-img
    width: 25px
    height: 25px
    margin-right: 5px
  &__title
    margin-bottom: 10px
    font-weight: 700
    font-size: 14px
    text-transform: uppercase
  &__desc
    margin-bottom: 10px
  &__footer
    display: flex
    align-items: center
    flex-wrap: wrap
    font-weight: 600
  &__distance
    display: flex
    align-items: center
    flex-grow: 1
    margin-right: 15px
    padding-top: 5px
    padding-bottom: 5px
  &__step-box
    margin-right: 8px
  &__passed
    color: #ff0000
    // display: none
  &__scores-box
    padding-top: 5px
    padding-bottom: 5px

</style>

<style lang="sass">
.course-card
  .scores
    &__inner
      padding: 0
      box-shadow: none
    &__item
      font-size: inherit
      line-height: inherit
    &__item:not(:last-child)
      margin-right: 6px
    &__points
      min-width: 24px
      margin-left: 5px
      font-size: inherit
      line-height: inherit
    .animated-svg-wrapper
      width: 15px
      height: 15px
</style>