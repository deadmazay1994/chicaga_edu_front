<template>
  <div class="homework vue-component">
    <v-container>
      <!-- <v-row>
        <v-col cols="3"></v-col>
        <v-col cols="6">
        </v-col>
      </v-row> -->

      <v-card class="front pa-5">
        <div class="text-h4">Домашнее задание</div>
        <tasks :isHomework="true" :noAddAtempt="true" class="mt-7" />
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Tasks from "@/components/LessonComponents/Tasks/Tasks";
import Io from "socket.io-client";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "homework",
  data: function() {
    return {};
  },
  methods: {
    ...mapMutations(["setSocket"])
  },
  computed: {
    ...mapGetters(["socketUrl"])
  },
  components: {
    Tasks
  },
  props: [],
  mixins: {},
  beforeMount() {
    this.setSocket(Io(this.socketUrl));
  }
};
</script>

<style lang="scss">
.red-btn {
  margin-top: 0;
}

.task__date {
  margin-bottom: 0;
  margin-top: 0;
}

@media (max-width: 1360px) {
  .manager__workspace {
    height: auto !important;
  }
}
</style>
