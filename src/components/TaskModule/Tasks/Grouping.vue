<template>
  <div class="grouping">
    <div class="grouping__header">
      <chip
        class="grouping__header__chip"
        v-for="(chip, index) in selectedChipsArray"
        :key="index"
        :text="chip.word"
        :checkText="true"
        :state="chip.state"
        :selected="chip.selected"
        @click="selectChip(chip)"
      />
    </div>
    <Table :tableColumns="taskColumns" @click="pushChipToColumn">
      <template v-slot:default="slotProps">
        <transition-group name="flip-list" class="grouping__column">
          <template v-for="(selected, index) in selectedChipsArrayToTable">
            <template v-if="selected.column === slotProps.columnIndex">
              <chip
                class="grouping__item"
                :key="index"
                :checkText="true"
                :text="selected.chip ? selected.chip.word : ''"
                @click="deleteChipFromColumn(selected)"
              />
            </template>
          </template>
        </transition-group>
      </template>
    </Table>
  </div>
</template>

<script>
import api from "@/mixins/api";

import Table from "../Widjets/Table.vue";
import Chip from "../Widjets/Chip";

export default {
  name: "Grouping",
  data() {
    return {
      taskBody: undefined,
      taskColumns: [],
      selectedChipsArray: [],
      selectedChipsArrayToTable: [],
      selectedChip: undefined,
      selectedChipIndex: undefined,
      defaultChip: undefined
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
    selectChip(chip) {
      // Выделение чипсов ставим на false
      this.selectedChipsArray.map(chip => (chip.selected = false));
      let selectedChip = this.selectedChipsArray.find(obj => obj === chip);
      selectedChip.selected = true;
      // сохраняем выделенный чипс в свойство data
      this.selectedChip = selectedChip;
    },
    // Перемещаем чипс в таблицу, i - индекс колонки
    pushChipToColumn(i) {
      if (!this.selectedChip) return;
      // Чипс который перемещен становится пустым в "grouping__header"
      let selected = this.selectedChipsArray.find(
        chip => chip === this.selectedChip
      );
      if (selected?.state) selected.state = "empty";
      // Пушим новый объект с вспомогательными свойствами
      this.selectedChipsArrayToTable.push({
        columnName: this.taskColumns[i].name,
        column: i,
        chip: this.selectedChip
      });
      // Обновляем свойства
      if (this.selectedChip) {
        this.selectedChip.selected = false;
        this.selectedChip = undefined;
      }
    },
    // Удаляем чипсы при нажатии на них в таблице
    deleteChipFromColumn(obj) {
      let targetIndex = this.selectedChipsArrayToTable.indexOf(obj);
      let targetChipIndex = this.selectedChipsArray.indexOf(obj.chip);
      this.selectedChipsArrayToTable.splice(targetIndex, 1);
      this.selectedChipsArray[targetChipIndex].state = "default";
    },
    getDataForCheck() {
      let answerArr = this.taskColumns.map(column => {
        let filterResult = this.selectedChipsArrayToTable
          .filter(object => object.columnName === column.name)
          .map(object => object.chip.word);
        return { name: column.name, words: filterResult };
      });
      return {
        type: "lesson",
        type_check: this.taskObject.type,
        section: this.taskObject.section,
        answer: answerArr
      };
    },
    async check() {
      let result = await api.methods.taskCheck(
        this.unique_id,
        this.getDataForCheck()
      );

      this.displayResults(result.result);
      return { value: result.point, type: this.taskObject.type };
    },
    displayResults(results) {
      this.taskColumns.map(column => {
        results.map(resultObj => {
          if (resultObj.name === column.name) {
            column.state = resultObj.correct;
          }
        });
      });
    }
  },
  mounted() {
    this.taskBody = this.taskObject.body;
    this.taskObject.body.map(object => {
      object.words.map(word => {
        this.selectedChipsArray.push({
          word: word,
          selected: false,
          state: "default",
          column: undefined
        });
      });
      this.taskColumns.push({ name: object.name, state: undefined });
    });
  }
};
</script>

<style lang="sass" scoped>
.grouping__header
  display: flex
  flex-wrap: wrap
  gap: 16px
  margin-bottom: 23px

.grouping__column
  height: 100%
  cursor: pointer
  display: flex
  align-items: center
  flex-direction: column
  gap: 7px

// Надо заменить анимацию
// .flip-list-move
//   transition: transform 1s
</style>
