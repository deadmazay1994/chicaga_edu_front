<template>
  <div class="fill-gaps vue-component">
    <description :index="index">{{ inputCopy.description }}</description>
    <v-row no-gutters class="test">
      <draggable
        v-model="dragList"
        @end="dragEnd"
        v-if="dragList.length"
        :move="dragMove"
      >
        <div
          class="fill-gaps__drag-word table-item"
          v-for="(word, i) in dragList"
          :key="i"
        >
          {{ word }}
        </div>
      </draggable>
      <v-col cols="12" v-for="(item, index) in inputCopy.body" :key="index">
        <fill-gaps-item
          :sentence="item.sentence"
          :index="index"
          :data-index="index"
          :childSaved="childSaved"
          ref="gap"
          class="fill-gaps__item"
          @sendChanges="onChange"
        />
      </v-col>
    </v-row>
    <slot></slot>
  </div>
</template>

<script>
import FillGapsItem from "./FillGapsItem";
import Draggable from "vuedraggable";
import Description from "./TasksDescription";

import { mapGetters, mapMutations } from "vuex";

export default {
  name: "fill-gaps",
  data: function() {
    return {
      dragList: [],
      draging: false,
      inputCopy: {},
      error: true,
      childRef: "gap"
    };
  },
  methods: {
    ...mapMutations(["saveTask", "saveChildTask"]),
    dragMove() {
      return false;
    },
    onChange(data) {
      // Если у учителя как-то отличаются данные родительского компонента
      // То их надо обновить
      // Обновляем
      this.onChangeTask();
      // Эти данные нужны чтобы обновить дочерний компонент, а не родительский
      // В данном случае дочерний это syllable
      data.childIndex = data.index;
      data.childRef = this.childRef;
      this.sendTaskToTeacher(this.index, data);
    },
    check() {
      this.error = false;
      if (this.$refs.gap) {
        this.$refs.gap.forEach(child => {
          if (!this.error) {
            this.error = child.check();
          } else {
            child.check();
          }
        });
      }
    },
    showAnswers() {
      if (this.$refs.gap) {
        this.$refs.gap.forEach(child => {
          if (child.showAnswers) child.showAnswers();
        });
      }
    },
    setDragList() {
      this.dragList = [];
      this.inputCopy.body.forEach(e => {
        if (e.sentence.match(/\[(.*?)\]/g)) {
          e.sentence.match(/\[(.*?)\]/g).forEach(word => {
            this.dragList.push(word.replace("[", "").replace("]", ""));
          });
        }
      });
      if (this.inputCopy.extra_words) {
        this.dragList = [
          ...this.dragList,
          ...this.inputCopy.extra_words.split(",").filter(word => word)
        ];
      }
      this.dragList = this.shuffle(this.dragList);
    },
    dragEnd(e) {
      let input = document.elementFromPoint(
        e.originalEvent.x,
        e.originalEvent.y
      );
      if (input.className.indexOf("fill-gaps-item__input") + 1) {
        let text = e.item.textContent;
        let parentIndex = this.getElementIndex(
          input.parentElement.parentElement
        );
        let inputIndex = this.getElementIndex(input, true);
        this.$refs.gap[parentIndex].updateModelInput(text, inputIndex);
        this.$refs.gap[parentIndex].sendData();
      }
    },
    getElementIndex(element) {
      let i = element.dataset.index;
      if (i) return i;
      else console.error("Element" + element + " has no  attr data-index");
    }
  },
  computed: {
    ...mapGetters(["socket"])
  },
  components: {
    FillGapsItem,
    Description,
    Draggable
  },
  props: {
    input: { required: true },
    drag: { required: false },
    index: { required: false },
    childSaved: { required: false }
  },
  beforeMount() {
    this.setInputCopy();
    if (this.drag) {
      this.setDragList();
    }
  }
};
</script>

<style lang="sass" scoped>
.fill-gaps
  position: relative
  &__drag-word
    cursor: pointer
    display: inline-block
    margin-right: 5px
</style>
