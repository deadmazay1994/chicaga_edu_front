<template>
  <div class="consultation-level vue-component">
    <description :index="index"> {{ inputCopy.description }} </description>
    <div class="consultation-level__levels cons-levels">
      <div v-if="activeLevel == inputCopy.levels[0].id" class="cons__level">
        <attachs
          class="cons__img"
          :key="0"
          :input="getImgData(inputCopy.levels[0].image)"
        />
        <div class="cons__select">
          <img
            :src="IMGSTORE + inputCopy.levels[0].ring_image"
            class="cons__select-ring cons__select-ring--adults"
          />
          <div class="cons__chips">
            <chip
              class="cons__chip"
              :key="0"
              :for-teacher="true"
              style="bottom: 4px; left: -170px"
              width="192px"
              background="#FAECCD"
              color="black"
              text-align="center"
              box-align="right"
              >BEGINNER</chip
            >
            <chip
              class="cons__chip"
              :key="1"
              :for-teacher="true"
              style="bottom: 79px; left: -190px"
              width="192px"
              background="#E4F5B2"
              color="black"
              text-align="center"
              box-align="right"
              >ELEMENTARY</chip
            >
            <chip
              class="cons__chip"
              :key="2"
              :for-teacher="true"
              style="top: 32px; left: -170px"
              width="192px"
              background="#F0C7EE"
              color="black"
              text-align="right"
              box-align="right"
              >PRE-INTERMEDIATE</chip
            >
            <chip
              class="cons__chip"
              :key="3"
              :for-teacher="true"
              style="top: -57px; left: 34px"
              width="192px"
              background="#CCF4C1"
              color="black"
              text-align="right"
              >INTERMEDIATE</chip
            >
            <chip
              class="cons__chip"
              :key="4"
              :for-teacher="true"
              background="#C7D5F2"
              color="black"
              box-align="left"
              style="top: 32px; right: -170px"
              width="192px"
              >INTERMEIDAT PLUS</chip
            >
            <chip
              class="cons__chip"
              :key="5"
              :for-teacher="true"
              background="#A9E9E2"
              color="black"
              style="bottom: 79px; right: -190px"
              width="192px"
              box-align="left"
              >UPPER INTERMEDIATE</chip
            >
            <chip
              class="cons__chip"
              :key="6"
              :for-teacher="true"
              style="bottom: 4px; right: -170px"
              width="192px"
              background="#E94A3C"
              color="white"
              text-align="center"
              box-align="left"
              >ADVANCED</chip
            >
          </div>
          <center-btn @click.native="nextLevel" class="cons__btn">{{
            inputCopy.levels[0].label
          }}</center-btn>
        </div>
      </div>
      <div v-if="activeLevel == inputCopy.levels[1].id" class="cons__level">
        <attachs
          class="cons__img"
          :key="1"
          :input="getImgData(inputCopy.levels[1].image)"
        />
        <div class="cons__select">
          <img
            :src="IMGSTORE + inputCopy.levels[1].ring_image"
            class="cons__select-ring cons__select-ring--adults"
          />
          <div class="cons__chips">
            <chip
              class="cons__chip"
              :key="11"
              :for-teacher="true"
              style="bottom: -12px; left: -191px"
              width="192px"
              background="#FEF4B4"
              color="black"
              text-align="center"
              box-align="right"
              >ELEMENTARY</chip
            >
            <chip
              class="cons__chip"
              :key="12"
              :for-teacher="true"
              style="top: 32px; left: -189px"
              width="192px"
              background="#CCF4C1"
              color="black"
              text-align="right"
              >PRE-INTERMEDIATE</chip
            >
            <chip
              class="cons__chip"
              :key="13"
              :for-teacher="true"
              style="top: -57px; left: 34px"
              width="192px"
              background="#D8D3F5"
              color="black"
              text-align="right"
              >INTERMEDIATE</chip
            >
            <chip
              class="cons__chip"
              :key="14"
              :for-teacher="true"
              background="#F5B5D5"
              color="black"
              box-align="left"
              style="top: 32px; right: -189px"
              width="192px"
              >UPPER INTERMEDIATE</chip
            >
            <chip
              class="cons__chip"
              :key="15"
              :for-teacher="true"
              style="bottom: -12px; right: -184px"
              width="192px"
              background="#E23926"
              color="white"
              text-align="center"
              box-align="left"
              >ADVANCED</chip
            >
          </div>
          <center-btn @click.native="nextLevel" class="cons__btn">{{
            inputCopy.levels[1].label
          }}</center-btn>
        </div>
      </div>
      <div v-if="activeLevel == inputCopy.levels[2].id" class="cons__level">
        <attachs
          class="cons__img"
          :key="2"
          :input="getImgData(inputCopy.levels[2].image)"
        />
        <div class="cons__select">
          <img
            :src="IMGSTORE + inputCopy.levels[2].ring_image"
            class="cons__select-ring cons__select-ring--adults"
          />
          <div class="cons__chips">
            <chip
              class="cons__chip chip--mobile"
              :key="7"
              :for-teacher="true"
              style="bottom: -17px; left: -191px"
              width="192px"
              background="#92CFA6"
              color="black"
              text-align="center"
              box-align="right"
              >ZERO BEGINNER</chip
            >
            <chip
              class="cons__chip cons__chip__b"
              :key="8"
              :for-teacher="true"
              style="top: -17px; left: -191px"
              width="192px"
              background="#9FDDF9"
              color="black"
              text-align="right"
              >BEGINNER</chip
            >
            <chip
              class="cons__chip cons__chip__el"
              :key="9"
              :for-teacher="true"
              background="#FAA24E"
              color="black"
              box-align="left"
              style="top: -17px; right: -191px"
              width="192px"
              >ELEMENTARY</chip
            >
            <chip
              class="cons__chip cons__chip__li"
              :key="10"
              :for-teacher="true"
              style="bottom: -17px; right: -191px"
              width="192px"
              background="#E94A3C"
              color="white"
              text-align="left"
              box-align="left"
              >LOWER INTERMEDIATE</chip
            >
          </div>
          <center-btn
            @click.native="nextLevel"
            class="cons__btn"
            style="top: 7px"
            >{{ inputCopy.levels[2].label }}</center-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Description from "Tasks/TasksDescription";
