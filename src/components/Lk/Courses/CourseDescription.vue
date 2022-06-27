<template>
  <div class="course-description">
    <div class="course-description__body">
      <div class="course-description__body__text">
        <div class="title">{{ title }}</div>
        <p>{{ description }}</p>
      </div>
      <div class="course-image">
        <img :src="image" alt="course-image" />
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
  background-color: #B5D6371A
  border-radius: 20px
  box-shadow: 0px 4px 20px rgba(128, 128, 128, 0.2)
  .course-description__body
    display: flex
    justify-content: space-between
    padding: 32px 65px 0px 32px
    border-bottom: solid 1px #dcdcdc
    box-shadow: 0px 1px 0px #FFFFFF
    &__text
      .title
        font-size: 40px
        font-weight: 700
    .course-image
      align-self: flex-end
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
