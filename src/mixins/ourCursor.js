export default {
  methods: {
    ourCursorInit(el = document) {
      el.onmousemove = e => sendCursorPosition(e);
      const sendCursorPosition = event => {
        let activeEl = event.target;
        // let activeEl = this.getFirstParentWithScroll(event.target);
        let targetRect = activeEl.getBoundingClientRect();
        this.socketSendToAllInLesson({
          eventName: "send coursor coords",
          functionName: "drawCursor",
          args: [
            {
              absoluteX: event.pageX,
              absoluteY: event.pageY,
              regardingX: event.offsetX / targetRect.width,
              regardingY: event.offsetY / targetRect.height,
              regardingElementSignature: getDomPath(activeEl),
              color: "blue",
              senderName: "test"
            }
          ]
        });
      };
      this.onDo("send coursor coords");
    },
    getFirstParentWithScroll(el) {
      function overflowVal(el) {
        return window.getComputedStyle(el).getPropertyValue("overflow");
      }
      let elCopy = el;
      while (
        overflowVal(el).indexOf("auto") == -1 &&
        overflowVal(el).indexOf("scroll") == -1
      ) {
        if (el.parentElement == null) {
          return elCopy;
        }
        el = el.parentElement;
      }
      return el;
    },
    drawCursor(config) {
      let cursorEl = document.querySelector(".our-cursor");
      if (!cursorEl) {
        cursorEl = document.createElement("i");
        cursorEl.className = "mdi mdi-cursor-default-outline our-cursor";
        document.querySelector("body").append(cursorEl);
      }
      if (cursorEl) {
        let regardingElement = document.querySelector(
          config.regardingElementSignature.join(">")
        );
        let cursorX = config.absoluteX;
        let cursorY = config.absoluteY;
        if (regardingElement && config.regardingX) {
          let boundingRect = regardingElement.getBoundingClientRect();
          cursorX = boundingRect.left + config.regardingX * boundingRect.width;
          cursorY = boundingRect.top + config.regardingY * boundingRect.height;
        }
        cursorEl.style.left = cursorX + "px";
        cursorEl.style.top = cursorY + "px";
        cursorEl.style.color = config.color;
      }
    },
    getCursorPosition(coord, el, axis) {
      let x;
      let scrollLeft = axis == "y" ? el.scrollTop : el.scrollLeft;
      let scrollRight =
        axis == "y"
          ? el.scrollLeft + el.clientHeight
          : el.scrollLeft + el.clientWidth;
      if (coord < scrollLeft) {
        x = scrollLeft + 10;
      } else if (coord > scrollRight) {
        x = coord;
      } else {
        x = scrollRight - 10;
      }
      return x;
    }
  },
  components: {},
  props: [],
  mixins: {},
  beforeMount() {}
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
