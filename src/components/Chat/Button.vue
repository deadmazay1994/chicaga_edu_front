<template>
  <button class="button-chat vue-component">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "button-chat",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped">
.button-chat {
  border-radius: 55px;
  background: #fff;
  border: 1px solid #e3eaee;
  padding: 11px 45px;
  outline: none;
  transition: 0.2s;
  font-weight: bold;
}

.button-chat:active {
  background: #eee;
}
</style>
