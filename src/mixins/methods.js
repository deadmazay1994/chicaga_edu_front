import Vue from "vue";

Vue.mixin({
  methods: {
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
    }
  }
});
