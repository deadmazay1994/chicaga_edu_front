<template>
  <div class="results vue-component">
    <div>
      <span class="text-h6">Сделано заданий неправильно:</span>
      <span class="text-h6 bold">{{ errorsNum }}</span>
    </div>
    <div>
      <span class="text-h6">Заданий всего:</span>
      <span class="text-h6 bold">{{ tasksNum }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "results",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
  props: ["errorsNum", "tasksNum"],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass"></style>
