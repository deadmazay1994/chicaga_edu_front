export default {
  methods: {
    // Student -> Teacher
    signalingToTeacherUserIsAnswred() {
      // Сообщаем учителю, что пользователь ответил
      this.setErrorsNum();
      this.sendWrongSignal();
    },
    onSendAllTasks() {
      this.socket.on("send all tasks", () => this.sendAllTasks());
    },
    sendAllTasks() {
      this.tasksForEach((task, i) => {
        task.sendTaskToTeacher(i);
      });
    },
    sendWrongSignal() {
      if (this.socket) {
        this.socket.emit("i was wrong", {
          errorCounter: this.errorCounter,
          teacher: this.teacherId,
          myId: this.socket.id
        });
      }
    }
  },
  computed: {},
  components: {},
  props: [],
  mixins: {},
  beforeMount() {}
};
