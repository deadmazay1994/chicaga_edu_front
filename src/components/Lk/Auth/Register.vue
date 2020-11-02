<template>
  <div class="register vue-component">
    <auth-title>Регистрация</auth-title>
    <v-form v-model="valid" :lazy-validatio="true">
      <v-text-field
        type="text"
        required
        v-model="user.name"
        :rules="nameRules"
        label="ФИО"
      />
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
        @keyup.enter="register"
        v-model="user.password_confirmation"
        label="Повторите пароль"
      />
      <v-divider class="mb-5"></v-divider>
      <div class="d-flex">
        <!-- <div class="text-subtitle-2">
          Я ознакомился с пользовательским соглашением
        </div> -->
        <v-checkbox required v-model="agree">
          <template v-slot:label>
            <div>
              Я ознакомился с
              <router-link to="/agree"
                >пользовательским соглашением</router-link
              >
            </div>
          </template>
        </v-checkbox>
      </div>

      <v-divider class="mb-5"></v-divider>
      <v-btn
        large
        class="main-color main-color--text mt-5"
        block
        @click="register"
        :disabled="!btnActive"
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
      repeatPassword: "",
      agree: false
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
          val: "Вы должны ознакомится с пользовательским соглашением"
        });
      }
    }
  },
  computed: {
    ...mapGetters,
    btnActive() {
      return this.agree;
    }
  },
  components: {
    AuthTitle
  },
  props: [],
  mixins: [Validation],
  beforeMount() {
    this.user.email = "";
    this.user.name = "";
    this.user.password_confirmation = "";
    this.user.password = "";
  }
};
</script>

<style scoped="scoped" lang="sass"></style>
