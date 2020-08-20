<template>
  <div class="select-true vue-component">
    <description>{{ inputCopy.description }}</description>
  </div>
</template>

<script>
import Description from "./TasksDescription";

export default {
  name: "select-true",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {
    Description
  },
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass"></style>
