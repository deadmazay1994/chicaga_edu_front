import { mapGetters } from "vuex";

export default {
  methods: {
    socketSendToAllInLesson(data) {
      this.socket.emit("to all in lesson", data);
    },
    onSendData(eventName, callback) {
      this.socket.on("send data", data => {
        if (data.eventName == eventName) callback(data);
      });
    },
    do(functionName, args, eventName) {
      // При вызове любой функции через do у всех подписчиков комнаты урока вызыватся такой же метод
      if (this[functionName]) {
        this[functionName](...args);
        this.socketSendToAllInLesson({
          eventName: eventName,
          functionName,
          args
        });
      }
    },
    onDo(eventName) {
      this.onSendData(eventName, data => {
        if (this[data.functionName]) {
          this[data.functionName](...data.args);
        }
      });
    }
  },
  computed: {
    ...mapGetters(["socket"])
  },
  components: {},
  props: [],
  mixins: {},
  beforeMount() {}
};
