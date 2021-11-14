<template>
  <v-dialog class="report vue-component" v-model="reportState" width="500">
    <v-card>
      <v-toolbar class="main-color main-color--text"
        >Сообщение об ошибке</v-toolbar
      >
      <div class="pa-5">
        <v-form @submit.prevent>
          <v-text-field
            label="Номер задания"
            type="number"
            v-model="taskIndex"
            :rules="positiveNumberRules"
          />
          <v-textarea
            v-model="comment"
            rows="1"
            auto-grow
            row-height="15"
            label="Комментарий"
          />
        </v-form>
        <v-card-actions class="justify-space-between">
          <v-btn @click="send" class="main-color main-color--text"
            >Отправить</v-btn
          >
          <v-btn text @click="toggleReportModal(false)">Закрыть</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Api from "@/mixins/api";

import Validation from "@/mixins/validation.js";

export default {
  name: "report",
  data: function() {
    return {};
  },
  methods: {
    ...mapMutations(["toggleReportModal", "setReportData"]),
    async send() {
      let editLink =
        "https://edu.chicaga.ru/admin/lesson/edit/" +
        this.reportData.lessonLink.split("/").slice(-1)[0];
      let r = await this.sendMail({
        to: "a.sokolov@chicaga.ru",
        subject: "Обнаружена ошибка в задании!!!",
        data: `
          <h2>Ошибка в задании ${this.reportData.taskIndex}</h2>
          <p>
            <bold>Репорт отправлен со <a href="${this.reportData.lessonLink}">страницы</a> <br>
            <bold><a href="${editLink}">Ссылка для редактирования</a> <br>
            <bold>Номер (название) страницы</bold>: ${this.reportData.pageName} <br>
            <bold>Номер задания</bold>: ${this.reportData.taskIndex} <br>
            <bold>Комментарий</bold>: <br> ${this.reportData.comment} <br>
          </p>
        `
      });
      this.toggleReportModal();
      if (r.success) {
        this.$store.commit("pushShuckbar", {
          success: true,
          val: "Спасибо! Ваше обращение успешно отправлено"
        });
      } else {
        this.$store.commit("pushShuckbar", {
          success: false,
          val: "Что-то пошло не так. Попробуйте отправить обращение позже"
        });
      }
    }
  },
  computed: {
    ...mapGetters(["reportOpen", "reportData"]),
    reportState: {
      get() {
        return this.reportOpen;
      },
      set(value) {
        this.toggleReportModal(value);
      }
    },
    taskIndex: {
      get() {
        return isNaN(this.reportData.taskIndex) ||
          this.reportData.taskIndex == ""
          ? ""
          : Number(this.reportData.taskIndex);
      },
      set(val) {
        this.setReportData({
          ...this.reportData,
          taskIndex: val
        });
      }
    },
    comment: {
      get() {
        return this.reportData.comment;
      },
      set(val) {
        this.setReportData({
          ...this.reportData,
          comment: val
        });
      }
    }
  },
  components: {},
  props: [],
  mixins: [Validation, Api],
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass"></style>
