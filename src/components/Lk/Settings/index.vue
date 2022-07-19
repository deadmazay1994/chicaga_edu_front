<template>
  <div class="user-settings vue-component">
    <interlayer class="user-settings__body" :title="$route.meta.title">
      <SettingsFields class="user-settings__fields" />
    </interlayer>
    <div class="user-settings__aside">
      <div class="user-settings__aside-wrap">
        <div class="user-settings__aside-inner">
          <settings-aside :tariff="'standart'" />
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
import SettingsAside from "./SettingsAside.vue";
import UploadAvatar from "vue-image-crop-upload";
import SettingsFields from "./SettingsFields";

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
    SettingsAside,
    UploadAvatar,
    SettingsFields
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
@import "@/assets/styles/variables.sass"

.user-settings
  display: flex
  width: 100%
  height: 100%
  padding: 12px
  @media ($media_xl)
    display: block
    height: auto
    padding: 0
  &__body
    flex-grow: 1
    @media ($media_xl)
      flex-grow: 0
  &__aside
    flex-shrink: 0
    flex-basis: 389px
    height: 100%
    padding-left: 20px
    @media ($media_xl)
      height: auto
      padding-top: 20px
      padding-left: 0
  &__aside-wrap
    width: 100%
    height: 100%
    background-color: #fffefe
    border-radius: 12px
    box-shadow: 0 4px 20px rgba(128, 128, 128, 0.2)
    overflow: hidden
    @media ($media_md)
      box-shadow: 0 4px 20px rgba(128, 128, 128, 0.2)
  &__aside-inner
    width: 100%
    height: 100%
    overflow: auto
</style>
