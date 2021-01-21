export default {
  methods: {
    ourCursorInit(condition = true, el = document) {
      if (condition) {
        el.onmousemove = e => sendCursorPosition(e);
      }
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
        cursorEl = createElementFromHTML(cursorIcon);
        cursorEl.className = "our-cursor";
        document.querySelector("body").append(cursorEl);
      }
      let path = config.regardingElementSignature.join(">");
      if (cursorEl && path) {
        let regardingElement = document.querySelector(path);
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

function createElementFromHTML(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}

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
let cursorIcon = `
<div style="width: 20px">
  <svg
    style="display: block; max-width: 100%; height: auto;"
    xmlns:svgjs="https://svgjs.com/svgjs"
    version="1.1"
    x="0"
    y="0"
    viewBox="0 0 511 511.99969"
    style="enable-background:new 0 0 512 512"
    xml:space="preserve"
    >
    <g>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="m.894531 497.003906-.394531-481.992187c-.003906-5.683594 3.203125-10.878907 8.28125-13.421875 5.082031-2.546875 11.164062-2 15.710938 1.40625l385.996093 289.195312c11.023438 8.257813 5.953125 25.808594-7.75 26.953125l-225.378906 18.78125-150.253906 169.03125c-8.914063 10.027344-26.199219 4.269531-26.210938-9.953125zm0 0"
        fill="#c4ac7e"
        data-original="#2633d8"
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="m410.488281 292.191406-385.996093-289.195312c-4.546876-3.40625-10.628907-3.953125-15.710938-1.40625l168.578125 336.335937 225.378906-18.78125c13.703125-1.144531 18.773438-18.695312 7.75-26.953125zm0 0"
        fill="#c3a66f"
        data-original="#141b73"
      />
    </g>
  </svg>
</div>`;
