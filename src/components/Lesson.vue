<template>
  <div class="lesson vue-component">
    <v-container>
      <v-row>
        <v-col lg="6" cols="12">
          <v-card>
            <video-chat class="lesson__chat lesson__item" />
          </v-card>
        </v-col>
        <v-col lg="6" cols="12">
          <v-card>
            <edu-panel class="lesson__edu-panel lesson__item" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <lesson-start :display="false" />
  </div>
</template>

<script>
import VideoChat from "@/components/LessonComponents/VideoChat/VideoChat";
import EduPanel from "@/components/LessonComponents/EduPanel";
import LessonStart from "@/components/LessonComponents/LessonStart";

export default {
  name: "lesson",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {
    VideoChat,
    EduPanel,
    LessonStart
  },
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style lang="sass" scoped="">
.lesson
  &__item
    height: 80vh
</style>
