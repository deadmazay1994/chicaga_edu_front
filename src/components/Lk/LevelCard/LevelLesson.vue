<template>
  <div class="level-lesson">
    <div class="level-lesson__pointer">
      <svg class="level-lesson__pointer-icon" width="12" height="16">
        <use xlink:href="#point"></use>
      </svg>
    </div>
    <div class="level-lesson__progress-side">
      <div class="level-lesson__progress-img">
        <svg class="level-lesson__progress-icon" width="13" height="11">
          <use xlink:href="#tick"></use>
        </svg>
      </div>
    </div>
    <div class="level-lesson__content">
      <div class="level-lesson__open">
        <span class="level-lesson__intro">
          Откроется:
        </span>
        <span class="level-lesson__date">
          {{ date }}
        </span>
        <span class="level-lesson__time">
          {{ time }}
        </span>
      </div>
      <div class="level-lesson__title">
        {{ title }}
      </div>
      <div class="level-lesson__points">
        <div class="level-lesson__scores-box">
          <scores class="level-lesson__scores" />
        </div>
        <div class="level-lesson__data">
          <div class="level-lesson__data-item">
            <svg class="level-lesson__data-img" width="15" height="15">
              <use xlink:href="#coin"></use>
            </svg>
            <span class="level-lesson__data-coins">
              {{ dataCoins }}
            </span>
          </div>
          <div class="level-lesson__data-item">
            <svg class="level-lesson__data-img" width="15" height="15">
              <use xlink:href="#clock"></use>
            </svg>
            <span class="level-lesson__data-time">
              {{ dataTime }}
            </span>
          </div>
        </div>
      </div>
      <div class="level-lesson__links">
        <a class="level-lesson__link" href="#">
          Перейти на урок
        </a>
        <span class="level-lesson__link">
          Перейти на ДЗ
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Scores from "@/components/LessonComponents/Scores";
export default {
  name: "",
  data: function() {
    return {
      passedClass: 'level-lesson--passed',
      currentClass: 'level-lesson--current',
      date: "20.07.21",
      time: "16:00",
      title: "Урок 1. Elementary Unit 1A",
      dataCoins: 0,
      dataTime: "00:00"
    };
  },
  methods: {},
  computed: {},
  components: {
    Scores
  },
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
.level-lesson
  position: relative
  display: flex
  padding: 10px 25px 20px
  pointer-events: none
  &--current
    pointer-events: all
  &:not(:last-child)::before,
  &:last-child::before
    content: ""
    position: absolute
    top: 0
    left: calc(60px - 1px)
    width: 2px
    background-color: rgba(255, 0, 0, 0.1)
  &:not(:last-child)::before
    height: 100%
  &:last-child::before
    height: 20px
  &__pointer
    position: absolute
    display: none
  &--current &__pointer
    display: block
    top: 7px
    left: 0
    width: 35px
    height: 28px
    background-color: #ff0000
    border-top-right-radius: 50px
    border-bottom-right-radius: 50px
  &__pointer-icon
    position: absolute
    top: calc(50% - 8px)
    right: 10px
    display: block
    width: 12px
    height: 16px
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
    border-radius: 50%
  &__progress-img::after
    content: ""
    width: 12px
    height: 12px
    background-color: rgba(255, 0, 0, 0.1)
    border-radius: inherit
  &--current &__progress-img::after
    background-color: #d44105
  &--passed &__progress-img::after
    display: none
  &__progress-icon
    display: none
  &--passed &__progress-icon
    display: block
    width: 13px
    height: 13px
  &__content
    flex-grow: 1
    opacity: 0.6
  &--current &__content
    opacity: 1
  &__open
    margin-bottom: 5px
    padding-top: 3px
    padding-bottom: 3px
    font-size: 14px
  &--passed &__open
    display: none
  &__intro
    font-weight: 600
  &--current &__intro
    color: #ff0000
  &__date
    position: relative
    margin-right: 2px
    padding-right: 2px
  &__date::after
    content: ""
    position: absolute
    right: 0
    width: 1px
    height: 80%
    background-color: #0d0d0d
  &__title
    margin-bottom: 10px
    font-weight: 600
    font-size: 16px
    line-height: 22px
  &__points
    display: flex
    align-items: center
    justify-content: space-between
    flex-wrap: wrap
  &__points:not(:last-child)
    margin-bottom: 5px
  &__scores-box
    margin-right: 15px
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
    width: 15px
    height: 15px
    margin-right: 5px
  &__data-coins
    min-width: 24px
  &__data-time
    min-width: 34px
  &__links
    display: flex
    align-items: center
    justify-content: space-between
    flex-wrap: wrap
    font-weight: 600
    font-size: 16px
    line-height: 19px
  &--passed &__links
    display: none
  &__link
    position: relative
    padding-top: 4px
    padding-bottom: 4px
    padding-left: 20px
    background-position: left center
    background-repeat: no-repeat
    background-size: 19px 19px
    background-image: url("data:image/svg+xml,%3Csvg width='19' height='19' viewBox='0 0 19 19' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_103_775)'%3E%3Cpath d='M15.1927 7.61445H6.65358V4.86295C6.65358 3.43975 7.60238 2.20632 8.93069 1.92168C10.7334 1.63704 12.3464 2.96536 12.3464 4.76807C12.3464 5.33734 12.8208 5.71686 13.2951 5.71686C13.7695 5.71686 14.2439 5.33734 14.2439 4.76807C14.2439 2.01656 11.872 -0.260548 9.02557 0.0240905C6.5587 0.308729 4.75599 2.49096 4.75599 4.95783V7.61445H3.80719C3.3328 7.61445 2.8584 7.99397 2.8584 8.56325V18.0512C2.8584 18.5256 3.3328 19 3.80719 19H15.1927C15.762 19 16.1415 18.5256 16.1415 18.0512V8.56325C16.1415 7.99397 15.762 7.61445 15.1927 7.61445ZM10.4488 13.9714V15.2048C10.4488 15.7741 10.0692 16.1536 9.49997 16.1536C8.93069 16.1536 8.55117 15.7741 8.55117 15.2048V13.9714C7.98189 13.5919 7.60238 13.0226 7.60238 12.3584C7.60238 11.125 8.74093 10.2711 9.97436 10.5557C10.6385 10.7455 11.2078 11.3148 11.3976 11.9789C11.5873 12.8328 11.1129 13.5919 10.4488 13.9714Z' fill='%230D0D0D'/%3E%3C/g%3E%3Cg clip-path='url(%23clip1_103_775)'%3E%3Cpath d='M3.80726 7.61445H12.3464V4.86295C12.3464 3.43975 11.3976 2.20632 10.0693 1.92168C8.2666 1.63704 6.65365 2.96536 6.65365 4.76807C6.65365 5.33734 6.17925 5.71686 5.70485 5.71686C5.23045 5.71686 4.75605 5.33734 4.75605 4.76807C4.75605 2.01656 7.12804 -0.260548 9.97443 0.0240905C12.4413 0.308729 14.244 2.49096 14.244 4.95783V7.61445H15.1928C15.6672 7.61445 16.1416 7.99397 16.1416 8.56325V18.0512C16.1416 18.5256 15.6672 19 15.1928 19H3.80726C3.23798 19 2.85846 18.5256 2.85846 18.0512V8.56325C2.85846 7.99397 3.23798 7.61445 3.80726 7.61445ZM8.55124 13.9714V15.2048C8.55124 15.7741 8.93076 16.1536 9.50003 16.1536C10.0693 16.1536 10.4488 15.7741 10.4488 15.2048V13.9714C11.0181 13.5919 11.3976 13.0226 11.3976 12.3584C11.3976 11.125 10.2591 10.2711 9.02564 10.5557C8.36148 10.7455 7.7922 11.3148 7.60244 11.9789C7.41268 12.8328 7.88708 13.5919 8.55124 13.9714Z' fill='%230D0D0D'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_103_775'%3E%3Crect width='19' height='19' fill='white'/%3E%3C/clipPath%3E%3CclipPath id='clip1_103_775'%3E%3Crect width='19' height='19' fill='white' transform='matrix(-1 0 0 1 19 0)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A")
    cursor: default
  &--current &__link[href]
    background-image: url("data:image/svg+xml,%3Csvg width='15' height='19' viewBox='0 0 15 19' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.1927 7.61445H4.65358V4.86295C4.65358 3.43975 5.60238 2.20632 6.93069 1.92168C8.7334 1.63704 10.3464 2.96536 10.3464 4.76807C10.3464 5.33734 10.8208 5.71686 11.2951 5.71686C11.7695 5.71686 12.2439 5.33734 12.2439 4.76807C12.2439 2.01656 9.87196 -0.260548 7.02557 0.0240905C4.5587 0.308729 2.75599 2.49096 2.75599 4.95783V7.61445H1.80719C1.3328 7.61445 0.858398 7.99397 0.858398 8.56325V18.0512C0.858398 18.5256 1.3328 19 1.80719 19H13.1927C13.762 19 14.1415 18.5256 14.1415 18.0512V8.56325C14.1415 7.99397 13.762 7.61445 13.1927 7.61445ZM8.44876 13.9714V15.2048C8.44876 15.7741 8.06924 16.1536 7.49997 16.1536C6.93069 16.1536 6.55117 15.7741 6.55117 15.2048V13.9714C5.98189 13.5919 5.60238 13.0226 5.60238 12.3584C5.60238 11.125 6.74093 10.2711 7.97436 10.5557C8.63852 10.7455 9.2078 11.3148 9.39756 11.9789C9.58732 12.8328 9.11292 13.5919 8.44876 13.9714Z' fill='%230D0D0D'/%3E%3C/svg%3E%0A")
    cursor: pointer
  &__link:not(:last-child)
    margin-right: 15px
</style>

<style lang="sass">
.level-lesson
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
