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
          id: "1",
          progress: {
            copmlite: 30,
            all: 30
          }
        },
        {
          title: "Название курса 2",
          description:
            "Идейные соображения высшего порядка, а также постоянное информационно-пропагандистское обеспечение нашей деятельности требуют от нас анализа систем массового участия. Повседневная практика показывает, что новая модель организационной деятельности способствует подготовки и реализации форм развития. Значимость этих проблем настолько очевидна, что рамки и место обучения кадров требуют определения и уточнения систем массового участия. Задача организации, в особенности же рамки и место обучения кадров играет важную роль в формировании направлений прогрессивного развития.",
          id: "2",
          progress: {
            copmlite: 10,
            all: 30
          }
        },
        {
          title: "Название курса 3",
          description: "Описание курса 3",
          id: "2",
          progress: {
            copmlite: 20,
            all: 30
          }
        },
        {
          title: "Название курса 4",
          description: "Описание курса 4",
          id: "3",
          progress: {
            copmlite: 0,
            all: 30
          }
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
