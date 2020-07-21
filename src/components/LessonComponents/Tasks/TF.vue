<template>
  <div class="tf-task vue-component">
    <div class="d-flex align-center" v-for="tf in task.tasks" :key="tf.text">
      <span
        :class="{ 'blue--text': tf.error == 0, 'red--text': tf.error == 1 }"
        class="text-h5 mr-5"
      >
        {{ tf.text }}
      </span>
      <v-radio-group row v-model="tf.correct" :mandatory="false">
        <v-radio label="T" :value="true"></v-radio>
        <v-radio label="F" :value="false"></v-radio>
      </v-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "tf-task",
  data: function() {
    return {
      task: {
        tasks: [
          {
            text: "2+2=4",
            correct: null,
            right: true,
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
    };
  },
  methods: {
    check() {
      this.task.tasks.forEach(e => {
        if (e.correct == e.right) {
          e.error = false;
        } else {
          e.error = true;
        }
      });
    },
    checkQuesion() {
      this.task.questions.forEach(e => {
        if (e.answer == e.userAnswer) {
          e.correct = true;
        } else {
          e.correct = false;
        }
      });
    }
  },
  computed: {},
  components: {},
  props: [],
  mixins: {}
};
</script>

<style scoped="scoped">
.question-field {
  width: 100px;
}
</style>
