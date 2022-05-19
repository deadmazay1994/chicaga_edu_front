<template>
  <div class="messages__controls" ref="form">
    <div class="textarea-chat__ctrl textarea-ctrl">
      <div
        class="textarea-ctrl__item textarea-ctrl__attachment"
        style="position: relative"
      >
        <v-icon color="#030303">mdi-plus</v-icon>
        <span
          v-show="files.length && files[0] !== null"
          class="textarea-ctrl__attach-have"
        ></span>
        <input
          type="file"
          ref="fileInput"
          class="textarea-ctrl__attachment-input"
        />
      </div>
    </div>
    <textarea
      name="msg"
      placeholder="Сообщение"
      class="messages__controls__textarea"
      v-model="msgText"
      v-on:keyup.enter.exact="enter()"
      rows="1"
    ></textarea>
    <div class="emoji">
      <Picker
        v-if="showEmoji"
        ref="emojiSheet"
        class="emoji-sheet"
        :data="emojiIndex"
        :set="native"
        :emojiSize="30"
        @select="sendEmoji"
      />
      <smile @click="showEmojiSheet()" />
    </div>
    <svg class="messages__controls__svg" v-on:click="send()">
      <use xlink:href="#forward"></use>
    </svg>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import data from "emoji-mart-vue-fast/data/all.json";
import "emoji-mart-vue-fast/css/emoji-mart.css";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast";

let emojiIndex = new EmojiIndex(data);

import Smile from "./icons/Smile.vue";

export default {
  name: "textarea-chat",
  data: function() {
    return {
      files: [],
      msgText: "",
      emojiIndex: emojiIndex,
      emojisOutput: "",
      showEmoji: false
    };
  },
  methods: {
    send() {
      this.files = [];
      this.chatDriver.activeChannel.sendMessage(this.msgText, [
        ...this.$refs.fileInput.files
      ]);
      this.msgText = "";
    },
    getFile() {
      return this.$refs.fileInput.files[0];
    },
    enter() {
      if (this.msgText || (this.files.length && this.files[0] !== null))
        this.send();
    },
    sendEmoji(emoji) {
      this.emojisOutput = this.emojisOutput + emoji.native;
      this.msgText += emoji.native;
    },
    showEmojiSheet() {
      this.showEmoji = !this.showEmoji;
    }
  },
  computed: mapGetters(["chatDriver"]),
  watch: {
    getAttachments() {
      this.files.push(this.getAttachments.name);
    }
  },
  components: { Picker, Smile },
  props: [],
  mixins: {},
  mounted() {
    let form = this.$refs.form;
    form.onkeyup = e => {
      if (e.keyCode == 13 && e.ctrlKey) {
        this.msgText += "\r\n";
      }
    };
  }
};
</script>

<style lang="sass" scoped="scoped">
.messages__controls__textarea
  font-family: Manrope, sans-serif
  font-weight: 500
  padding: 10px 0 10px 10px
  background: hsla(0, 0%, 50%, .1)
  border-radius: 10px
  border: 0
  width: 65%

  &::-webkit-file-upload-button
    width: 30px !important

span[aria-hidden="true"]
  display: none

#whiteboardContainer
  height: 700px !important

.textarea-ctrl__attachment-input
  position: absolute
  width: 100%
  height: 200%
  border-radius: 100%
  cursor: pointer
  top: -100%
  outline: none
  opacity: 0

.textarea-ctrl__item
  border: 1px solid #e3eaee
  border-radius: 100%
  width: 35px
  height: 35px
  display: flex
  justify-content: center
  align-items: center
  margin-left: 7px
  cursor: pointer
  position: relative

.textarea-ctrl__item:active
  background: #eee

.textarea-ctrl__attach-have
  display: block
  width: 10px
  height: 10px
  background: #ccad72
  position: absolute
  top: 0px
  right: 0px
  border-radius: 100%

.emoji
  position: relative
  .emoji-sheet
    position: absolute
    left: -349px
    top: -420px
    z-index: 1
</style>
