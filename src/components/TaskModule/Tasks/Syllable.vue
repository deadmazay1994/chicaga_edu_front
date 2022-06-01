<template>
  <div class="syllable">
    <div
      class="chip-section"
      v-for="(chip, row) in selectedChipsArray"
      :key="row"
    >
      <chip
        v-for="(syllable, i) in chip"
        :key="i"
        :text="syllable.text"
        :checkText="true"
        :state="syllable.state"
        :position="getSyllablePosition(i, chip.length)"
        :borderSelected="syllable.selected"
        @click="selectSyllable(row, i)"
      />
    </div>
  </div>
</template>

<script>
import api from "@/mixins/api";

import Chip from "../Widjets/Chip";

export default {
  name: "Syllable",
  components: {
    Chip
  },
  data() {
    return {
      taskBody: undefined,
      selectedChipsArray: undefined
    };
  },
  props: {
    taskObject: Object,
    unique_id: String
  },
  methods: {
    selectSyllable(row, i) {
      this.selectedChipsArray[row].forEach(chip => (chip.selected = false));
      this.selectedChipsArray[row][i].selected = !this.selectedChipsArray[row][
        i
      ].selected;
    },
    getSyllablePosition(i, wordLength) {
      if (i === 0) return "start";
      if (i === wordLength - 1) return "end";
      return "center";
    },
    getDataForCheck() {
      let result = [];
      for (const i in this.selectedChipsArray) {
        this.selectedChipsArray[i].map(syllable => {
          if (syllable.selected) result.push(syllable.text);
        });
      }
      return {
        type: "lesson",
        type_check: this.taskObject.type,
        section: this.taskObject.section,
        answer: result
      };
    },
    displayResults(results) {
      results.map((chip, i) => {
        this.selectedChipsArray[i].map(
          syllable => (syllable.state = chip ? "success" : "error")
        );
      });
    },
    async check() {
      let resut = await api.methods.taskCheck(
        this.unique_id,
        this.getDataForCheck()
      );
      this.displayResults(resut.result);
    }
  },
  mounted() {
    this.taskBody = this.taskObject.body;
    this.selectedChipsArray = this.taskBody.map(chip => {
      return chip.slogs.map(syllable => ({
        text: syllable,
        selected: false,
        state: "default"
      }));
    });
  }
};
</script>

<style lang="sass" scoped>
.syllable
  display: flex
  flex-wrap: wrap
  gap: 16px
</style>
