<template>
  <button class="demo-lesson-results-button vue-component">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "demo-lesson-results-button",
  components: {},
  data: function() {
    return {};
  },
  props: [],
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="sass">
.demo-lesson-results-button
  background: linear-gradient(180deg, #F67A84 0%, #E35056 100%)
  padding: 16px 62px
  color: #FFFFFF
  box-shadow: 0px 3px 0px 0px #D63437
  border-radius: 10px
</style>
