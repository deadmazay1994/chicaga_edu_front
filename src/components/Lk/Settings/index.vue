<template>
  <div class="user-settings vue-component">
    <interlayer class="user-settings__body" :title="$route.meta.title">
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
          <div class="text-subtitle-2">Сменить пароль</div>
          <v-text-field
            type="password"
            v-model="oldPassword"
            label="Введите пароль"
          />
          <v-text-field
            type="password"
            v-model="newPassword"
            label="Повторите пароль"
          />
          <v-divider class="mb-5"></v-divider>
        </v-card>
      </v-col>
    </interlayer>
    <div class="user-settings__aside">
      <div class="user-settings__aside-wrap">
        <div class="user-settings__aside-inner">
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
                  <img :src="avatar" alt="avatar" />
                </v-avatar>
              </div>
              <button
                style="margin-left: 0;"
                class="red-btn active"
                @click="save"
              >
                Сохранить настройки
              </button>
            </v-card>
          </v-col>
        </div>
      </div>
    </div>
    <!-- // Когда будет сервер исправить  на cropUploadSuccess -->
    <upload-avatar
      langType="ru"
      field="img"
      v-model="showUpladAvatar"
      @crop-success="updateAvatar"
    />
  </div>
</template>

<script>
import Interlayer from "@/components/Interlayer.vue";
import UploadAvatar from "vue-image-crop-upload";

import { mapGetters } from "vuex";

export default {
  name: "user-settings",
  data: function() {
    return {
      subtitle: "На данной странице вы можете изменить данные о себе",
      showUpladAvatar: false,
      oldPassword: "",
      newPassword: "",
      nameRules: [
        v => !!v || "ФИО обязательное поле",
        v => (v && v.length >= 2) || "Введено не верное значение"
      ],
      emailRules: [
        v => !!v || "E-mail обязательное поле",
        v => /.+@.+\..+/.test(v) || "Введен не верный E-mail"
      ],
      valid: true
    };
  },
  methods: {
    updateAvatar(avatarUri) {
      this.$store.commit("setAvatar", avatarUri);
    },
    save() {
      this.$refs.form.validate();
      if (this.valid) {
        let data = this.addingUserData({
          name: this.user.name,
          email: this.user.email
        });
        this.$store.dispatch("updateUser", data);
      } else {
        this.$store.commit("pushShuckbar", {
          val: "Форма заполненна не верно",
          success: false
        });
      }
    },
    addingUserData(data) {
      if (this.newPassword) data.password = this.newPassword;
      if (this.oldPassword) data.password_confirmation = this.oldPassword;
      if (this.avatar != "/imgs/user.png") data.avatar = this.avatar;
      return data;
    }
  },
  computed: {
    ...mapGetters(["user", "avatar"])
  },
  components: {
    Interlayer,
    UploadAvatar
  },
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style lang="scss">
@media (max-width: 600px) {
  .vue-image-crop-upload .vicp-wrap {
    width: calc(100% - 80px);
  }
}
</style>

<style lang="sass" scoped>
.user-settings
  display: flex
  width: 100%
  height: 100%
  padding: 12px
  &__body
    flex-grow: 1
  &__aside
    flex-shrink: 0
    flex-basis: 389px
    height: 100%
    padding-left: 20px
  &__aside-wrap
    width: 100%
    height: 100%
    background-color: #fffefe
    border-radius: 12px
    box-shadow: 0 4px 20px rgba(128, 128, 128, 0.2)
    overflow: hidden
  &__aside-inner
    width: 100%
    height: 100%
    overflow: auto
</style>
