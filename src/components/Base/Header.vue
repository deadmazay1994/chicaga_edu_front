<template>
  <div class="header-app vue-component">
    <v-app-bar fixed class="header-app__bar main-color main-color--text">
      <v-icon
        class="header-app__burger d-block d-lg-none"
        color="white"
        size="30"
        @click.native="toggleDraver"
        >mdi-menu</v-icon
      >
      <v-row>
        <v-col cols="8" md="4" class="d-flex align-center">
          <router-link to="/">
            <logo class="header-app__logo" />
          </router-link>
        </v-col>
        <v-col
          v-if="user"
          cols="8"
          md="4"
          class="align-center justify-center d-md-flex d-none"
        >
          <dict-add />
        </v-col>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
import DictAdd from "@/components/Lk/DictAdd";
import Logo from "@/components/Icons/Logo";

import { mapGetters, mapMutations } from "vuex";

export default {
  name: "header-app",
  data: function() {
    return {};
  },
  methods: {
    ...mapMutations(["toggleDraver"]),
    showSignIn() {
      this.$store.commit("showSignIn");
    }
  },
  computed: {
    ...mapGetters(["user"])
  },
  components: {
    DictAdd,
    Logo
  },
  props: [],
  mixins: {},
  beforeMount() {
    // api;
    // for (let i = 1; i < 31; i++) {
    //   let r = api.methods.register({
    //     name: "teacher" + i,
    //     email: "t@t" + i + ".ru",
    //     password: "12345678",
    //     password_confirmation: "12345678"
    //   });
    //   console.log(r);
    // }
  }
};
</script>

<style scoped="scoped" lang="sass">
@import "@/components/Sass/Varibles.sass"

.header-app
  &__logo
    transform: scale(0.8)
  &__sign
    cursor: pointer
  &__bar
    color: #000
    // background: $main_color + aa !important
</style>
