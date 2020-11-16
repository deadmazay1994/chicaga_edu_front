<template>
  <div class="ctrls vue-component pr-2 pb-2" elevation="10">
    <div class="ctrls__item ctrl" v-for="ctrl in ctrls" :key="ctrl.name">
      <btn
        class="ctrl__item-btn"
        :groupName="ctrl.groupName"
        :toolName="ctrl.name"
        :meta="ctrl.meta"
        @click.native="onclickWidthDeault(ctrl.onclick)"
        >{{ ctrl.icon }}</btn
      >
      <div class="ctrl__hidden">
        <btn
          v-for="tool in ctrl.tools"
          class="ctrl__tool"
          :key="tool.name"
          :toolName="tool.name"
          :meta="ctrl.meta"
          :parentGroup="ctrl.groupName"
        >
          {{ tool.icon }}</btn
        >
      </div>
    </div>
    <div class="ctrls__item ctrl ctrls__palet">
      <div class="ctrl__item-btn ctrl__palet-icon"></div>
      <div class="ctrl__hidden">
        <div
          class="ctrl__palet-item ctrl__item-btn"
          v-for="color in pallet"
          :key="color"
          :style="'background: ' + color"
          :class="{ 'ctrl__palet-item--active': paletItemIsActive(color) }"
          @click="toggleColor(color)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import Btn from "./CtrlBtn";

export default {
  name: "ctrls",
  data: function() {
    return {
      ctrls: [],
      pallet: []
    };
  },
  methods: {
    ...mapMutations([
      "toggleTool",
      "toolGroup",
      "toggleTollGroup",
      "toggleColor",
      "changeBrushSize"
    ]),
    toggleToolByEvent(event) {
      this.toggleTool(event.target.dataset.tool);
    },
    toggleGroupByEvent(event) {
      this.toggleTollGroup(event.target.dataset.tollGroup);
    },
    ctrlActive(name) {
      return name == this.toggleTool;
    },
    groupActive(name) {
      return name == this.toolGroup;
    },
    setPallet() {
      this.pallet = [
        "#df4b26",
        "orange",
        "yellow",
        "green",
        "blue",
        "purple",
        "black",
        "white"
      ];
    },
    paletItemIsActive(color) {
      return color == this.color;
    },
    setCircleCursor() {
      // todo
    },
    clearCanvas() {
      this.$parent.clearCanvasDo();
    },
    onclickWidthDeault(fun = () => {}) {
      // Не знаю почему но нсли вызвать функцию, то все работает
      fun();
      return fun;
    }
  },
  computed: {
    ...mapGetters(["tool", "color"])
  },
  components: { Btn },
  props: [],
  mixins: {},
  beforeMount() {
    this.onDo();
    this.setPallet();
    this.ctrls = [
      // {
      //   name: "clear",
      //   icon: "mdi-broom",
      //   meta: {
      //     notActivation: true
      //   },
      //   onclick: () => this.clearCanvas()
      // },
      {
        name: "brush",
        icon: "mdi-brush",
        onclick: () => {
          this.changeBrushSize(5);
          this.setCircleCursor();
        }
      },
      {
        name: "eraser",
        icon: "mdi-eraser",
        onclick: () => {
          this.changeBrushSize(20);
          this.setCircleCursor();
        }
      },
      {
        groupName: "shapes",
        name: "shapes",
        icon: "mdi-shape-plus",
        tools: [
          {
            name: "circle",
            icon: "mdi-checkbox-blank-circle-outline"
          },
          {
            name: "rect",
            icon: "mdi-crop-landscape"
          },
          {
            name: "star",
            icon: "mdi-star-outline"
          }
        ]
      }
    ];
  }
};
</script>

<style scoped="scoped" lang="sass">
@import "@/components/Sass/Varibles.sass"

.ctrls
  background: #fff
  pointer-events: all
.ctrl
  position: relative
  cursor: pointer
  &__hidden
    width: 25px
    background: #fff
    position: absolute
    top: 0
    left: 23px
    display: none
  &:hover
    .ctrl__hidden
      display: block
  &__item-btn
    width: 24px
    height: 24px
  &__palet-icon
    background: linear-gradient(45deg, orange , yellow, green, cyan, blue, violet)
  &__palet-item
    box-sizing: border-box
    &--active
      border: 2px dashed black
</style>
