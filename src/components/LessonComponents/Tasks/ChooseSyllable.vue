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
      />
    </div>
    <slot></slot>
  </div>
</template>

<script>
import Description from "./TasksDescription";
import Syllable from "./Syllable";

import { mapGetters, mapMutations } from "vuex";

export default {
  name: "choose-syllable",
  data: function() {
    return {
      shuffled: [],
      inputCopy: {},
      error: true
    };
  },
  methods: {
    ...mapMutations(["saveTask", "saveChildTask"]),
    check() {
      this.error = false;
      this.$refs.sy.forEach(sy => {
        if (!this.error) {
          this.error = sy.check();
        } else {
          sy.check();
        }
      });
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
  beforeMount() {
    this.setInputCopy();
    // this.shuffled = this.shuffle(this.inputCopy.body);
    this.shuffled = this.inputCopy.body;
  }
};
</script>

<style scoped="scoped" lang="sass"></style>
