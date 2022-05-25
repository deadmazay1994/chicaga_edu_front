<template>
  <div class="d-table vue-component">
    <div class="d-table__table">
      <div class="d-table__head">
        <div
          class="d-table__title"
          v-for="(column, index) in tableData"
          :key="index"
          style="width: 25%"
          @click="clickColumn(index)"
        >
          {{ column.name }}
        </div>
        <!-- <div class="d-table__title" style="width: 25%">
          food
        </div>
        <div class="d-table__title" style="width: 25%">
          technology technology
        </div>
        <div class="d-table__title" style="width: 25%">
          sports
        </div>
        <div class="d-table__title" style="width: 25%">
          placesplacesplacesplaces
        </div> -->
      </div>
      <div class="d-table__body">
        <div
          class="d-table__field"
          v-for="(column, index) in tableData"
          :key="index"
          style="width: 25%"
          @click="clickColumn(index)"
        >
          <chip
            v-for="(chip, i) in emptyChipsArray[index]"
            :key="i"
            :text="(chip.word) ? chip.word : null"
            :checkText="true"
            @click="deleteChip(index, i)"
          />
        </div>
        <!-- <div class="d-table__field" style="width: 25%">
          chipchipchipchipchipchipchipchipchipchip
        </div>
        <div class="d-table__field" style="width: 25%">
          chip
        </div>
        <div class="d-table__field" style="width: 25%">
          chip
        </div>
        <div class="d-table__field" style="width: 25%">
          chip
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Chip from "../Widjets/Chip";

export default {
  name: "",
  data: function() {
    return {
      tableData: undefined,
      emptyChipsArray: []
    };
  },
  methods: {
    clickColumn(index) {
      this.$emit("click", index);
    },
    clickHeaderColumn() {
      console.log("header column");
      // this.$emit("clickHeaderColumn");
    },
    clickBodyColumn() {
      // this.$emit("clickBodyColumn");
      console.log("body column");
    },
    setChip(selectedChip, columnIndex) {
      this.emptyChipsArray[columnIndex].push(selectedChip);
    },
    deleteChip(row, i) {
      console.log("массив1", this.emptyChipsArray);
      console.log("массив2", this.emptyChipsArray[row]);
      console.log("массив3", this.emptyChipsArray[row][i]);
      console.log("до", this.emptyChipsArray);
      this.emptyChipsArray[row].splice(i, 1);
      console.log("после", this.emptyChipsArray);
    }
  },
  computed: {
    // tableData() {
    //   let tableDataArray = this.taskBody;
    //   console.log(tableDataArray);
    //   tableDataArray.map(() => {
    //     this.emptyChipsArray.push([]);
    //   });
    //   return tableDataArray;
    // }
  },
  components: {
    Chip
  },
  props: {
    taskBody: Array
  },
  mixins: {},
  beforeMount() {},
  mounted() {
    this.tableData = this.taskBody;
    console.log(this.tableData);
    this.tableData.map(() => {
      // console.log("-",element);
      this.emptyChipsArray.push([]);
    });
    console.log(this.emptyChipsArray);
  }
};
</script>

<style scoped="scoped" lang="sass">
.d-table
  width: 100%
  &__table
    width: 100%
    display: flex
    flex-direction: column
    min-height: 240px
    font-weight: 500
    font-size: 16px
    line-height: 20px
    word-wrap: break-word
  &__head
    display: flex
    align-items: center
    width: 100%
    text-align: center
    color: #303030
    background: linear-gradient(180deg, #fff4f7 0%, #fcdbe3 100%)
    border-top-right-radius: 10px
    border-top-left-radius: 10px
  &__title
    flex-grow: 1
    padding: 10px
  &__body
    display: flex
    flex-grow: 1
    width: 100%
    min-height: 200px
    background-color: #ffffff
    border: 1px solid #e8e8e8
    border-bottom-right-radius: 10px
    border-bottom-left-radius: 10px
  &__field
    flex-grow: 1
    padding: 9px
  &__field:not(:last-child)
    border-right: 2px solid #e8e8e8
</style>
