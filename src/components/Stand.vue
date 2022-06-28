<template>
  <div class="stand vue-component">
    <tariff
      v-for="(tariff, index) in tariffes"
      :key="index"
      :tariffData="tariff"
    />
  </div>
</template>

<script>
import api from "@/mixins/api";
import Tariff from "./Tariff";
// import InnerBlock from "@/components/CourseProgram/";
export default {
  name: "stand",
  data: function() {
    return {
      tariffes: undefined
    };
  },
  methods: {
    async setTariff() {
      const result = await api.methods.getTariffData();
      this.tariffes = result.tariffes;
    }
  },
  computed: {},
  components: {
    Tariff
    // InnerBlock
  },
  beforeMount() {
    this.setTariff();
  }
};
</script>

<style scoped="scoped" lang="sass">
.stand
  height: 100% // без этого свойства не будет работать прокрутка внутри компонента
</style>
