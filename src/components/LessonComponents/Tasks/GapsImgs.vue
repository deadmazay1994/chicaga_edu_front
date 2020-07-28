<template>
  <div class="gaps-imgs vue-component">
    <description>{{ inputCopy.description }}</description>
    <!-- <div class="d-flex">
      <div v-for="(item, i) in inputCopy.body" :key="i" class="gaps-imgs__col">
        <div class="table-title">{{ item.title }}</div>
        <div class="table-item" v-for="(task, i) in item.tasks" :key="i + 'b'">
          <gap ref="gap" :sentence="task.text" :img="task.img" />
        </div>
      </div>
    </div>-->
    <table>
      <tr>
        <th class="table-title" v-for="(item, i) in inputCopy.body" :key="i">
          {{ item.title }}
        </th>
      </tr>
      <tr v-for="(item, i) in tasks" :key="i + 'a'">
        <td class="table-item" v-for="(task, i) in item" :key="i + 'b'">
          <gap ref="gap" :sentence="task.text" :img="task.img" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Description from "./TasksDescription";
import Gap from "./FillGapsItem";

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
    }
  },
  computed: {
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
  props: ["input", "saved"],
  mixins: {},
  beforeMount() {
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
