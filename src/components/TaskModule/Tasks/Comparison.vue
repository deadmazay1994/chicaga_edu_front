<template>
  <div class="comparison">
    <div v-for="(item, index) in selectedChipsArray" :key="index">
      {{ item }}
    </div>
    <hr />
    selectedChip: {{ selectedChip }}
    <br />
    pastSelectedChip: {{ pastSelectedChip }}
    <Table :tableColumns="[{ name: 'Английский' }, { name: 'Русский' }]">
      <template v-slot:default="slotProps">
        <div class="comparison__column">
          <template v-for="(chip, index) in selectedChipsArray">
            <template v-if="slotProps.columnIndex === index % 2">
              <chip
                :key="index"
                :checkText="true"
                :text="chip.w1 ? chip.w1 : chip.w2"
                :selected="chip.selected"
                @click="selectChip(chip)"
              />
              <!-- Вызываем метод для вычисления текущей колонки -->
              {{ returnColumnIndex(chip, slotProps.columnIndex) }}
            </template>
          </template>
        </div>
      </template>
    </Table>
  </div>
</template>

<script>
import api from "@/mixins/api";

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
      selectedChipsArray: [],
      selectedChip: undefined,
      pastSelectedChip: undefined,
      select: false
    };
  },
  props: {
    taskObject: Object,
    unique_id: String
  },
  methods: {
    // Метод для вычисления текущей колонки
    returnColumnIndex(chip, columnIndex) {
      this.selectedChipsArray[
        this.selectedChipsArray.indexOf(chip)
      ].column = columnIndex;
    },
    selectChip(object) {
      let swapChip = () => {
        // Меняем местами чипсы
        // Пояснение: pastChip - чипс который мы нажали первым, currChip - чипс который мы нажали вторым
        if (!this.selectedChip) return;
        if (this.selectedChip.column === this.selectedChipsArray[index].column)
          return;
        this.pastSelectedChip = this.selectedChip;
        let targetRow = this.selectedChipsArray.find(
          chip =>
            chip.index === this.pastSelectedChip.index &&
            chip.column === this.selectedChipsArray[index].column
        );
        let targetRowIndex = this.selectedChipsArray.indexOf(targetRow);
        // this.selectedChipsArray[
        //   targetRowIndex
        // ] = this.selectedChipsArray.splice(
        //   index,
        //   1,
        //   this.selectedChipsArray[targetRowIndex]
        // )[0];
        let savedSelect = this.selectedChipsArray[targetRowIndex];
        let savedSelectIndex = this.selectedChipsArray[targetRowIndex].index;
        this.selectedChipsArray[targetRowIndex].index = this.selectedChipsArray[
          index
        ].index;
        this.selectedChipsArray[targetRowIndex] = this.selectedChipsArray[
          index
        ];
        this.selectedChipsArray[index].index = savedSelectIndex;
        this.selectedChipsArray[index] = savedSelect;
        this.pastSelectedChip = undefined;
        this.selectedChip = undefined;
      };

      let index = this.selectedChipsArray.indexOf(object);
      swapChip();
      // Убираем выделение со всех чипсов
      this.selectedChipsArray.map(chip => (chip.selected = false));

      // Выделяем чипс с нужным индексом
      this.selectedChipsArray[index].selected = !this.selectedChipsArray[index]
        .selected;

      // Убираем выделение после свапа чипсов
      if (this.select) {
        this.selectedChipsArray.map(chip => (chip.selected = false));
      }
      this.select = !this.select;

      // Сохраняем чипс
      this.selectedChip = this.selectedChipsArray[index];
    },
    getDataForCheck() {
      let answerArr = [
        this.selectedChipsArray
          .filter(chip => chip.column === 0)
          .map(chip => (chip.w1 ? chip.w1 : chip.w2)),
        this.selectedChipsArray
          .filter(chip => chip.column === 1)
          .map(chip => (chip.w1 ? chip.w1 : chip.w2))
      ];
      return {
        type: "lesson",
        type_check: this.taskObject.type,
        section: this.taskObject.section,
        answer: { l1: answerArr[0], l2: answerArr[1] }
      };
    },
    async check() {
      let result = await api.methods.taskCheck(
        this.unique_id,
        this.getDataForCheck()
      );

      return { value: result.points, type: this.taskObject.type };
    }
  },
  mounted() {
    this.taskBody = this.taskObject.body;
    this.taskObject.body.map((wordObject, i) => {
      for (let prop in wordObject) {
        this.selectedChipsArray.push({
          // Устанавливаем начальные значения свойств
          // объектов массива "taskObject.body"
          [prop]: wordObject[prop],
          index: i,
          column: undefined,
          selected: false,
          lang: prop === "w1" ? 1 : 2
        });
      }
    });
  }
};
</script>

<style lang="sass" scoped>
.comparison__column
  display: flex
  align-items: center
  flex-direction: column
  gap: 7px
</style>
