<template>
  <v-form
    @submit.prevent
    v-model="valid"
    class="auth-form"
    @keyup.enter.stop="login"
  >
    <auth-title>Авторизация</auth-title>
    <div class="auth-form__body">
      <label class="auth-input">
        <svg>
          <use xlink:href="#auth-person-icon"></use>
        </svg>
        <input
          style="background: transparent"
          v-model="user.email"
          type="email"
          placeholder="Электронный адрес"
          required
          :rules="emailRules"
        />
      </label>
      <label class="auth-input">
        <svg>
          <use xlink:href="#auth-pass-icon"></use>
        </svg>
        <input
          v-model="user.password"
          type="password"
          required
          placeholder="Пароль"
          :rules="passwordAuthRules"
        />
      </label>
      <router-link class="reset-password-link text-button" to="recover" link
        >Забыли пароль?</router-link
      >
    </div>
    <div class="auth-form__footer">
      <button class="auth-form__submit auth-button" @click.stop="login">
        Войти
      </button>
      <div class="auth-form__link-bar">
        <span href="#" class="auth-form__link text-button">Нет аккаунта?</span>
        <router-link to="/auth/register" class="auth-form__link text-button"
          ><strong>Зарегистрироваться</strong></router-link
        >
      </div>
    </div>
  </v-form>
</template>

<script>
import AuthTitle from "./AuthTitle";

import Validation from "@/mixins/validation.js";

export default {
  name: "login",
  data: function () {
    return {
      valid: true,
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      if (this.valid) {
        this.$store.dispatch("login", this.user);
      }
    },
  },
  computed: {
    isValid() {
      return this.valid;
    },
  },
  components: {
    AuthTitle,
  },
  props: [],
  mixins: [Validation],
  beforeMount() {},
};
</script>

<style scoped="scoped" lang="sass"></style>
