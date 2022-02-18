<template>
  <button
  :class="btnClass"
  :disabled="isDisabled"
  @click="$emit('btn-event')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'C-btn',
  props: {
    btnClass: String,
    isDisabled: Boolean
  }
}
</script>