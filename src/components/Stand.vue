<template>
  <div class="stand vue-component">
    <tariff
      v-for="(tariff, index) in tariffes"
      :key="index"
      :tariffData="tariff"
    />
    <c-input
      class="settings-fields__input"
      :class="{ 'settings-fields__input--error': telegramError }"
      type="text"
      name="telegram"
      placeholder="@name"
      aria-label="Поле для ввода никнейма в телеграме"
      :maxlength="30"
      :padding="{ y: 12, x: 16 }"
      v-model="telegram"
    />
    <button @click="test()">test</button>
  </div>
</template>

<script>
import api from "@/mixins/api";
import Tariff from "./Tariff";
export default {
  name: "stand",
  data: function() {
    return {
      tariffes: undefined,
      telegram: null
    };
  },
  methods: {
    async setTariff() {
      const result = await api.methods.getTariffData();
      this.tariffes = result.tariffes;
    },
    validTelegram(telegram) {
      let re = /.*\B@(?=\w{5,32}\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*.*/;
      return re.test(telegram);
    },
    test() {
      console.log(this.validTelegram(this.telegram));
    }
  },
  computed: {},
  components: {
    Tariff
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
