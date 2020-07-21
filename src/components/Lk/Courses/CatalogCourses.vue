<template>
  <div class="catalog-c vue-component">
    <div class="relative front text-h2">{{ title }}</div>
    <div class="text-subtitle-2 mt-2 front relative">{{ subtitle }}</div>
    <v-row>
      <v-col v-for="course in courses" :key="course.id" cols="12" lg="4">
        <course-card :course="course" :buy="false" />
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
      title: "Каталог курсов",
      subtitle: "",
      courses: [
        {
          title: "Название курса 1",
          description:
            "Товарищи! укрепление и развитие структуры в значительной степени обуславливает создание систем массового участия. Равным образом укрепление и развитие структуры способствует",
          price: 1000,
          id: "1"
        },
        {
          title: "Название курса 2",
          description: "Описание курса 2",
          price: 1000,
          id: "2"
        },
        {
          title: "Название курса 3",
          description: "Описание курса 3",
          price: 1000,
          id: "2"
        },
        {
          title: "Название курса 4",
          description: "Описание курса 4",
          price: 1000,
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
