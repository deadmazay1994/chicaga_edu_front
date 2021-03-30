<template>
  <v-dialog class="report vue-component" v-model="reportState" width="500">
    <v-card>
      <v-toolbar class="main-color main-color--text" dark
        >Сообщение об ошибке</v-toolbar
      >
      <div class="pa-5">
        <v-form>
          <v-text-field
            label="Номер задания"
            type="number"
            v-model="taskIndex"
            :rules="positiveNumberRules"
          />
          <v-textarea
            v-model="comment"
            rows="1"
            row-height="15"
            label="Комментарий"
          />
        </v-form>
        <v-card-actions class="justify-space-between">
          <v-btn class="main-color main-color--text">Отправить</v-btn>
          <v-btn text @click="toggleReportModal(false)">Закрыть</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import Validation from "@/mixins/validation.js";

export default {
  name: "report",
  data: function() {
    return {};
  },
  methods: {
    ...mapMutations(["toggleReportModal", "setReportData"])
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
  mixins: [Validation],
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass"></style>
