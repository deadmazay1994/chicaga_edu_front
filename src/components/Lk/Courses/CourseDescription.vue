<template>
  <div class="course-description">
    <div class="course-description__body">
      <div class="course-description__content">
        <div class="course-description__title">{{ title }}</div>
        <div class="course-description__text">
          <p>{{ description }}</p>
        </div>
      </div>
      <div class="course-description__image-box">
        <img :src="image" width="295" height="215" alt="Девушка в очках радостно и задумчиво улыбается" />
      </div>
    </div>
    <div class="course-description__bottom">
      <div class="course-info" v-for="(info, index) in courseInfo" :key="index">
        <svg class="course-info__icon">
          <use :xlink:href="'#' + info.icon"></use>
        </svg>
        <span class="course-info__text">
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
    courseInfo: Array
  },
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="sass">
.course-description
  font-weight: 300
  font-size: 16px
  line-height: 1.5
  background-color: #B5D6371A
  border-radius: 20px
  box-shadow: 0 4px 20px rgba(128, 128, 128, 0.2)
  &__body
    display: flex
    justify-content: space-between
    padding: 32px 65px 0 32px
    color: #323232
    border-bottom: 1px solid #dcdcdc
    box-shadow: 0 1px 0 #ffffff
  &__content
    margin-right: 13%
    padding-bottom: 15px
  &__title
    font-weight: 700
    font-size: 40px
    line-height: 1.4
  &__image-box
    align-self: flex-end
    flex-shrink: 0
    width: 295px
    height: 215px
.course-description__bottom
  display: grid
  grid-template-columns: 1fr 1fr 1fr
  grid-gap: 16px
  padding: 15px 65px 27px 32px
  .course-info
    display: flex
    align-items: center
    &:nth-child(2)
      grid-column-start: 2
      grid-column-end: 4
    &__icon
      width: 24px
      height: 24px
      display: flex
      align-items: center
      justify-content: center
    .course-info__text
      margin-left: 18px
</style>
