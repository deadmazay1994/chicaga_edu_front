<template>
  <div class="stand vue-component">
    <!-- <inner-block></inner-block> -->
    <course-description-vue
      :title="'Курс Elementary'"
      :description="courseDescription"
      :image="require('@/assets/imgs/some-person.png')"
      :courseInfo="courseInfo"
    />
  </div>
</template>

<script>
// import InnerBlock from "@/components/Lk/LevelCard";
import CourseDescriptionVue from "./Lk/Courses/CourseDescription.vue";

export default {
  name: "stand",
  data: function() {
    return {
      courseDescription:
        "Курс для тех, кто уже немного знаком с английским языком. В основу курса заложено изучение времен английского языка: настоящее, прошедшее и настоящее совершенное. Вы начнете понимать, в чем разница между этими временами и как их правильно использовать в разговорной речи. Вы легко будете справляться со счетом на английском языке, сможете общаться на простые бытовые темы, рассказывать о том, что Вам нравится, а что нет, описывать предметы, их цвета и размеры.",
      courseInfo: [
        { icon: "calendar", text: "Обучение 4 месяца" },
        { icon: "school", text: "32 урока" },
        { icon: "brains", text: "6 доп. уроков с фразами для общения" },
        { icon: "list-check", text: "6 тестов + финальный тест" },
        { icon: "star", text: "свидетельство / сертификат о прохождении курса" }
      ]
    };
  },
  methods: {},
  computed: {},
  components: {
    // InnerBlock,
    CourseDescriptionVue
  },
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
.stand
  height: 100% // без этого свойства не будет работать прокрутка внутри компонента
</style>
