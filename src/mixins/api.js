const API_URL = "https://edu.chicaga.ru/api/";

import Axios from "axios";

export default {
  methods: {
    async getLesson(id) {
      let response = await Axios.get(API_URL + "get/" + id);
      if (response.status == 200) {
        return response.data.lesson.lesson;
      }
    }
  }
};
