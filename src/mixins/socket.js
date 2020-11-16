import { mapGetters } from "vuex";

export default {
  methods: {
    socketSendToAllInLesson(data) {
      this.socket.emit("to all in lesson", data);
    },
    onSendData(eventName, callback) {
      this.socket.on("send data", data => {
        callback;
        if (data.eventName == eventName) callback(data);
      });
    },
    do(functionName, args) {
      // При вызове любой функции через do у всех подписчиков комнаты урока вызыватся такой же метод
      if (this[functionName]) {
        this[functionName](...args);
        this.socketSendToAllInLesson({
          eventName: "do paint",
          functionName,
          args
        });
      }
    },
    onDo() {
      this.onSendData("do paint", data => {
        if (this[data.functionName]) {
          this[data.functionName](...data.args);
        }
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
