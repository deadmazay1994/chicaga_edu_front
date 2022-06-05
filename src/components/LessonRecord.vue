<template>
  <div class='lesson-template lessons-pg vue-component'>
    <div class="lesson-template__header">
      <Breadcrumb></Breadcrumb>
      <scrores />
    </div>
    <div class="lesson-template__body lesson-body">
      <record class="lesson-body__item lesson-body__video" />
      <edu-panel class="lesson-body__item lesson__edu-panel lesson__item" />
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Base/BreadcrumbsComponent"
import Scrores from "@/components/LessonComponents/Scores"
import Record from "@/components/LessonComponents/Record"
import EduPanel from "@/components/LessonComponents/EduPanel"

export default {
  name: 'lesson-template',
  data: function() {
    return {}
  },
  methods: {},
  computed: {},
  components: {
    Breadcrumb,
    Scrores,
    Record,
    EduPanel
  },
  props: [],
  mixins: {},
  beforeMount() {}
}
</script>

<style scoped='scoped' lang='sass'>
.lesson-template
  overflow: hidden
  display: flex
  flex-direction: column
  &__header
    margin-bottom: 16px
    display: flex
    justify-content: space-between 
  &__body
    flex-grow: 1
    overflow: hidden
    display: flex
    justify-content: space-between
.lesson-body
  &__item
    width: 50%
    max-height: 100%
  &__video
    width: calc(50% - 20px)
</style>
