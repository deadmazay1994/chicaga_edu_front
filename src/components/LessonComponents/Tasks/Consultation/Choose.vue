<template>
  <div class="choose vue-component">
    <description :index="index"> {{ inputCopy.description }} </description>
    <div class="task-wrap">
      <div class="choose__cards">
        <v-row no-gutters class="justify-center">
          <v-col
            cols="3"
            xs="4"
            class="mb-10"
            v-for="(select, i) in inputCopy.select"
            :key="i"
          >
            <div class="choose__card select" :class="activeClass(i)">
              <div class="select__substrate"></div>
              <v-img contain class="select__img" :src="select.img" />
              <div class="select__title" :style="titleStyle(select.title)">
                {{ select.title }}
              </div>
              <div class="select__subtitle">{{ select.subtitle }}</div>
              <checkbox
                @click.native="activate(i)"
                :error="select.success"
                class="select_checkbox checkbox"
              />
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
      let fs = 16;
      // if (letters.length >= 9) {
      //   fs = 14;
      // }
      return "font-size: " + fs + "px;";
    },
    activate(i) {
      if (!("success" in this.inputCopy.select[i])) {
        this.inputCopy.select[i].success = "correct";
      } else {
        if (this.inputCopy.select[i].success == "correct") {
          this.inputCopy.select[i].success = null;
        } else {
          this.inputCopy.select[i].success = "correct";
        }
      }
      this.$forceUpdate();
    },
    activeClass(i) {
      return {
        "select--correct": this.inputCopy.select[i].success == "correct"
      };
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
  beforeMount() {
    this.inputCopy.select.forEach(select => {
      this.$set(select, "success", null);
    });
  }
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
  &--correct
    background-image: url("/imgs/tasksBgs/change--success.png")
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
    position: absolute
    left: calc( 50% - 14px )
    top: -12px
  &__title
    font-weight: 500
    margin-top: 10
    font-size: 16px
    line-height: 24px
  &__subtitle
    font-size: 12px
    line-height: 18px
.choose
  &__cards
    margin: 5px 0
</style>
