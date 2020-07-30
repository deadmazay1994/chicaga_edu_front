const API_URL = "https://edu.chicaga.ru/api/";

import Axios from "axios";

async function post(method, data, error = "") {
  let r = Axios({
    method: "POST",
    url: API_URL + method,
    data
  });
  let res = false;
  await r.then(data => {
    let d = data.data;
    if ("errors" in d) {
      console.log(error, method, d.errors);
      res = {
        error: d.errors
      };
    } else {
      res = d;
    }
  });
  return res;
}

export default {
  methods: {
    // Lesson
    async getLesson(id) {
      let response = await Axios.get(API_URL + "get/" + id);
      if (response.status == 200) {
        return [
          ...response.data.lesson.lesson
          // {
          //   body: [
          //     {
          //       sentence: "hello [my] name is [rawil]"
          //     },
          //     {
          //       sentence: "my [name] is Oleg"
          //     }
          //   ],
          //   type: "drag_skipped_word",
          //   addons: ["garbage", "garbage"],
          //   description: "Перетащите слова на место пропусков"
          // },
          // {
          //   description: "Заполните кроссворд",
          //   type: "crossword",
          //   body: [
          //     {
          //       word: "Tucan"
          //     },
          //     {
          //       word: "Dingo"
          //     },
          //     {
          //       word: "Dolphin"
          //     },
          //     {
          //       word: "Pig"
          //     },
          //     {
          //       word: "Kangaroo"
          //     },
          //     {
          //       word: "Octopus"
          //     },
          //     {
          //       word: "Hamster"
          //     },
          //     {
          //       word: "Alligator"
          //     },
          //     {
          //       word: "Ostrich"
          //     },
          //     {
          //       word: "Koala"
          //     },
          //     {
          //       word: "Mouse"
          //     },
          //     {
          //       word: "Antelope"
          //     }
          //   ]
          // },
          // {
          //   description: "Данные высказывания истины или ложны",
          //   type: "true_false",
          //   body: {
          //     tasks: [
          //       {
          //         text: "Цвет синего кита - это красный",
          //         correct: null,
          //         right: false,
          //         error: null
          //       },
          //       {
          //         text: "3+4=6",
          //         correct: null,
          //         right: false,
          //         error: null
          //       },
          //       {
          //         text: "1+1=2+2",
          //         correct: null,
          //         right: false,
          //         error: null
          //       },
          //       {
          //         text: "4-3=1",
          //         correct: null,
          //         right: true,
          //         error: null
          //       }
          //     ],
          //     questions: [
          //       {
          //         text:
          //           "Как с русского языка на английский язык переводится слово ручка?",
          //         answer: "pen",
          //         correct: null,
          //         userAnswer: ""
          //       },
          //       {
          //         text:
          //           "Как с русского языка на английский язык переводится слово ручка?",
          //         answer: "pen",
          //         correct: null,
          //         userAnswer: ""
          //       },
          //       {
          //         text:
          //           "Как с русского языка на английский язык переводится слово ручка?",
          //         answer: "pen",
          //         correct: null,
          //         userAnswer: ""
          //       }
          //     ]
          //   }
          // },
          // {
          //   description: "Сопоставить 2 слова",
          //   type: "comprasion",
          //   body: [
          //     {
          //       word1: "Apple",
          //       word2: "Яблоко"
          //     },
          //     {
          //       word1: "Orange",
          //       word2: "Апельсин"
          //     },
          //     {
          //       word1: "Computer",
          //       word2: "Компьютер"
          //     }
          //   ]
          // },
          // {
          //   description: "Сопоставить слолва группам",
          //   type: "grouping",
          //   body: [
          //     {
          //       name: "food",
          //       words: ["apple", "orange", "salat"]
          //     },
          //     {
          //       name: "sport",
          //       words: ["bycycle", "run", "tshurt"]
          //     },
          //     {
          //       name: "place",
          //       words: ["hospital", "police"]
          //     }
          //   ]
          // },
          // {
          //   description: "Выделите правильные утверждения",
          //   type: "selection_box",
          //   body: {
          //     statements: ["Зеленый", "Черный", "Красный"],
          //     tasks: [
          //       {
          //         text: "Яблоки бывают",
          //         answers: [true, false, true]
          //       },
          //       {
          //         text: "Трава бывает",
          //         answers: [true, false, false]
          //       },
          //       {
          //         text: "Шкаф бывает",
          //         answers: [true, true, true]
          //       },
          //       {
          //         text: "Вода бывает",
          //         answers: [false, false, false]
          //       }
          //     ]
          //   }
          // },
          // {
          //   description: "Выделите правильные утверждения",
          //   type: "underline_box",
          //   body: {
          //     tasks: [
          //       {
          //         text: "Яблоки бывают",
          //         answers: [
          //           {
          //             text: "Красные",
          //             correct: true
          //           },
          //           {
          //             text: "Черные",
          //             correct: false
          //           }
          //         ]
          //       },
          //       {
          //         text: "Трава бывает",
          //         answers: [
          //           {
          //             text: "Красной",
          //             correct: false
          //           },
          //           {
          //             text: "Черной",
          //             correct: false
          //           }
          //         ]
          //       },
          //       {
          //         text: "Вода бывает",
          //         answers: [
          //           {
          //             text: "Зеленой",
          //             correct: false
          //           },
          //           {
          //             text: "Белой",
          //             correct: false
          //           },
          //           {
          //             text: "Прозрачной",
          //             correct: true
          //           }
          //         ]
          //       }
          //     ]
          //   }
          // },
          // {
          //   description: "Впишите нужные номера",
          //   type: "match",
          //   body: [
          //     {
          //       name: "_45f1c2026b9de41595678758.png",
          //       word: "Математическте формулы 1"
          //     },
          //     {
          //       name: "_15f1c2026b9ebb1595678758.jpg",
          //       word: "Математическте формулы 2"
          //     },
          //     {
          //       name: "_25f1c2026b9f2b1595678758.jpg",
          //       word: "Математическте формулы 3"
          //     }
          //   ]
          // },
          // {
          //   description: "Заполните пропуски",
          //   type: "gaps_imgs",
          //   body: [
          //     {
          //       title: "Материальное",
          //       tasks: [
          //         {
          //           text: "Это [зонт]",
          //           img: "https://files.gifts.ru/reviewer/tb/99/7550.30_1.jpg"
          //         },
          //         {
          //           text: "Это [ручка]",
          //           img:
          //             "https://images.officeworks.com.au/api/2/img/https://s3-ap-southeast-2.amazonaws.com/wc-prod-pim/JPEG_300x300/BI801867_bic_4_colour_medium_retractable_ballpoint_pen.jpg/resize?size=300&auth=MjA5OTcwODkwMg__"
          //         }
          //       ]
          //     },
          //     {
          //       title: "Не материальное",
          //       tasks: [
          //         {
          //           text: "Это [душа] (душа)",
          //           img: ""
          //         },
          //         {
          //           text: "Это [совесть] (совесть)",
          //           img: ""
          //         }
          //       ]
          //     }
          //   ]
          // }
        ];
      }
    },
    async getLessonProgress(id) {
      id;
      let resonse = [
        // {
        //   shuffled: [],
        //   groups: [
        //     {
        //       name: "food",
        //       words: ["apple", "orange", "salat"],
        //       correct: true
        //     },
        //     {
        //       name: "sport",
        //       words: ["bycycle", "tshurt", "run"],
        //       correct: true
        //     },
        //     { name: "place", words: ["police", "hospital"], correct: true }
        //   ],
        //   inputCopy: {
        //     description: "Сопоставить слолва группам",
        //     type: "grouping",
        //     body: [
        //       { name: "food", words: ["apple", "orange", "salat"] },
        //       { name: "sport", words: ["bycycle", "run", "tshurt"] },
        //       { name: "place", words: ["hospital", "police"] }
        //     ]
        //   },
        //   IMGSTORE: "https://edu.chicaga.ru/public/images/"
        // }
      ];
      return resonse;
    },
    // User
    async register(userData) {
      return post("user", userData);
    },
    async login(userData) {
      return post("user/login", userData);
    },
    getErrorText(response) {
      let errorText = "";
      if ("error" in response) {
        for (const key in response.error) {
          let e = response.error[key];
          if (typeof e == "object") {
            e.forEach(eText => {
              errorText += eText + " ";
            });
          } else {
            errorText = e;
          }
        }
      }
      return errorText;
    }
  }
};
