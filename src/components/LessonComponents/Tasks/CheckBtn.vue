<template>
  <!-- <v-btn
    @click="check"
    class="check-btn vue-component main-color main-color--text mt-2"
    >Проверить</v-btn
  > -->
  <c-btn @click="check">Проверить</c-btn>
  <!-- <button class="red-btn" @click="check"></button> -->
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "check-btn",
  data: function() {
    return {};
  },
  methods: {
    ...mapMutations(["setPointByType"]),
    check() {
      // this.$parent Это таск
      if (this.$parent.sendTaskToTeacher) {
        this.$parent.sendTaskToTeacher();
      }
      if (this.$parent.check) {
        this.$parent.check().then(res => {
          this.setPointByType(res); // передать данные...
        });
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
