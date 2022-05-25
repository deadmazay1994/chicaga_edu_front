<template>
  <div class="comparison">
    <Table :taskBody="taskObject.body" :comparisonMode="true" />
  </div>
</template>

<script>
// import Chip from "../Widjets/Chip";
import Table from "../Widjets/Table.vue";

export default {
  name: "Comparison",
  components: {
    // Chip,
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
    // this.taskBody = this.taskObject.body;
  }
};
</script>

<style lang="sass" scoped></style>
