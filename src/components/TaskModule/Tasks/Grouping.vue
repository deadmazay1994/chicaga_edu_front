<template>
  <div class="grouping">
    {{ selectedChip }}
    <br />
    {{ taskBody }}
    <hr />
    {{ selectedChipsArray }}
    <div class="grouping__header">
      <chip
        v-for="(chip, index) in selectedChipsArray"
        :key="index"
        :text="chip.word"
        :checkText="true"
        :state="chip.state"
        :selected="chip.selected"
        @click="selectChip(index)"
      />
    </div>
    <Table
      :taskBody="taskObject.body"
      @click="clickTableColumn"
      @undisabledChip="undisabledChip"
      ref="table"
    />
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
    selectChip(i) {
      // Убираем выделение остальных чипсов и выделяем только один
      this.selectedChipsArray.map(chip => (chip.selected = false));
      this.selectedChipsArray[i].selected = !this.selectedChipsArray[i]
        .selected;
      // Присваем значение в data самого объекта чипса и его индекса
      this.selectedChip = this.selectedChipsArray[i];
      this.selectedChipIndex = i;
    },
    clickTableColumn(columnIndex) {
      this.$refs.table.setChip(this.selectedChip, columnIndex);
      // Обвноляем переменные
      // Убираем выделение всех чипсов
      // Возвращаем selectedChip с изначальным значением
      this.selectedChipsArray.map(chip => (chip.selected = false));
      this.selectedChip = undefined;
      // disable на выбранный сверху чипс
      this.defaultChip = this.selectedChipsArray[this.selectedChipIndex];
      this.selectedChipsArray[this.selectedChipIndex].state = "empty";
    },
    undisabledChip(chip) {
      // console.log(this.selectedChipsArray.indexOf(chip));
      // this.selectedChipsArray[
      //   this.selectedChipsArray.indexOf(chip)
      // ] = this.defaultChip;
      this.$set(this.defaultChip.state, "state", "default");
      console.log(
        "+",
        this.selectedChipsArray[this.selectedChipsArray.indexOf(chip)]
      );
      console.log(this.defaultChip);
      this.$set(
        this.selectedChipsArray,
        this.selectedChipsArray.indexOf(chip),
        this.defaultChip
      );
      // let findedChip = this.selectedChipsArray.filter(
      //   headerChip => headerChip.word === chip.word
      // )[0];
      // findedChip.state = "default";
      // let index = this.selectedChipsArray.indexOf(findedChip);
      // // let obj = (this.selectedChipsArray[index].state = "default");
      // this.selectedChipsArray[index] = findedChip;
    }
  },
  mounted() {
    this.taskBody = this.taskObject.body;
    this.taskObject.body.map(object => {
      object.words.map(word => {
        this.selectedChipsArray.push({
          word: word,
          selected: false,
          state: "default"
        });
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
