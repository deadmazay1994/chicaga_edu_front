<template>
  <div class="catalog-c vue-component">
    <v-row>
      <v-col v-for="course in courses" :key="course.id" cols="12" lg="4">
        <course-card :course="course" :buy="true" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CourseCard from "@/components/Lk/Courses/CourseCard";
export default {
  name: "catalog-c",
  data: function() {
    return {
      courses: [
        {
          title: "Название курса 1",
          description: "Описание курса 1",
          id: "1"
        },
        {
          title: "Название курса 2",
          description: "Описание курса 2",
          id: "2"
        },
        {
          title: "Название курса 3",
          description: "Описание курса 3",
          id: "2"
        },
        {
          title: "Название курса 4",
          description: "Описание курса 4",
          id: "3"
        }
      ]
    };
  },
  methods: {},
  computed: {},
  components: {
    CourseCard
  },
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass"></style>
