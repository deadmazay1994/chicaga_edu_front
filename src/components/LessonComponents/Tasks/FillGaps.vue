<template>
  <div class="fill-gaps vue-component">
    <description :index="index">{{ inputCopy.description }}</description>
    <v-row no-gutters class="test">
      <draggable
        v-model="dragList"
        @end="dragEnd"
        v-if="dragList.length"
        :forceFallback="true"
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
import api from "@/mixins/api.js";

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
    async getLesson() {
      let r = await api.methods.getFullLesson(this.$route.params.id);
      return {
        // type: r.lesson[this.activeGroupIndexLesson].tasks[0].type,
        // section: r.lesson[this.activeGroupIndexLesson].tasks[0].section,
        id: r.id
      };
    },
    async check() {
      // let checkData = {
      //   type: "lesson",
      //   type_check: "insert_skipped_word",
      //   section: this.inputCopy.section,
      //   answer: this.$refs.gap.map(gap => {
      //     return { answers: gap.answer };
      //   })
      // };
      // this.taskCheck(this.$route.params.id, checkData).then(r => {
      //   r.result.forEach((e, i) => {
      //     this.$refs.gap[i].setStatus(e.answers);
      //   });
      //   console.log("данные this.taskCheck");
      // });
      const type_check = "insert_skipped_word";
      let r = await this.getLesson();
      console.log("данные FillGaps.vue r:", r);
      const checkData = {
        type: "lesson",
        type_check: type_check,
        section: r.section,
        answer: this.$refs.gap.map(gap => {
          return { answers: gap.answer };
        })
      };
      let result = await this.taskCheck(this.$route.params.id, checkData).then(
        r => {
          Object.keys(r.result).forEach(index => {
            this.$refs.gap[index].setStatus(r.result[index].answers);
          });
        }
      );
      console.log("данные FillGaps.vue result:", result);
      return { value: result.points, type: type_check };
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
  computed: {
    ...mapGetters(["socket"])
  },
  components: {
    FillGapsItem,
    Description,
    Draggable
  },
  mixins: [api],
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
