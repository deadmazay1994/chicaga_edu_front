<template>
  <div class="choose-syllable vue-component">
    <description :index="index">{{ inputCopy.description }}</description>
    <div class="d-flex" style="flex-wrap: wrap">
      <syllable
        v-for="(sy, i) in inputCopy.body"
        class="mt-2"
        :key="i"
        :index="i"
        :input="sy"
        :childSaved="childSaved"
        ref="sy"
        @sendChanges="onChange"
        v-model="answersArr[i]"
      />
    </div>
    <slot></slot>
  </div>
</template>

<script>
import Description from "./TasksDescription";
import Syllable from "./Syllable";
import api from "@/mixins/api";

import { mapGetters, mapMutations } from "vuex";

export default {
  name: "choose-syllable",
  data: function() {
    return {
      shuffled: [],
      inputCopy: {},
      error: true,
      answersArr: []
    };
  },
  methods: {
    ...mapMutations(["saveTask", "saveChildTask"]),
    async check() {
      console.log(this.answersArr);
      let answers = this.answersArr.map(answer => answer || "");
      const type = this.inputCopy.type;
      const data = {
        type: "lesson",
        type_check: type,
        section: this.inputCopy.section,
        answer: answers
      };
      // this.correct = api.methods.taskCheck(this.$route.params.id, data);
      return this.taskCheck(this.$route.params.id, data).then(res => {
        res.result.forEach((status, i) => this.$refs.sy[i].setStatus(status));
        return { value: res.points, type: data.type_check };
      });
      // answers.push({ answers: this.input.slogs[this.input.answer] });
    },
    onChange(data) {
      // Если у учителя как-то отличаются данные родительского компонента
      // То их надо обновить
      // Обновляем
      this.onChangeTask();
      // Эти данные нужны чтобы обновить дочерний компонент, а не родительский
      // В данном случае дочерний это syllable
      data.childIndex = data.index;
      data.childRef = "sy";
      this.sendTaskToTeacher(this.index, data);
    }
  },
  computed: {
    ...mapGetters(["socket"])
  },
  components: {
    Description,
    Syllable
  },
  props: ["input", "index", "childSaved"],
  mixins: [api],
  beforeMount() {
    this.setInputCopy();
    // this.shuffled = this.shuffle(this.inputCopy.body);
    this.shuffled = this.inputCopy.body;
  }
};
</script>

<style scoped="scoped" lang="sass"></style>
