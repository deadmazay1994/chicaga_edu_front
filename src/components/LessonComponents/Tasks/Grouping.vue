<template>
  <div class="grouping vue-component">
    <description :index="index">{{ inputCopy.description }}</description>
    <draggable
      class="d-flex"
      style="flex-wrap: wrap"
      :list="shuffled"
      group="words"
      @change="onChange"
    >
      <span
        v-for="(word, i) in shuffled"
        :key="i"
        class="grouping__all-word table-item mb-2"
        >{{ word }}</span
      >
    </draggable>
    <div class="d-flex">
      <div class="grouping__col" v-for="(group, i) in groups" :key="i">
        <div class="table-title">{{ group.name }}</div>
        <draggable
          :list="group.words"
          group="words"
          style="height: 100%"
          @change="onChange"
        >
          <div
            class="table-item"
            v-for="(word, i) in group.words"
            :key="i"
            :class="statusClass(group)"
          >
            {{ word }}
          </div>
        </draggable>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import Description from "./TasksDescription";

import Draggable from "vuedraggable";

import api from "@/mixins/api";

import { mapGetters, mapMutations } from "vuex";
export default {
  name: "grouping",
  data: function() {
    return {
      shuffled: [],
      groups: [],
      inputCopy: {},
      error: true
    };
  },
  methods: {
    ...mapMutations(["saveTask", "saveChildTask"]),
    setShuffled() {
      this.inputCopy.body.forEach(group => {
        group.words.forEach(word => {
          this.shuffled.push(word);
        });
      });
      this.shuffled = this.shuffle(this.shuffled).filter(item => item);
    },
    setGropus() {
      this.inputCopy.body.forEach(group => {
        this.groups.push({
          name: group.name,
          words: [],
          correct: null
        });
      });
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
      let answers = [];
      this.groups.forEach(e => {
        answers.push({ words: e.words, name: e.name });
      });
      this.getLesson().then(res => {
        const data = {
          type: "dz",
          type_check: res.type,
          section: res.section,
          answer: answers
        };
        let result = api.methods.groupByDragging(res.id, data);
        result.then(res => {
          this.inputCopy.body.forEach((_, i) => {
            this.$set(this.groups, i, { ...this.groups[i], correct: res[i] });
          });
        });
      });
    },
    showAnswers() {
      this.inputCopy.body.forEach((e, i) => {
        this.groups[i].words = [];
        e.words.forEach(word => this.groups[i].words.push(word));
      });
      this.shuffled = [];
    },
    statusClass(group) {
      return {
        "table-item--correct": group.correct == true,
        "table-item--uncorrect": group.correct == false
      };
    },
    onChange() {
      this.reset();
      this.onChangeTask();
    },
    reset() {
      this.groups.forEach((group, i) => {
        this.$set(this.groups, i, { ...this.groups[i], correct: null });
      });
    }
  },
  computed: {
    ...mapGetters(["socket", "activeGroupIndexLesson"])
  },
  components: {
    Description,
    Draggable
  },
  props: ["input", "saved", "index"],
  beforeMount() {
    this.setInputCopy();
    if ("inputCopy" in this.input) {
      // Если данное свойство есть, то ученик уже проходил данный урок
      // Мы заменяем все свойства компонента на архивные
      this._data = this.input;
    } else {
      this.inputCopy = this.input;
      this.setShuffled();
      this.setGropus();
    }
    // setInterval(() => {
    //   console.log(JSON.stringify(this._data))
    // }, 5000);
  }
};
</script>

<style scoped="scoped" lang="sass">
.grouping
  &__all-word
    margin-right: 5px
    display: block
    cursor: pointer
  &__col
    margin-right: 2px
    min-height: 200px
    background: #eee
</style>
