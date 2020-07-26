<template>
  <div class="fill-gaps vue-component">
    <span class="fill-gaps__description text-subtitle-2">
      {{ input.description }}
    </span>
    <v-row>
      <!-- <draggable v-model="task.options">
        <div v-for="(option, i) in task.options" :key="i">{{ option }}</div>
      </draggable> -->
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
// import Draggable from "vuedraggable";

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
      ]
    };
  },
  methods: {
    check() {
      this.$refs.childTask.forEach(child => child.check());
    }
  },
  computed: {},
  components: {
    FillGapsItem
    // Draggable
  },
  props: {
    input: { required: true }
  },
  mixins: {}
};
</script>

<style lang="sass" scoped>
.fill-gaps
  position: relative
</style>
