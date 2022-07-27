<template>
  <div>
    <select-chips
      :taskObject="MutatedTaskObject"
      :unique_id="unique_id"
      :singleSelect="true"
      :mutationResponse="mutation"
      :getAnswersFunction="changeAnswerRequest"
      ref="selectChips"
    />
  </div>
</template>
<script>
import SelectChips from "./SelectionBox.vue";

export default {
  name: "TF",
  components: {
    SelectChips
  },
  props: {
    taskObject: Object,
    unique_id: String
  },
  computed: {
    MutatedTaskObject() {
      let obj = this.taskObject;
      obj.body.map(element => {
        element.answers = [{ text: "true" }, { text: "false" }];
      });
      return obj;
    }
  },
  methods: {
    check() {
      return this.$refs.selectChips.check();
    },
    mutation(response) {
      return response.result.map(result => [result, result]);
    },
    changeAnswerRequest(selectAnswersArray) {
      return selectAnswersArray.map(row => {
        if (!Array.isArray(row)) return [];
        return row[0].selected;
      });
    }
  }
};
</script>
<style lang="sass" scoped></style>
