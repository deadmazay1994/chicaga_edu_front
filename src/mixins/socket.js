import { mapGetters } from "vuex";

export default {
  methods: {
    socketSendToAllInLesson(data) {
      this.socket.emit("to all in lesson", data);
    },
    onSendData(eventName, callback) {
      this.socket.on("send data", data => {
        if (data.eventName == eventName) callback(...data.args);
      });
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
