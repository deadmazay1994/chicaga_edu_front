<template>
  <div class="catalog-c vue-component">
    <v-row>
      <v-col v-for="course in courses" :key="course.id" cols="12" lg="4">
        <course-card :course="course" :isOpen="course.buyed" />
      </v-col>
    </v-row>
    <plug v-if="!courses.length" />
  </div>
</template>

<script>
import CourseCard from "@/components/Lk/Courses/CourseCard";
import Plug from "./CatalogCoursePlug";

import api from "@/mixins/api";

export default {
  name: "catalog-c",
  data: function() {
    return {
      title: "Каталог курсов",
      subtitle: "",
      courses: {}
    };
  },
  methods: {
    async setCourses() {
      const response = await this.getCatalogCourses();
      // Даем понять фронту, что курс не куплен
      response.data.map(e => (e.buyed = false));
      this.courses = response.data;
    }
  },
  computed: {},
  components: {
    CourseCard,
    Plug
  },
  props: [],
  mixins: [api],
  beforeMount() {
    this.setCourses();
  }
};
</script>

<style scoped="scoped" lang="sass"></style>
