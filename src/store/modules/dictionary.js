export default {
  namespaces: true,
  actions: {
    getDictionary({ commit }) {
      let response = [
        {
          ru: "Ручка",
          en: "Pen"
        },
        {
          ru: "Яблоко",
          en: "Apple"
        },
        {
          ru: "RU",
          en: "EN"
        },
        {
          ru: "Телефон",
          en: "Phone"
        }
      ];

      response = [
        ...response,
        ...response,
        ...response,
        ...response,
        ...response,
        ...response
      ];
      // Сортировка по алфавиту
      response.sort((a, b) => (a.en > b.en ? 1 : -1));
      commit("setWords", response);
    }
  },
  mutations: {
    setWords(state, words) {
      state.words = words;
    }
  },
  state: {
    words: false
  },
  getters: {
    dictionary: state => {
      return state.words;
    }
  }
};
