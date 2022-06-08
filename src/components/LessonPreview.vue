<template>
  <div class="perview vue-component">
    <div class="row justify-center">
      <div class="col-lg-6">
        <edu-panel />
      </div>
    </div>
  </div>
</template>

<script>
import EduPanel from "@/components/LessonComponents/EduPanel";

export default {
  name: "perview",
  data: function() {
    return {
      tab: null
    };
  },
  methods: {
  },
  computed: {
  },
  components: {
    EduPanel
  },
  props: [],
  mixins: {},
  async beforeMount() {
    await this.$store.dispatch("setLesson", this.$route.params.id);
  }
};
</script>

<style scoped="scoped" lang="sass"></style>
