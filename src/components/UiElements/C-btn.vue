<template>
  <button :class="btnClass" :disabled="isDisabled" @click="$emit('btn-event')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "C-btn",
  props: {
    btnClass: String,
    isDisabled: Boolean,
  },
};
</script>

<style>
.red-btn {
  cursor: pointer;
  pointer-events: all !important;
  background: rgba(255, 53, 53);
  border-radius: 40px;
  padding: 1rem;
  transition: all 0.5s ease;
  color: #ffffff;
  -webkit-box-shadow: 3px 3px 15px 3px #ffffff80 inset;
  -moz-box-shadow: 3px 3px 15px 3px #ffffff80 inset;
  box-shadow: 3px 3px 15px 3px #ffffff80 inset;
  text-align: center;
  font-style: normal;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.18em;
  max-width: 315px;
  width: 100%;
}
.red-btn:disabled,
.red-btn[disabled] {
  background: #fab5b4;
  -webkit-box-shadow: inset 3px 3px 15px 3px rgba(255, 245, 245, 0.5);
  -moz-box-shadow: inset 3px 3px 15px 3px rgba(255, 245, 245, 0.5);
  box-shadow: inset 3px 3px 15px 3px rgba(255, 245, 245, 0.5);
  pointer-events: none;
}
</style>