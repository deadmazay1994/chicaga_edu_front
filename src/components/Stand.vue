<template>
  <div class="stand vue-component">
    <inner-c />
  </div>
</template>

<script>
import InnerC from "@/components/Lk/TestIntro.vue";
export default {
  name: "stand",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {
    InnerC
  },
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass"></style>
