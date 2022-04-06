<template>
  <div class="gaps-imgs vue-component">
    <description :index="index">{{ inputCopy.description }}</description>
    <table>
      <tr>
        <th class="table-title" v-for="(item, i) in inputCopy.body" :key="i">
          {{ item.title }}
        </th>
      </tr>
      <tr v-for="(item, i) in tasks" :key="i + 'a'">
        <td
          class="table-item"
          style="cursor: initial"
          v-for="(task, j) in item"
          :key="j + 'b'"
        >
          <gap
            @sendChanges="onChange"
            ref="gap"
            :sentence="task.text"
            :img="task.img"
            :childSaved="childSaved"
            :index="i * item.length + j"
          />
        </td>
      </tr>
    </table>

    <slot></slot>
  </div>
</template>

<script>
import Description from "./TasksDescription";
import Gap from "./FillGapsItem";

import { mapGetters, mapMutations } from "vuex";

import api from "@/mixins/api";

export default {
  name: "gaps-imgs",
  data: function() {
    return {
      shuffled: [],
      inputCopy: {},
      error: false
    };
  },
  methods: {
    ...mapMutations(["saveTask", "saveChildTask"]),
    check() {
      this.error = false;
      this.$refs.gap.forEach(child => {
        if (!this.error) {
          this.error = child.check();
        } else {
          child.check();
        }
      });
      this.error = api.methods.writeWordToPicture(); // mock
    },
    onChange(data) {
      // // Если у учителя как-то отличаются данные родительского компонента
      // // То их надо обновить
      // // Обновляем
      this.onChangeTask();
      // // Эти данные нужны чтобы обновить дочерний компонент, а не родительский
      // // В данном случае дочерний это syllable
      data.childIndex = data.index;
      data.childRef = "gap";
      this.sendTaskToTeacher(this.index, data);
    }
  },
  computed: {
    ...mapGetters(["socket"]),
    tasks: function() {
      let tasks = [];
      for (let i = 0; i < this.maxItemLen; i++) {
        tasks.push([]);
        this.inputCopy.body.forEach(e => {
          if (e.tasks[i] != undefined) {
            tasks[tasks.length - 1].push(e.tasks[i]);
          } else {
            tasks[tasks.length - 1].push({ text: " ", img: "" });
          }
        });
      }
      return tasks;
    },
    maxItemLen() {
      let m = 0;
      console.log(this.input);
      this.inputCopy.body.forEach(e => {
        if (e.tasks.length > m) {
          m = e.tasks.length;
        }
      });
      return m;
    }
  },
  components: {
    Description,
    Gap
  },
  props: ["input", "childSaved", "index"],
  beforeMount() {
    this.setInputCopy();
    console.log(this._data);
    // if (this.saved) {
    //   this._data = JSON.parse(this.saved);
    // } else {
    //   this.inputCopy = this.input;
    // }
  }
};
</script>

<style scoped="scoped" lang="sass">
.gaps-imgs
  &__col
    flex-direction: column
    display: inline-block
    margin-right: 2px
</style>
