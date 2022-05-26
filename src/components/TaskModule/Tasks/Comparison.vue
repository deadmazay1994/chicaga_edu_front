<template>
  <div class="comparison">
    {{ taskBody }}
    <Table :tableColumns="[{ name: 'Английский' }, { name: 'Русский' }]">
      <template v-for="(chip, index) in taskBody">
        <template :default="slotProps">
          <chip :key="index" :checkText="true" :text="slotProps.columnIndex" />
        </template>
      </template>
    </Table>
  </div>
</template>

<script>
import Chip from "../Widjets/Chip";
import Table from "../Widjets/Table";

export default {
  name: "Comparison",
  components: {
    Chip,
    Table
  },
  data() {
    return {
      taskBody: undefined,
      selectedChipsArray: []
    };
  },
  props: {
    taskObject: Object,
    unique_id: String
  },
  mounted() {
    this.taskBody = this.taskObject.body.map((wordObject, i) => {
      // Мутируем объекты массива добавляя в них новое свойство "language"
      // с значением для первого индекса "Английский" и "Русский" для остальных
      // учитывается, что будут переданы два объекта в массив "taskObject.body"
      wordObject.language = i === 0 ? "Английский" : "Русский";
      return wordObject;
    });
  }
};
</script>

<style lang="sass" scoped></style>
