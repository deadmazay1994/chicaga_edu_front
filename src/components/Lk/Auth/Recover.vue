<template>
  <v-form v-model="valid" class="recover vue-component">
    <auth-title>Восстановление пароля</auth-title>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1"
          >Указать E-mail</v-stepper-step
        >
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 2" step="2"
          >Сменить пароль</v-stepper-step
        >
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-text-field
            label="Введите свой E-mail"
            v-model="email"
            type="email"
            required
            :rules="emailRules"
            :lazy-validatio="true"
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
        </v-stepper-content>

        <v-stepper-content step="2">
          <div class="text-h">
            На ваш почтовый ящик пришлло письмо с инструкцией для смены пароля.
            <br />
            Если письмо так и не пришло на ваш почтовый ящик, то, возможно оно
            оказалось в папке спам.
          </div>
          <v-divider class="mt-2"></v-divider>
          <div class="text-subtitle-1 d-block text-right">
            <router-link to="/auth/login" link
              >Вернуться на страницу авторизации</router-link
            >
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-form>
</template>

<script>
import AuthTitle from "./AuthTitle";

import Validation from "@/mixins/validation.js";

export default {
  name: "recover",
  data: function() {
    return {
      email: "",
      e1: 1,
      valid: true
    };
  },
  methods: {
    recover() {
      if (!this.valid) {
        console.log(this.e1);
        this.$store.commit("pushShuckbar", {
          val: "Вы допустили ошибку при заполнении формы",
          success: false
        });
      } else {
        this.e1++;
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
