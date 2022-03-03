<template>
  <div class="group vue-component">
    <page-title :title="'Академическая группа'" />
    <v-card class="front" v-if="loading">
      <v-skeleton-loader type="article" />
    </v-card>
    <v-container v-else>
      <div class="group__lessons" v-if="!hasAcademicGroup">
        Вы не состоите в академической группе
      </div>
      <div class="group__lessons" v-show="hasAcademicGroup && !hasLessons">
        В вашей академической группе нет предстоящих занятий
      </div>
      <div class="group__lessons" v-if="hasAcademicGroup && hasLessons">
        <!-- Show upcomming lessons -->
        <v-data-table
          :items="lessons.schedule"
          :loading="loading"
          :headers="headers"
          :items-per-page="-1"
          hide-default-footer
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Расписание</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <template v-slot:item="{ item }">
            <tr
              style="cursor: pointer"
              @click="handleClickOnRow"
              :data-time_start="item.time"
              :data-uniq_id="item.lesson.uniq_id"
            >
              <td>{{ item.lesson.lesson_id }}</td>
              <td>{{ item.lesson.name }}</td>
              <td>
                {{
                  item.time
                    ? convertDate(new Date(item.time * 1000), "HH:MM")
                    : "Не запланировано"
                }}
              </td>
              <td>
                {{
                  item.time
                    ? convertDate(new Date(item.time * 1000), "dd.mm.yyyy")
                    : "Не запланировано"
                }}
              </td>
              <td>
                <router-link
                  :to="{
                    name: 'homework',
                    params: {
                      courseId: 0,
                      id: item.lesson.uniq_id,
                      userid: 0
                    }
                  }"
                  >Домашнее задание</router-link
                >
              </td>
            </tr>
          </template>
        </v-data-table>
      </div>
    </v-container>
  </div>
</template>

<script>
import api from "@/mixins/api";
import PageTitle from "@/components/Base/PageTitle";
// import Lesson from "@/components/Group/Lesson"
import dateFormat from "dateformat";

export default {
  name: "Group",
  components: {
    PageTitle
    // Lesson
  },
  data() {
    return {
      loading: false,
      hasAcademicGroup: false,
      hasLessons: false,
      groups: null,
      lessons: null,
      headers: [
        {
          text: "№",
          align: "start",
          sortable: false,
          value: "number"
        },
        { text: "Название", value: "name" },
        { text: "Время начала", value: "time_start" },
        { text: "Дата начала", value: "date_start" },
        { text: "Домашнее задание" }
      ]
    };
  },
  methods: {
    convertDate(val, f) {
      return dateFormat(val, f);
    },
    handleClickOnRow(event) {
      console.log(event.srcElement.tagName);
      if (event.srcElement.tagName.toLowerCase() === "a") return;
      const parent = event.target.closest("tr");
      const uniq_id = parent.dataset.uniq_id;
      const time = parent.dataset.time_start;
      const startTime =
        this.lessons.schedule.find(e => e.lesson.uniq_id === uniq_id).time *
        1000;
      if (uniq_id && time != 0 && time != null) {
        this.$router.push({
          name: "upcoming-lesson",
          params: {
            id: uniq_id,
            code: this.group.code,
            startTime
          }
        });
      }
    },
    async getGroups() {
      // Start loading page
      this.loading = true;
      const r = await api.methods.getAcademicGroups();
      // console.log(r)
      if (r.data && r.data.length > 0) {
        this.group = r.data[0];
        console.log(this.group.id);
        await this.getLessons(this.group.id);
        this.hasAcademicGroup = true;
      }
      this.loading = false;
    },
    async getLessons(id) {
      // Start loading page
      const r = await api.methods.getAcademicGroup(id);
      if (r.schedule && r.schedule.length > 0) {
        this.lessons = r;
        this.hasLessons = true;
      }
    }
  },
  mounted() {
    this.getGroups();
  }
};
</script>

<style lang="scss" scoped></style>
