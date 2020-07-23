<template>
  <div class="course-page vue-component">
    <div class="relative front text-h2">{{ courseRes.title }}</div>
    <div class="text-subtitle-2 mt-2 front relative">{{ subtitle }}</div>
    <course-my v-if="courseRes.buyed" :course="courseRes" />
    <v-row v-else class="d-flex justify-center">
      <v-col cols="12" lg="10">
        <course-catalog :course="courseRes" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CourseMy from "./CoursePageMy";
import CourseCatalog from "./CoursePageCatalog";

import { mapGetters } from "vuex";

export default {
  name: "course-page",
  data: function() {
    return {
      courseRes: [],
      subtitle: ""
    };
  },
  methods: {
    setCourse() {
      // Данный метод работает только если мы еще не запрашивали курсы
      this.$store.dispatch("setAllCourses");
      this.courseRes = this.course(this.$route.params.id);
    }
  },
  computed: {
    ...mapGetters(["course"])
  },
  components: {
    CourseMy,
    CourseCatalog
  },
  props: [],
  mixins: {},
  beforeMount() {
    this.setCourse();
  }
};
</script>

<style scoped="scoped" lang="sass"></style>
