<template>
  <div class="recover vue-component">
    <auth-title>Восстановление пароля</auth-title>
    <v-stepper v-model="currentStep">
      <v-stepper-header>
        <v-stepper-step :complete="currentStep > 1" step="1"
          >Выслать</v-stepper-step
        >
        <v-divider></v-divider>
        <v-stepper-step :complete="currentStep > 2" step="2"
          >Проверить</v-stepper-step
        >
        <v-divider></v-divider>
        <v-stepper-step :complete="currentStep > 3" step="3"
          >Указать</v-stepper-step
        >
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-form v-model="valid">
            <v-text-field
              label="Введите свой E-mail"
              v-model="email"
              type="email"
              required
              :rules="emailRules"
              :lazy-validation="true"
            ></v-text-field>
            <v-divider class="my-2"></v-divider>
            <div class="text-subtitle-1 d-block text-right">
              <router-link to="/auth/login" link
                >Вернуться на страницу авторизации</router-link
              >
            </div>
            <v-divider class="mt-2"></v-divider>
            <v-btn
              large
              class="main-color main-color--text mt-5"
              block
              @click="recover"
              >Восстановить пароль</v-btn
            >
          </v-form>
        </v-stepper-content>
        <v-stepper-content step="2">
          <div class="text-h">
            На ваш почтовый ящик пришло письмо с инструкцией для смены пароля.
            <br />
            Если письмо так и не пришло на ваш почтовый ящик, то, возможно оно
            оказалось в папке спам.
            <br />
            Популярные почтовые сервисы
            <ul>
              <li>
                <a target="_blank" href="https://mail.google.com">Gmail</a>
              </li>
              <li>
                <a target="_blank" href="https://mail.yandex.ru"
                  >Яндекс почта</a
                >
              </li>
              <li><a target="_blank" href="https://mail.ru">Mail.ru</a></li>
            </ul>
          </div>
          <v-divider class="mt-2"></v-divider>
          <div class="text-subtitle-1 d-block text-right">
            <router-link to="/auth/login" link
              >Вернуться на страницу авторизации</router-link
            >
          </div>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-form v-model="validNewPassword">
            <v-text-field
              label="Введите новый пароль"
              v-model="newPassword"
              :lazy-validation="true"
              :rules="passwordRules"
              type="password"
            />
            <v-text-field
              label="Повторите новый пароль"
              v-model="newPasswordRepeat"
              :lazy-validation="true"
              :rules="passwordRules"
              type="password"
            />
            <v-divider class="my-2"></v-divider>
            <div class="text-subtitle-1 d-block text-right">
              <router-link to="/auth/login" link
                >Вернуться на страницу авторизации</router-link
              >
            </div>
            <v-divider class="mt-2"></v-divider>
            <v-btn
              large
              class="main-color main-color--text mt-5"
              block
              @click="setNewPassword"
              >Указать новый пароль</v-btn
            >
          </v-form>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import AuthTitle from "./AuthTitle";

import Validation from "@/mixins/validation.js";
import { mapActions } from "vuex";

export default {
  name: "recover",
  data: function() {
    return {
      email: "",
      currentStep: 1,
      valid: true,
      validNewPassword: true,
      newPassword: "",
      newPasswordRepeat: ""
    };
  },
  methods: {
    ...mapActions(["recoverPassword"]),
    ...mapActions({
      setNewPasswordAction: "setNewPassword"
    }),
    async recover() {
      if (this.valid) {
        if (await this.recoverPassword(this.email)) {
          this.currentStep = 2;
        }
      }
    },
    async setNewPassword() {
      if (this.newPassword != this.newPasswordRepeat) {
        this.alertError("Пароли не совпадают");
        return "";
      }
      if (this.validNewPassword) {
        let staus = await this.setNewPasswordAction({
          password: this.newPassword,
          passwordConfirmed: this.newPasswordRepeat,
          token: this.$route.params.hash
        });
        if (staus) this.$router.push({ name: "login" });
      }
    }
  },
  computed: {},
  components: {
    AuthTitle
  },
  props: [],
  mixins: [Validation],
  beforeMount() {
    if (this.$route.params.hash) {
      this.currentStep = 3;
    }
  }
};
</script>

<style scoped="scoped" lang="sass"></style>
