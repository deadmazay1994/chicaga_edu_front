<template>
  <div class="attachments">
    <div
      class="attachments__item"
      v-for="(attachment, i) in attachments"
      v-bind:key="i"
    >
      <div class="attachments__ctrl attachments-ctrl">
        <a
          target="_blank"
          :href="attachment.title_link"
          class="attachments-ctrl__download attachments-ctrl__item"
          v-if="attachment.image_url"
        >
          <download color="#000" width="100%" height="100%" class />
        </a>
      </div>
      <div class="attachments__content">
        <template v-if="attachment.image_url">
          <v-img
            class="attachments__img attachments__attachment"
            ref="img"
            :src="attachment.image_url"
            alt
            v-zoom
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <div class="attachments__descr">{{ attachment.description }}</div>
        </template>
        <template v-else-if="attachment.video_url">
          <video
            controls
            class="attachments__attachment attachments__video"
            :src="attachment.title_link"
          ></video>
        </template>
        <template v-else-if="attachment.audio_url">
          <vuetify-audio
            :file="attachment.title_link"
            class="attachments__attachment attachments__audio vuetify-audio"
          />
        </template>
        <template v-else-if="attachment.title_link_download">
          <a
            target="_blank"
            :href="attachment.title_link"
            class="attachments__file-link"
          >
            <file class="attachments__attachment attachments__file" />
            <div class="attachments__file-title">{{ attachment.title }}</div>
          </a>
          <div class="attachments__descr">{{ attachment.description }}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Download from "./icons/Download";
import File from "./icons/File";

import VuetifyAudio from "vuetify-audio";
import Zoom from "@/directives/zoom";

export default {
  name: "chat-attachments",
  data: function() {
    return {
      loaded: false
    };
  },
  methods: {},
  computed: {},
  components: {
    Download,
    File,
    VuetifyAudio
  },
  directives: {
    ...Zoom
  },
  props: ["attachments"],
  mixins: {},
  mounted() {
    let imgs = this.$refs.img;
    if (imgs != undefined) {
      imgs[0].onload = () => {
        this.loaded = 1;
      };
    }
  }
};
</script>

<style scoped="scoped">
.attachments__item {
  position: relative;
  display: inline-block;
  max-width: 100%;
}
.attachments__attachment {
  display: block;
  max-width: 100%;
  height: auto;
}
.attachments__file {
  width: 30px;
}
.attachments-ctrl {
  display: flex;
  opacity: 0;
  padding: 10px;
}
.attachments-ctrl__item {
  width: 20px;
  margin-right: 5px;
  position: relative;
  opacity: 0.99;
  cursor: pointer;
  max-width: 100%;
}
.attachments-ctrl:hover {
  opacity: 1;
}
/* .attachments-ctrl__item:before {
    display: block;
    z-index: 0;
    width: 50px;
    height: 50px;
    background: #00000033;
    content: "";
    position: absolute;
    top: 0;
} */
.attachments__ctrl {
  position: absolute;
  right: -5px;
  top: 5px;
}
.attachments__descr {
  margin-top: 10px;
}
.attachments__file-link {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.attachments__file {
  margin-right: 5px;
}
.attachments__file-title {
  max-width: 90%;
}
.attachments__video {
  min-width: 300px;
  display: block;
}
</style>
