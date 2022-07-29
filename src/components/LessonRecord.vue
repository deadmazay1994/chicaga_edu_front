<template>
  <div class="lesson-template vue-component">
    <div class="lesson-template__header">
      <div class="lesson-template__header-inner">
        <div class="lesson-template__header-part">
          <Breadcrumb></Breadcrumb>
        </div>
        <div
          class="lesson-template__header-part lesson-template__header-part--2"
        >
          <scores class="lesson-template__scores" />
        </div>
      </div>
    </div>
    <div class="lesson-template__body">
      <div class="lesson-body">
        <div class="lesson-body__inner">
          <div class="lesson-body__item">
            <record
              v-if="record && record.url"
              :src="record.url"
              :timecodes="record.timecodes"
              class="lesson-body__video"
            />
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
      let lesson = await this.getLesson(this.$route.params.id);
      this.record = await this.getVideo(lesson.videoId);
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
    this.setRecord();
  }
};
</script>

<style scoped="scoped" lang="sass">
@import "@/assets/styles/variables.sass"

$header-height: 62px

.lesson-template
  display: flex
  flex-direction: column
  width: 100%
  height: 100%
  padding: 16px 20px 20px
  @media ($media_sm)
    padding: 10px
  &__header
    position: relative
    width: 100%
    height: $header-height
    padding-bottom: 16px
    z-index: 1
    @media ($media_xl)
      height: auto
  &__header-inner
    display: flex
    align-items: center
    justify-content: space-between
    height: 100%
    @media ($media_xl)
      flex-direction: column
  &__header-part
    width: 50%
    @media ($media_xl)
      width: 100%
  &__header-part--2
    display: flex
    justify-content: flex-end
    padding-left: 20px
    @media ($media_xl)
      padding-top: 10px
      padding-left: 0
    @media ($media_xs)
      align-self: center
      width: auto
  &__scores
    flex-grow: 1
    max-width: 448px
    padding-right: 46px
    padding-left: 46px
    background-color: #FFFFFF
    box-shadow: 0 4px 10px #F3F3F3
    border-radius: 20px
    @media ($media_xl)
      max-width: 370px
      padding-right: 34px
      padding-left: 34px
    @media ($media_sm)
      max-width: 320px
      padding-right: 24px
      padding-left: 24px
    @media ($media_xs)
      padding-right: 8px
      padding-left: 8px
      background-color: transparent
      box-shadow: none
  &__body
    flex-grow: 1
    width: 100%
    height: calc( 100% - #{$header-height} )
    @media ($media_xl)
      height: auto

.lesson-body
  position: relative
  width: 100%
  height: 100%
  &__inner
    display: flex
    width: 100%
    height: 100%
    @media ($media_xl)
      flex-direction: column
  &__item
    width: 50%
    height: 100%
    @media ($media_xl)
      width: 100%
      height: auto
  &__item--2
    padding-left: 20px
    @media ($media_xl)
      max-width: 800px
      margin-right: auto
      margin-left: auto
      padding-top: 20px
      padding-left: 0
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
