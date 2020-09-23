<template>
  <div class="youtube-addons vue-component">
    <description :index="index">{{ inputCopy.description }}</description>
    <!-- <iframe
      v-for="(video, i) in inputCopy.body"
      class="response-content"
      style="width: 100%; height: 300px"
      :key="i"
      ref="video"
      :src="getLink(video.url)"
      frameborder="1"
      allowfullscreen="true"
    /> -->
    <div
      v-for="(video, i) in inputCopy.body"
      :key="i"
      :id="'player-' + i"
    ></div>
  </div>
</template>

<script>
import Methods from "@/mixins/tasks";
import MediaEvents from "@/mixins/mediaEvents";
import Description from "./TasksDescription";
import { mapGetters } from "vuex";

export default {
  name: "youtube-addons",
  data: function() {
    return {
      inputCopy: false,
      playing: false
    };
  },
  methods: {
    getLink(url) {
      return "https://www.youtube.com/embed/" + this.getVideoId(url);
    },
    getVideoId(url) {
      return new URL(url).searchParams.get("v");
    },
    toggleMicro(e) {
      if (e.data == 1) {
        this.mediaPlaying();
      } else {
        this.mediaStoping();
      }
    },
    onYouTubeIframeAPIReady() {
      this.inputCopy.body.forEach((video, i) => {
        // eslint-disable-next-line no-undef
        new YT.Player("player-" + i, {
          videoId: this.getVideoId(video.url),
          events: {
            onStateChange: this.toggleMicro
          }
        });
      });
    },
    connectApi() {
      var tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  },
  computed: {
    ...mapGetters(["socket", "lessonId"])
  },
  components: {
    Description
  },
  props: ["input", "index"],
  mixins: [Methods, MediaEvents],
  beforeMount() {
    this.setInputCopy();
  },
  mounted() {
    this.connectApi();
    this.onYouTubeIframeAPIReady();
  }
};
</script>

<style scoped="scoped" lang="sass"></style>
