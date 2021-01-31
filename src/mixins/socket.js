import { mapGetters } from "vuex";

export default {
  data: function() {
    return {
      componentDomPath: null
    };
  },
  methods: {
    socketSendToAllInLesson(data) {
      this.socket.emit("to all in lesson", {
        ...data,
        roomId: this.$route.params.id
      });
    },
    onSendData(eventName, callback) {
      this.socket.on("send data", data => {
        if (data.eventName == eventName) callback(data);
      });
    },
    Do(functionName, args = [], eventName = functionName) {
      if (!Array.isArray(args)) args = [args];
      // При вызове любой функции через do у всех подписчиков комнаты урока вызыватся такой же метод
      if (this[functionName]) {
        this[functionName](...args);
        this.socketSendToAllInLesson({
          eventName: eventName,
          functionName,
          args,
          componentDomPath: this.componentDomPath
        });
      }
    },
    onDo(eventName, uniqComponent = false) {
      this.onSendData(eventName, data => {
        let forThisElement =
          Array.isArray(data.componentDomPath) &&
          Array.isArray(this.componentDomPath)
            ? this.componentDomPath.join("") == data.componentDomPath.join("")
            : false;
        if (this[data.functionName] && (forThisElement || !uniqComponent)) {
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
  beforeMount() {},
  mounted() {
    if (this.$el.hasAttribute) {
      this.componentDomPath = getDomPath(this.$el);
    }
  }
};

function getDomPath(el) {
  var stack = [];
  while (el.parentNode != null) {
    var sibCount = 0;
    var sibIndex = 0;
    for (var i = 0; i < el.parentNode.childNodes.length; i++) {
      var sib = el.parentNode.childNodes[i];
      if (sib.nodeName == el.nodeName) {
        if (sib === el) {
          sibIndex = sibCount;
        }
        sibCount++;
      }
    }
    if (el.hasAttribute("id") && el.id != "") {
      stack.unshift(el.nodeName.toLowerCase() + "#" + el.id);
    } else if (sibCount > 1) {
      sibIndex += 1;
      stack.unshift(el.nodeName.toLowerCase() + ":nth-child(" + sibIndex + ")");
    } else {
      stack.unshift(el.nodeName.toLowerCase());
    }
    el = el.parentNode;
  }
  return stack.slice(1); // removes the html element
}
