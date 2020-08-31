<template>
  <div class="course-page-my vue-component">
    <v-row v-if="currentCourse">
      <v-col cols="12" md="6">
        <v-card class="pa-5 front" style="height: 100%">
          <div class="text-h5">Прогресс по курсу</div>
          <progress-info
            :complite="course.current_step"
            :all="currentCourse.lessons.length"
          />
          <v-divider class="my-4"></v-divider>
          <div class="text-subtitle-1">Список уроков</div>
          <v-list dense>
            <v-list-item
              class="py-0 px-3 mb-3"
              v-for="(lesson, i) in currentCourse.lessons"
              :key="lesson.id"
            >
              <div
                class="d-flex justify-space-between align-center"
                style="width: 100%"
              >
                <div class="d-flex align-center" style="width: 70%">
                  <v-avatar
                    size="30"
                    :color="lesson.finished ? 'success' : 'error'"
                  >
                    <span
                      class="headline white--text text-subtitle-1"
                      style="text-decoration: underline;"
                      >{{ i + 1 }}</span
                    >
                  </v-avatar>
                  <div>
                    <router-link
                      class="d-block ml-2"
                      link
                      @click.native="clearTasks"
                      :to="`/lesson/${$route.params.id}/${lesson.uniq_id}`"
                      >{{ lesson.name }}</router-link
                    >
                  </div>
                </div>
                <div style="width: 30%">
                  <router-link
                    class="d-block mb-2"
                    link
                    @click.native="clearTasks"
                    :to="`/lesson/${$route.params.id}/${lesson.uniq_id}`"
                    >Перейти на урок</router-link
                  >
                  <router-link
                    class="d-block"
                    link
                    @click.native="clearTasks"
                    :to="`/homework/${$route.params.id}/${lesson.uniq_id}`"
                    >Перейти на ДЗ</router-link
                  >
                </div>
              </div>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-5 front" style="height: 100%">
          <div class="text-h5">Описание курса</div>
          {{ course.description }}
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ProgressInfo from "./ProgressInfo";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "course-page-my",
  data: function() {
    return {};
  },
  methods: {
    ...mapActions(["setCurrentCourse"]),
    ...mapMutations(["clearTasks"])
  },
  computed: {
    ...mapGetters(["currentCourse"])
  },
  components: {
    ProgressInfo
  },
  props: ["course"],
  mixins: {},
  async beforeMount() {
    await this.$store.dispatch("setCurrentCourse", this.$route.params.id);
    console.log(this.currentCourse);
  }
};
</script>

<style scoped="scoped" lang="sass"></style>
