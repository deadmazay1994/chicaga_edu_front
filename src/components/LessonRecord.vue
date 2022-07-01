<template>
  <div class="lesson-template vue-component">
    <div class="lesson-template__header">
      <div class="lesson-template__header-inner">
        <div class="lesson-template__header-part">
          <Breadcrumb></Breadcrumb>
        </div>
        <div class="lesson-template__header-part">
          <scores class="lesson-template__scores" />
        </div>
      </div>
    </div>
    <div class="lesson-template__body">
      <div class="lesson-body">
        <div class="lesson-body__inner">
          <div class="lesson-body__item">
            <record class="lesson-body__video" />
          </div>
          <div class="lesson-body__item lesson-body__item--2">
            <edu-panel class="lesson-body__edu-panel" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Base/BreadcrumbsComponent";
import Scores from "@/components/LessonComponents/Scores";
import Record from "@/components/LessonComponents/Record";
import EduPanel from "@/components/LessonComponents/EduPanel";

import api from "@/mixins/api";

export default {
  name: "lesson-template",
  data: function() {
    return {
      record: null
    };
  },
  methods: {
    async setRecord() {
      let lesson = await this.getLesson(this.$route.params.id)
      let record = await this.getVideo(lesson.videoId);
      this.record = record.data
    }
  },
  computed: {},
  components: {
    Breadcrumb,
    Scores,
    Record,
    EduPanel
  },
  props: [],
  mixins: [api],
  beforeMount() {
    this.setRecord()
  }
};
</script>

<style scoped="scoped" lang="sass">
$header-height: 62px

.lesson-template
  display: flex
  flex-direction: column
  width: 100%
  height: 100%
  padding: 16px 20px 20px
  &__header
    position: relative
    width: 100%
    height: $header-height
    padding-bottom: 16px
    z-index: 1
  &__header-inner
    display: flex
    justify-content: space-between
    height: 100%
  &__header-part
    width: 50%
  &__scores
    padding-left: 20px
  &__body
    flex-grow: 1
    width: 100%
    height: calc( 100% - #{$header-height} )

.lesson-body
  position: relative
  width: 100%
  height: 100%
  &__inner
    display: flex
    width: 100%
    height: 100%
  &__item
    width: 50%
    height: 100%
  &__item--2
    padding-left: 20px
  &__video
    width: 100%
    height: 100%
    padding-bottom: 13px
  &__edu-panel
    width: 100%
    height: 100%
    border-radius: 20px
    box-shadow: 0 4px 20px rgba(128, 128, 128, 0.2)
    overflow: hidden
</style>
