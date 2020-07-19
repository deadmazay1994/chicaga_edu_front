<template>
  <form class="textarea-chat vue-component" ref="form">
    <textarea
      name="msg"
      class="textarea-chat__textarea"
      :value="getInput"
      @input="updateInput"
    ></textarea>
    <div class="textarea-chat__ctrl textarea-ctrl">
      <div class="textarea-ctrl__item textarea-ctrl__attachment">
        <input
          type="file"
          @input="updateFileInput"
          ref="fileInput"
          class="textarea-ctrl__attachment-input"
        />
        <svg
          width="22"
          height="24"
          viewBox="0 0 22 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.0181 20.6287C3.04396 18.9116 2.02155 15.096 3.73868 12.1218L8.09793 4.57137C8.32751 4.17373 8.83526 4.03835 9.23212 4.26747C9.6291 4.49667 9.76573 5.00409 9.53615 5.40173L5.1769 12.9522C3.9181 15.1325 4.66749 17.9313 6.84846 19.1905C9.02943 20.4497 11.828 19.6993 13.0868 17.519L17.6537 9.60893C18.4549 8.22113 17.9778 6.44041 16.59 5.63917C15.202 4.83785 13.4213 5.31499 12.6201 6.70279L8.46836 13.8938C8.12506 14.4884 8.32949 15.2518 8.92424 15.5952C9.51899 15.9385 10.2823 15.7339 10.6256 15.1393L14.5697 8.30788C14.7993 7.91023 15.3071 7.77485 15.7039 8.00397C16.1009 8.23317 16.2375 8.74059 16.008 9.13823L12.0639 15.9696C11.2626 17.3574 9.48175 17.8345 8.09396 17.0332C6.70617 16.232 6.22889 14.4512 7.03013 13.0634L11.1819 5.87243C12.4406 3.69225 15.2392 2.94169 17.4203 4.20095C19.6013 5.46013 20.3506 8.25911 19.0919 10.4393L14.525 18.3493C12.8079 21.3235 8.99225 22.3459 6.0181 20.6287Z"
            fill="#96AEBA"
          />
        </svg>
        <span
          v-show="files.length && files[0] != null"
          class="textarea-ctrl__attach-have"
        ></span>
      </div>
      <div class="textarea-ctrl__item textarea-ctrl__send" v-on:click="send()">
        <svg
          width="18"
          height="15"
          viewBox="0 0 18 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.7634 0.10334C17.5909 -0.0189101 17.3644 -0.0354101 17.1769 0.0628399L0.301856 8.87534C0.102356 8.97959 -0.0153939 9.19259 0.00110611 9.41684C0.0183561 9.64184 0.167606 9.83384 0.379856 9.90659L5.07111 11.5101L15.0619 2.96759L7.33086 12.2818L15.1931 14.9691C15.2516 14.9886 15.3131 14.9991 15.3746 14.9991C15.4766 14.9991 15.5779 14.9713 15.6671 14.9173C15.8096 14.8303 15.9064 14.6841 15.9311 14.5198L17.9936 0.64484C18.0244 0.43484 17.9359 0.22634 17.7634 0.10334Z"
            fill="#96AEBA"
          />
        </svg>
      </div>
    </div>
  </form>
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
      this.$store.commit("updateFile", "");
    },
    getFile() {
      return this.$refs.fileInput.files[0];
    },
    updateInput(e) {
      this.$store.commit("updateInput", e.target.value);
    },
    updateFileInput() {
      this.$store.commit("updateFile", this.getFile());
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

<style scoped="scoped">
.textarea-chat {
  position: relative;
}
.textarea-chat__textarea {
  width: 100%;
  padding: 20px;
  padding-right: 100px;
  display: block;
  border: 0;
  border-top: 1px solid #e3eaee;
  resize: none;
  outline: none;
  outline-color: invert;
}
.textarea-chat__textarea:focus {
  border-top: 1px solid #ccad72;
}
.textarea-chat__ctrl {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
}
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
