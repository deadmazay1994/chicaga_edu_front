<template>
  <div class="stand vue-component">
    <inner-block></inner-block>
  </div>
</template>

<script>
import InnerBlock from "@/components/Lk/LevelCard";
export default {
  name: "stand",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {
    InnerBlock
  },
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
.stand
  height: 100%
</style>
