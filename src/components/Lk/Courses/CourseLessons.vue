<template>
  <div class="course-lessons vue-component">
    <div class="course-lessons__section">
      <div class="course-lessons__section-title">
        Уроки курса:
      </div>
      <div
        class="course-lessons__lesson"
        v-for="(lesson, index) in currentCourse.lessons"
        :key="index"
      >
        <router-link :to="`/lesson/${lesson.uniq_id}`">
          {{ lesson.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "course-lessons",
  components: {},
  data: function() {
    return {};
  },
  props: {
    course: Object
  },
  computed: {
    ...mapGetters(["currentCourse"])
  },
  methods: {
    ...mapActions(["setCurrentCourse"]),
    ...mapMutations(["clearTasks"]),
    setCourses() {
      this.$store.dispatch("setMyCourses");
    }
  },
  async beforeMount() {
    this.setCourses();
    await this.$store.dispatch("setCurrentCourse", this.$route.params.id);
  }
};
</script>

<style scoped="scoped" lang="sass">
.course-lessons
  padding: 24px 32px
  &__section:not(:last-child)
    margin-bottom: 40px
  &__section-title
    margin-bottom: 16px
    font-weight: 700
    font-size: 24px
    color: #323232
  &__lesson:not(:last-child)
    margin-bottom: 20px
</style>
