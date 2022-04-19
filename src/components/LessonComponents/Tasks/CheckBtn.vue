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
    async check() {
      // this.$parent Это таск
      if (this.$parent.sendTaskToTeacher) {
        this.$parent.sendTaskToTeacher();
      }
      if (this.$parent.check) {
        let r = await this.$parent.check();
        console.log(r);
        this.setPointByType(r);
        // оставить для отладки
        console.log("данные $parent checkBtn.vue:", this.$parent);
        console.log("данные checkBtn.vue:", r);
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
