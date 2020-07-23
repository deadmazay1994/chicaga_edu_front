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
        v => (v && v.length >= 5) || "Password must have 5+ characters",
        v => /(?=.*[A-Z])/.test(v) || "Must have one uppercase character",
        v => /(?=.*\d)/.test(v) || "Must have one number",
        v => /([!@$%])/.test(v) || "Must have one special character [!@#$%]"
      ],
      passwordAuthRules: [v => !!v || "Пароль обязательное поле"]
    };
  }
};
