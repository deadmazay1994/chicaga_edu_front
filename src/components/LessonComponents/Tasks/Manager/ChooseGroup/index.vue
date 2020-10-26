<!-- Интерфейс для выбора группы упражнений -->
<template>
  <div class="choose-group vue-component" v-click-outside="hide">
    <v-icon
      class="choose-group__toggler main-color-text"
      size="30"
      @click="toggleShow"
      >mdi-menu</v-icon
    >
    <div v-show="show" class="choose-group__list choose-list" ref="list">
      <v-list>
        <v-list-item-group color="rgb(169 133 64)" v-model="activeGroupIndex">
          <v-list-item
            class="choose-list__item"
            v-for="(name, i) in groupsNames"
            :key="i"
            @click="toggleGroup(i)"
          >
            <v-list-item-title>{{ name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "choose-group",
  data: function() {
    return {
      show: false
    };
  },
  methods: {
    ...mapMutations([
      "collectGroupsNamesLesson",
      "collectGroupsNamesHomework",
      "setActiveGroupLesson",
      "setActiveGroupHomework"
    ]),
    toggleShow() {
      this.show = !this.show;
    },
    hide() {
      this.show = false;
    },
    toggleGroup(index) {
      if (this.lessonType == "lesson") {
        this.setActiveGroupLesson(index);
      } else if (this.lessonType == "homework") {
        this.setActiveGroupHomework(index);
      }
      this.hide();
    },
    collectGropNames() {
      if (this.lessonType == "lesson") {
        this.collectGroupsNamesLesson();
      } else if (this.lessonType == "homework") {
        this.collectGroupsNamesHomework();
      }
    }
  },
  computed: {
    ...mapGetters(["groupsLesson", "groupsHomework"]),
    groupsNames() {
      let res = [];
      if (this.lessonType == "lesson") {
        res = this.groupsLesson;
      } else if (this.lessonType == "homework") {
        res = this.groupsHomework;
      }
      return res;
    },
    activeGroupIndex: {
      get() {
        return 0;
      },
      set() {}
    }
  },
  components: {},
  props: ["lessonType"],
  mixins: {},
  created() {
    this.collectGropNames();
  }
};
</script>

<style scoped="scoped" lang="sass">
.choose-group
  position: relative
  &__toggler
    cursor: pointer
    position: absolute
    z-index: 1
    right: 10px
    top: 10px
  &__list
    position: absolute
    top: 10px
    right: 50px
    z-index: 10
    background: #fff
    box-shadow: 6px 5px 8px 0px #0008
    min-width: 200px
    .v-list
      padding: 0
.choose-list
  &__item
    // padding: 0 10px
    // margin-top: 10px
    // cursor: pointer
    // border-bottom: 1px solid #dedede
</style>
