<template>
  <div class="task-match vue-component">
    <description>{{ input.description }}</description>
    <div class="d-flex" style="align-items: interit; margin-bottom: 15px">
      <div
        class="pr-10 img-task d-flex align-end"
        v-for="(group, index) in task.shuffled"
        :key="index"
      >
        <v-img contain max-width="100" :src="IMGSTORE + group.img" />
        <span :class="answeredImg(index)" class="img-index white--text">{{
          index + 1
        }}</span>
      </div>
    </div>
    <div
      class="d-flex align-center"
      v-for="(group, index) in task.shuffled"
      :key="index"
    >
      <div style="width: 40px">
        <v-text-field
          class="number mr-3 task-match__match-inp pa-0"
          style="text-align: center"
          v-model="task.answers[index]"
        ></v-text-field>
      </div>
      <span>{{ group.word }}</span>
    </div>
  </div>
</template>

<script>
import Description from "./TasksDescription";

export default {
  name: "task-match",
  data: function() {
    return {
      task: {
        // groups: [
        //   {
        //     img:
        //       "https://s3.amazonaws.com/images.ecwid.com/images/9850151/423102537.jpg",
        //     word: "man"
        //   },
        //   {
        //     img:
        //       "https://img1.freepng.ru/20180607/bxt/kisspng-icon-steve-jobs-apple-computer-icons-s-5b18b4aecd7570.4954131515283457748416.jpg",
        //     word: "apple"
        //   },
        //   {
        //     img:
        //       "https://p7.hiclipart.com/preview/737/508/1012/emoji-laptop-personal-computer-desktop-computers-emoji-thumbnail.jpg",
        //     word: "desktop"
        //   },
        //   {
        //     img:
        //       "https://c7.uihere.com/files/522/586/563/computer-icons-fruit-clip-art-pineapple-icon-thumb.jpg",
        //     word: "pineapple"
        //   }
        // ],
        shuffled: [],
        answers: []
      }
    };
  },
  methods: {
    setShuffled() {
      let imgs = this.shuffle(this.input.body.map(e => e.name));
      let words = this.shuffle(this.input.body.map(e => e.word));
      for (let i = 0; i < imgs.length; i++) {
        this.task.shuffled.push({
          img: imgs[i],
          word: words[i],
          correct: -1
        });
      }
    },
    getGroup(number) {
      for (const i in this.input.body) {
        if (this.input.body[i].number == number) {
          console.log(this.input.body, number);
          return this.input.body[i];
        }
      }
    },
    setAnswers() {
      this.input.body.forEach(() => this.task.answers.push(""));
    },
    check() {
      this.task.shuffled.forEach(e => {
        e.correct = 0;
      });
      this.task.answers.forEach((indexImg, indexWord) => {
        let img = "",
          word = "";
        if (this.task.shuffled[indexImg - 1] != undefined) {
          img = this.task.shuffled[indexImg - 1].img;
        }
        if (this.task.shuffled[indexWord] != undefined) {
          word = this.task.shuffled[indexWord].word;
        }
        if (this.input.body.find(i => i.word == word).name == img) {
          this.task.shuffled[indexImg - 1].correct = true;
        }
      });
      // for (let i = 0; i < this.task.shuffled.length; i++) {
      //   const e = this.task.shuffled[i];
      //   let group = this.getGroup(e.number);
      //   let ans = this.task.answers[i] - 1;
      //   let img = this.task.shuffled[ans].name;
      //   if (group.name == img) {
      //     this.task.shuffled[ans].correct = 1;
      //   } else {
      //     this.task.shuffled[ans].correct = 0;
      //   }
      // }
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
  components: {
    Description
  },
  props: ["input"],
  mixins: {},
  beforeMount() {
    this.setAnswers();
    this.setShuffled();
  }
};
</script>

<style scoped="scoped" lang="sass">
@import "@/components/Sass/Varibles.sass"

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
