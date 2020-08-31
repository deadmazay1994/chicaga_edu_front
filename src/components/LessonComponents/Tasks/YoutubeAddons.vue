<template>
  <div class="youtube-addons vue-component">
    <description>{{ inputCopy.description }}</description>
    <iframe
      v-for="(video, i) in inputCopy.body"
      class="response-content"
      style="width: 100%; height: 300px"
      :key="i"
      :src="getLink(video.url)"
      frameborder="1"
      allowfullscreen="true"
    />
  </div>
</template>

<script>
import Methods from "@/mixins/tasks";
import Description from "./TasksDescription";
import { mapGetters } from "vuex";

export default {
  name: "youtube-addons",
  data: function() {
    return {
      inputCopy: false
    };
  },
  methods: {
    getLink(url) {
      console.log(url);
      return (
        "https://www.youtube.com/embed/" + new URL(url).searchParams.get("v")
      );
    }
  },
  computed: {
    ...mapGetters(["socket", "lessonId"])
  },
  components: {
    Description
  },
  props: ["input", "index"],
  mixins: [Methods],
  beforeMount() {
    this.setInputCopy();
  }
};
</script>

<style scoped="scoped" lang="sass"></style>
