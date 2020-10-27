import { mapGetters } from "vuex";

export default {
  methods: {
    socketSendToAllInLesson(data) {
      this.socket.emit("to all in lesson", data);
    }
  },
  computed: {
    ...mapGetters["socket"]
  },
  components: {},
  props: [],
  mixins: {},
  beforeMount() {}
};
