<template>
  <div class="catalog-c vue-component">
    <page-title title="Мои курсы" />
    <v-row>
      <v-col v-for="course in myCourses" :key="course.id" cols="12" lg="4">
        <course-card :course="course" :buy="true" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PageTitle from "@/components/Base/PageTitle";
import CourseCard from "@/components/Lk/Courses/CourseCard";

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
    ...mapGetters(["myCourses"])
  },
  components: {
    CourseCard,
    PageTitle
  },
  props: [],
  mixins: {},
  beforeMount() {
    this.setCourses();
  }
};
</script>

<style scoped="scoped" lang="sass"></style>
