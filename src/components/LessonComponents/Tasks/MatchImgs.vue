<template>
  <div class="task-match vue-component">
    <div class="d-flex" style="align-items: interit">
      <div
        class="pr-10 img-task d-flex align-end"
        v-for="(group, index) in task.shuffled"
        :key="group.img"
      >
        <v-img contain max-width="100" :src="group.img" />
        <span :class="answeredImg(index)" class="img-index white--text">
          {{ index + 1 }}
        </span>
      </div>
    </div>
    <v-chip-group class="d-flex">
      <v-chip
        class="d-flex pa-5 align-center main-color main-color--text"
        v-for="(group, index) in task.shuffled"
        :key="group.word"
      >
        <div>
          <v-text-field
            color="#fff"
            class="number mr-3  task-match__match-inp"
            v-model="task.answers[index]"
          ></v-text-field>
        </div>
        <span>{{ group.word }}</span>
      </v-chip>
    </v-chip-group>
  </div>
</template>

<script>
export default {
  name: "task-match",
  data: function() {
    return {
      task: {
        groups: [
          {
            img:
              "https://s3.amazonaws.com/images.ecwid.com/images/9850151/423102537.jpg",
            word: "man"
          },
          {
            img:
              "https://img1.freepng.ru/20180607/bxt/kisspng-icon-steve-jobs-apple-computer-icons-s-5b18b4aecd7570.4954131515283457748416.jpg",
            word: "apple"
          },
          {
            img:
              "https://p7.hiclipart.com/preview/737/508/1012/emoji-laptop-personal-computer-desktop-computers-emoji-thumbnail.jpg",
            word: "desktop"
          },
          {
            img:
              "https://c7.uihere.com/files/522/586/563/computer-icons-fruit-clip-art-pineapple-icon-thumb.jpg",
            word: "pineapple"
          }
        ],
        shuffled: [],
        answers: []
      }
    };
  },
  methods: {
    setShuffled() {
      let imgs = this.shuffle(this.task.groups.map(e => e.img));
      let words = this.shuffle(this.task.groups.map(e => e.word));
      for (let i = 0; i < imgs.length; i++) {
        this.task.shuffled.push({
          img: imgs[i],
          word: words[i],
          correct: -1
        });
      }
    },
    getGroup(word) {
      for (const i in this.task.groups) {
        if (this.task.groups[i].word == word) {
          return this.task.groups[i];
        }
      }
    },
    setAnswers() {
      this.task.groups.forEach(() => this.task.answers.push(""));
    },
    check() {
      this.task.shuffled.forEach(e => {
        e.correct = 0;
      });
      for (let i = 0; i < this.task.shuffled.length; i++) {
        const e = this.task.shuffled[i];
        let group = this.getGroup(e.word);
        let ans = this.task.answers[i] - 1;
        let img = this.task.shuffled[ans].img;
        if (group.img == img) {
          this.task.shuffled[ans].correct = 1;
        } else {
          this.task.shuffled[ans].correct = 0;
        }
      }
    },
    answeredImg(i) {
      return {
        blue: this.task.shuffled[i].correct == 1,
        red: this.task.shuffled[i].correct == 0,
        "main-color": this.task.shuffled[i].correct == -1
      };
    },
    answeredText(i) {
      return {
        "blue--text": this.task.shuffled[i].correct == 1,
        "red--text": this.task.shuffled[i].correct == 0
      };
    }
  },
  computed: {},
  components: {},
  props: [],
  mixins: {},
  beforeMount() {
    this.setAnswers();
    this.setShuffled();
  }
};
</script>

<style scoped="scoped" lang="sass">
@import "@/components/Sass/Varibles.sass"

.number
  width: 30px
.img-task
  position: relative
.img-index
  position: absolute
  bottom: 0
  left: -13px
  border-radius: 100%
  width: 30px
  height: 30px
  display: flex
  align-items: center
  justify-content: center
  font-size: 20px
  font-weight: bold
  // border: 2px solid $main-color--text
</style>
