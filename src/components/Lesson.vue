<template>
  <div class="lesson vue-component">
    <v-container>
      <v-row>
        <v-col lg="6" cols="12">
          <v-card class="front">
            <video-chat class="lesson__chat lesson__item" />
          </v-card>
        </v-col>
        <v-col lg="6" cols="12">
          <v-card class="front">
            <edu-panel class="lesson__edu-panel lesson__item" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <lesson-start :display="false" />
  </div>
</template>

<script>
import VideoChat from "@/components/LessonComponents/VideoChat/VideoChat";
import EduPanel from "@/components/LessonComponents/EduPanel";
import LessonStart from "@/components/LessonComponents/LessonStart";

import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "lesson",
  data: function() {
    return {};
  },
  methods: {
    ...mapActions(["socketConnect"]),
    ...mapMutations(["setTeacherId"]),
    sendTeacher() {
      if (window.location.hash.substr(1)) {
        this.socket.emit("im teacher", { roomId: this.$route.params.id });
      }
    },
    onSendTeacher() {
      this.socket.on("send teacher", teacherId => {
        this.setTeacherId(teacherId);
      });
    },
    getTeacher() {
      this.socket.emit("get teacher", { roomId: this.$route.params.id });
    },
    onGetTeacher() {
      this.socket.on("on get teacher", () => {
        this.sendTeacher();
      });
    }
  },
  computed: {
    ...mapGetters(["socket", "user", "teacherId"])
  },
  components: {
    VideoChat,
    EduPanel,
    LessonStart
  },
  props: [],
  mixins: {},
  beforeMount() {
    this.socketConnect(this.$route.params.id);
    this.onSendTeacher();
    this.onGetTeacher();
    this.sendTeacher();
    // Если пользователь пропустил событие, когда учиьель отправил свой id
    this.getTeacher();
  }
};
</script>

<style lang="sass" scoped="">
.lesson
  &__item
    height: 80vh
</style>
