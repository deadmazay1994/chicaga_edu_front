<template>
  <div class="course-page-catalog vue-component">
    <v-card class="pa-5 my-4 front">
      <div v-html="course.description"></div>
      <v-divider class="my-4"></v-divider>
      <div class="text-h3 main-color-text">{{ course.price }} &#8381;</div>
      <v-divider class="my-4"></v-divider>
      <v-btn block large class="main-color main-color--text" @click="pay"
        >Купить</v-btn
      >
    </v-card>
  </div>
</template>

<script>
import api from "@/mixins/api";
import "@/mixins/methods";

export default {
  name: "course-page-catalog",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
  props: ["course"],
  mixins: [api],
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass"></style>
