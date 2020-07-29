import { mapGetters } from "vuex";

export default {
  data: function() {
    return {};
  },
  methods: {
    sendTaskToTeacher(index, data) {
      this.socket.emit("send task to teacher", {
        taskIndex: index,
        taskData: data,
        teacherId: this.teacherId
      });
    }
  },
  computed: {
    ...mapGetters(["teacherId"])
  },
  components: {},
  props: [],
  mixins: {},
  beforeMount() {}
};
