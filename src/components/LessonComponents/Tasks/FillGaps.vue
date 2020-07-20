<template>
  <div class="fill-gaps vue-component">
    <span class="fill-gaps__description text-subtitle-2">{{
      task.description
    }}</span>
    <v-row>
      <v-col cols="12" v-for="(item, index) in task.body" :key="index">
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

export default {
  name: "fill-gaps",
  data: function() {
    return {};
  },
  methods: {
    check() {
      this.$refs.childTask.forEach(child => child.check());
    }
  },
  computed: {},
  components: {
    FillGapsItem
  },
  props: {
    task: { required: true }
  },
  mixins: {},
  beforeMount() {}
};
</script>

<style lang="sass" scoped></style>
