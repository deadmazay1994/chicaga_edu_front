<template>
  <div class="register vue-component">
    <auth-title>Регистрация</auth-title>
    <v-form v-model="valid" :lazy-validatio="true">
      <v-text-field
        type="email"
        required
        v-model="user.email"
        :rules="emailRules"
        label="Email"
      />
      <v-text-field
        type="password"
        required
        v-model="user.password"
        :rules="passwordRules"
        label="Пароль"
      />
      <v-text-field
        type="password"
        required
        v-model="repeatPassword"
        label="Повторите пароль"
      />
      <v-divider class="mb-5"></v-divider>
      <v-btn
        large
        class="main-color main-color--text mt-5"
        block
        @click="register"
        >Зарегистрироваться</v-btn
      >
    </v-form>
  </div>
</template>

<script>
import AuthTitle from "./AuthTitle";

import Validation from "@/mixins/validation.js";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "register",
  data: function() {
    return {
      valid: true,
      user: {
        email: "",
        password: ""
      },
      repeatPassword: ""
    };
  },
  methods: {
    ...mapActions,
    register() {
      if (this.valid) {
        this.$store.dispatch("register", this.user);
        this.$router.push({
          path: "/lk/my-coursers"
        });
        this.$store.commit("pushShuckbar", {
          val: "Вы успешно зарегистрировались",
          success: true
        });
      } else {
        this.$store.commit("pushShuckbar", {
          val: "Вы допустили ошибку при заполнении формы",
          success: false
        });
      }
    }
  },
  computed: {
    ...mapGetters
  },
  components: {
    AuthTitle
  },
  props: [],
  mixins: [Validation],
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass"></style>
