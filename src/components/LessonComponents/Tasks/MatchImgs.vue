<template>
  <div class="task-match vue-component">
    <description :index="index">{{ inputCopy.description }}</description>
    <v-row style="align-items: interit; margin-bottom: 15px">
      <v-col
        cols="12"
        lg="6"
        class="pr-10 img-task d-flex align-end"
        v-for="(group, index) in task.shuffled"
        :key="index"
      >
        <v-img v-zoom contain :src="group.img" />
        <span :class="answeredImg(index)" class="img-index white--text">{{
          index + 1
        }}</span>
      </v-col>
    </v-row>
    <div
      class="d-flex align-center flex-wrap"
      v-for="(group, index) in task.shuffled"
      :key="index"
    >
      <span :class="answeredImg(index)" class="gap-index white--text">{{
        index + 1
      }}</span>
      <gap
        :sentence="group.word"
        :index="index"
        :childSaved="childSaved"
        ref="gap"
        class="fill-gaps__item"
        @sendChanges="onChange"
        @oncheck="oncheck"
      />
      <!-- <v-text-field
          class="number mr-3 task-match__match-inp pa-0"
          style="text-align: center"
          v-model="task.answers[index]"
          @change="onChangeTask"
        ></v-text-field> -->
      <!-- <span>{{ group.word }}</span> -->
    </div>
    <slot></slot>
  </div>
</template>

<script>
import Description from "./TasksDescription";
import Gap from "./FillGapsItem";

import Zoom from "@/directives/zoom";
import { mapGetters, mapMutations } from "vuex";

import api from "@/mixins/api";

export default {
  name: "task-match",
  data: function() {
    return {
      task: {
        shuffled: [],
        answers: []
      },
      inputCopy: {},
      error: true
    };
  },
  methods: {
    ...mapMutations(["saveTask", "saveChildTask"]),
    onChange(data) {
      // Если у учителя как-то отличаются данные родительского компонента
      // То их надо обновить
      // Обновляем
      this.onChangeTask();
      // Эти данные нужны чтобы обновить дочерний компонент, а не родительский
      // В данном случае дочерний это syllable
      data.childIndex = data.index;
      data.childRef = "gap";
      this.sendTaskToTeacher(this.index, data);
    },
    oncheck(data) {
      let error = 0;
      data.result.forEach(r => (error = r.correct));
      this.task.shuffled[data.index].correct = error;
      // this.$set(this.task.shuffled, data.index, !error);
    },
    setShuffled() {
      // Если прогресса нет
      if (!this.task.shuffled.length) {
        // this.shuffle(this.inputCopy.body).forEach(task => {
        this.inputCopy.body.forEach(task => {
          console.log(task);
          this.task.shuffled.push({
            img: task.file.file_name_abs,
            word: task.word,
            correct: -1
          });
        });
      }
    },
    getGroup(number) {
      for (const i in this.inputCopy.body) {
        if (this.inputCopy.body[i].number == number) {
          return this.inputCopy.body[i];
        }
      }
    },
    setAnswers() {
      this.inputCopy.body.forEach(() => this.task.answers.push(""));
    },
    async getLesson() {
      let r = await api.methods.getFullLesson(this.$route.params.id);
      return {
        type: r.lesson[this.activeGroupIndexLesson].tasks[0].type,
        section: r.lesson[this.activeGroupIndexLesson].tasks[0].section,
        id: r.id
      };
    },
    check() {
      this.error = false;
      this.$refs.gap.forEach(child => {
        if (!this.error) {
          this.error = child.check();
        } else {
          child.check();
        }
      });
      this.error = api.methods.taskCheck(); // mock
    },
    showAnswers() {
      if (Array.isArray(this.$refs.gap)) {
        this.$refs.gap.forEach(ref => {
          if (ref.showAnswers) {
            ref.showAnswers();
          }
        });
      }
    },
    answeredImg(i) {
      return {
        blue: this.task.shuffled[i].correct == 1,
        red: this.task.shuffled[i].correct == 0,
        "main-color": this.task.shuffled[i].correct == -1
      };
    },
    answeredText(i) {
      return {
        "blue--text": this.task.shuffled[i].correct == 1,
        "red--text": this.task.shuffled[i].correct == 0
      };
    }
  },
  computed: {
    ...mapGetters(["socket", "activeGroupIndexLesson"])
  },
  components: {
    Description,
    Gap
  },
  directives: {
    ...Zoom
  },
  props: ["input", "index", "childSaved"],
  beforeMount() {
    this.setInputCopy();
    this.setAnswers();
    this.setShuffled();
  }
};
</script>

<style scoped="scoped" lang="sass">
@import "@/assets/styles/variables.sass"

.img-task
  position: relative
.img-index
  position: absolute
  bottom: 0
  // left: -13px
  border-radius: 100%
  width: 30px
  height: 30px
  display: flex
  align-items: center
  justify-content: center
  font-size: 20px
  font-weight: bold
  // border: 2px solid $main-color--text
.gap-index
  border-radius: 100%
  width: 25px
  height: 25px
  display: flex
  align-items: center
  justify-content: center
  font-size: 14px
  font-weight: bold
  margin-right: -10px
</style>
