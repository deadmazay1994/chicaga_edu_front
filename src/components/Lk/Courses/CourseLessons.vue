<template>
  <div class="course-lessons vue-component">
    <div
      class="course-lessons__lesson"
      v-for="(lesson, index) in currentCourse.lessons"
      :key="index"
    >
      <router-link @click.native="clearTasks" :to="`/lesson/${lesson.uniq_id}`">
        {{ lesson.name }}
      </router-link>
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

<style scoped="scoped" lang="sass"></style>
