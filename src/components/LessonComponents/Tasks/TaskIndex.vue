<template>
  <div class="task-index vue-component">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <span class="task-index__index" v-bind="attrs" v-on="on">{{
          index
        }}</span>
      </template>
      <v-list>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title @click="openReportModal()"
              >Сообщить об ошибке</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "task-index",
  data: function() {
    return {};
  },
  methods: {
    ...mapMutations(["toggleReportModal", "setReportData"]),
    openReportModal() {
      this.setReportData({
        taskIndex: this.index,
        comment: "",
        lessonLink: location.href,
        pageName: this.getActivePageName()
      });
      this.toggleReportModal(true);
    },
    getActivePageName() {
      if (this.activeGroupIndexLesson !== false) {
        return (
          this.groupsLesson[this.activeGroupIndexLesson] ||
          this.activeGroupIndexLesson + 1
        );
      } else if (this.activeGroupIndexHomework !== false) {
        return (
          this.groupsHomework[this.activeGroupIndexHomework] ||
          this.activeGroupIndexHomework + 1
        );
      }
      return "";
    }
  },
  computed: {
    ...mapGetters([
      "activeGroupIndexLesson",
      "groupsLesson",
      "activeGroupIndexHomework",
      "groupsHomework"
    ])
  },
  components: {},
  props: ["index", "pageName"],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
@import "@/components/Sass/Varibles.sass"

.task-index
  position: absolute
  top: 0
  right: 0
  &__index
    font-size: 12px
    width: 25px
    height: 25px
    background: red
    text-align: center
    align-items: center
    display: flex
    justify-content: center
    color: #fff
    background-color: $success_color
    border-radius: 100%
    cursor: pointer
    font-weight: 800
</style>
