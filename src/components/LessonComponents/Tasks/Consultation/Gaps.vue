<template>
  <div class="gaps vue-component">
    <description :index="index"> {{ input.description }} </description>
    <div class="gaps__title">{{ input.audioTitle }}</div>
    <vuetify-audio :file="input.audio" />
    <div class="gap gaps__gap" v-for="(gap, i) in input.tasks" :key="i">
      <div class="gap__title gap__front">{{ i + 1 }}. {{ gap.title }}</div>
      <div class="gap__options">
        <div
          class="gap__option gap__front option"
          v-for="(option, i) in gap.options"
          :key="i"
        >
          <div class="option__text">
            {{ option.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Description from "./../TasksDescription";
import VuetifyAudio from "vuetify-audio";

import Methods from "@/mixins/tasks";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "gaps",
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
    Description,
    VuetifyAudio
  },
  props: ["input", "index"],
  mixins: [Methods],
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
.gaps
  &__title
    text-align: center
    font-weight: 500
    font-size: 20px
    line-height: 24px
    color: #555555
    margin-bottom: 20px
.gap
  background: #FFFFFF
  border: 1px solid #F0F0F0
  box-sizing: border-box
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25)
  border-radius: 15px
  margin: 15px 0
  padding: 15px 10px
  &__front
    background: #F0F0F0
    border-radius: 10px
  &__title
    margin-bottom: 10px
    font-size: 18px
    line-height: 21px
    font-weight: bold
    color: #C53440
    padding: 7px 10px
  &__options
    display: flex
    flex-wrap: wrap
    justify-content: space-between
.option
  &__text
    font-weight: bold
    font-size: 22px
    line-height: 26px
    display: flex
    align-items: center
    justify-content: center
    color: #555555
    width: 150px
    min-height: 80px
</style>
