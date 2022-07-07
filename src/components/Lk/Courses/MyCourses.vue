<template>
  <div class="catalog-c vue-component">
    <div v-if="myCourses.length" class="catalog-c__list">
      <course-card
        class="catalog-c__item"
        v-for="course in myCourses"
        :key="course.id"
        :course="course"
        :isOpen="true"
        :isWide="true"
      />
    </div>
    <div v-else-if="myCoursesLoaded">
      Вы еще не приобрели курсы
    </div>
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

<style scoped="scoped" lang="sass">
.catalog-c
  padding: 32px
  &__item:not(:last-child)
    margin-bottom: 20px
</style>
