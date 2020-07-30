<template>
  <div class="gaps-imgs vue-component">
    <description>{{ inputCopy.description }}</description>
    <table>
      <tr>
        <!-- <th class="table-title" v-for="(item, i) in inputCopy.body" :key="i">
          {{ item.title }}
        </th> -->
      </tr>
      <tr v-for="(item, i) in tasks" :key="i + 'a'">
        <td class="table-item" v-for="(task, j) in item" :key="j + 'b'">
          <gap
            @sendChanges="onChange"
            ref="gap"
            :sentence="task.text"
            :img="task.img"
            :index="i * item.length + j"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Description from "./TasksDescription";
import Gap from "./FillGapsItem";

import Methods from "@/mixins/tasks";
import { mapGetters } from "vuex";

export default {
  name: "gaps-imgs",
  data: function() {
    return {
      shuffled: [],
      inputCopy: {}
    };
  },
  methods: {
    check() {
      this.$refs.gap.forEach(child => child.check());
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
  props: ["input", "saved", "index"],
  mixins: [Methods],
  beforeMount() {
    this.setInputCopy();
    if (this.saved) {
      this._data = JSON.parse(this.saved);
    } else {
      this.inputCopy = this.input;
    }
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
