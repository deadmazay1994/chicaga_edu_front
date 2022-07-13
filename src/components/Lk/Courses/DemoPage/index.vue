<template>
  <div class="demo-page vue-component">
    <demo-description />
  </div>
</template>

<script>
import DemoDescription from "./DemoDescription.vue";

export default {
  name: "demo-page",
  components: {
    DemoDescription
  },
  data: function() {
    return {};
  },
  props: [],
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="sass">
.demo-page
  padding: 32px
  font-weight: 400
  font-size: 16px
  line-height: 1.5
  color: #323232
</style>
