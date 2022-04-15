import api from "@/mixins/api";

export default {
  namespaces: true,
  actions: {
    async setUserPoints({ commit }) {
      console.log("actions in action!");
      let response = await api.methods.getUserPoints();
      let data = response.data;
      commit("setUserPoints", data);
    }
  },
  mutations: {
    setUserPoints(state, data) {
      state.points = data;
    },
    setPointByType(state, payload) {
      switch (payload.type) {
        case "images_order":
          state.smile = payload.value;
          break;
        case "insert_skipped_word":
          state.brains = payload.value;
          break;
        case "drag_and_drop_words":
          state.star = payload.value;
          break;
        case "select_stressed_syllable":
          state.smile = payload.value;
          break;
        case "group_by_dragging":
          state.star = payload.value;
          break;
        case "match_words":
          state.star = payload.value;
          break;
        case "select_correct_variant":
          state.star = payload.value;
          break;
        case "match_picture_and_word":
          state.star = payload.value;
          break;
        case "true_or_false":
          state.lamp = payload.value;
          break;
        case "select_correct_answer":
          state.lamp = payload.value;
          break;
        case "write_word_to_picture":
          state.brains = payload.value;
          break;
        case "select_correct_image_answer":
          state.lamp = payload.value;
          break;
        case "youtube_addons":
          state.star = payload.value;
          break;
        case "lesson_addons_files":
          state.smile = payload.value;
          break;
      }
      state.taskCheckPoint.push(payload);
    }
  },
  state: {
    points: null,
    smile: 0,
    star: 0,
    brains: 0,
    lamp: 0,
    coins: 0
  },
  getters: {
    getUserPoints(state) {
      return state.points;
    },
    getUserPointsByType: state => type => {
      switch (type) {
        case "smile":
          return state.smile;
        case "star":
          return state.star;
        case "brains":
          return state.brains;
        case "lamp":
          return state.lamp;
        case "coins":
          return state.coins;
      }
    }
  }
};
