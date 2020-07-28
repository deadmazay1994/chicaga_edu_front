<template>
  <div class="tasks vue-component">
    <div class="tasks__wrap" v-for="(task, index) in tasks" :key="index">
      <grouping
        v-if="task.type == 'grouping'"
        :input="task"
        ref="task"
        class="tasks__task"
      />
      <gaps-imgs
        v-if="task.type == 'gaps_imgs'"
        :input="task"
        ref="task"
        class="tasks__task"
      />
      <syllable
        v-if="task.type == 'select_stressed_syllable'"
        :input="task"
        ref="task"
        class="tasks__task"
      />
      <task-images
        v-if="task.type == 'images_order'"
        :input="task"
        ref="task"
        class="tasks__task"
      />
      <fill-gaps
        v-if="task.type == 'drag_skipped_word'"
        :drag="true"
        :input="task"
        ref="task"
        class="tasks__task"
      />
      <comparison
        v-if="task.type == 'comprasion'"
        :input="task"
        ref="task"
        class="tasks__task"
      />
      <t-f
        v-if="task.type == 'true_false'"
        :input="task"
        ref="task"
        class="tasks__task"
      />
      <crossword
        v-if="task.type == 'crosswordы'"
        :input="task"
        ref="task"
        class="tasks__task"
      />
      <match-imgs
        v-if="task.type == 'match'"
        :input="task"
        ref="task"
        class="tasks__task"
      />
      <selection-box
        v-if="task.type == 'selection_box' || task.type == 'underline_box'"
        :underline="task.type == 'underline_box'"
        :input="task"
        ref="task"
        class="tasks__task"
      />
    </div>
    <div class="ma-5">
      <v-btn
        @click="check"
        class="tasks__check-btn"
        block
        large
        color="white--text"
        >Проверить</v-btn
      >
    </div>
  </div>
</template>

<script>
import TaskImages from "./TaskImages";
import FillGaps from "./FillGaps";
import TF from "./TF";
import MatchImgs from "./MatchImgs";
import Syllable from "./ChooseSyllable";
import Comparison from "./Comparison";
import Grouping from "./Grouping";
import SelectionBox from "./SelectionBox";
import Crossword from "./Crossword";
import GapsImgs from "./GapsImgs";

import Api from "@/mixins/api";

