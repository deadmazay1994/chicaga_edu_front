const API_URL = "https://edu.chicaga.ru/api/";

import Axios from "axios";

export default {
  methods: {
    async getLesson(id) {
      let response = await Axios.get(API_URL + "get/" + id);
      if (response.status == 200) {
        return response.data.lesson.lesson;
      }
    },
    async getLessonProgress(id) {
      id;
      let resonse = [
        {
          shuffled: [],
          groups: [
            {
              name: "food",
              words: ["apple", "orange", "salat"],
              correct: true
            },
            {
              name: "sport",
              words: ["bycycle", "tshurt", "run"],
              correct: true
            },
            { name: "place", words: ["police", "hospital"], correct: true }
          ],
          inputCopy: {
            description: "Сопоставить слолва группам",
            type: "grouping",
            body: [
              { name: "food", words: ["apple", "orange", "salat"] },
              { name: "sport", words: ["bycycle", "run", "tshurt"] },
              { name: "place", words: ["hospital", "police"] }
            ]
          },
          IMGSTORE: "https://edu.chicaga.ru/public/images/"
        }
      ];
      return resonse;
    }
  }
};
