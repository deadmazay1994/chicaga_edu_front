<template>
  <div class="lesson vue-component">
    <v-container class="lesson__container" fluid>
      <v-row>
        <v-col lg="5" cols="12">
          <v-card class="front lesson__item">
            <video-chat
              class="lesson__video-chat"
              :class="{ 'lesson__video-chat--active': !chatIsOpen }"
            />
            <text-chat
              class="lesson__text-chat"
              :class="{ 'lesson__text-chat--active': chatIsOpen }"
            />
          </v-card>
        </v-col>
        <v-col lg="7" cols="12">
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
import TextChat from "@/components/LessonComponents/Chat/Chat";
import EduPanel from "@/components/LessonComponents/EduPanel";
import LessonStart from "@/components/LessonComponents/LessonStart";

import Io from "socket.io-client";
import SocketMixin from "@/mixins/socket.js";
import OurCursor from "@/mixins/ourCursor";

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
        this.socket.emit("im teacher", {
          roomId: this.$route.params.id + this.$route.params.roomId || ""
        });
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
      this.socket.emit("get teacher", {
        roomId: this.$route.params.id + this.$route.params.roomId || ""
      });
    },
    onGetTeacher() {
      this.socket.on("on get teacher", () => {
        console.log("on get");
        this.sendTeacher();
      });
    }
  },
  computed: {
    ...mapGetters(["socket", "user", "teacherId", "socketUrl", "chatIsOpen"])
  },
  components: {
    VideoChat,
    EduPanel,
    LessonStart,
    TextChat
  },
  props: [],
  mixins: [OurCursor, SocketMixin],
  beforeMount() {
    this.setRoomId(this.$route.params.id + this.$route.params.roomId || "");
    this.socketConnect(this.$route.params.id + this.$route.params.roomId || "");
    // Инициируем события сокетов
    this.initSocketEvents();
    this.onSendTeacher();
    this.onGetErrors();
    this.onGetTeacher();
    this.queryGetUsers();
    this.sendTeacher();
    // Если пользователь пропустил событие, когда учиьель отправил свой id
    this.getTeacher();
    // Инициируем общий курсор (курсор учителя транслируется всем, как в figma)
    let conditionToSendCursor = this.user.role == "teacher";
    this.ourCursorInit(conditionToSendCursor);
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
  &__container
    padding: 0 20px
    @media (max-width:580px)
      &
        padding: 0
  &__item
    height: calc(100vh - 90px)
  &__video-chat
    height: 25%
    overflow: hidden
    &--active
      height: calc( 100% - 74px )
  &__text-chat
    height: 74px
    overflow: hidden
    position: relative
    &--active
      height: 75%
</style>