export default {
  name: "tasks",
  data() {
    return {
      tasks: []
    };
  },
  methods: {
    check() {
      this.$refs.task.forEach(task => task.check());
    },
    async setLesson() {
      this.tasks = await this.getLesson(this.$route.params.id);
    }
  },
  components: {
    TaskImages,
    FillGaps,
    TF,
    MatchImgs,
    Syllable,
    Comparison,
    Grouping,
    SelectionBox,
    Crossword,
    GapsImgs
  },
  mixins: [Api],
  async beforeMount() {
    await this.setLesson();
    this.tasks = [
      {
        body: [
          {
            sentence: "hello [my] name is [rawil]"
          },
          {
            sentence: "my [name] is Oleg"
          }
        ],
        type: "drag_skipped_word",
        addons: ["garbage", "garbage"],
        description: "Перетащите слова на место пропусков"
      },
      {
        description: "Заполните кроссворд",
        type: "crossword",
        body: [
          {
            word: "Tucan"
          },
          {
            word: "Dingo"
          },
          {
            word: "Dolphin"
          },
          {
            word: "Pig"
          },
          {
            word: "Kangaroo"
          },
          {
            word: "Octopus"
          },
          {
            word: "Hamster"
          },
          {
            word: "Alligator"
          },
          {
            word: "Ostrich"
          },
          {
            word: "Koala"
          },
          {
            word: "Mouse"
          },
          {
            word: "Antelope"
          }
        ]
      },
      {
        description: "Данные высказывания истины или ложны",
        type: "true_false",
        body: {
          tasks: [
            {
              text: "Цвет синего кита - это красный",
              correct: null,
              right: false,
              error: null
            },
            {
              text: "3+4=6",
              correct: null,
              right: false,
              error: null
            },
            {
              text: "1+1=2+2",
              correct: null,
              right: false,
              error: null
            },
            {
              text: "4-3=1",
              correct: null,
              right: true,
              error: null
            }
          ],
          questions: [
            {
              text:
                "Как с русского языка на английский язык переводится слово ручка?",
              answer: "pen",
              correct: null,
              userAnswer: ""
            },
            {
              text:
                "Как с русского языка на английский язык переводится слово ручка?",
              answer: "pen",
              correct: null,
              userAnswer: ""
            },
            {
              text:
                "Как с русского языка на английский язык переводится слово ручка?",
              answer: "pen",
              correct: null,
              userAnswer: ""
            }
          ]
        }
      },
      {
        description: "Сопоставить 2 слова",
        type: "comprasion",
        body: [
          {
            word1: "Apple",
            word2: "Яблоко"
          },
          {
            word1: "Orange",
            word2: "Апельсин"
          },
          {
            word1: "Computer",
            word2: "Компьютер"
          }
        ]
      },
      {
        description: "Сопоставить слолва группам",
        type: "grouping",
        body: [
          {
            name: "food",
            words: ["apple", "orange", "salat"]
          },
          {
            name: "sport",
            words: ["bycycle", "run", "tshurt"]
          },
          {
            name: "place",
            words: ["hospital", "police"]
          }
        ]
      },
      {
        description: "Выделите правильные утверждения",
        type: "selection_box",
        body: {
          statements: ["Зеленый", "Черный", "Красный"],
          tasks: [
            {
              text: "Яблоки бывают",
              answers: [true, false, true]
            },
            {
              text: "Трава бывает",
              answers: [true, false, false]
            },
            {
              text: "Шкаф бывает",
              answers: [true, true, true]
            },
            {
              text: "Вода бывает",
              answers: [false, false, false]
            }
          ]
        }
      },
      {
        description: "Выделите правильные утверждения",
        type: "underline_box",
        body: {
          tasks: [
            {
              text: "Яблоки бывают",
              answers: [
                {
                  text: "Красные",
                  correct: true
                },
                {
                  text: "Черные",
                  correct: false
                }
              ]
            },
            {
              text: "Трава бывает",
              answers: [
                {
                  text: "Красной",
                  correct: false
                },
                {
                  text: "Черной",
                  correct: false
                }
              ]
            },
            {
              text: "Вода бывает",
              answers: [
                {
                  text: "Зеленой",
                  correct: false
                },
                {
                  text: "Белой",
                  correct: false
                },
                {
                  text: "Прозрачной",
                  correct: true
                }
              ]
            }
          ]
        }
      },
      ...this.tasks,
      {
        description: "Впишите нужные номера",
        type: "match",
        body: [
          {
            name: "_45f1c2026b9de41595678758.png",
            word: "Математическте формулы 1"
          },
          {
            name: "_15f1c2026b9ebb1595678758.jpg",
            word: "Математическте формулы 2"
          },
          {
            name: "_25f1c2026b9f2b1595678758.jpg",
            word: "Математическте формулы 3"
          }
        ]
      },
      {
        description: "Заполните пропуски",
        type: "gaps_imgs",
        body: [
          {
            title: "Материальное",
            tasks: [
              {
                text: "Это [зонт]",
                img: "https://files.gifts.ru/reviewer/tb/99/7550.30_1.jpg"
              },
              {
                text: "Это [ручка]",
                img:
                  "https://images.officeworks.com.au/api/2/img/https://s3-ap-southeast-2.amazonaws.com/wc-prod-pim/JPEG_300x300/BI801867_bic_4_colour_medium_retractable_ballpoint_pen.jpg/resize?size=300&auth=MjA5OTcwODkwMg__"
              }
            ]
          },
          {
            title: "Не материальное",
            tasks: [
              {
                text: "Это [душа] (душа)",
                img: ""
              },
              {
                text: "Это [совесть] (совесть)",
                img: ""
              }
            ]
          }
        ]
      }
    ];
  }
};
</script>

<style lang="sass">
@import "@/components/Sass/Varibles.sass"

.tasks
  max-height: 100%
  overflow: auto
  &__wrap
    background: #e6e3dd
    padding: 15px 30px
  &__task
    margin-bottom: 30px
    // &::after
    //   margin-top: 10px
    //   display: block
    //   content: ""
    //   width: 111%
    //   background: $main_color
    //   height: 2px
    //   margin-left: -5.5%
  &__check-btn
    background-color: $main_color !important
</style>

<style lang="sass">
@import "@/components/Sass/Varibles.sass"

.table-item
  padding: 10px
  background: #dedede
  margin-top: 2px
  cursor: pointer
  &--correct
    background: $success_color
    color: $success_color--text
  &--uncorrect
    background: $error_color
    color: $error_color--text
.table-title
  background: $main_color
  color: $main_color--text
  padding: 10px
</style>