import Attachs from "Tasks/Attachs";

import CenterBtn from "./LevelCenter";

import Chip from "Ui/Chip";

import { mapGetters, mapMutations } from "vuex";

export default {
  name: "choose",
  data: function() {
    return {
      inputCopy: {},
      activeLevelIndex: 0
    };
  },
  methods: {
    ...mapMutations(["saveTask", "setActiveLevel", "setActiveLevelIndex"]),
    getImgData(linkToImg) {
      return {
        body: [
          [
            {
              file_name: linkToImg,
              file_type: "image/jpeg"
            }
          ]
        ]
      };
    },
    nextLevel() {
      this.activeLevelIndex++;
      this.Do("toggleLevel", [this.activeLevelIndex]);
    },
    toggleLevel(activeLevelIndex) {
      this.setActiveLevel(
        this.inputCopy.levels[activeLevelIndex % this.inputCopy.levels.length]
          .id
      );
      this.setActiveLevelIndex(activeLevelIndex % this.inputCopy.levels.length);
    }
  },
  computed: {
    ...mapGetters(["socket", "activeLevel", "user"])
  },
  components: {
    Description,
    Attachs,
    Chip,
    CenterBtn
  },
  props: ["input", "index"],
  beforeMount() {
    this.setActiveLevel("adults");
    this.onDo("toggleLevel");
  }
};
</script>

<style scoped="scoped" lang="sass">
.consultation-level
  &__levels
    height: 580px
.cons
  &__select
    position: relative
    width: 260px
    margin: 0 auto
  &__select-ring
    margin-top: 100px
    margin-bottom: 30px
    display: block
    max-width: 100%
    height: auto
  &__chip
    position: absolute
    width: 192px
    height: 57px
  &__btn
    width: 160px
    height: 160px
    position: absolute
    top: 57px
    left: 48px
@media (max-width: 720px)
  .consultation-level
    &__levels
      height: auto
  .cons
    &__chips
      display: flex
      flex-wrap: wrap
      justify-content: space-around
    &__select
      display: flex
      flex-direction: column-reverse
      width: 100%
      align-items: center
    &__select-ring
      display: none
    &__btn
      top: unset !important
      left: unset !important
      position: relative
      margin-top: 20px
      margin-bottom: 20px
    &__chip
      top: unset !important
      bottom: unset !important
      left: unset !important
      right: unset !important
      position: relative
      margin-bottom: 10px
</style>
