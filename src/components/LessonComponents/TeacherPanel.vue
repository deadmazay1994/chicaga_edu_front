<template>
  <div class="teacher-panel  vue-component" v-if="this.user.role == 'teacher'">
    <v-icon
      @click.native="toggleShow"
      class="teacher-panel__toggler"
      size="60"
      color="#c3ab7c"
      >{{ showPanel ? "mdi-menu-down" : "mdi-menu-up" }}</v-icon
    >
    <div v-if="showPanel" class="mx-3 mt-3 pb-2">
      <div class="teacher-panel__students students">
        <div
          class="table-item d-inline-block students__student"
          v-for="user in socketUsers"
          :key="user.id"
          style="position: relative;"
          @click="toggleUser(user.id)"
          :class="{ 'students__student--active': isActiveUser(user.id) }"
        >
          <div v-if="user.errorCounter" class="user-error">
            {{ user.errorCounter }}
          </div>
          {{ user.username }}
        </div>
      </div>
      <div class="text-subtitle-2">Группы пользователей</div>
      <div>
        <div v-for="(group, i) in groups" :key="i">
          <div
            class="table-title teacher-panel__group-item teacher-panel__table-title d-inline-block"
          >
            {{ group.name }}
          </div>
          <draggable
            v-model="group.users"
            class="d-inline-flex"
            group="users"
            style="min-width: 100px; padding-right: 20px"
            @end="updateList"
          >
            <span
              class="table-item teacher-panel__group-item d-inline-flex"
              v-for="user in group.users"
              :key="user.id"
              >{{ user.username }}</span
            >
          </draggable>
        </div>
      </div>
      <div class="d-flex justify-space-between">
        <v-btn @click="createGroups()" class="mt-5 main-color main-color--text"
          >Создать группы</v-btn
        >
        <v-btn @click="returnInGroup" class="mt-5 main-color main-color--text"
          >Вернуть всех в общую группу</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import Draggable from "vuedraggable";

import api from "@/mixins/api";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "teacher-panel",
  data: function() {
    return {
      inOurRoom: true,
      showPanel: false
    };
  },
  methods: {
    ...mapMutations(["setSocketUserErrors", "setActiveUser"]),
    toggleShow() {
      this.showPanel = !this.showPanel;
    },
    isActiveUser(userId) {
      return userId == this.activeUser;
    },
    toggleUser(userId) {
      this.setSocketUserErrors({
        userId,
        errorCounter: 0
      });
      this.setActiveUser(userId);
      this.getActiveUserProgress();
    },
    getActiveUserProgress() {
      // Реакия на запрос в TaskManager
      this.socket.emit("get user progress", {
        teacherId: this.teacherId,
        activeUser: this.activeUser
      });
    },
    async createChannels() {
      this.groups.forEach(async g => {
        await api.methods.createChannel(
          this.$route.params.id + this.$route.params.roomId ||
            "" + "___" + g.name
        );
      });
    },
    createGroups(roomId = false) {
      if (this.inOurRoom) {
        this.socket.emit("create groups", {
          userRoomId: roomId ? roomId : this.roomId,
          groups: this.groups,
          forNewRoomId: roomId ? roomId : this.roomId
        });
        this.inOurRoom = false;
        // Создаем для группы каналы в чате
        this.createChannels();
      } else {
        this.groups.forEach(g => {
          this.socket.emit("create groups", {
            userRoomId:
              this.$route.params.id + this.$route.params.roomId ||
              "" + "___" + g.name,
            groups: this.groups,
            forNewRoomId: roomId
              ? roomId
              : this.$route.params.id + this.$route.params.roomId || ""
          });
        });
      }
    },
    returnInGroup() {
      this.groups.forEach(g => {
        this.socket.emit("return in group", {
          roomId: this.roomId + "___" + g.name
        });
      });
      this.inOurRoom = true;
    },
    initGroups() {
      this.groups = [
        {
          name: "A",
          users: []
        },
        {
          name: "B",
          users: []
        }
      ];
      this.socketUsers.forEach(user => {
        this.groups[0].users.push(user);
      });
    },
    updateList() {
      this.$forceUpdate();
    }
  },
  computed: {
    ...mapGetters([
      "socket",
      "socketUsers",
      "roomId",
      "activeUser",
      "user",
      "isConsultation"
    ])
  },
  watch: {
    socketUsers() {
      this.initGroups();
    }
  },
  components: {
    Draggable
  },
  props: [],
  mixins: {},
  beforeMount() {
    this.initGroups();
  }
};
</script>

<style scoped="scoped" lang="sass">
@import "@/components/Sass/Varibles.sass"

.teacher-panel
  z-index: 10
  position: relative
  &__group-item
    margin-left: 1px
  &__table-title
    width: 35px
    text-align: center
  &__toggler
    cursor: pointer
    right: 0
    top: -10px
    position: absolute
.user-error
  position: absolute
  right: -5px
  top: -5px
  font-size: 12px
  font-weight: bold
  width: 20px
  height: 20px
  display: flex
  flex-wrap: wrap
  align-items: center
  justify-content: center
  background: $error_color
  color: $error_color--text
  border-radius: 100%
  z-index: 10
.students
  top: 20px
  z-index: 1000
  &__student
    &:first-child
      border-radius: 7px 0 0 7px
    &:last-child
      border-radius: 0 7px 7px 0
    &--active
      background: $success_color
      color: $success_color--text
</style>
