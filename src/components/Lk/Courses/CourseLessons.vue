<template>
  <div class="course-lessons vue-component">
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
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "course-lessons",
  components: {},
  data: function() {
    return {};
  },
  props: [],
  computed: {
    ...mapGetters(["currentCourse"])
  },
  methods: {
    ...mapActions(["setCurrentCourse"])
  },
  async beforeMount() {
    await this.setCurrentCourse(this.$route.params.id);
  }
};
</script>

<style scoped="scoped" lang="sass"></style>
