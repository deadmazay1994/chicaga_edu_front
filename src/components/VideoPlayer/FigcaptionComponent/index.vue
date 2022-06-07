<template>
  <figcaption class="figcaption-component" @click="$emit('click')">
    <div class="top">
      <Progress
        @rewindTo="$emit('rewindTo', x)"
        ref="progress"
        :currentTime="currentTime"
        :duration="duration"
        :timestamps="timestamps"
      />
    </div>
    <div class="bottom">
      <div class="left-side">
        <play-svg-vue :onPause="paused" @clickElem="$emit('togglePlay')" />
        <volume-area-vue />
        <current-time-output-vue
          :currentTitle="currentTitle"
          :currentVideoTime="currentVideoTime"
          :formattedDuration="formattedDuration"
        />
      </div>
      <div class="right-side" style="z-index: 100">
        <div class="right-side__settings">
          <settings-menu-vue
            v-if="settingsMenu"
            @changeSpeed="$emit('changeSpeed', speed)"
          />
          <gear-vue @click="settingsMenu = !settingsMenu" />
        </div>
        <chat-svg-vue
          v-if="showChatButton"
          :chatOff="chatState"
          :fullscreenChatState="fullscreenChatState"
          :fullScreenMode="fullscreenOn"
          @clickElem="$emit('clickChat')"
        />
        <expand-svg-vue
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
import VolumeAreaVue from "../VolumeArea.vue";
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
      settingsMenu: false
    };
  },
  props: {
    // Progress props:
    currentTime: Number,
    duration: Number,
    timestamps: Array,
    // PlaySvgVue props:
    paused: Boolean,
    // CurrentTimeOutputVue props:
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
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="sass"></style>
