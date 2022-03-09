<template>
  <div class="auth-form register-form" @keyup.enter.stop="register">
    <div class="auth-form__header">
      <auth-title style="margin-bottom: 0">Регистрация</auth-title>
      <div class="auth-form__step">{{ step }} <span>/ 2</span></div>
    </div>
    <v-form
      @submit.prevent
      v-model="valid"
      :lazy-validatio="true"
      class="register-form"
    >
      <template v-if="step === 1">
        <div class="auth-form__body">
          <p class="auth-label">Укажите адрес электронной почты</p>
          <label class="auth-input">
            <input
              v-model="user.email"
              :rules="emailRules"
              placeholder="Email"
            />
          </label>
          <p class="auth-label">Создайте пароль</p>
          <label class="auth-input">
            <input
              type="password"
              required
              v-model="user.password"
              :rules="passwordRules"
              placeholder="Пароль"
            />
          </label>
          <p class="auth-label">Повторите пароль</p>
          <label class="auth-input">
            <input
              type="password"
              required
              v-model="user.password_confirmation"
              placeholder="Повторите пароль"
            />
          </label>
        </div>
      </template>
      <template v-else>
        <div class="auth-form__body">
          <p class="auth-label">Укажите свое ФИО</p>
          <label class="auth-input">
            <input
              type="text"
              required
              v-model="user.name"
              :rules="nameRules"
              placeholder="ФИО"
            />
          </label>
          <label class="auth-checkbox">
            <input type="checkbox" v-model="agree" />
            <span class="auth-checkbox__decor"></span>
            <p>
              Продолжая, вы принимаете
              <router-link to="/agree" class="auth-radio-link"
                >Условия использования</router-link
              >
              <br />
              Chicaga ...
            </p>
          </label>
        </div>
      </template>
      <div class="auth-form__footer">
        <button
          v-if="step === 1"
          :disabled="!validForm"
          @click="step = 2"
          class="auth-form__submit auth-button"
        >
          Далее
        </button>
        <button
          v-if="step === 2"
          :disabled="!agree && user.name !== ''"
          @click="register"
          class="auth-form__submit auth-button"
        >
          Зарегистрироваться
        </button>
        <div class="auth-form__link-bar">
          <span class="auth-form__link text-button">Уже есть аккаунт?</span>
          <router-link to="/auth/login" class="auth-form__link text-button"
            ><strong>Войти</strong></router-link
          >
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
import AuthTitle from "./AuthTitle";

import Validation from "@/mixins/validation.js";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "register",
  data: function () {
    return {
      step: 1,
      valid: true,
      user: {
        email: "",
        name: "",
        password: "",
        password_confirmation: "",
      },
      repeatPassword: "",
      agree: false,
    };
  },
  methods: {
    ...mapActions,
    register() {
      if (this.agree) {
        if (this.valid) {
          this.$store.dispatch("register", this.user);
        }
      } else {
        this.$store.commit("pushShuckbar", {
          success: false,
          val: "Вы должны ознакомится с пользовательским соглашением",
        });
      }
    },
  },
  computed: {
    validForm() {
      return (
        this.user.password &&
        this.user.password_confirmation &&
        this.user.password === this.user.password_confirmation
      );
    },
    ...mapGetters,
    btnActive() {
      return this.agree && this.valid;
    },
  },
  components: {
    AuthTitle,
  },
  props: [],
  mixins: [Validation],
  beforeMount() {
    this.user.email = "";
    this.user.name = "";
    this.user.password_confirmation = "";
    this.user.password = "";
  },
};
</script>

<style scoped="scoped" lang="sass"></style>
