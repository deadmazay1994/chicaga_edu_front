<template>
  <div class="catalog-c vue-component">
    <page-title :title="title" />
    <v-row>
      <v-col v-for="course in catalogCourses" :key="course.id" cols="12" lg="4">
        <course-card :course="course" :buy="false" />
      </v-col>
    </v-row>
    <plug v-if="!catalogCourses.length" />
  </div>
</template>

<script>
import PageTitle from "@/components/Base/PageTitle";
import CourseCard from "@/components/Lk/Courses/CourseCard";
import Plug from "./CatalogCoursePlug";

import { mapGetters } from "vuex";

export default {
  name: "catalog-c",
  data: function() {
    return {
      title: "Каталог курсов",
      subtitle: ""
    };
  },
  methods: {
    setCourses() {
      // Данный метод работает только если мы еще не запрашивали курсы
      this.$store.dispatch("setCatalogCourses");
    }
  },
  computed: {
    ...mapGetters(["catalogCourses"])
  },
  components: {
    PageTitle,
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
