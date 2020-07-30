<template>
  <div class="choose-syllable vue-component">
    <description>{{ inputCopy.description }}</description>
    <div class="d-flex">
      <syllable
        v-for="(sy, i) in inputCopy.body"
        :key="i"
        :index="i"
        :input="sy"
        ref="sy"
        @sendChanges="onChange"
      />
    </div>
  </div>
</template>

<script>
import Description from "./TasksDescription";
import Syllable from "./Syllable";

import Methods from "@/mixins/tasks";
import { mapGetters } from "vuex";

export default {
  name: "choose-syllable",
  data: function() {
    return {
      shuffled: [],
      inputCopy: {}
    };
  },
  methods: {
    check() {
      this.$refs.sy.forEach(sy => sy.check());
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
  props: ["input", "index"],
  mixins: [Methods],
  beforeMount() {
    this.setInputCopy();
    this.shuffled = this.shuffle(this.inputCopy.body);
  }
};
</script>

<style scoped="scoped" lang="sass"></style>
