<template>
  <div class="level-card level-card--active vue-component">
    <div class="level-card__inner">
      <div class="level-card__general">
        <div class="level-card__img-side">
          <div class="level-card__img-box">
            <animated-brain-svg class="level-card__img" />
          </div>
        </div>
        <div class="level-card__main">
          <div class="level-card__header">
            <div class="level-card__level">
              {{ "Уровень " + level + " (" + age + ")" }}
            </div>
            <div class="level-card__data">
              <div class="level-card__data-item">
                <animated-coin-png class="level-card__data-img" />
                <span class="level-card__data-text">
                  {{ coins }}
                </span>
              </div>
              <div class="level-card__data-item">
                <timetable-icon-svg class="level-card__data-img" />
                <span class="level-card__data-text">
                  {{ time }}
                </span>
              </div>
            </div>
          </div>
          <div class="level-card__title">
            {{ title }}
          </div>
          <div class="level-card__desc">
            {{ description }}
          </div>
          <div class="level-card__footer">
            <div class="level-card__distance">
              <div class="level-card__steps">
                {{ stepsPassed + " / " + stepsTotal }}
              </div>
              <div
                class="level-card__passed"
                v-show="stepsPassed == stepsTotal"
              >
                Пройден
              </div>
            </div>
            <div class="level-card__scores-box">
              <scores class="level-card__scores" />
            </div>
          </div>
        </div>
        <div class="level-card__btn-side">
          <div class="level-card__btn-box">
            <div class="level-card__btn">
              <span class="sr-only">
                Показать/скрыть подробности
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="level-card__lessons-wrap">
        <level-lessons class="level-card__lessons">
          <level-lesson class="level-lesson--passed"></level-lesson>
          <level-lesson class="level-lesson--current"></level-lesson>
          <level-lesson></level-lesson>
        </level-lessons>
      </div>
    </div>
  </div>
</template>

<script>
import LevelLessons from "./LevelLessons";
import LevelLesson from "./LevelLesson";
import AnimatedBrainSvg from "@/components/Icons/AnimatedBrainSvg";
import AnimatedCoinPng from "@/components/Icons/AnimatedCoinPng";
import TimetableIconSvg from "@/components/Icons/TimetableIconSvg";
import Scores from "@/components/LessonComponents/Scores";
export default {
  name: "",
  data: function() {
    return {
      level: "Elementary",
      age: "взрослые",
      coins: 600,
      time: "03:04",
      title: "Английский для тех, кто уже немного знаком с английским языком.",
      description:
        "В основу курса заложено изучение времен английского языка: настоящее, прошедшее и настоящее совершенное.",
      stepsPassed: 30,
      stepsTotal: 30
    };
  },
  methods: {},
  computed: {},
  components: {
    LevelLessons,
    LevelLesson,
    AnimatedBrainSvg,
    AnimatedCoinPng,
    TimetableIconSvg,
    Scores
  },
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
.level-card
  display: flex
  max-height: 100%
  font-weight: 500
  font-size: 12px
  line-height: 1.2
  color: #0d0d0d
  &__inner
    display: flex
    flex-direction: column
    max-width: 513px
    max-height: 100%
    background-color: #ffffff
    border-radius: 20px
    filter: drop-shadow(0px 4px 20px rgba(128, 128, 128, 0.2))
    overflow: hidden
  &__general
    position: relative
    display: flex
    align-items: center
    padding: 15px 25px 25px
  &__general::before
    content: ""
    position: absolute
    top: calc(50% + 35px)
    bottom: calc(50% + 35px)
    left: calc(60px - 1px)
    width: 2px
    background-color: rgba(255, 0, 0, 0.1)
    opacity: 0
  &--active &__general::before
    bottom: 0
    opacity: 1
  &__img-side
    flex-shrink: 0
    margin-right: 10px
  &__img-box
    display: flex
    align-items: center
    justify-content: center
    width: 70px
    height: 70px
    background-color: #ffffff
  &__img
    width: calc(100% - 10px)
    height: calc(100% - 10px)
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
    cursor: pointer
  &--active &__btn
    transform: rotate(90deg)
  &__header
    display: flex
    align-items: center
    justify-content: space-between
    flex-wrap: wrap
    margin-bottom: 10px
  &__level
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
    justify-content: space-between
    flex-wrap: wrap
    font-weight: 600
  &__distance
    display: flex
    align-items: center
    margin-right: 15px
    padding-top: 5px
    padding-bottom: 5px
  &__steps
    margin-right: 8px
  &__passed
    color: #ff0000
  &__scores-box
    padding-top: 5px
    padding-bottom: 5px
  &__lessons-wrap
    display: flex
    height: 0
    margin-right: 25px
  &--active &__lessons-wrap
    height: auto
    overflow-y: auto
  &__lessons
    width: 100%
</style>

<style lang="sass">
.level-card
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
