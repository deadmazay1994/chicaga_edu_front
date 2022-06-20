<template>
  <div class="level-card level-card--active vue-component">
    <div class="level-card__inner">
      <div class="level-card__general">
        <div class="level-card__img-side">
          <div class="level-card__img-box">
            <svg class="level-card__img" width="60" height="60">
              <use xlink:href="#bush2"></use>
            </svg>
          </div>
        </div>
        <div class="level-card__main">
          <div class="level-card__header">
            <div class="level-card__level">
              {{ "Уровень " + level + " (" + age + ")" }}
            </div>
            <div class="level-card__data">
              <div class="level-card__data-item">
                <svg class="level-card__data-img" width="25" height="25">
                  <use xlink:href="#coin"></use>
                </svg>
                <span class="level-card__data-text">
                  {{ coins }}
                </span>
              </div>
              <div class="level-card__data-item">
                <svg class="level-card__data-img" width="25" height="25">
                  <use xlink:href="#clock"></use>
                </svg>
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
              <svg class="level-card__btn-icon" width="20" height="20">
                <use xlink:href="#arrow-down"></use>
              </svg>
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
    cursor: pointer
  &__btn-icon
    transform: rotate(-90deg)
  &--active &__btn-icon
    transform: rotate(0deg)
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
