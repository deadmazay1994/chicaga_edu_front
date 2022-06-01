<template>
  <div>
    <select-chips
      :taskObject="MutatedTaskObject"
      :unique_id="unique_id"
      :singleSelect="false"
      ref="selectChips"
    />
  </div>
</template>
<script>
import SelectChips from "./SelectionBox.vue";

export default {
  name: "choose-one",
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
        console.log(element);
        element.answers = this.taskObject.addons.map(a => ({ text: a }));
      });
      return obj;
    }
  },
  methods: {
    check() {
      this.$refs.selectChips.check();
    },
    mutation(response) {
      return response.result.map(result => [result, result]);
      // console.log("0", response);
      // return response.userSelected.map((row, i) => {
      //   return [

      //   ]
      // });
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
