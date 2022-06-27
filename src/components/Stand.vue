<template>
  <div class="stand vue-component">
    <inner-block></inner-block>
  </div>
</template>

<script>
import InnerBlock from "@/components/CourseProgram/";
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
  height: 100% // без этого свойства не будет работать прокрутка внутри компонента
</style>
