<template>
  <div class="auth-form">
    <auth-title>Сброс пароля</auth-title>
    <template v-if="currentStep === 1">
      <v-form v-model="valid" class="auth-form">
        <div class="auth-form__body">
          <p class="red-msg">
            <strong>Мы вышлем ссылку для сброса пароля на вашу почту</strong>
          </p>
          <label class="auth-input">
            <input
              v-model="email"
              type="email"
              required
              :rules="emailRules"
              :lazy-validation="true"
              placeholder="example@email.com"
            />
          </label>
        </div>
        <div class="auth-form__footer">
          <button
            :disabled="!email"
            class="auth-form__submit auth-button"
            @click="recover"
          >
            Восстановить пароль
          </button>
          <div class="auth-form__link-bar">
            <router-link to="/auth/login" class="auth-form__link arrow-link"
              >Вернуться к авторизации</router-link
            >
          </div>
        </div>
      </v-form>
    </template>
    <template v-if="currentStep === 2">
      <div class="auth-form">
        <div class="auth-form__body">
          <p class="auth-msg red-text">
            Мы отправили ссылку для восстановления доступа к вашему аккаунту на
            адрес {{ email }}
          </p>
        </div>
      </div>
    </template>
    <template v-if="currentStep === 3">
      <div class="auth-form__body">
        <label class="auth-input">
          <input
            placeholder="Введите новый пароль"
            v-model="newPassword"
            :lazy-validation="true"
            :rules="passwordRules"
            type="password"
          />
        </label>
        <label class="auth-input">
          <input
            placeholder="Повторите новый пароль"
            v-model="newPasswordRepeat"
            :lazy-validation="true"
            :rules="passwordRules"
            type="password"
          />
        </label>
      </div>
      <div class="auth-form__footer">
        <button
          :disabled="this.newPassword != this.newPasswordRepeat"
          class="auth-form__submit auth-button"
          @click="setNewPassword"
        >
          Указать новый пароль
        </button>
        <div class="auth-form__link-bar">
          <router-link to="/auth/login" class="auth-form__link arrow-link"
            >Вернуться к авторизации</router-link
          >
        </div>
      </div>
    </template>
    <!--        <v-stepper-content step="2">-->
    <!--          <div class="text-h">-->
    <!--            На ваш почтовый ящик пришло письмо с инструкцией для смены пароля.-->
    <!--            <br />-->
    <!--            Если письмо так и не пришло на ваш почтовый ящик, то, возможно оно-->
    <!--            оказалось в папке спам.-->
    <!--            <br />-->
    <!--            Популярные почтовые сервисы-->
    <!--            <ul>-->
    <!--              <li>-->
    <!--                <a target="_blank" href="https://mail.google.com">Gmail</a>-->
    <!--              </li>-->
    <!--              <li>-->
    <!--                <a target="_blank" href="https://mail.yandex.ru"-->
    <!--                  >Яндекс почта</a-->
    <!--                >-->
    <!--              </li>-->
    <!--              <li><a target="_blank" href="https://mail.ru">Mail.ru</a></li>-->
    <!--            </ul>-->
    <!--          </div>-->
    <!--          <v-divider class="mt-2"></v-divider>-->
    <!--          <div class="text-subtitle-1 d-block text-right">-->
    <!--            <router-link to="/auth/login" link-->
    <!--              >Вернуться на страницу авторизации</router-link-->
    <!--            >-->
    <!--          </div>-->
    <!--        </v-stepper-content>-->
    <!--        <v-stepper-content step="3">-->
    <!--          <v-form v-model="validNewPassword">-->
    <!--            <v-text-field-->
    <!--              label="Введите новый пароль"-->
    <!--              v-model="newPassword"-->
    <!--              :lazy-validation="true"-->
    <!--              :rules="passwordRules"-->
    <!--              type="password"-->
    <!--            />-->
    <!--            <v-text-field-->
    <!--              label="Повторите новый пароль"-->
    <!--              v-model="newPasswordRepeat"-->
    <!--              :lazy-validation="true"-->
    <!--              :rules="passwordRules"-->
    <!--              type="password"-->
    <!--            />-->
    <!--            <v-divider class="my-2"></v-divider>-->
    <!--            <div class="text-subtitle-1 d-block text-right">-->
    <!--              <router-link to="/auth/login" link-->
    <!--                >Вернуться на страницу авторизации</router-link-->
    <!--              >-->
    <!--            </div>-->
    <!--            <v-divider class="mt-2"></v-divider>-->
    <!--            <v-btn-->
    <!--              large-->
    <!--              class="main-color main-color&#45;&#45;text mt-5"-->
    <!--              block-->
    <!--              @click="setNewPassword"-->
    <!--              >Указать новый пароль</v-btn-->
    <!--            >-->
    <!--          </v-form>-->
    <!--        </v-stepper-content>-->
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
