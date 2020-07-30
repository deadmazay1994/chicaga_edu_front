<template>
  <div class="grouping vue-component">
    <description>{{ inputCopy.description }}</description>
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
          style="height: 100%; "
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
  </div>
</template>

<script>
import Description from "./TasksDescription";

import Draggable from "vuedraggable";

import Methods from "@/mixins/tasks";
import { mapGetters } from "vuex";
export default {
  name: "grouping",
  data: function() {
    return {
      shuffled: [],
      groups: [],
      inputCopy: {}
    };
  },
  methods: {
    setShuffled() {
      this.inputCopy.body.forEach(group => {
        group.words.forEach(word => {
          this.shuffled.push(word);
        });
      });
      this.shuffled = this.shuffle(this.shuffled);
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
    check() {
      this.inputCopy.body.forEach((e, i) => {
        let error = false;
        e.words.forEach(word => {
          if (!(this.groups[i].words.indexOf(word) + 1)) {
            error = 1;
          }
        });
        if (e.words.length != this.groups[i].words.length) {
          error = 1;
        }
        if (error) {
          // Vue не позволяет имзенять значения массива на прямую
          this.$set(this.groups, i, { ...this.groups[i], correct: false });
        } else {
          // Vue не позволяет имзенять значения массива на прямую
          this.$set(this.groups, i, { ...this.groups[i], correct: true });
        }
      });
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
    ...mapGetters(["socket"])
  },
  components: {
    Description,
    Draggable
  },
  props: ["input", "saved", "index"],
  mixins: [Methods],
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
