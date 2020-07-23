export default {
  data() {
    return {
      nameRules: [
        v => !!v || "ФИО обязательное поле",
        v => (v && v.length >= 2) || "Введено не верное значение"
      ],
      emailRules: [
        v => !!v || "E-mail обязательное поле",
        v => /.+@.+\..+/.test(v) || "Введен не верный E-mail"
      ],
      passwordRules: [
        v => !!v || "Пароль обязательное поле",
        v => (v && v.length >= 5) || "Пароль должен содержать более 5 символов"
      ],
      passwordAuthRules: [v => !!v || "Пароль обязательное поле"]
    };
  }
};
