<template>
  <v-btn
    @click="check"
    class="check-btn vue-component main-color main-color--text mt-2"
    >Проверить</v-btn
  >
</template>

<script>
export default {
  name: "check-btn",
  data: function() {
    return {};
  },
  methods: {
    check() {
      // this.$parent Это таск
      if (this.$parent.sendTaskToTeacher) {
        this.$parent.sendTaskToTeacher();
      }
      if (this.$parent.check) {
        this.$parent.check();
      }
      if (this.$parent.onChangeTask) {
        this.$parent.onChangeTask();
      }
      this.$parent.$children.forEach(child => {
        if (child.sendData) {
          child.sendData();
        }
      });
    }
  },
  computed: {},
  components: {},
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass"></style>
