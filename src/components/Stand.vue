<template>
  <div class="stand vue-component">
    <div class="class">
      <ui-button></ui-button>
      <c-btn>
        Текст
      </c-btn>
    </div>
  </div>
</template>

<script>
import UiButton from "@/components/Ui/Button.vue";
import CBtn from "./UiElements/C-btn.vue";

export default {
  name: "stand",
  data: function() {
    return {};
  },
  methods: {},
  components: {
    UiButton,
    CBtn
  },
  props: [],
  mixins: {}
};
</script>

<style scoped="scoped" lang="sass">
.class
  flex-basis: 100%
</style>
