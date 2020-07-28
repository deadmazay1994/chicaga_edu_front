<template>
  <div class="fill-gaps vue-component">
    <description>{{ input.description }}</description>
    <v-row no-gutters>
      <draggable v-model="dragList" @end="dragEnd" v-if="dragList.length">
        <div
          class="fill-gaps__drag-word table-item"
          v-for="(word, i) in dragList"
          :key="i"
        >
          {{ word }}
        </div>
      </draggable>
      <v-col cols="12" v-for="(item, index) in input.body" :key="index">
        <fill-gaps-item
          :sentence="item.sentence"
          ref="childTask"
          class="fill-gaps__item"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import FillGapsItem from "./FillGapsItem";
import Draggable from "vuedraggable";
import Description from "./TasksDescription";

import "@/mixins/methods";

export default {
  name: "fill-gaps",
  data: function() {
    return {
      t: [
        {
          correct: null,
          val: "a"
        },
        {
          correct: null,
          val: "b"
        }
      ],
      dragList: [],
      draging: false
    };
  },
  methods: {
    check() {
      this.$refs.childTask.forEach(child => child.check());
    },
    setDragList() {
      this.input.body.forEach(e => {
        e.sentence
          .match(/\[(.*?)\]/g)
          .forEach(word => this.dragList.push(this.clearDeeper(word)));
      });
      this.dragList = [...this.dragList, ...this.input.addons];
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
        this.$refs.childTask[parentIndex].updateModelInput(text, inputIndex);
      }
    },
    getElementIndex(element, onlyThisElement = false) {
      let prev = 0;
      let tagName = element.tagName;
      while (element.previousSibling) {
        element = element.previousSibling;
        if (onlyThisElement && element.tagName == tagName) {
          prev++;
        }
        if (!onlyThisElement) {
          prev++;
        }
      }
      // Не знаю почему, но если onlyThisElement, то возращает на 1 больше
      // Если будут баги, то смотреть в первую очередь сюда !!!
      if (onlyThisElement) {
        return prev;
      } else {
        return prev - 1;
      }
    }
  },
  computed: {},
  components: {
    FillGapsItem,
    Description,
    Draggable
  },
  props: {
    input: { required: true },
    drag: { required: false }
  },
  mixins: {},
  beforeMount() {
    if (this.drag) {
      this.setDragList();
    }
    // console.log(document.getElementsByClassName("fill-gaps-item__input")[0].getBoundingClientRect())
    // console.log(document.elementFromPoint(152.1732940673828, 244.8295440673828))
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
