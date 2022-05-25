<template>
  <div class="grouping">
    {{ selectedChip }}
    <br>
    {{ taskBody }}
    <hr />
    {{ selectedChipsArray }}
    <div class="grouping__header">
      <chip
        v-for="(chip, index) in selectedChipsArray"
        :key="index"
        :text="chip.word"
        :checkText="true"
        :selected="chip.selected"
        @click="selectChip(index)"
      />
    </div>
    <Table :taskBody="taskObject.body" @click="clickTableColumn" ref="table" />
  </div>
</template>

<script>
import Table from "../Widjets/Table.vue";
import Chip from "../Widjets/Chip";

export default {
  name: "Grouping",
  data() {
    return {
      taskBody: undefined,
      selectedChipsArray: [],
      selectedChip: undefined
    };
  },
  props: {
    taskObject: Object,
    unique_id: String
  },
  components: {
    Table,
    Chip
  },
  methods: {
    selectChip(i) {
      // Убираем выделение остальных чипсов и выделяем только один
      this.selectedChipsArray.map(chip => (chip.selected = false));
      this.selectedChipsArray[i].selected = !this.selectedChipsArray[i]
        .selected;
      this.selectedChip = this.selectedChipsArray[i];
    },
    clickTableColumn(columnIndex) {
      this.$refs.table.setChip(this.selectedChip, columnIndex);
      // Обвноляем переменные
      // Убираем выделение всех чипсов
      // Возвращаем selectedChip с изначальным значением
      this.selectedChipsArray.map(chip => (chip.selected = false));
      this.selectedChip = undefined;
    }
  },
  mounted() {
    this.taskBody = this.taskObject.body;
    this.taskObject.body.map(object => {
      object.words.map(word => {
        this.selectedChipsArray.push({ word: word, selected: false });
      });
    });
  }
};
</script>

<style lang="sass" scoped>
.grouping__header
  display: flex
  flex-wrap: wrap
  gap: 16px
</style>
