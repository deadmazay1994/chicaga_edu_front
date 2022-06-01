<template>
  <div class="stand vue-component">
    <div class="class">
      <ui-input></ui-input>
    </div>
  </div>
</template>

<script>
import UiInput from "@/components/Ui/Input.vue";

export default {
  name: "stand",
  data: function() {
    return {};
  },
  methods: {},
  components: {
    UiInput
  },
  props: [],
  mixins: {}
};
</script>

<style scoped="scoped" lang="sass">
.class
  flex-basis: 100%
</style>
