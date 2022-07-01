<template>
  <figcaption class="figcaption-component" @click="$emit('click')">
    <div class="figcaption-component__top">
      <Progress
        class="figcaption-component__progress"
        @rewindTo="rewindTo"
        ref="progress"
        :currentTime="currentTime"
        :duration="duration"
        :timestamps="timestamps"
      />
    </div>
    <div class="figcaption-component__bottom">
      <div class="figcaption-component__bottom-left">
        <play-svg-vue
          class="figcaption-component__play-svg"
          :onPause="paused"
          @click="$emit('togglePlay')"
        />
        <volume-area-vue
          class="figcaption-component__volume-area"
          :volumeBoolean="volumeBoolean"
          v-model="volumeInputValue"
          @clickToggleVolume="$emit('clickToggleVolume')"
          @mouseenter="volumeBoolean = true"
          @mouseleave="volumeBoolean = false"
        />
        <current-time-output-vue
          class="figcaption-component__current-time"
          :currentTitle="currentTitle"
          :currentVideoTime="currentVideoTime"
          :formattedDuration="formattedDuration"
        />
      </div>
      <div class="figcaption-component__bottom-right" style="z-index: 100">
        <div class="figcaption-component__settings">
          <settings-menu-vue
            class="figcaption-component__settings-menu"
            v-if="settingsMenu"
            :videoSpeedArray="videoSpeedArray"
            @changeSpeed="changeSpeed"
            v-click-outside="() => onClickOutside()"
          />
          <gear-vue @click.native="toggleSettingMenu()" />
        </div>
        <chat-svg-vue
          class="figcaption-component__chat-svg"
          v-if="showChatButton"
          :chatOff="chatState"
          :fullscreenChatState="fullscreenChatState"
          :fullScreenMode="fullscreenOn"
          @clickElem="$emit('clickChat')"
        />
        <expand-svg-vue
          class="figcaption-component__expand-svg"
          :expanded="fullscreenOn"
          @click.native="$emit('toggleExpand')"
        />
      </div>
    </div>
  </figcaption>
</template>

<script>
import Progress from "../Progress.vue";
import PlaySvgVue from "../../Icons/PlaySvg.vue";
import VolumeAreaVue from "./VolumeArea.vue";
import CurrentTimeOutputVue from "./CurrentTimeOutput.vue";
import SettingsMenuVue from "../SettingsMenu.vue";
import GearVue from "../../Icons/Gear.vue";
import ChatSvgVue from "../../Icons/ChatSvg.vue";
import ExpandSvgVue from "../../Icons/ExpandSvg.vue";

import vClickOutside from "v-click-outside";

export default {
  name: "figcaption-component",
  components: {
    Progress,
    PlaySvgVue,
    VolumeAreaVue,
    CurrentTimeOutputVue,
    SettingsMenuVue,
    GearVue,
    ChatSvgVue,
    ExpandSvgVue
  },
  data: function() {
    return {
      settingsMenu: false,
      volumeBoolean: false,
      videoSpeedArray: [
        { title: 0.25, speed: 0.25, active: false },
        { title: 0.5, speed: 0.5, active: false },
        { title: 0.75, speed: 0.75, active: false },
        { title: "Обычная", speed: 1, active: true },
        { title: 1.25, speed: 1.25, active: false },
        { title: 1.5, speed: 1.5, active: false },
        { title: 1.75, speed: 1.75, active: false },
        { title: 2, speed: 2, active: false }
      ]
    };
  },
  props: {
    // Progress props:
    currentTime: Number,
    duration: Number,
    timestamps: Array,
    // PlaySvg props:
    paused: Boolean,
    // VolumeArea props:
    volumeValue: { required: true },
    // CurrentTimeOutput props:
    currentTitle: {
      type: String,
      default: ""
    },
    currentVideoTime: String,
    formattedDuration: [String, Boolean],
    // ChatSvgVue props:
    showChatButton: Boolean,
    chatState: Boolean,
    fullscreenChatState: Boolean,
    fullscreenOn: Boolean // ExpandSvgVue also
  },
  computed: {
    volumeInputValue: {
      get() {
        return this.volumeValue;
      },
      set(value) {
        this.$emit("volumeInput", Number(value));
      }
    }
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  methods: {
    rewindTo(x) {
      this.$emit("rewindTo", x);
    },
    changeSpeed(speed, i) {
      this.$emit("changeSpeed", speed);
      this.videoSpeedArray.map(row => (row.active = false));
      this.videoSpeedArray[i].active = true;
    },
    toggleSettingMenu() {
      this.settingsMenu = !this.settingsMenu;
      this.$emit("toggleInterruptFlag", this.settingsMenu);
    },
    async onClickOutside() {
      console.log("onClickOutside");
      this.settingsMenu = false;
      this.$emit("toggleInterruptFlag", this.settingsMenu);
    }
  }
};
</script>

<style scoped="scoped" lang="sass">
.figcaption-component
  display: flex
  flex-direction: column
  padding-top: 15px
  padding-bottom: 15px
  font-size: 13px
  color: #ffffff
  &__top
    margin-bottom: 10px
  &__bottom
    display: flex
    align-items: center
    justify-content: space-between
    padding-right: 15px
    padding-left: 15px
  &__bottom-left
    display: flex
    align-items: center
    margin-right: 10px
  &__play-svg
    cursor: pointer
  &__volume-area
    margin-left: 20px
  &__current-time
    margin-left: 0.5em
  &__bottom-right
    display: flex
    align-items: center
  &__settings
    position: relative
  &__settings-menu
    position: absolute
    transform: translate(-100%, -100%)
  &__expand-svg
    margin-left: 18px
</style>
