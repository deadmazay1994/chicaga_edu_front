<template>
  <div
    class="syllable d-flex vue-component table-item"
    :class="{
      'syllable--correct': correct == true,
      'syllable--uncorrect': correct == false
    }"
  >
    <div
      class="syllable__sy"
      v-for="(sy, i) in input.slogs"
      :key="i"
      @click="
        activate(i);
        onChange();
      "
      :class="{
        'syllable__sy--active': i == activeIndex,
        'syllable__sy--correct': correct == true && i == activeIndex,
        'syllable__sy--uncorrect': correct == false && i == activeIndex
      }"
    >
      {{ sy }}
    </div>
  </div>
</template>

<script>
export default {
  name: "syllable",
  data: function() {
    return {
      answer: "",
      activeIndex: -1,
      correct: null
    };
  },
  methods: {
    activate(index) {
      this.activeIndex = index;
      this.answer = this.input.slogs[index];
      this.correct = null;
    },
    check() {
      if (this.input.answer == this.answer) {
        this.correct = true;
      } else {
        this.correct = false;
      }
      return !this.correct;
    },
    onChange() {
      this.sendData();
    },
    sendData() {
      this.$emit("sendChanges", {
        data: this._data,
        index: this.index
      });
    }
  },
  computed: {},
  components: {},
  props: ["input", "index", "childSaved"],
  mixins: {},
  beforeMount() {
    if (this.childSaved) {
      this._data = this.childSaved[this.index];
    }
  }
};
</script>

<style scoped="scoped" lang="sass">
@import "@/components/Sass/Varibles.sass"

.syllable
  margin-right: 25px
  &__sy
    position: relative
    padding: 0px 3px
    margin: 0 1px
    cursor: pointer
    font-size: 1.2rem
    &:after
      position: absolute
      right: -1px
      top: 10%
      content: ""
      width: 1px
      height: 80%
      background: #000
    &:last-child:after
      display: none
    &--active
      border-bottom: 2px solid #000
    &--correct
      border-bottom: 2px solid $success_color--text
    &--uncorrect
      border-bottom: 2px solid $error_color--text
  &--correct
    background: $success_color
    color: $success_color--text
    .syllable__sy
      &:after
        background: $success_color--text
  &--uncorrect
    background: $error_color
    color: $error_color--text
    .syllable__sy
      &:after
        background: $error_color--text
</style>
