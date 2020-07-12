<template>
  <div class="lesson vue-component">
    <v-container>
      <video-chat />
    </v-container>
  </div>
</template>

<script>
import VideoChat from "@/components/LessonComponents/VideoChat";
export default {
  name: "lesson",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {
    VideoChat
  },
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>
