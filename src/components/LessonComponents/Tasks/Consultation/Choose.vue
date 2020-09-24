<template>
  <div class="choose vue-component">
    <description :index="index"> {{ inputCopy.description }} </description>
    <div class="task-wrap">
      <div class="choose__cards">
        <v-row no-gutters class="justify-center">
          <v-col
            cols="12"
            lg="4"
            xl="3"
            class="mb-10"
            v-for="(select, i) in inputCopy.select"
            :key="i"
          >
            <div class="choose__card select">
              <div class="select__substrate"></div>
              <v-img class="select__img" :src="select.img" />
              <div class="select__title" :style="titleStyle(select.title)">
                {{ select.title }}
              </div>
              <div class="select__subtitle">{{ select.subtitle }}</div>
              <checkbox class="select_checkbox checkbox" />
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import Description from "./../TasksDescription";
import Checkbox from "./../Checkbox";

import Methods from "@/mixins/tasks";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "choose",
  data: function() {
    return {
      inputCopy: {}
    };
  },
  methods: {
    ...mapMutations(["saveTask"]),
    titleStyle(letters) {
      letters;
      let fs = 18;
      // if (letters.length >= 9) {
      //   fs = 14;
      // }
      return "font-size: " + fs + "px;";
    }
  },
  computed: {
    ...mapGetters(["socket"])
  },
  components: {
    Description,
    Checkbox
  },
  props: ["input", "index"],
  mixins: [Methods],
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
.select
  // background: #FBFBFB
  background: transparent
  background-position: -2px
  background-image: url("/imgs/cardBg.png")
  background-size: 100% 100%
  box-shadow: 2px -5px 6px rgba(0, 0, 0, 0.25)
  border-radius: 20px
  text-align: center
  padding: 25px 10px
  position: relative
  margin: 0 5px
  height: 100%
  min-height: 100px
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  &__substrate
    background: radial-gradient(50% 50% at 50% 50%, #F3F3F3 0%, #BEBEBE 100%)
    width: 40px
    height: 40px
    border-radius: 100%
    position: absolute
    top: -20px
    left: calc(50% - 21px)
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.25)
  &__img
    width: 28px
    height: 28px
    border-radius: 100%
    position: absolute
    left: calc( 50% - 14px )
    top: -12px
  &__title
    font-weight: 500
    margin-top: 10
    font-size: 18px
    line-height: 24px
  &__subtitle
    font-size: 15px
    line-height: 18px
.choose
  &__cards
    margin: 5px 0
</style>
