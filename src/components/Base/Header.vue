<template>
  <div class="header-app vue-component">
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <template v-if="!user">
        <span class="header__sign" @click="showSignIn">Вход</span>
      </template>
      <!-- <span class="mx-1">/</span>
      <span class="header__sign">Регистрция</span>-->
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "header-app",
  data: function() {
    return {};
  },
  methods: {
    showSignIn() {
      this.$store.commit("showSignIn");
    }
  },
  computed: {
    ...mapGetters(["user"])
  },
  components: {},
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
.header
  &__sign
    cursor: pointer
</style>
