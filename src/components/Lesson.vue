<template>
  <div class="lesson-template vue-component">
    <div class="lesson-template__header">
      <div class="lesson-template__header-inner">
        <div class="lesson-template__header-part">
          <Breadcrumb></Breadcrumb>
        </div>
        <div class="lesson-template__header-part">
          <scores class="lesson-template__scores" />
        </div>
      </div>
    </div>
    <div class="lesson-template__body">
      <div class="lesson-body">
        <div class="lesson-body__inner">
          <div class="lesson-body__item">
            <chats-module class="lesson-body__video" />
          </div>
          <div class="lesson-body__item lesson-body__item--2">
            <edu-panel class="lesson-body__edu-panel" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatsModule from "@/components/ChatModule/ChatModule";
import EduPanel from "@/components/LessonComponents/EduPanel";
import Breadcrumb from "@/components/Base/BreadcrumbsComponent";
import Scores from "@/components/LessonComponents/Scores";

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
    ChatsModule,
    Breadcrumb,
    Scores
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
$header-height: 62px

.lesson-template
  display: flex
  flex-direction: column
  width: 100%
  height: 100%
  padding: 16px 20px 20px
  &__header
    position: relative
    width: 100%
    height: $header-height
    padding-bottom: 16px
    z-index: 1
  &__header-inner
    display: flex
    justify-content: space-between
    height: 100%
  &__header-part
    width: 50%
  &__scores
    padding-left: 20px
  &__body
    flex-grow: 1
    width: 100%
    height: calc( 100% - #{$header-height} )

.lesson-body
  position: relative
  width: 100%
  height: 100%
  &__inner
    display: flex
    width: 100%
    height: 100%
  &__item
    width: 50%
    height: 100%
  &__item--2
    padding-left: 20px
  &__video
    width: 100%
    height: 100%
    padding-bottom: 13px
  &__edu-panel
    width: 100%
    height: 100%
    border-radius: 20px
    box-shadow: 0 4px 20px rgba(128, 128, 128, 0.2)
    overflow: hidden
</style>
