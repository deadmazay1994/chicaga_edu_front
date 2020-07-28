<template>
  <div class="comparison vue-component">
    <description>{{ input.description }}</description>
    <div class="d-flex">
      <div class="comp__col">
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
        <draggable :list="l2" @change="reset">
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
  </div>
</template>

<script>
import Description from "./TasksDescription";

import Draggable from "vuedraggable";

export default {
  name: "comparison",
  data: function() {
    return {
      l1: [],
      l2: [],
      res: []
    };
  },
  methods: {
    setShuffled() {
      this.l1 = this.shuffle(this.input.body).map(w => w.word1);
      // Нужно чтобы перемешалось по разному
      setTimeout(() => {}, 10);
      this.l2 = this.shuffle(this.input.body).map(w => w.word2);
      this.l1.forEach(() => {
        this.res.push(null);
      });
    },
    check() {
      this.l1.forEach((word, i) => {
        let original = this.input.body.find(words => words.word1 == word);
        // Vue не умеет изменять значение массивов на прямую
        // Нужно изменять так как это указано ниже
        if (this.l2[i] == original.word2) {
          this.$set(this.res, i, true);
        } else {
          this.$set(this.res, i, false);
        }
      });
    },
    statusClass(i) {
      return {
        "table-item--correct": this.res[i] == true,
        "table-item--uncorrect": this.res[i] == false
      };
    },
    reset() {
      for (let i = 0; i < this.res.length; i++) {
        this.$set(this.res, i, null);
      }
    }
  },
  computed: {},
  components: {
    Description,
    Draggable
  },
  props: ["input"],
  mixins: {},
  beforeMount() {
    this.setShuffled();
  }
};
</script>

<style scoped="scoped" lang="sass">
@import "@/components/Sass/Varibles.sass"

.comp
  &__col
    margin-right: 2px
</style>
