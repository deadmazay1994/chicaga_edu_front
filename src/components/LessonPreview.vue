<template>
  <div class="perview vue-component">
    <v-container>
      <v-row class="justify-center">
        <v-col cols="6">
          <v-card class="front">
            <v-tabs color="orange accent-2" dark v-model="tab" fixed-tabs>
              <v-tab>Задания урока</v-tab>
              <v-tab>Домашние задания</v-tab>
              <v-tab>Материалы урока</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab" class="pa-5">
              <v-tab-item>
                <task-manager
                  :input="lessonTasks"
                  ref="lessonTasks"
                  :saved="[]"
                  type="lesson"
                  :savedHomework="[]"
                />
                <v-btn
                  @click="check('lessonTasks')"
                  block
                  large
                  class="main-color"
                  color="white--text"
                  >Проверить</v-btn
                >
              </v-tab-item>
              <v-tab-item>
                <task-manager
                  :input="homework"
                  ref="homework"
                  type="homework"
                  :saved="[]"
                  :savedHomework="[]"
                />
                <v-btn
                  @click="check('homework')"
                  block
                  large
                  class="main-color"
                  color="white--text"
                  >Проверить</v-btn
                >
              </v-tab-item>
              <v-tab-item>sdg</v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import TaskManager from "@/components/LessonComponents/Tasks/TaskManager";

import { mapGetters, mapMutations } from "vuex";

import Io from "socket.io-client";
export default {
  name: "perview",
  data: function() {
    return {
      tab: null
    };
  },
  methods: {
    ...mapMutations(["setSocket"]),
    check(ref) {
      this.$refs[ref].check();
    }
  },
  computed: {
    ...mapGetters(["homework", "lessonTasks", "materials", "socketUrl"])
  },
  components: {
    TaskManager
  },
  props: [],
  mixins: {},
  async beforeMount() {
    this.setSocket(Io(this.socketUrl));
    await this.$store.dispatch("setLesson", this.$route.params.id);
  }
};
</script>

<style scoped="scoped" lang="sass"></style>
