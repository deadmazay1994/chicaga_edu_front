<template>
  <div>
    <!-- <div v-for="(item, index) in taskObject" :key="index">
      {{ item }}
    </div> -->
    {{ MutatedTaskObject }}
    <select-chips :taskObject="MutatedTaskObject" :unique_id="unique_id" />
  </div>
</template>
<script>
import SelectChips from "./SelectionBox.vue";

export default {
  name: "TF",
  components: {
    SelectChips
  },
  data() {
    return {
      MutatedTaskObject: null
    };
  },
  props: {
    taskObject: Object,
    unique_id: String
  },
  mounted() {
    this.MutatedTaskObject = this.taskObject;
    this.MutatedTaskObject.body.map(element => {
      element.answers = [{ text: true }, { text: false }];
    });
    console.log("taskObject:", this.MutatedTaskObject);
    console.log("taskObject body:", this.taskObject.body);
  }
};
</script>
<style lang="sass" scoped></style>
