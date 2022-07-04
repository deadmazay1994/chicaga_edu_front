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
  &__bottom
    display: grid
    grid-auto-flow: column
    grid-template-rows: auto auto
    grid-template-columns: auto auto 47%
    grid-gap: 16px
    padding: 15px 65px 27px 32px
  &__info
    display: flex
    align-items: center
  &__info:nth-child(5)
    grid-row-start: 1
    grid-row-end: 3
    align-self: end
  &__info-icon
    display: flex
    align-items: center
    justify-content: center
    flex-shrink: 0
    width: 24px
    height: 24px
    margin-right: 18px
</style>
