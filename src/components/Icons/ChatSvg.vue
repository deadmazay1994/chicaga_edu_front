<template>
  <div class="chat-svg" @click="clickElem">
    <svg
      v-if="!chatOff"
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.81818 0H18.1818C19.1818 0 20 0.8 20 1.77778V14.2222C20 15.2 19.1818 16 18.1818 16H1.81818C0.818182 16 0 15.2 0 14.2222V1.77778C0 0.8 0.818182 0 1.81818 0ZM14 14H18V2H14V14ZM12 2H2V14H12V2Z"
        fill="white"
      />
    </svg>
    <svg
      v-if="chatOff"
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.81818 0H18.1818C19.1818 0 20 0.8 20 1.77778V14.2222C20 15.2 19.1818 16 18.1818 16H1.81818C0.818182 16 0 15.2 0 14.2222V1.77778C0 0.8 0.818182 0 1.81818 0ZM14 0H12V16H14V0Z"
        fill="white"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "ChatSvg",
  data() {
    return {
      chatOff: false
    };
  },
  methods: {
    clickElem() {
      this.$emit("clickElem");
      this.chatOff = !this.chatOff;
    }
  }
};
</script>

<style lang="sass" scoped>
.chat-svg
  cursor: pointer
  display: flex
  align-items: center
  justify-content: center
</style>
