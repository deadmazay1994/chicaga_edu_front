<template>
  <div class="course-description" :class="'course-description--' + kind">
    <div class="course-description__body">
      <div class="course-description__content">
        <div class="course-description__title">{{ title }}</div>
        <div class="course-description__text">
          <p>{{ description }}</p>
        </div>
        <div
          class="course-description__additional-list"
          v-if="kind == 'result'"
        >
          <div class="course-description__list-item">
            <p>
              для людей с базовыми знаниями <br />
              (отсутствие разговорных навыков, систематических знаний
              грамматики, словарного запаса для поддержания свободной беседы)
            </p>
          </div>
        </div>
        <div
          class="course-description__additional-info"
          v-if="kind == 'result'"
        >
          <div class="course-description__info-title">
            После курса Elementary вы:
          </div>
          <div class="course-description__info-text">
            <p>
              <span class="course-description__bold">Общаетесь</span> на бытовые
              темы, рассказываете о работе, хобби, семье и друзьях
            </p>
            <p class="course-description__bold">
              Умеете объясниться в ресторане, магазине и отеле
            </p>
          </div>
        </div>
      </div>
      <div class="course-description__image-box">
        <img
          :src="image"
          width="295"
          height="215"
          alt="Девушка в очках радостно и задумчиво улыбается"
        />
      </div>
    </div>
    <div class="course-description__bottom">
      <div
        class="course-description__info"
        v-for="(info, index) in courseInfo"
        :key="index"
      >
        <svg class="course-description__info-icon">
          <use :xlink:href="'#' + info.icon"></use>
        </svg>
        <span class="course-description__info-text">
          {{ info.text }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "course-description",
  components: {},
  data: function() {
    return {};
  },
  props: {
    image: String,
    title: String,
    description: String,
    courseInfo: Array,
    kind: String
  },
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="sass">
@import "@/assets/styles/variables.sass"

.course-description
  font-weight: 300
  font-size: 16px
  line-height: 1.5
  background-color: #B5D6371A
  border-radius: 20px
  box-shadow: 0 4px 20px rgba(128, 128, 128, 0.2)
  &--result
    font-weight: 400
  &__body
    display: flex
    justify-content: space-between
    padding: 32px 65px 0 32px
    color: #323232
    border-bottom: 1px solid #dcdcdc
    box-shadow: 0 1px 0 #ffffff
    @media ($media_xxl)
      padding-right: 24px
      padding-left: 24px
    @media ($media_lg2)
      padding-top: 24px
    @media ($media_md2)
      padding-top: 16px
      padding-right: 16px
      padding-left: 16px
  &__content
    margin-right: 13%
    padding-bottom: 15px
    @media ($media_xxl)
      margin-right: 16px
    @media ($media_lg2)
      margin-right: 0
  &__title
    font-weight: 700
    font-size: 40px
    line-height: 1.4
    @media ($media_xxl)
      margin-bottom: 8px
      font-size: 32px
    @media ($media_lg2)
      font-size: 28px
    @media ($media_md2)
      font-size: 24px
  &--result &__text
    font-size: 20px
  &__additional-list
    padding-top: 16px
    display: flex
    flex-direction: column
  &__list-item
    position: relative
    display: flex
    padding-left: 30px
  &__list-item::before
    content: ""
    position: absolute
    top: 0
    left: 0
    width: 24px
    height: 24px
    background-image: url("~@/assets/imgs/icons/star-3.svg")
    background-position: center
    background-size: contain
    background-repeat: no-repeat
  &__additional-info
    padding-top: 16px
  &__info-title
    font-weight: 700
  &__info-text
    padding-left: 32px
  &__image-box
    align-self: flex-end
    flex-shrink: 0
    width: 295px
    height: 215px
    @media ($media_lg2)
      display: none
  &__bottom
    display: grid
    grid-auto-flow: column
    grid-template-rows: auto auto
    grid-template-columns: auto auto 47%
    grid-gap: 16px
    padding: 15px 65px 27px 32px
    @media ($media_xxl)
      grid-auto-flow: row
      grid-template-columns: auto auto
      padding-right: 24px
      padding-left: 24px
    @media ($media_md2)
      grid-template-columns: auto
      grid-row-gap: 8px
      padding-right: 16px
      padding-bottom: 16px
      padding-left: 16px
  &__info
    display: flex
    align-items: center
  &__info:nth-child(2)
    @media ($media_xxl)
      grid-row-start: 1
      grid-row-end: 3
      grid-column-start: 2
      align-self: end
    @media ($media_lg2)
      grid-row-start: auto
      grid-row-end: auto
      grid-column-start: auto
      align-self: auto
  &__info:nth-child(5)
    grid-row-start: 1
    grid-row-end: 3
    align-self: end
    @media ($media_xxl)
      grid-row-start: auto
      grid-row-end: auto
      align-self: auto
  &__info-icon
    display: flex
    align-items: center
    justify-content: center
    flex-shrink: 0
    width: 24px
    height: 24px
    margin-right: 18px
    @media ($media_xl)
      margin-right: 12px
  &__bold
    font-weight: 700
</style>
