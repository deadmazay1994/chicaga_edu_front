<template>
  <div class="user-settings vue-component">
    <page-title :title="pageTitle" :subtitle="subtitle" />
    <v-form v-model="valid" :lazy-validatio="true" ref="form">
      <v-row class="mt-10" style="justify-content: space-between">
        <v-col cols="12" md="6">
          <v-card class="pa-5 front" style="height: 100%">
            <div class="text-subtitle-2">Изменить ФИО</div>
            <v-text-field
              v-model="user.name"
              required
              :rules="nameRules"
              label="ФИО"
            />
            <v-divider class="mb-5"></v-divider>
            <div class="text-subtitle-2">Email</div>
            <v-text-field
              type="email"
              required
              v-model="user.email"
              :rules="emailRules"
              label="Email"
            />
            <v-divider class="mb-5"></v-divider>
            <!-- <div class="text-subtitle-2">Сменить пароль</div>
            <v-text-field
              type="password"
              v-model="additionalUserData.oldPassword"
              label="Введите старый пароль"
            />
            <v-text-field
              type="password"
              v-model="additionalUserData.newPassword"
              label="Введите новый пароль"
            />
            <v-divider class="mb-5"></v-divider>-->
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="pa-5 front" style="height: 100%">
            <div class="text-subtitle-2">
              Для загрузки аватара, нажмите на изображение
            </div>
            <div class="d-flex">
              <v-avatar
                class="pointer mt-5"
                size="90"
                @click.native="showUpladAvatar = true"
              >
                <img :src="user.avatar" alt="avatar" />
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-btn class="main-color main-color--text front" @click="safe"
        >Сохранить настройки</v-btn
      >
      <!-- // Когда будет сервер исправить  на cropUploadSuccess -->
      <upload-avatar
        langType="ru"
        field="img"
        v-model="showUpladAvatar"
        @crop-success="updateAvatar"
      />
    </v-form>
  </div>
</template>

<script>
import UploadAvatar from "vue-image-crop-upload";
import PageTitle from "@/components/Base/PageTitle";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "user-settings",
  data: function() {
    return {
      pageTitle: "Настройки",
      subtitle: "На данной странице вы можете изменить данные о себе",
      showUpladAvatar: false,
      additionalUserData: {
        oldPassword: "",
        newPassword: ""
      },
      nameRules: [
        v => !!v || "ФИО обязательное поле",
        v => (v && v.length >= 2) || "Введено не верное значение"
      ],
      emailRules: [
        v => !!v || "E-mail обязательное поле",
        v => /.+@.+\..+/.test(v) || "Введен не верный E-mail"
      ],
      // passwordRules: [
      //   v => !!v || "Password is required",
      //   v => (v && v.length >= 5) || "Password must have 5+ characters",
      //   v => /(?=.*[A-Z])/.test(v) || "Must have one uppercase character",
      //   v => /(?=.*\d)/.test(v) || "Must have one number",
      //   v => /([!@$%])/.test(v) || "Must have one special character [!@#$%]"
      // ],
      valid: true
    };
  },
  methods: {
    ...mapActions(["setAvatar"]),
    updateAvatar(avatarUri) {
      this.newUserData.avatar.val = avatarUri;
    },
    safe() {
      this.$refs.form.validate();
      if (this.valid) {
        this.$store.commit("pushShuckbar", {
          val: "Настройки успешно сохранены",
          success: true
        });
      } else {
        this.$store.commit("pushShuckbar", {
          val: "Форма заполненна не верно",
          success: false
        });
      }
    }
  },
  computed: {
    ...mapGetters(["user"])
  },
  components: {
    UploadAvatar,
    PageTitle
  },
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass"></style>
