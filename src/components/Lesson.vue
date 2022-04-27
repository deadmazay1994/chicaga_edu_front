<template>
  <div class="lessons-pg">
    <div class="lessons__chat" style="flex-baisis: auto">
      <chats-module
        class="lesson__chat-module"
        :roomId="roomId"
        :shareMedia="shareMedia"
        mode="vertical"
      />
      <lesson-start :display="false" />
    </div>
    <div class="lessons__task" style="width: 50%; margin-left: 0">
      <edu-panel class="lesson__edu-panel lesson__item" />
    </div>
  </div>
</template>

<script>
// import WebCam from "@/components//LessonComponents/WebCam/WebCam.vue";
// import TextChat from "@/components/LessonComponents/Chat/Chat";
import ChatsModule from "@/components/LessonComponents/ChatModule/ChatModule";
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
    ...mapGetters(["socket", "user", "teacherId", "socketUrl", "chatIsOpen"]),
    roomId() {
      return this.$route.params.id + this.$route.params.groupKey || "";
    },
    shareMedia() {
      let isNotWebinar = !this.$route.params.webinarMode;
      let userIsTeacher = this.user.role === "teacher";
      if (isNotWebinar || userIsTeacher) return true;
      return false;
    }
  },
  components: {
    EduPanel,
    LessonStart,
    ChatsModule
    // TextChat,
    // WebCam
  },
  props: ["webinarMode"],
  mixins: [OurCursor, SocketMixin],
  beforeMount() {
    console.log(this.$route.params.id);
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
.lessons
  &__chat
    overflow: auto
    max-height: 100%
.lesson
  &__container
    padding: 0 20px
    @media (max-width:580px)
      &
        padding: 0
  &__video-chat
    overflow: hidden
    &--active
      height: calc( 100% - 74px )
  &__text-chat
    height: 74px
    overflow: hidden
    position: relative
    &--active
      height: 412px
  &__task
    height: 100%
</style>

<style lang="sass">
.lessons-pg
  height: auto
  .chat-svg
    display: none
  .chat-module
    height: 100%
    @media (max-width: 1360px)
      .video-chat
        min-height: 450px
      .chat-block
        .lessons__messages
          min-height: 300px
          max-height: 400px
      .chat-block
      .lessons__messages
        height: 100%

.lessons-pg
  .lessons__chat
    max-width: 45%
  @media (min-width: 1360px)
    .lessons__task
      .lesson__item
        height: 100%
        flex-basis: auto
        .task__content
          display: flex
          flex-direction: column
          .v-window
            height: 100%
            .v-window__container
              height: 100%
            .v-window-item
              height: 100%
              .tasks
                height: 100%
                .tasks__wrap
                  display: block
                  overflow: auto
                  .manager__workspace
                    position: absolute
                    width: 100%
                    height: 100%

@media (max-width: 1360px)
  .lessons-pg
    display: flex
    flex-direction: column-reverse !important

    .lessons__task,
    .lessons__chat
      width: 100% !important
      max-width: none

    .manager__workspace
      height: auto !important

    .red-btn
      margin-top: 0

    .task__date
      margin-bottom: 0

    .task__menu__item
      padding: 0
      margin-right: 15px

      &:last-child
        margin-right: 0

    .v-slide-group__content
      justify-content: flex-start

@media (max-width: 600px)
  .lessons-pg
    .task__menu
      display: flex
      justify-content: space-between
      padding: 25px 20px 20px 38px
      border-radius: 25px 25px 0 0
      background: hsla(0, 0%, 50%, 0.1) !important

    .task__menu__item
      min-width: auto !important
      width: auto !important

    .v-tabs-bar__content
      overflow-x: auto

    .lessons__chat
      display: block

    .lessons__task
      padding: 0 6px

@media (max-width: 480px)
  .lessons-pg
    .is-red-btns
      display: flex
      flex-direction: column

      .red-btn
        width: 100%
        margin-bottom: 15px

        &:last-child
          margin-bottom: 0
</style>
