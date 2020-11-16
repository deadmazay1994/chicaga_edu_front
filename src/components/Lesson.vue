<template>
  <div class="lesson vue-component">
    <v-container fluid style="padding: 0 20px">
      <v-row>
        <v-col lg="7" cols="12">
          <v-card class="front">
            <edu-panel class="lesson__edu-panel lesson__item" />
          </v-card>
        </v-col>
        <v-col lg="5" cols="12">
          <v-card class="front">
            <video-chat class="lesson__chat lesson__item" />
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

import Io from "socket.io-client";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "lesson",
  data: function() {
    return {};
  },
  methods: {
    ...mapActions([
      "socketConnect",
      "onSendUsers",
      "queryGetUsers",
      "onUpdateUsers",
      "onRecconnect",
      "initSocketEvents",
      "onSendErrors"
    ]),
    ...mapMutations(["setTeacherId", "setRoomId", "setSocket"]),
    sendTeacher() {
      if (this.user.role == "teacher") {
        this.socket.emit("im teacher", { roomId: this.$route.params.id });
      }
    },
    onGetErrors() {
      if (this.user.role == "teacher") {
        this.onSendErrors();
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
        console.log("on get");
        this.sendTeacher();
      });
    }
  },
  computed: {
    ...mapGetters(["socket", "user", "teacherId", "socketUrl"])
  },
  components: {
    VideoChat,
    EduPanel,
    LessonStart
  },
  props: [],
  mixins: {},
  beforeMount() {
    this.setRoomId(this.$route.params.id);
    this.socketConnect(this.$route.params.id);
    // Инициируем события сокетов
    this.initSocketEvents();
    this.onSendTeacher();
    this.onGetErrors();
    this.onGetTeacher();
    this.queryGetUsers();
    this.sendTeacher();
    // Если пользователь пропустил событие, когда учиьель отправил свой id
    this.getTeacher();
  },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm("Вы действительно хотите покинуть урок?");
    if (answer) {
      next();
      // Сбрасываем соеденение с сокетом
      this.socket.disconnect();
      this.setSocket(Io(this.socketUrl));
      // Перезагружаем страницу, чтобы уж точно сбросить соеденение
      location.reload();
    } else {
      next(false);
    }
  }
};
</script>

<style lang="sass" scoped="">
.lesson
  &__item
    height: calc(100vh - 90px)
</style>
