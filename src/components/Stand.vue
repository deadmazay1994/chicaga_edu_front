<template>
  <div class="stand vue-component">
    <task-table />
  </div>
</template>

<script>
import TaskTable from "@/components/TaskModule/Widjets/Table"

export default {
  name: "stand",
  data: function() {
    return {

    };
  },
  methods: {},
  components: {
    TaskTable
  },
  props: [],
  mixins: {}
};

</script>

<style scoped="scoped" lang="sass">
.video
  flex-basis: 50%
</style>
