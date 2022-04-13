<template>
  <div class="comparison vue-component">
    <description :index="index">{{ inputCopy.description }}</description>
    <div class="d-flex" ref="colsWrap">
      <div class="comp__col">
        <div class="table-title" v-if="inputCopy.addons.t1">
          {{ inputCopy.addons.t1 }}
        </div>
        <draggable v-model="l1" @change="onChange">
          <div
            class="comp__item table-item"
            :class="statusClass(i)"
            v-for="(word, i) in l1"
            :key="i"
          >
            {{ word }}
          </div>
        </draggable>
      </div>
      <div class="comp__col">
        <div class="table-title" v-if="inputCopy.addons.t2">
          {{ inputCopy.addons.t2 }}
        </div>
        <draggable v-model="l2" @change="onChange">
          <div
            class="comp__item table-item"
            :class="statusClass(i)"
            v-for="(word, i) in l2"
            :key="i"
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

import Draggable from "./ComprassionDraggable";

import { mapGetters, mapMutations } from "vuex";

import api from "@/mixins/api";

export default {
  name: "comparison",
  data: function() {
    return {
      l1: [],
      l2: [],
      res: [],
      inputCopy: {},
      error: true
    };
  },
  methods: {
    ...mapMutations(["saveTask"]),
    setShuffled() {
      this.l1 = this.shuffle(this.inputCopy.body).map(w => w.w1);
      // Нужно чтобы перемешалось по разному
      setTimeout(() => {}, 10);
      this.l2 = this.shuffle(this.inputCopy.body).map(w => w.w2);
      this.l1.forEach(() => {
        this.res.push(null);
      });
      this.onChange();
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
      let answers = [this.l1, this.l2];
      this.getLesson().then(res => {
        const data = {
          type: "lesson",
          type_check: res.type,
          section: res.section,
          answer: answers
        };
        let result = api.methods.taskCheck(this.$route.params.id, data); // mock
        result.then(res => {
          this.l1.forEach((_, i) => {
            // Vue не умеет изменять значение массивов на прямую
            // Нужно изменять так как это указано ниже
            // https://ru.vuejs.org/v2/guide/reactivity.html
            this.$set(this.res, i, res[i]);
          });
        });
      });
    },
    showAnswers() {
      this.l1.forEach((word, i) => {
        let original = this.inputCopy.body.find(words => words.w1 == word);
        this.$set(this.l2, i, original.w2);
        // Vue не умеет изменять значение массивов на прямую
        // Нужно изменять так как это указано ниже
      });
    },
    statusClass(i) {
      return {
        "table-item--correct": this.res[i] == true,
        "table-item--uncorrect": this.res[i] == false
      };
    },
    onChange() {
      this.resetHeight();
      this.reset();
      this.onChangeTask();
      this.setRowHeights();
    },
    reset() {
      for (let i = 0; i < this.res.length; i++) {
        this.$set(this.res, i, null);
      }
    },
    resetHeight() {
      if ("querySelectorAll" in this.$refs.colsWrap) {
        if (this.$refs.colsWrap.querySelectorAll(".comp__item")) {
          this.$refs.colsWrap.querySelectorAll(".comp__item").forEach(item => {
            item.style.height = "auto";
          });
        }
      }
    },
    setRowHeights() {
      // let cols = this.$refs.colsWrap.querySelectorAll(".comp__col");
      // cols[0].querySelectorAll(".comp__item").forEach((item, index) => {
      //   let maxH = this.getMaxHeightColsInRow(item, cols, index);
      //   cols.forEach(col => {
      //     col.querySelectorAll(".comp__item")[index].style.height = maxH + "px";
      //   });
      // });
    },
    getMaxHeightColsInRow(first, cols, rowIndex) {
      let maxHeight = first.offsetHeight;
      for (let i = 1; i < cols.length; i++) {
        let currentrCol = cols[i].querySelectorAll(".comp__item")[rowIndex];
        maxHeight =
          currentrCol.offsetHeight > maxHeight
            ? currentrCol.offsetHeight
            : maxHeight;
      }
      return maxHeight;
    }
  },
  computed: {
    ...mapGetters(["socket", "activeGroupIndexLesson"])
  },
  components: {
    Description,
    Draggable
  },
  props: ["input", "index"],
  beforeMount() {
    this.setInputCopy();
    this.setShuffled();
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.resetHeight();
      this.setRowHeights();
    });
  }
};
</script>

<style scoped="scoped" lang="sass">
@import "@/assets/styles/variables.sass"

.comp
  &__col
    margin-right: 2px
</style>
