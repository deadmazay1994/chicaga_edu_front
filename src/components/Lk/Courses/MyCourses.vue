<template>
  <div class="catalog-c vue-component">
    <v-row>
      <template v-if="myCourses.length">
        <v-col v-for="course in myCourses" :key="course.id" cols="12" lg="4">
          <course-card :course="course" :buy="true" />
        </v-col>
      </template>
      <v-col
        v-else-if="myCoursesLoaded"
        cols="12"
        class="front relative text-h4 mt-15 text-center"
      >
        Вы еще не приобрели курсы
      </v-col>
    </v-row>
    <plug v-if="!myCoursesLoaded" />
  </div>
</template>

<script>
import CourseCard from "@/components/Lk/Courses/CourseCard";
import Plug from "./CatalogCoursePlug";

import { mapGetters } from "vuex";

export default {
  name: "catalog-c",
  methods: {
    setCourses() {
      // Данный метод работает только если мы еще не запрашивали курсы
      this.$store.dispatch("setMyCourses");
    }
  },
  computed: {
    ...mapGetters(["myCourses", "myCoursesLoaded"])
  },
  components: {
    CourseCard,
    Plug
  },
  props: [],
  mixins: {},
  beforeMount() {
    this.setCourses();
  }
};
</script>

<style scoped="scoped" lang="sass"></style>
