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
    setUserPoints(state, pointsArr) {
      pointsArr.forEach(item => {
        console.log("points item:", item);
        switch (item.point_type.name) {
          case "Мозги":
            state.points.brain = item.points;
            break;
          case "Смайлики":
            state.points.smile = item.points;
            break;
          case "Звездочка":
            state.points.star = item.points;
            break;
          case "Лампочка":
            state.points.lamp = item.points;
            break;
        }
      });
    },
    setPointByType(state, payload) {
      switch (payload.type) {
        case "images_order":
          state.points.smile += payload.value;
          break;
        case "insert_skipped_word":
          state.points.brain += payload.value;
          break;
        case "drag_and_drop_words":
          state.points.star += payload.value;
          break;
        case "select_stressed_syllable":
          state.points.smile += payload.value;
          break;
        case "group_by_dragging":
          state.points.star += payload.value;
          break;
        case "match_words":
          state.points.star += payload.value;
          break;
        case "select_correct_variant":
          state.points.star += payload.value;
          break;
        case "match_picture_and_word":
          state.star += payload.value;
          break;
        case "true_or_false":
          state.points.lamp += payload.value;
          break;
        case "select_correct_answer":
          state.points.lamp += payload.value;
          break;
        case "write_word_to_picture":
          state.points.brains += payload.value;
          break;
        case "select_correct_image_answer":
          state.points.lamp += payload.value;
          break;
        case "youtube_addons":
          state.points.star += payload.value;
          break;
        case "lesson_addons_files":
          state.points.smile += payload.value;
          break;
      }
    }
  },
  state: {
    points: {
      smile: 0,
      brain: 0,
      star: 0,
      lamp: 0,
      coins: 0
    }
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
    },
    points: state => state.points
  }
};
