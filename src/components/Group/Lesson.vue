<template>
  <v-card class="lesson vue-component pa-5">
    <div class="lesson__title text-h4">{{ lesson.lesson.name }}</div>
    <div class="question__title text-h4">{{ lesson.time ? new Date() }}</div>
   
  </v-card>
</template>

<script>
export default {
  name: "lesson",
  data: function() {
    return {
    };
  },
  methods: {
  },
  computed: {},
  components: {},
  props: ["lesson"],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="scss">
  .lesson {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
</style>
