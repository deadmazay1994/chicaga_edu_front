<template>
  <div class="course-card course-card--active vue-component">
    <div class="course-card__inner">
      <div class="course-card__general">
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
      <div class="course-card__lessons">
        <div class="course-card__lesson course-card__lesson--passed">
          <div class="course-card__progress-side">
            <div class="course-card__progress-img">
              <span class="sr-only">Урок пройден</span>
            </div>
          </div>
          <div class="course-card__lesson-content">
            <div class="course-card__lesson-title">
              Урок 1. Elementary Unit 1A
            </div>
            <div class="course-card__lesson-points">
              <div class="course-card__scores-box">
                <scores class="course-card__scores" />
              </div>
              <div class="course-card__data">
                <div class="course-card__data-item">
                  <animated-coin-png class="course-card__data-img course-card__data-img--sm" />
                  <span class="course-card__data-text">
                    0
                  </span>
                </div>
                <div class="course-card__data-item">
                  <timetable-icon-svg class="course-card__data-img course-card__data-img--sm" />
                  <span class="course-card__data-text">
                    00:00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="course-card__lesson course-card__lesson--current">
          <div class="course-card__lesson-pointer"></div>
          <div class="course-card__progress-side">
            <div class="course-card__progress-img">
              <span class="sr-only">Текущий урок</span>
            </div>
          </div>
          <div class="course-card__lesson-content">
            <div class="course-card__lesson-open">
              <span class="course-card__lesson-intro">
                Откроется:
              </span>
              <span class="course-card__lesson-date">
                20.07.21
              </span>
              <span class="course-card__lesson-time">
                16:00 
              </span>
            </div>
            <div class="course-card__lesson-title">
              Урок 1. Elementary Unit 1A
            </div>
            <div class="course-card__lesson-points">
              <div class="course-card__scores-box">
                <scores class="course-card__scores" />
              </div>
              <div class="course-card__data">
                <div class="course-card__data-item">
                  <animated-coin-png class="course-card__data-img course-card__data-img--sm" />
                  <span class="course-card__data-text">
                    0
                  </span>
                </div>
                <div class="course-card__data-item">
                  <timetable-icon-svg class="course-card__data-img course-card__data-img--sm" />
                  <span class="course-card__data-text">
                    00:00
                  </span>
                </div>
              </div>
            </div>
            <div class="course-card__lesson-links">
              <a class="course-card__lesson-link" href="#">
                Перейти на урок
              </a>
              <span class="course-card__lesson-link">
                Перейти на ДЗ
              </span>
            </div>
          </div>
        </div>
        <div class="course-card__lesson course-card__lesson">
          <div class="course-card__lesson-pointer"></div>
          <div class="course-card__progress-side">
            <div class="course-card__progress-img">
              <span class="sr-only">Урок временно недоступен</span>
            </div>
          </div>
          <div class="course-card__lesson-content">
            <div class="course-card__lesson-open">
              <span class="course-card__lesson-intro">
                Откроется:
              </span>
              <span class="course-card__lesson-date">
                20.07.21
              </span>
              <span class="course-card__lesson-time">
                16:00 
              </span>
            </div>
            <div class="course-card__lesson-title">
              Урок 1. Elementary Unit 1A
            </div>
            <div class="course-card__lesson-points">
              <div class="course-card__scores-box">
                <scores class="course-card__scores" />
              </div>
              <div class="course-card__data">
                <div class="course-card__data-item">
                  <animated-coin-png class="course-card__data-img course-card__data-img--sm" />
                  <span class="course-card__data-text">
                    0
                  </span>
                </div>
                <div class="course-card__data-item">
                  <timetable-icon-svg class="course-card__data-img course-card__data-img--sm" />
                  <span class="course-card__data-text">
                    00:00
                  </span>
                </div>
              </div>
            </div>
            <div class="course-card__lesson-links">
              <span class="course-card__lesson-link">
                Перейти на урок
              </span>
              <span class="course-card__lesson-link">
                Перейти на ДЗ
              </span>
            </div>
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
    padding: 15px 25px
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
  &__data-img--sm
    width: 15px
    height: 15px
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
  &__scores-box
    padding-top: 5px
    padding-bottom: 5px
  &__scores-box:not(:last-child)
    margin-right: 20px
  &__lessons
    flex-grow: 1
    display: flex
    flex-direction: column
    height: 0
    margin-right: 25px
  &--active &__lessons
    height: 100%
    overflow-y: auto
  &__lesson
    position: relative
    display: flex
    padding: 10px 35px 20px 25px
    pointer-events: none
  &__lesson--current
    pointer-events: all
  &__lesson:not(:last-child)::before,
  &__lesson:last-child::before
    content: ""
    position: absolute
    top: 0
    left: calc(60px - 1px)
    width: 2px
    background-color: rgba(255, 0, 0, 0.1)
  &__lesson:not(:last-child)::before
    height: 100%
  &__lesson:last-child::before
    height: 20px
  &__lesson-pointer
    position: absolute
    display: none
  &__lesson--current &__lesson-pointer
    display: block
    top: 7px
    left: 0
    width: 35px
    height: 28px
    background-color: #ff0000
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='16' viewBox='0 0 12 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.24996 0.5C3.12996 0.5 0.591797 3.03816 0.591797 6.15776C0.591797 10.6495 5.64285 15.1617 5.85798 15.352C5.97048 15.4507 6.11022 15.5 6.24996 15.5C6.39522 15.5 6.54048 15.4467 6.65377 15.3405C6.86811 15.14 11.9081 10.3795 11.9081 6.15816C11.9081 3.03855 9.36917 0.5 6.24996 0.5ZM6.24996 8.85579C4.75982 8.85579 3.55232 7.6475 3.55232 6.15855C3.55232 4.66961 4.75982 3.46132 6.24996 3.46132C7.7393 3.46132 8.9468 4.66921 8.9468 6.15855C8.9468 7.64789 7.7393 8.85579 6.24996 8.85579Z' fill='white'/%3E%3C/svg%3E%0A")
    background-position: top 6px right 10px
    background-size: 12px 15px
    background-repeat: no-repeat
    border-top-right-radius: 50px
    border-bottom-right-radius: 50px
  &__progress-side
    flex-shrink: 0
    width: 70px
    height: 100%
    margin-right: 10px
  &__progress-img
    position: relative
    display: flex
    align-items: center
    justify-content: center
    width: 22px
    height: 22px
    margin-right: auto
    margin-left: auto
    background-color: #ffffff
  &__progress-img::after
    content: ""
    width: 12px
    height: 12px
    background-color: rgba(255, 0, 0, 0.1)
    border-radius: 6px
  &__lesson--current &__progress-img::after
    background-color: #d44105
  &__lesson--passed &__progress-img
    background-color: #ffffff
    background-image: url("data:image/svg+xml,%3Csvg width='13' height='11' viewBox='0 0 13 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.06707 9.95047C4.95019 10.068 4.79082 10.1336 4.62519 10.1336C4.45957 10.1336 4.30019 10.068 4.18332 9.95047L0.65457 6.42109C0.28832 6.05484 0.28832 5.46109 0.65457 5.09547L1.09645 4.65359C1.4627 4.28734 2.05582 4.28734 2.42207 4.65359L4.62519 6.85672L10.5783 0.903594C10.9446 0.537344 11.5383 0.537344 11.9039 0.903594L12.3458 1.34547C12.7121 1.71172 12.7121 2.30547 12.3458 2.67109L5.06707 9.95047Z' fill='%23D44105'/%3E%3C/svg%3E%0A")
    background-position: center
    background-size: 12px 12px
    background-repeat: no-repeat
  &__lesson--passed &__progress-img::after
    opacity: 0
  &__lesson-content
    flex-grow: 1
    opacity: 0.6
  &__lesson--current &__lesson-content
    opacity: 1
  &__lesson-open
    margin-bottom: 5px
    padding-top: 3px
    padding-bottom: 3px
    font-size: 14px
  &__lesson-intro
    font-weight: 600
  &__lesson--current &__lesson-intro
    color: #ff0000
  &__lesson-date
    position: relative
    margin-right: 2px
    padding-right: 2px
  &__lesson-date::after
    content: ""
    position: absolute
    right: 0
    width: 1px
    height: 80%
    background-color: #0d0d0d
  &__lesson-title
    margin-bottom: 10px
    font-weight: 600
    font-size: 16px
    line-height: 22px
  &__lesson-points
    display: flex
    align-items: center
    justify-content: space-between
    flex-wrap: wrap
  &__lesson-points:not(:last-child)
    margin-bottom: 5px
  &__lesson-links
    display: flex
    align-items: center
    justify-content: space-between
    flex-wrap: wrap
    font-weight: 600
    font-size: 16px
    line-height: 19px
  &__lesson-link
    position: relative
    padding-top: 4px
    padding-bottom: 4px
    padding-left: 20px
    background-position: left center
    background-repeat: no-repeat
    background-size: 19px 19px
  &__lesson-link[href]
    background-image: url("data:image/svg+xml,%3Csvg width='15' height='19' viewBox='0 0 15 19' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.1927 7.61445H4.65358V4.86295C4.65358 3.43975 5.60238 2.20632 6.93069 1.92168C8.7334 1.63704 10.3464 2.96536 10.3464 4.76807C10.3464 5.33734 10.8208 5.71686 11.2951 5.71686C11.7695 5.71686 12.2439 5.33734 12.2439 4.76807C12.2439 2.01656 9.87196 -0.260548 7.02557 0.0240905C4.5587 0.308729 2.75599 2.49096 2.75599 4.95783V7.61445H1.80719C1.3328 7.61445 0.858398 7.99397 0.858398 8.56325V18.0512C0.858398 18.5256 1.3328 19 1.80719 19H13.1927C13.762 19 14.1415 18.5256 14.1415 18.0512V8.56325C14.1415 7.99397 13.762 7.61445 13.1927 7.61445ZM8.44876 13.9714V15.2048C8.44876 15.7741 8.06924 16.1536 7.49997 16.1536C6.93069 16.1536 6.55117 15.7741 6.55117 15.2048V13.9714C5.98189 13.5919 5.60238 13.0226 5.60238 12.3584C5.60238 11.125 6.74093 10.2711 7.97436 10.5557C8.63852 10.7455 9.2078 11.3148 9.39756 11.9789C9.58732 12.8328 9.11292 13.5919 8.44876 13.9714Z' fill='%230D0D0D'/%3E%3C/svg%3E%0A")
  &__lesson-link:not([href])
    background-image: url("data:image/svg+xml,%3Csvg width='19' height='19' viewBox='0 0 19 19' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_103_775)'%3E%3Cpath d='M15.1927 7.61445H6.65358V4.86295C6.65358 3.43975 7.60238 2.20632 8.93069 1.92168C10.7334 1.63704 12.3464 2.96536 12.3464 4.76807C12.3464 5.33734 12.8208 5.71686 13.2951 5.71686C13.7695 5.71686 14.2439 5.33734 14.2439 4.76807C14.2439 2.01656 11.872 -0.260548 9.02557 0.0240905C6.5587 0.308729 4.75599 2.49096 4.75599 4.95783V7.61445H3.80719C3.3328 7.61445 2.8584 7.99397 2.8584 8.56325V18.0512C2.8584 18.5256 3.3328 19 3.80719 19H15.1927C15.762 19 16.1415 18.5256 16.1415 18.0512V8.56325C16.1415 7.99397 15.762 7.61445 15.1927 7.61445ZM10.4488 13.9714V15.2048C10.4488 15.7741 10.0692 16.1536 9.49997 16.1536C8.93069 16.1536 8.55117 15.7741 8.55117 15.2048V13.9714C7.98189 13.5919 7.60238 13.0226 7.60238 12.3584C7.60238 11.125 8.74093 10.2711 9.97436 10.5557C10.6385 10.7455 11.2078 11.3148 11.3976 11.9789C11.5873 12.8328 11.1129 13.5919 10.4488 13.9714Z' fill='%230D0D0D'/%3E%3C/g%3E%3Cg clip-path='url(%23clip1_103_775)'%3E%3Cpath d='M3.80726 7.61445H12.3464V4.86295C12.3464 3.43975 11.3976 2.20632 10.0693 1.92168C8.2666 1.63704 6.65365 2.96536 6.65365 4.76807C6.65365 5.33734 6.17925 5.71686 5.70485 5.71686C5.23045 5.71686 4.75605 5.33734 4.75605 4.76807C4.75605 2.01656 7.12804 -0.260548 9.97443 0.0240905C12.4413 0.308729 14.244 2.49096 14.244 4.95783V7.61445H15.1928C15.6672 7.61445 16.1416 7.99397 16.1416 8.56325V18.0512C16.1416 18.5256 15.6672 19 15.1928 19H3.80726C3.23798 19 2.85846 18.5256 2.85846 18.0512V8.56325C2.85846 7.99397 3.23798 7.61445 3.80726 7.61445ZM8.55124 13.9714V15.2048C8.55124 15.7741 8.93076 16.1536 9.50003 16.1536C10.0693 16.1536 10.4488 15.7741 10.4488 15.2048V13.9714C11.0181 13.5919 11.3976 13.0226 11.3976 12.3584C11.3976 11.125 10.2591 10.2711 9.02564 10.5557C8.36148 10.7455 7.7922 11.3148 7.60244 11.9789C7.41268 12.8328 7.88708 13.5919 8.55124 13.9714Z' fill='%230D0D0D'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_103_775'%3E%3Crect width='19' height='19' fill='white'/%3E%3C/clipPath%3E%3CclipPath id='clip1_103_775'%3E%3Crect width='19' height='19' fill='white' transform='matrix(-1 0 0 1 19 0)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A")
    cursor: default
  &__lesson-link:not(:last-child)
    margin-right: 15px
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