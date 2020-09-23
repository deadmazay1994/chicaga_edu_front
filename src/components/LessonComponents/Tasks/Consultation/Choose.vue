<template>
  <div class="choose vue-component">
    <description :index="index"> {{ input.description }} </description>
    <div class="choose__cards">
      <div
        class="choose__card select"
        v-for="(select, i) in input.select"
        :key="i"
      >
        <div class="select__substrate"></div>
        <v-img class="select__img" :src="select.img" />
        <div class="select__title">{{ select.title }}</div>
        <div class="select__subtitle">{{ select.subtitle }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Description from "./../TasksDescription";

import Methods from "@/mixins/tasks";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "choose",
  data: function() {
    return {};
  },
  methods: {
    ...mapMutations(["saveTask"])
  },
  computed: {
    ...mapGetters(["socket"])
  },
  components: {
    Description
  },
  props: ["input", "index"],
  mixins: [Methods],
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
.choose
  &__cards
    display: flex
    justify-content: space-between
    margin: 5px 0
.select
  width: 125px
  background: #FBFBFB
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25)
  border-radius: 20px
  text-align: center
  padding: 10px
  position: relative
  &__substrate
    background: radial-gradient(50% 50% at 50% 50%, #F3F3F3 0%, #BEBEBE 100%)
    width: 48px
    height: 48px
    border-radius: 100%
    position: absolute
    top: -15px
    left: calc(50% - 24px)
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.25)
  &__img
    width: 28px
    height: 28px
    border-radius: 100%
    margin: 0 auto
    margin-top: -16px
    margin-bottom: 16px
  &__title
    font-weight: 500
    margin-top: 10
    font-size: 18px
    line-height: 24px
  &__subtitle
    font-size: 15px
    line-height: 18px
</style>
