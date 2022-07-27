<template>
  <div class="comparison">
    <Table :tableColumns="returnColumnNames">
      <template v-slot:default="slotProps">
        <transition-group name="flip-list" tag="div" class="comparison__column">
          <template v-for="(chip, index) in selectedChipsArray">
            <template v-if="slotProps.columnIndex === index % 2">
              <chip
                class="comprasion__item"
                :key="index"
                :checkText="true"
                :text="chip.w1 ? chip.w1 : chip.w2"
                :selected="chip.selected"
                :state="chip.state"
                @click="selectChip(chip)"
              />
              <!-- Вызываем метод для вычисления текущей колонки -->
              {{ returnColumnIndex(chip, slotProps.columnIndex) }}
            </template>
          </template>
        </transition-group>
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
      select: false,
      chipSwaped: false
    };
  },
  props: {
    taskObject: Object,
    unique_id: String
  },
  computed: {
    returnColumnNames() {
      return Object.keys(this.taskObject.addons).map(addon => ({
        name: this.taskObject.addons[addon]
      }));
    }
  },
  methods: {
    shuffle(array) {
      let currentIndex = array.length,
        randomIndex;
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex]
        ];
      }

      return array;
    },
    // Метод для вычисления текущей колонки
    returnColumnIndex(chip, columnIndex) {
      this.selectedChipsArray[
        this.selectedChipsArray.indexOf(chip)
      ].column = columnIndex;
    },
    arrayMove(arr, fromIndex, toIndex) {
      let element = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
      return arr;
    },
    selectChip(object) {
      let swapChip = () => {
        // Меняем местами чипсы
        // Пояснение: pastChip - чипс который мы нажали первым, currChip - чипс который мы нажали вторым
        if (!this.selectedChip) return;
        // проверка на текущую колонку (нельзя производить замену между чипсами
        // из одной и той же колонки)
        if (this.selectedChip.column === this.selectedChipsArray[index].column)
          return;
        // Фиксируем pastChip
        this.pastSelectedChip = this.selectedChip;
        // Находим чипс на который нам нужно свапнуть currChip
        let targetRow = this.selectedChipsArray.find(
          chip =>
            chip.index === this.pastSelectedChip.index &&
            chip.column === this.selectedChipsArray[index].column
        );
        let targetRowIndex = this.selectedChipsArray.indexOf(targetRow);

        // Сохраняем селект в переменную. Используется для замены элементов массива
        let savedSelect = this.selectedChipsArray[targetRowIndex];
        let savedSelectIndex = this.selectedChipsArray[targetRowIndex].index;

        // Собственно замена элементов массива "selectedChipsArray" (замена чипсов)
        // стоит знать, что нужно ещё и заменить индексы элементов
        this.selectedChipsArray[targetRowIndex].index = this.selectedChipsArray[
          index
        ].index;
        this.selectedChipsArray[index].index = savedSelectIndex;
        this.selectedChipsArray[targetRowIndex] = this.selectedChipsArray[
          index
        ];
        this.selectedChipsArray[index] = savedSelect;

        // Обновляем перменные для currChip и pastChip
        this.pastSelectedChip = undefined;
        this.selectedChip = undefined;
        this.chipSwaped = true;
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
      if (!this.chipSwaped) {
        this.selectedChip = this.selectedChipsArray[index];
      }
      this.chipSwaped = false;
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

      this.displayResults(result.result.l1);
      return {
        value: result.points,
        type: this.taskObject.type,
        // В answer передаем l1 свойство
        // на самом деле тут должна быть другая логика
        // l1 это ряд. По факту в l1 все ряды (значения массива)
        answer: result.result.l1
      };
    },
    displayResults(results) {
      results.map((result, i) => {
        this.selectedChipsArray
          .filter(chip => chip.index === i)
          .map(chip => (chip.state = result ? "success" : "error"));
      });
    }
  },
  mounted() {
    this.taskBody = this.taskObject.body;
    let arr1 = this.shuffle(this.taskBody.map(item => item.w1));
    let arr2 = this.shuffle(this.taskBody.map(item => item.w2));
    this.taskBody = this.taskBody.map((_, i) => {
      return { w1: arr1[i], w2: arr2[i] };
    });
    this.taskBody.map((wordObject, i) => {
      for (let prop in wordObject) {
        this.selectedChipsArray.push({
          // Устанавливаем начальные значения свойств
          // объектов массива "taskObject.body"
          [prop]: wordObject[prop],
          index: i,
          column: undefined,
          selected: false,
          lang: prop === "w1" ? 1 : 2,
          state: "default"
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
