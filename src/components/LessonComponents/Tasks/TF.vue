<template>
  <div class="tf-task vue-component">
    <description :index="index">{{ inputCopy.description }}</description>
    <table>
      <tr v-for="(tf, index) in inputCopy.body" :key="index">
        <td class="table-item" :class="statusClass(tf)">
          <span class="mr-5">{{ tf.text }}</span>
        </td>
        <td class="table-item" :class="statusClass(tf)">
          <v-radio-group row v-model="tf.correct" :mandatory="false">
            <v-radio
              label="T"
              :class="vRadioStatus(tf)"
              :value="true"
              :color="getColor(tf)"
              @click.native="onChangeTask"
            ></v-radio>
            <v-radio
              label="F"
              :class="vRadioStatus(tf)"
              :value="false"
              :color="getColor(tf)"
              @click.native="onChangeTask"
            ></v-radio>
          </v-radio-group>
        </td>
      </tr>
    </table>

    <slot></slot>
  </div>
</template>

<script>
import Description from "./TasksDescription";

import { mapGetters, mapMutations } from "vuex";

import api from "@/mixins/api";

export default {
  name: "tf-task",
  data: function() {
    return {
      task: {},
      inputCopy: {},
      error: true
    };
  },
  methods: {
    ...mapMutations(["saveTask", "setPointByType"]),
    async getLesson() {
      let r = await api.methods.getFullLesson(this.$route.params.id);
      return {
        type: r.lesson[this.activeGroupIndexLesson].tasks[0].type,
        section: r.lesson[this.activeGroupIndexLesson].tasks[0].section,
        id: r.id
      };
    },
    async check() {
      this.error = false;
      let answers = [];
      const TYPE_CHECK = "true_or_false";
      this.inputCopy.body.forEach(e => {
        answers.push(e.correct);
      });
      let r = await this.getLesson();
      const data = {
        type: "lesson",
        type_check: r.type,
        section: r.section,
        answer: answers
      };
      let result = await api.methods.taskCheck(this.$route.params.id, data); // mock
      this.setPointByType({ value: 999, type: data.type_check });
      this.inputCopy.body.forEach((e, i) => {
        e.error = result[i];
      });
      this.$forceUpdate();
      return { value: result.points, type: TYPE_CHECK };
    },
    showAnswers() {
      this.inputCopy.body.forEach(e => {
        this.$set(e, "correct", e.right ? true : false);
      });
    },
    statusClass(tf) {
      return {
        "table-item--correct": tf.error == 0,
        "table-item--uncorrect": tf.error == 1
      };
    },
    getColor(tf) {
      if (tf.error != null) {
        return "white";
      }
    },
    vRadioStatus(tf) {
      return { "v-radio--white": tf.error != null };
    }
  },
  computed: { ...mapGetters(["socket", "activeGroupIndexLesson"]) },
  components: {
    Description
  },
  props: ["input", "index"],
  beforeMount() {
    this.setInputCopy();
    this.inputCopy.body.forEach(e => {
      if (!e.right) {
        e.right = false;
      }
    });
  }
};
</script>

<style scoped="scoped">
.question-field {
  width: 100px;
}
</style>

<style lang="sass">
.v-radio--white label
  color: #fff !important
</style>
