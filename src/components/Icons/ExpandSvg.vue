<template>
  <div class="expand-svg" @click="clickElem" @keyup.esc="onEsc">
    <svg
      v-if="!expanded"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.00025 6L0.00024519 6L0.000244141 0H6.00024L6.00024 2L2.00024 2L2.00025 6ZM9.95947 2V0H15.9595V6H13.9595V2H9.95947ZM13.9595 14H9.95947V16H15.9595V10H13.9595V14ZM0 9.99951H2V13.9995H6V15.9995H0V9.99951Z"
        fill="white"
      />
    </svg>
    <svg
      v-if="expanded"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.00024 0H6.00024L6.00024 6L0.000244141 6L0.000244315 4L4.00024 4L4.00024 0Z"
        fill="white"
      />
      <path
        d="M15.9595 4.00012V6.00012L9.95947 6.00012L9.95947 0.000122833L11.9595 0.000122658L11.9595 4.00012H15.9595Z"
        fill="white"
      />
      <path
        d="M11.9595 12H15.9595L15.9595 10L9.95947 10L9.95947 16L11.9595 16V12Z"
        fill="white"
      />
      <path
        d="M6 15.9995H4L4 11.9995L0 11.9995V9.99951L6 9.99951L6 15.9995Z"
        fill="white"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "ExpandSvg",
  props: {
    expanded: Boolean
  },
  methods: {
    clickElem() {
      this.$emit("clickElem");
    },
    onEsc() {
      this.$emit("onEsc");
    }
  }
};
</script>

<style lang="sass" scoped>
.expand-svg
  cursor: pointer
  display: flex
  align-items: center
  justify-content: center
</style>