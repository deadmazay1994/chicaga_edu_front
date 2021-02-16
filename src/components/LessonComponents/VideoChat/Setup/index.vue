<template>
  <v-dialog width="800" class="setup vue-component" v-model="t">
    <v-card>
      <v-container>
        <div class="setup__title text-h3 text-center">
          Мастер настройки связи
        </div>
        <div class="setup__step text-center mt-3 text-h4">
          ШАГ {{ activeStep + 1 }}
        </div>
        <component class="setup__component mt-3" :is="currentComponent" />
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import Permission from "./Permission";

export default {
  name: "setup",
  data: function() {
    return {
      t: true,
      activeStep: 0,
      componentsList: [Permission]
    };
  },
  methods: {},
  computed: {
    currentComponent() {
      return this.componentsList[this.activeStep];
    }
  },
  components: {
    Permission
  },
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
@import "@/components/Sass/Varibles.sass"

.setup
  &__step
    color: $main_color
    text-transform: uppercase
    font-weight: bold
</style>

<style lang="sass">
.setup
  &__component
    font-size: 18px
</style>
