<template>
  <div class="t-courses vue-component">
    <v-container v-if="loaded">
      <v-row>
        <v-col
          v-for="(course, i) in progressForTeacher"
          :key="i"
          cols="12"
          md="6"
          lg="4"
        >
          <v-card class="front pa-5">
            <div class="text-h4">{{ course.course_name }}</div>
            <v-divider class="my-2" />
            <div v-for="(student, i) in course.students" :key="i">
              <list-item :student="student" :courseId="course.course_id" />
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ListItem from "./CourseListTeacherItem";

import { mapGetters, mapActions } from "vuex";
export default {
  name: "t-courses",
  data: function() {
    return {
      maxItemShow: 3,
      showAll: false,
      loaded: false,
      progress: []
    };
  },
  methods: {
    ...mapActions(["setCoursesForTeacher"])
  },
  computed: {
    ...mapGetters(["progressForTeacher"])
  },
  components: {
    ListItem
  },
  props: [],
  mixins: [],
  async beforeMount() {
    await this.setCoursesForTeacher();
    this.loaded = true;
  }
};
</script>

<style scoped="scoped" lang="sass">
.t-courses
  &__card
    height: 100%
    display: flex
    flex-direction: column
    justify-content: space-between
    flex-wrap: wrap
</style>
