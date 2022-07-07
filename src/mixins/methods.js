import Vue from "vue";

Vue.mixin({
  methods: {
    async pay() {
      console.log("pay course:", this.course);
      let response = await this.getPayCourseLink(this.courseRes.id);
      let errorText = "";
      if ("success" in response) {
        if (response.success) {
          window.location.href = response.data.payment_url;
        }
      } else if ("error" in response) {
        errorText = response.error.order;
      } else {
        errorText = "Что-то пошло не так. Попробуйте совершить покупку позже";
      }
      if (errorText) {
        this.$store.commit("pushShuckbar", {
          success: false,
          val: errorText
        });
      }
    },
    clear(text) {
      // Убирает все пробелы, приводит текст к стандартному виду
      // Нужно для провеки
      return text.toLowerCase().replace(/ /g, "");
    },
    clearDeeper(text) {
      if (typeof text == "string") {
        // Оставляет только текст и цифры
        return text.replace(/[^A-Za-z0-9-Яа-яЁё]+/g, "").toLowerCase();
      } else {
        return "";
      }
    },
    shuffle(arr) {
      for (let i = 0; i < 5; i++) {
        arr = arr.sort(() => Math.random() - 0.5);
      }
      return arr;
    },
    alphabetical(arr) {
      const alphabet = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ];
      for (let i = 0; i < arr.length; i++) {
        arr = Object.keys(arr).map(key => ({
          ...arr[key],
          word: alphabet[i++],
          correct: -1
        }));
      }
      return arr;
    },
    alertError(text) {
      this.$store.commit("pushShuckbar", {
        val: text,
        success: false
      });
    }
  }
});
