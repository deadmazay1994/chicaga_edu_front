<template>
  <draggable v-model="listData" :move="handleMove" @end="handleDragEnd">
    <slot></slot>
  </draggable>
</template>

<script>
import Draggable from "vuedraggable";

export default {
  name: "comprassion-draggable",
  data: function() {
    return {
      futureItem: [],
      movingItem: [],
      movingIndex: 0,
      futureIndex: 0,
      listData: []
    };
  },
  methods: {
    handleDragEnd() {
      this.futureItem = this.listData[this.futureIndex];
      this.movingItem = this.listData[this.movingIndex];
      const _items = Object.assign([], this.listData);
      _items[this.futureIndex] = this.movingItem;
      _items[this.movingIndex] = this.futureItem;
      this.listData = _items;
      this.$emit("change", this.listData);
    },
    handleMove(e) {
      const { index, futureIndex } = e.draggedContext;
      this.movingIndex = index;
      this.futureIndex = futureIndex;
      return false; // disable sort
    }
  },
  computed: {},
  components: {
    Draggable
  },
  model: {
    prop: "list",
    event: "change"
  },
  props: ["list"],
  mixins: {},
  beforeMount() {
    this.listData = this.list;
  }
};
</script>

<style scoped="scoped" lang="sass"></style>
