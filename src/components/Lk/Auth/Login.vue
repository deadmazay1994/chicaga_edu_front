<template>
  <v-form v-model="valid" class="login vue-component">
    <auth-title>Авторизация</auth-title>
    <v-text-field
      label="Email"
      v-model="user.email"
      type="email"
      required
      :rules="emailRules"
      :lazy-validatio="true"
    ></v-text-field>
    <v-text-field
      label="Пароль"
      v-model="user.password"
      type="password"
      required
      :rules="passwordAuthRules"
    ></v-text-field>
    <v-divider class="mb-2"></v-divider>
    <router-link to="recover" class="text-subtitle-1 d-block text-right"
      >Забыли пароль?</router-link
    >
    <v-divider class="mt-2"></v-divider>
    <v-btn large class="main-color main-color--text mt-5" block @click="login"
      >Войти</v-btn
    >
  </v-form>
</template>

<script>
import AuthTitle from "./AuthTitle";

import Validation from "@/mixins/validation.js";

export default {
  name: "login",
  data: function() {
    return {
      valid: true,
      user: {
        email: "test@mail.ru",
        password: "password"
      }
    };
  },
  methods: {
    login() {
      if (this.valid) {
        this.$store.dispatch("login", this.user);
        this.$router.push({
          path: "/lk/my-coursers"
        });
        this.$store.commit("pushShuckbar", {
          val: "Вы успешно авторизовались",
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
  computed: {},
  components: {
    AuthTitle
  },
  props: [],
  mixins: [Validation],
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass"></style>
