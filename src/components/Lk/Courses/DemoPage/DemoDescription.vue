<template>
  <div class="demo-description vue-component">
    <div class="demo-description__top">
      <div class="demo-description__img-box">
        <img
          class="demo-description__img"
          src="@/assets/imgs/toucan-hello.png"
          width="221"
          height="237"
          alt="Тукан говорит вам: 'Hello'"
        />
      </div>
      <div class="demo-description__top-content">
        <div class="demo-description__title">
          Пройдите бесплатный вводный урок
        </div>
        <div class="demo-description__gift-box">
          <svg class="demo-description__gift-icon" width="50" height="50">
            <use xlink:href="#gift-box-open"></use>
          </svg>
          <div class="demo-description__text">
            <b>и получите подарок</b>: 10 разговорных карточек c выражениями,
            которыми вы поразите носителей английского
          </div>
        </div>
        <div class="demo-description__list-title">
          Выберите уровень урока:
        </div>
      </div>
    </div>
    <ul class="demo-description__list">
      <li class="demo-description__item">
        <demo-btn>
          Beginner
        </demo-btn>
        <div class="demo-description__text">
          для начинающих
        </div>
      </li>
      <li class="demo-description__item">
        <demo-btn>
          Elementary
        </demo-btn>
        <div class="demo-description__text">
          если можете немного рассказать о себе
        </div>
      </li>
      <li class="demo-description__item">
        <demo-btn>
          Pre-Intermediate
        </demo-btn>
        <div class="demo-description__text">
          если можете говорить на бытовые темы
        </div>
      </li>
      <li class="demo-description__item">
        <demo-btn>
          Intermediate
        </demo-btn>
        <div class="demo-description__text">
          если хорошо улавливаете основную мысль текста
        </div>
      </li>
    </ul>
    <div class="demo-description__footer">
      <div class="demo-description__test-box">
        <div class="demo-description__test-content">
          <div class="demo-description__test-title">
            Или сначала пройдите тест
          </div>
          <div class="demo-description__test-text">
            12 вопросов, результат увидите сразу
          </div>
        </div>
        <demo-btn-g class="demo-description__btn-g">
          Пройти тест
        </demo-btn-g>
      </div>
      <div class="demo-description__question-box">
        <div class="demo-description__link-box">
          <button
            class="demo-description__pseudo-link"
            type="button"
            @click="noteIsOpen = !noteIsOpen"
          >
            А мне нужен другой уровень
          </button>
          <demo-note
            v-if="noteIsOpen"
            class="demo-description__note demo-description__note--open"
            v-click-outside="onClickOutside"
            @closeNote="noteIsOpen = false"
          />
        </div>
        <img
          class="demo-description__question-img"
          src="@/assets/imgs/hmm.png"
          width="36"
          height="36"
          alt="Задумчивый смайл"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DemoBtn from "./DemoBtn.vue";
import DemoBtnG from "./DemoBtnG.vue";
import DemoNote from "./DemoNote.vue";

import vClickOutside from "v-click-outside";

export default {
  name: "demo-description",
  components: {
    DemoBtn,
    DemoBtnG,
    DemoNote
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  data: function() {
    return {
      noteIsOpen: false
    };
  },
  props: [],
  computed: {},
  methods: {
    onClickOutside() {
      this.noteIsOpen = false;
    }
  }
};
</script>

<style scoped="scoped" lang="sass">
$image-box-width: 221px
$image-box-height: 237px
$image-right: 64px
$description-padding: 32px
.demo-description
  position: relative
  padding: $description-padding
  background-color: #f7f9ff
  background-image: url(~@/assets/imgs/bg/demo-desc-bg.jpg)
  background-position: center
  background-size: cover
  box-shadow: 0 4px 20px rgba(128, 128, 128, 0.2)
  border-radius: 20px
  &__img-box
    position: absolute
    top: 0
    right: $image-right
    width: $image-box-width
    height: $image-box-height
  &__img
    width: 100%
    height: 100%
    object-fit: contain
  &__top
    margin-bottom: 12px
  &__top-content
    display: flex
    flex-direction: column
    min-height: calc( #{$image-box-height} - #{$description-padding} )
    padding-right: calc( 24px + #{$image-box-width} + ( #{$image-right} - #{$description-padding} ) )
  &__title
    margin-bottom: 16px
    padding-top: 8px
    font-weight: 700
    font-size: 36px
    line-height: 1.3
  &__gift-box
    display: flex
    flex-grow: 1
    max-width: 570px
    margin-bottom: 24px
  &__gift-icon
    flex-shrink: 0
    margin-right: 24px
  &__list-title
    margin-bottom: 12px
    font-weight: 700
    font-size: 24px
    line-height: 1.3
  &__list
    display: flex
    flex-wrap: wrap
    margin-bottom: 40px
    list-style-type: none
  &__item
    display: flex
    flex-direction: column
    flex-shrink: 0
    flex-basis: 220px
    gap: 8px
    text-align: center
  &__item:not(:last-child)
    margin-right: 40px
  &__footer
    display: flex
    align-items: center
    justify-content: space-between
  &__test-box
    display: flex
    flex-basis: 620px
    padding: 24px
    line-height: 1.3
    background-color: #ffffff
    box-shadow: 0 4px 20px rgba(128, 128, 128, 0.2)
    border-radius: 12px
  &__test-content
    margin-right: 23px
  &__test-title
    margin-bottom: 8px
    font-weight: 700
    font-size: 24px
  &__btn-g
    align-self: center
    flex-shrink: 0
    flex-basis: 220px
  &__question-box
    display: flex
    align-items: center
    padding: 26px 30px 10px
  &__link-box
    position: relative
  &__pseudo-link
    margin-right: 8px
    text-align: center
    color: #007eff
    border-bottom: 1px dashed #007eff
    outline-width: 0
    transition-property: border-bottom-color
    transition-duration: 0.2s
  &__pseudo-link:focus-visible,
  &__pseudo-link:hover
    border-bottom-color: transparent
  &__note
    position: absolute
    bottom: 100%
    left: -60%
    width: 435px
    opacity: 0
    z-index: -1
    transition-property: opacity, z-index
    transition-duration: 0.2s, 0s
    transition-delay: 0s, 0.2s
    pointer-events: none
  &__note--open
    opacity: 1
    z-index: 1
    transition-delay: 0s
    pointer-events: auto
</style>
