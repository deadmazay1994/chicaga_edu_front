<template>
  <div class="stand vue-component">
    <task-module
      :tasks="tasks"
      :unique_id="'992015f8b7f20b56a7cdd631a0dc399d'"
    />
  </div>
</template>

<script>
import TaskModule from "./TaskModule";

export default {
  name: "stand",
  data: function() {
    return {
      tasks: [
        {
          tasks: [
            {
              body: [
                {
                  file: {
                    ext: "jpg",
                    file: "/storage/lessons/624ee2293b513.jpg",
                    file_name: "/storage/lessons/624ee2293b513.jpg",
                    file_type: "image/jpeg",
                    file_name_abs:
                      "https://edu.chicaga.ru/storage/lessons/624ee2293b513.jpg"
                  },
                  name: null,
                  number: "1"
                },
                {
                  file: {
                    ext: "jpg",
                    file: "/storage/lessons/624ee2293b513.jpg",
                    file_name: "/storage/lessons/624ee2293b513.jpg",
                    file_type: "image/jpeg",
                    file_name_abs:
                      "https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"
                  },
                  name: null,
                  number: "2"
                },
                {
                  file: {
                    ext: "jpg",
                    file: "/storage/lessons/624ee2293b513.jpg",
                    file_name: "/storage/lessons/624ee2293b513.jpg",
                    file_type: "image/jpeg",
                    file_name_abs:
                      "https://dl.fujifilm-x.com/global/products/cameras/x100f/sample-images/ff_x100f_001.JPG"
                  },
                  name: null,
                  number: "1"
                }
              ],
              icon: "el-icon-picture",
              type: "images_order",
              group: null,
              section: "7",
              sort_order: "1",
              description: "images_order",
              group_index: "0"
            }
          ],
          group_name: null
        },
        {
          tasks: [
            {
              body: [
                {
                  sentence: "ответ hello. [hello]"
                }
              ],
              icon: "el-icon-minus",
              type: "insert_skipped_word",
              group: null,
              section: "8",
              sort_order: "2",
              description: "insert_skipped_word",
              group_index: "0"
            }
          ],
          group_name: null
        },
        {
          tasks: [
            {
              body: [
                {
                  sentence: "[не лишнее] слово [1.2] world"
                },
                {
                  sentence: "[ тоже не лишнее] слово"
                }
              ],
              type: "drag_and_drop_words",
              group: null,
              section: "9",
              sort_order: "3",
              description: "drag_and_drop_words",
              extra_words: "лишнее, слово",
              group_index: "0"
            }
          ],
          group_name: null
        },
        {
          tasks: [
            {
              body: [
                {
                  slogs: ["he", "llo"],
                  answer: 1
                },
                {
                  slogs: ["wo", "rl"],
                  answer: 0
                }
              ],
              type: "select_stressed_syllable",
              group: null,
              section: "10",
              sort_order: "4",
              description: "select_stressed_syllable",
              group_index: "0"
            }
          ],
          group_name: null
        },
        {
          tasks: [
            {
              body: [
                {
                  name: "TRUE",
                  words: ["2 + 2 = 4", "2 + 3 = 5"]
                },
                {
                  name: "FALSE",
                  words: ["1 = -1", "ABC = BCA"]
                },
                {
                  name: "тождество",
                  words: ["5 = 5", "10 = 10"]
                }
              ],
              type: "group_by_dragging",
              group: null,
              section: "11",
              sort_order: "5",
              description: "group_by_dragging",
              group_index: "0"
            }
          ],
          group_name: null
        },
        {
          tasks: [
            {
              body: [
                {
                  w1: "hello",
                  w2: "привет"
                },
                {
                  w1: "world",
                  w2: "мир"
                }
              ],
              type: "match_words",
              group: null,
              addons: {
                t1: "русский",
                t2: "английский"
              },
              section: "12",
              sort_order: "6",
              description: "match_words",
              group_index: "0"
            }
          ],
          group_name: null
        },
        {
          tasks: [
            {
              body: [
                {
                  text: "Выберите рыбу",
                  answers: [
                    {
                      text: "Щука",
                      correct: "1"
                    },
                    {
                      text: "Рак",
                      correct: "0"
                    },
                    {
                      text: "Круг",
                      correct: "0"
                    }
                  ]
                },
                {
                  text: "Выберите не рыбу",
                  answers: [
                    {
                      text: "мангал",
                      correct: "0"
                    },
                    {
                      text: "стол",
                      correct: "0"
                    },
                    {
                      text: "щука",
                      correct: "1"
                    }
                  ]
                }
              ],
              type: "select_correct_variant",
              group: null,
              section: "13",
              sort_order: "7",
              description: "select_correct_variant",
              group_index: "0"
            }
          ],
          group_name: null
        },
        {
          tasks: [
            {
              body: [
                {
                  file: {
                    ext: "jpg",
                    file: "/storage/lessons/624ee52e59807.jpg",
                    file_name: "/storage/lessons/624ee52e59807.jpg",
                    file_type: "image/jpeg",
                    file_name_abs:
                      "https://edu.chicaga.ru/storage/lessons/624ee52e59807.jpg"
                  },
                  word: "is [brick]",
                  number: "1"
                },
                {
                  file: {
                    ext: "webp",
                    file: "/storage/lessons/624ee52e5e0a4.webp",
                    file_name: "/storage/lessons/624ee52e5e0a4.webp",
                    file_type: "image/webp",
                    file_name_abs:
                      "https://edu.chicaga.ru/storage/lessons/624ee52e5e0a4.webp"
                  },
                  word: "is [arrow]",
                  number: "2"
                }
              ],
              type: "match_picture_and_word",
              group: null,
              section: "14",
              sort_order: "8",
              description: "Сопоставить картинку и слово",
              group_index: "0"
            }
          ],
          group_name: null
        },
        {
          tasks: [
            {
              body: [
                {
                  text: "2 + 2 = 4",
                  right: "0"
                },
                {
                  text: "3 + 4 = 2",
                  right: null
                },
                {
                  text: "3 + 3 = 6",
                  right: "1"
                }
              ],
              type: "true_or_false",
              group: null,
              section: "15",
              sort_order: "9",
              description: "True & False",
              group_index: "0"
            }
          ],
          group_name: null
        },
        {
          tasks: [
            {
              body: [
                {
                  text: "3 + 4 = 7",
                  answers: [1, 0, 0, 0]
                },
                {
                  text: "2 + 2 = 5",
                  answers: [0, 1, 0, 0]
                },
                {
                  text: null,
                  answers: [0, 0, 0, 0]
                },
                {
                  text: null,
                  answers: [0, 0, 0, 0]
                }
              ],
              type: "select_correct_answer",
              group: null,
              addons: ["true", "false", "undefined", null],
              section: "16",
              sort_order: "10",
              description: "select_correct_answer",
              group_index: "0"
            }
          ],
          group_name: null
        },
        {
          tasks: [
            {
              body: [
                {
                  tasks: [
                    {
                      file: {
                        ext: "jpg",
                        file: "/storage/lessons/624ee52e65931.jpg",
                        file_name: "/storage/lessons/624ee52e65931.jpg",
                        file_type: "image/jpeg",
                        file_name_abs:
                          "https://edu.chicaga.ru/storage/lessons/624ee52e65931.jpg"
                      },
                      text: "is [brick]"
                    },
                    {
                      img: null,
                      file: {
                        ext: "webp",
                        file: "/storage/lessons/624ee52e6a0db.webp",
                        file_name: "/storage/lessons/624ee52e6a0db.webp",
                        file_type: "image/webp",
                        file_name_abs:
                          "https://edu.chicaga.ru/storage/lessons/624ee52e6a0db.webp"
                      },
                      text: "is [arrow]"
                    }
                  ],
                  title: "write_word_to_picture"
                }
              ],
              type: "write_word_to_picture",
              group: null,
              addons: [],
              section: "17",
              sort_order: "11",
              description: "Вписать слова к картинкам",
              group_index: "0"
            }
          ],
          group_name: null
        },
        {
          tasks: [
            {
              body: [
                {
                  sentence: "[test] - test"
                }
              ],
              icon: "el-icon-minus",
              type: "insert_skipped_word",
              group: null,
              section: "8",
              sort_order: "2",
              description: "Вписать пустое слово",
              group_index: "0"
            }
          ],
          group_name: null
        }
      ]
    };
  },
  methods: {},
  components: { TaskModule },
  props: [],
  mixins: {}
};
</script>

<style scoped="scoped" lang="sass"></style>
