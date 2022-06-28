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
            @changeSpeed="$emit('changeSpeed', speed)"
          />
          <gear-vue @click="settingsMenu = !settingsMenu" />
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
          @click="$emit('toggleExpand')"
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
      volumeBoolean: false
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
        this.$emit("volumeInput", value);
      }
    }
  },
  methods: {
    rewindTo(x) {
      this.$emit("rewindTo", x);
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
