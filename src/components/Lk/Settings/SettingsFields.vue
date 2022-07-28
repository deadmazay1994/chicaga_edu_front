<template>
  <div class="settings-fields vue-component">
    <form class="settings-fields__form" @submit="checkForm" novalidate="true">
      <div class="settings-fields__title">Мои данные</div>
      <div class="settings-fields__body">
        <label class="settings-fields__label" for="username">
          <span class="settings-fields__span">Имя:</span>
          <c-input
            class="settings-fields__input"
            :class="{ 'settings-fields__input--error': usernameError }"
            type="text"
            name="username"
            placeholder="Ульяна"
            aria-label="Поле для ввода имени пользователя"
            :maxlength="30"
            v-model="user.name"
          />
        </label>
        <label class="settings-fields__label" for="usersecondname">
          <span class="settings-fields__span">Фамилия:</span>
          <c-input
            class="settings-fields__input"
            :class="{ 'settings-fields__input--error': usersecondnameError }"
            type="text"
            name="usersecondname"
            placeholder="Соловьева"
            aria-label="Поле для ввода фамилии пользователя"
            :maxlength="30"
            v-model="usersecondname"
            :required="false"
          />
        </label>
        <label class="settings-fields__label" for="phone">
          <span class="settings-fields__span">Телефон:</span>
          <c-input
            class="settings-fields__input"
            :class="{ 'settings-fields__input--error': phoneNumberError }"
            type="tel"
            name="phone"
            placeholder="+79212567854"
            aria-label="Поле для ввода номера телефона"
            :maxlength="30"
            v-model="phoneNumber"
          />
        </label>
        <label class="settings-fields__label" for="email">
          <span class="settings-fields__span">E-mail:</span>
          <c-input
            class="settings-fields__input"
            :class="{ 'settings-fields__input--error': userEmailError }"
            type="email"
            name="email"
            placeholder="qwerty@mail.ru"
            aria-label="Поле для ввода электронной почты"
            :maxlength="30"
            v-model="user.email"
          />
        </label>
        <label class="settings-fields__label" for="telegram">
          <span class="settings-fields__span">Telegram:</span>
          <c-input
            class="settings-fields__input"
            :class="{ 'settings-fields__input--error': telegramError }"
            type="text"
            name="telegram"
            placeholder="@name"
            aria-label="Поле для ввода никнейма в телеграме"
            :maxlength="30"
            v-model="telegram"
            :required="false"
          />
        </label>
        <label class="settings-fields__label" for="birthday">
          <span class="settings-fields__span">Дата рождения:</span>
          <c-input
            class="settings-fields__input"
            :class="{ 'settings-fields__input--error': birthdayError }"
            type="text"
            name="birthday"
            placeholder="01.01.1995"
            aria-label="Поле для ввода даты рождения"
            :maxlength="30"
            v-model="birthday"
            :required="false"
          />
        </label>
        <label class="settings-fields__label" for="password">
          <span class="settings-fields__span">Пароль:</span>
          <c-input
            class="settings-fields__input"
            :class="{ 'settings-fields__input--error': passwordError }"
            type="password"
            name="password"
            placeholder="•••••••••••"
            aria-label="Поле для ввода нового пароля"
            :maxlength="30"
            v-model="password"
          />
        </label>
        <label class="settings-fields__label" for="repeatPassword">
          <span class="settings-fields__span"></span>
          <c-input
            class="settings-fields__input"
            :class="{ 'settings-fields__input--error': repeatPasswordError }"
            type="password"
            name="repeatPassword"
            placeholder="•••••••••••"
            aria-label="Поле для повторного ввода пароля"
            :maxlength="30"
            v-model="repeatPassword"
          />
        </label>
      </div>
      <div class="settings-fields__footer">
        <c-btn class="settings-fields__red-btn">Сохранить настройки</c-btn>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "settings-fields",
  components: {},
  data: function() {
    return {
      username: null,
      usersecondname: null,
      phoneNumber: null,
      userEmail: null,
      telegram: null,
      birthday: null,
      password: null,
      repeatPassword: null,
      usernameError: false,
      usersecondnameError: false,
      phoneNumberError: false,
      userEmailError: false,
      telegramError: false,
      birthdayError: false,
      passwordError: false,
      repeatPasswordError: false
    };
  },
  props: [],
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    checkForm(e) {
      this.errors = [];

      // Проверка на пустные поля
      if (!this.username) this.usernameError = true;
      else this.usernameError = false;
      if (!this.usersecondname) this.usersecondnameError = true;
      else this.usersecondname = false;
      if (!this.phoneNumber) this.phoneNumberError = true;
      else this.phoneNumberError = false;
      if (!this.userEmail) this.userEmailError = true;
      // Проверка на валидность e-mail
      else if (!this.validEmail(this.userEmail)) this.userEmailError = true;
      else this.userEmailError = false;
      if (!this.telegram) this.telegramError = true;
      // Проверка на валидность telegram nickname
      else if (!this.validTelegram(this.telegram)) this.telegramError = true;
      else this.telegramError = false;
      if (!this.birthday) this.birthdayError = true;
      else this.birthdayError = false;
      if (!this.password) this.passwordError = true;
      else this.passwordError = false;

      let data = {
        name: this.user.name,
        usersecondname: this.usersecondname,
        phone: this.phoneNumber,
        email: this.user.email,
        telegram: this.telegram,
        birthday: this.birthday,
        password: this.password,
        avatar: this.user.avatar_link
      };

      if (!this.errors.length) {
        this.$store.dispatch("updateUser", data);
      } else {
        this.$store.commit("pushShuckbar", {
          val: "Форма заполненна не верно",
          success: false
        });
      }

      e.preventDefault();
    }
  },
  validEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },
  validTelegram(telegram) {
    let re = /.*\B@(?=\w{5,32}\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*.*/;
    return re.test(telegram);
  }
};
</script>

<style scoped="scoped" lang="sass">
@import "@/assets/styles/variables.sass"

.settings-fields
  display: flex
  width: 100%
  min-height: 100%
  &__form
    display: flex
    flex-direction: column
    width: 100%
    min-height: 100%
    padding: 24px 32px 32px
    @media ($media_md)
      padding: 16px
  &__title
    margin-bottom: 48px
    font-weight: 700
    font-size: 24px
    @media ($media_md)
      margin-bottom: 36px
      font-size: 22px
    @media ($media_sm2)
      margin-bottom: 24px
  &__body
    flex-grow: 1
    margin-bottom: 48px
    @media ($media_md)
      margin-bottom: 36px
    @media ($media_sm2)
      margin-bottom: 24px
  &__label
    display: flex
    align-items: center
    max-width: 890px
    font-size: 16px
    @media ($media_md)
      font-size: 14px
    @media ($media_sm2)
      flex-wrap: wrap
  &__label + &__label
    padding-top: 16px
    @media ($media_md)
      padding-top: 8px
  &__span
    flex-shrink: 0
    flex-basis: 140px
    padding-right: 5px
    font-weight: 600
  & &__input
    flex-basis: 750px
    font-size: inherit
    padding: 10.5px 14.5px
    border-radius: 12px
  &__footer
    display: flex
    align-items: center
    justify-content: center
  &__red-btn
    font-size: 14px
    border-radius: 10px
    box-shadow: none
    @media ($media_sm2)
      flex-grow: 1
      max-width: none
</style>
