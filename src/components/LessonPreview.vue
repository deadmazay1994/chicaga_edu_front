<template>
  <div class="perview vue-component">
    <v-container>
      <v-row class="justify-center relative front">
        <v-col cols="12" lg="7">
          <edu-panel />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import EduPanel from "@/components/LessonComponents/EduPanel";

import Io from "socket.io-client";
import { mapGetters, mapMutations } from "vuex";

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
    EduPanel
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
