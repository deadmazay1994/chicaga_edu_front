<template>
  <div class="course-list-teacher-item vue-component">
    <span
      class="text-h6 blue--text"
      style="text-decoration: underline; cursor: pointer"
      @click="show = !show"
    >
      {{ student[0].username }}
    </span>
    <div v-show="show">
      <div
        class="d-flex justify-space-between"
        v-for="(lesson, i) in student"
        :key="i"
      >
        <router-link
          :to="`/lesson/${courseId}/${lesson.uniq_id}/${lesson.user_id}`"
          >Результаты урока</router-link
        >
        <router-link
          :to="`/homework/${courseId}/${lesson.uniq_id}/${lesson.user_id}`"
          >Результаты ДЗ</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "course-list-teacher-item",
  data: function() {
    return {
      show: false
    };
  },
  methods: {},
  computed: {},
  components: {},
  props: ["student", "courseId"],
  mixins: {},
  beforeMount() {
    console.log(this.student);
  }
};
</script>

<style scoped="scoped" lang="sass"></style>
