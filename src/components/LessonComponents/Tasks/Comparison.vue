<template>
  <div class="comparison vue-component">
    <description>{{ inputCopy.description }}</description>
    <div class="d-flex">
      <div class="comp__col">
        <div class="table-title">{{ inputCopy.addons.t1 }}</div>
        <draggable :list="l1" @change="reset">
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
        <div class="table-title">{{ inputCopy.addons.t2 }}</div>
        <draggable :list="l2" @change="onChange">
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

import Draggable from "vuedraggable";

import Methods from "@/mixins/tasks";
import { mapGetters, mapMutations } from "vuex";

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
    },
    check() {
      this.error = false;
      this.l1.forEach((word, i) => {
        let original = this.inputCopy.body.find(words => words.w1 == word);
        // Vue не умеет изменять значение массивов на прямую
        // Нужно изменять так как это указано ниже
        if (this.l2[i] == original.w2) {
          this.$set(this.res, i, true);
        } else {
          this.$set(this.res, i, false);
          this.error = true;
        }
      });
    },
    statusClass(i) {
      return {
        "table-item--correct": this.res[i] == true,
        "table-item--uncorrect": this.res[i] == false
      };
    },
    onChange() {
      this.reset();
      this.onChangeTask();
    },
    reset() {
      for (let i = 0; i < this.res.length; i++) {
        this.$set(this.res, i, null);
      }
    }
  },
  computed: {
    ...mapGetters(["socket"])
  },
  components: {
    Description,
    Draggable
  },
  props: ["input", "index"],
  mixins: [Methods],
  beforeMount() {
    this.setInputCopy();
    this.setShuffled();
    console.log(this.input);
  }
};
</script>

<style scoped="scoped" lang="sass">
@import "@/components/Sass/Varibles.sass"

.comp
  &__col
    margin-right: 2px
</style>
