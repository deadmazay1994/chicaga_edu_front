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
          @input="updateFileInput"
          ref="fileInput"
          class="textarea-ctrl__attachment-input"
        />
      </div>
    </div>
    <input
      name="msg"
      placeholder="Сообщение"
      class="messages__controls__textarea"
      :value="getInput"
      @input="updateInput"
      v-on:keyup.enter="enter()"
    />
    <svg class="messages__controls__svg" v-on:click="send()">
      <use xlink:href="#forward"></use>
    </svg>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "textarea-chat",
  data: function() {
    return {
      files: []
    };
  },
  methods: {
    send() {
      this.files = [];
      this.$store.dispatch("sendMsg");
      this.$store.commit("updateInput", "");
      this.$store.commit("updateFile", null);
      this.$store.commit("updatePreload", "");
    },
    getFile() {
      return this.$refs.fileInput.files[0];
    },
    updateInput(e) {
      this.$store.commit("updateInput", e.target.value);
    },
    updateFileInput() {
      this.$store.commit("updateFile", this.getFile());
    },
    enter() {
      if (this.getInput || (this.files.length && this.files[0] !== null))
        this.send();
    }
  },
  computed: mapGetters(["allMsgs", "getRocket", "getInput", "getAttachments"]),
  watch: {
    getAttachments() {
      this.files.push(this.getAttachments.name);
    }
  },
  components: {},
  props: [],
  mixins: {},
  mounted() {
    let form = this.$refs.form;
    form.onkeyup = e => {
      if (e.keyCode == 13 && e.ctrlKey) {
        this.send();
      }
    };
  }
};
</script>

<style lang="sass" scoped="scoped">
.messages__controls__textarea
  //opacity: 0;
  //position: absolute;
  //z-index: 10;
  //width: 30px;
  //top: 0;
  //left: 0;
  //overflow: hidden;

  &::-webkit-file-upload-button
    width: 30px !important

span[aria-hidden="true"]
  display: none

#whiteboardContainer
  height: 700px !important
</style>

<style scoped="scoped">
.textarea-ctrl__attachment-input {
  position: absolute;
  width: 100%;
  height: 200%;
  border-radius: 100%;
  cursor: pointer;
  top: -100%;
  outline: none;
  opacity: 0;
}
.textarea-ctrl__item {
  border: 1px solid #e3eaee;
  border-radius: 100%;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 7px;
  cursor: pointer;
  position: relative;
}
.textarea-ctrl__item:active {
  background: #eee;
}
.textarea-ctrl__attach-have {
  display: block;
  width: 10px;
  height: 10px;
  background: #ccad72;
  position: absolute;
  top: 0px;
  right: 0px;
  border-radius: 100%;
}
</style>
