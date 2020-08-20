import api from "@/mixins/api";

export default {
  namespaces: true,
  actions: {
    async getDictionary({ commit }) {
      let response = await api.methods.getVocalibry();
      if ("success" in response) {
        if (response.success) {
          // Сортировка по алфавиту
          response.data.sort((a, b) => (a.en > b.en ? 1 : -1));
          commit("setWords", response.data);
        }
      }
    },
    async addDictionary({ commit }, data) {
      let response = await api.methods.addToVocalibry(data.ru, data.en);
      if ("success" in response) {
        if (response.success) {
          // Сортировка по алфавиту
          commit("pushWords", [
            { transcription: data.en, word: data.ru, id: response.data.id }
          ]);
        }
      }
    },
    async deleteWordFromDict({ commit }, id) {
      let response = await api.methods.deleteWordFronVacalibry(id);
      if ("success" in response) {
        if (response.success) {
          commit("deleteWordFromDict", id);
          commit("pushShuckbar", {
            val: "Запись успешно удалена из словаря",
            success: true
          });
          return true;
        }
      }
      commit("pushShuckbar", {
        val: "Что-то пошло не так. Попробуйте выполнить действие позже",
        success: false
      });
    }
  },
  mutations: {
    setWords(state, words) {
      state.words = words;
    },
    pushWords(state, words) {
      state.words.push(...words);
    },
    deleteWordFromDict(state, id) {
      state.words.splice(
        state.words.find((word, i) => {
          word.id == id;
          return i;
        }),
        1
      );
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
