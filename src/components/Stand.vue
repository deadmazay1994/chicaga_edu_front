<template>
  <div class="stand vue-component">
    <div class="row">
      <Picker :data="emojiIndex" @select="showEmoji" />
    </div>

    <div class="row">
      <div>
        {{ emojisOutput }}
      </div>
    </div>
  </div>
</template>

<script>
import data from "emoji-mart-vue-fast/data/all.json";
import "emoji-mart-vue-fast/css/emoji-mart.css";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast";

let emojiIndex = new EmojiIndex(data);

export default {
  name: "stand",
  data: function() {
    return {
      emojiIndex: emojiIndex,
      emojisOutput: ""
    };
  },
  methods: {
    showEmoji(emoji) {
      this.emojisOutput = this.emojisOutput + emoji.native;
    }
  },
  computed: {},
  components: { Picker },
  props: [],
  mixins: {},
  beforeMount() {},
  mounted() {
    console.log(data);
  }
};
</script>

<style scoped="scoped" lang="sass">
.row
  display: flex
.row > *
  margin: auto
</style>
