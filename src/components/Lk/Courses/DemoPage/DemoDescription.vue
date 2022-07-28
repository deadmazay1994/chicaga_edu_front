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
        <div
          class="demo-description__text-box"
          :style="{ backgroundImage: `url(${backgroundUrl})` }"
        >
          <b>и получите подарок</b>: 10 разговорных карточек c выражениями,
          которыми вы поразите носителей английского
        </div>
        <div class="demo-description__list-title">
          Выберите уровень урока:
        </div>
      </div>
    </div>
    <ul class="demo-description__list">
      <router-link
        tag="li"
        class="demo-description__item"
        v-for="(lesson, index) in lessons"
        :key="index"
        :to="{
          name: 'lesson_record',
          params: { id: lesson.uniq_id, course_id: 15 }
        }"
      >
        <demo-btn>
          {{ lesson.name }}
        </demo-btn>
        <div class="demo-description__text">
          {{ lesson.theme }}
        </div>
      </router-link>
      <!-- <li class="demo-description__item">
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
      </li> -->
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
        <demo-btn-g class="demo-description__btn-g" @click.native="goToTest()">
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
            <span class="demo-description__link-text">
              А мне нужен другой уровень
            </span>
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

import api from "@/mixins/api";

import backgroundUrl from "@/assets/imgs/open_gift_box.svg";

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
  mixins: [api],
  data: function() {
    return {
      backgroundUrl,
      noteIsOpen: false,
      lessons: []
    };
  },
  props: [],
  computed: {},
  methods: {
    onClickOutside() {
      this.noteIsOpen = false;
    },
    goToTest() {
      this.$router.push({ name: "level-test", delimiter: "/" });
    }
  },
  async beforeMount() {
    const response = await this.getPublicCourse(39);
    console.log(response);
    this.lessons = response.data.lessons;
  }
};
</script>

<style scoped="scoped" lang="sass">
@import "@/assets/styles/variables.sass"

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
  @media ($media_lg2)
    padding: calc( #{$description-padding} - 12px )
  @media ($media_sm)
    padding: 10px
  &__img-box
    position: absolute
    top: 0
    right: $image-right
    width: $image-box-width
    height: $image-box-height
    @media ($media_xxl)
      right: $description-padding
    @media ($media_lg2)
      right: calc( #{$description-padding} - 12px )
    @media ($media_sm)
      position: static
      margin-right: auto
      margin-bottom: 10px
      margin-left: auto
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
    padding-right: calc( #{$image-box-width} + #{$image-right} )
    @media ($media_xxl)
      padding-right: calc( #{$image-box-width} + #{$description-padding} )
    @media ($media_lg2)
      padding-right: calc( #{$image-box-width} + #{$description-padding} - 12px )
    @media ($media_sm)
      min-height: auto
      padding-right: 0
  &__title
    margin-bottom: 16px
    padding-top: 8px
    font-weight: 700
    font-size: 36px
    line-height: 1.3
    @media ($media_lg2)
      padding-top: 0
      font-size: 32px
    @media ($media_md)
      margin-bottom: 8px
      font-size: 28px
  &__text-box
    display: block
    flex-grow: 1
    max-width: 570px
    min-height: 50px
    margin-bottom: 24px
    padding-left: 74px
    background-position: left top
    background-size: 50px 50px
    @media ($media_md)
      padding-top: 58px
      padding-left: 0
    @media ($media_sm)
      background-position: center top
  &__list-title
    margin-bottom: 12px
    font-weight: 700
    font-size: 24px
    line-height: 1.3
    @media ($media_md)
      margin-bottom: 0
      font-size: 20px
  &__list
    display: flex
    flex-wrap: wrap
    gap: 10px 40px
    margin-bottom: 40px
    list-style-type: none
    @media ($media_xxxl)
      column-gap: 30px
    @media ($media_md)
      justify-content: center
      margin-bottom: 30px
  &__item
    display: flex
    flex-direction: column
    flex-shrink: 0
    flex-basis: 220px
    row-gap: 8px
    text-align: center
    @media ($media_sm)
      flex-basis: 100%
  &__footer
    display: flex
    align-items: center
    justify-content: space-between
    @media ($media_xxl)
      flex-direction: column
      align-items: stretch
  &__test-box
    display: flex
    justify-content: space-between
    flex-grow: 1
    max-width: 620px
    padding: 24px
    line-height: 1.3
    background-color: #ffffff
    box-shadow: 0 4px 20px rgba(128, 128, 128, 0.2)
    border-radius: 12px
    @media ($media_md)
      max-width: none
    @media ($media_sm)
      flex-direction: column
  &__test-content
    margin-right: 23px
    @media ($media_sm)
      margin-right: 0
      margin-bottom: 16px
  &__test-title
    margin-bottom: 8px
    font-weight: 700
    font-size: 24px
    @media ($media_md)
      font-size: 20px
  &__btn-g
    align-self: center
    flex-shrink: 0
    flex-basis: 220px
    @media ($media_sm)
      align-self: stretch
      flex-basis: auto
      width: 100%
  &__question-box
    display: flex
    align-items: center
    flex-shrink: 0
    padding: 26px 30px 10px
    @media ($media_xxl)
      padding-bottom: 0
    @media ($media_lg2)
      padding-right: 0
      padding-left: 0
  &__link-box
    position: relative
    @media ($media_xxl)
      display: flex
      justify-content: flex-end
      flex-grow: 1
  &__pseudo-link
    margin-right: 8px
    text-align: center
    color: #007eff
    outline-width: 0
  &__link-text
    display: inline
    border-bottom: 1px dashed currentColor
    transition-property: border-bottom-color
    transition-duration: 0.2s
  &__pseudo-link:focus-visible &__link-text,
  &__pseudo-link:hover &__link-text
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
    @media ($media_xxl)
      left: auto
      right: -36px
    @media ($media_sm)
      left: auto
      width: auto
      max-width: 435px
  &__note--open
    opacity: 1
    z-index: 4
    transition-delay: 0s
    pointer-events: auto
</style>
