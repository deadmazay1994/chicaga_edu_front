<template>
  <div class="task-image-numbers">
    <span class="text-subtitle-2"
      >Look at the pictures. Listen and add numbers 1-4</span
    >
    <v-row>
      <v-col lg="6" v-for="(tasks, index) in task.shuffled" :key="tasks.word">
        <div class="img-task" :class="answeredClass(index)">
          <div class="img-task__check">
            <div class="img-task__word">{{ tasks.word }}</div>

            <div class="img-task__input">
              <input
                class="input"
                v-model="task.answers[index]"
                maxlength="1"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                type="number"
              />
            </div>
          </div>
          <v-img
            :src="tasks.img + tasks.answer"
            lazy-src="data:image/gif;base64,R0lGODlhBgAFAIAAAP///wAAACH5BAEAAAEALAAAAAAGAAUAAAIFjI+pawUAOw=="
            contain
          ></v-img>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import "@/mixins/methods";

export default {
  name: "task-images",
  data: function() {
    return {
      task: {
        answers: [],
        shuffled: []
      }
    };
  },
  methods: {
    setShuffled() {
      let arr = this.shuffle(this.task.groups);
      this.task.shuffled = arr;
    },
    setAlphabetical() {
      let arr = this.alphabetical(this.task.shuffled);
      this.task.shuffled = arr;
    },
    setFocus: function() {},
    answeredClass(i) {
      return {
        "img-task--correct": this.task.shuffled[i].correct == 1,
        "img-task--in-correct": this.task.shuffled[i].correct == 0
      };
    },
    check() {
      this.task.shuffled.forEach(e => {
        e.correct = 0;
      });

      for (let i = 0; i < this.task.shuffled.length; i++) {
        let group = this.getGroup(this.task.shuffled[i].answer);
        let ans = this.task.answers[i];

        if (group.answer == ans) {
          this.task.shuffled[i].correct = 1;
        } else {
          this.task.shuffled.correct = 0;
        }
      }
    },
    setAnswers() {
      this.task.groups.forEach(() => this.task.answers.push(""));
    },
    getGroup(answer) {
      for (const i in this.task.groups) {
        if (this.task.groups[i].answer == answer) {
          return this.task.groups[i];
        }
      }
    }
  },
  computed: {},
  components: {},
  props: ["input"],
  mixins: {},
  mounted() {},
  beforeMount() {
    this.task = {
      ...this.task,
      ...this.input
    };
    this.setAnswers();
    this.setShuffled();
    this.setAlphabetical();
  }
};
</script>

<style scoped="scoped" lang="sass">
@import "@/components/Sass/Varibles.sass"

.img-task
	position: relative
	display: flex
	/* cursor: pointer */
	&__check
		max-width: 50px
		position: absolute
		z-index: 4
		bottom: 10px
		left: 10px
		background: #fff
		border: 1px solid #000
		border-radius: 3px
		display: flex
		overflow: hidden
		flex-direction: row
		box-shadow: 0 0 11px rgba(0, 0, 0, 0.14)
		input::-webkit-outer-spin-button,
		input::-webkit-inner-spin-button
			-webkit-appearance: none
		input[type='number']
			width: 20px
			outline: none
			text-align: center
	&__word, &__input
		width: 30px
		text-align: center
	&__word
		border-right: 1px solid #000
		padding: 0 4px 0 4px

	&--correct
		.img-task
			&__check
				border-color: $success_color

			&__word
				background-color: $success_color
				border-color: $success_color
				color: $success_color--text
	&--in-correct
		.img-task
			&__check
				border-color: $error_color

			&__word
				background-color: $error_color
				border-color: $error_color
				color: $error_color--text
</style>
