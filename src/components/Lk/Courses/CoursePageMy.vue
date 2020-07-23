<template>
  <div class="course-page-my vue-component">
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-5 front" style="height: 100%">
          <div class="text-h5">Прогресс по курсу</div>
          <progress-info
            :complite="course.progress.copmlite"
            :all="course.lessons.length"
          />
          <v-divider class="my-4"></v-divider>
          <div class="text-subtitle-1">Список уроков</div>
          <v-list dense>
            <v-list-item
              link
              class="py-0 px-3 mb-3"
              v-for="(lesson, i) in course.lessons"
              :key="lesson.id"
            >
              <router-link
                :to="'/lesson/' + lesson.id"
                class="d-flex justify-space-between"
                style="width: 100%"
              >
                <div class="d-flex align-center">
                  <v-avatar
                    size="30"
                    :color="lesson.presence ? 'success' : 'error'"
                  >
                    <span
                      class="headline white--text text-subtitle-1"
                      style="text-decoration: underline;"
                      >{{ i + 1 }}</span
                    >
                  </v-avatar>
                  <router-link class="ml-2" link :to="'/lesson/' + lesson.id"
                    >Перейти на урок</router-link
                  >
                </div>
                <router-link link :to="'/homework/' + lesson.id"
                  >Перейти на ДЗ</router-link
                >
              </router-link>
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

export default {
  name: "course-page-my",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {
    ProgressInfo
  },
  props: ["course"],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass"></style>
