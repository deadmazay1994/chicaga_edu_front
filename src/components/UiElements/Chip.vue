<template>
  <div
    class="chip vue-component"
    :class="{ 'chip--active': mutableChecked, 'chip--noclick': forTeacher }"
    :style="styleChipWrap"
    @click="toggleByClick"
  >
    <span class="chip__text" :style="styleText"><slot></slot></span>
    <span class="chip__checkbox" :style="styleCheckbox"></span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

const Color = require("color");

export default {
  name: "chip",
  data: function() {
    return {
      mutableChecked: false
    };
  },
  methods: {
    toggleByClick() {
      if (this.user.role == "teacher") {
        this.Do("toggleByTeacher", [getDomPath(this.$el).join("<")]);
      } else if (!this.forTeacher) {
        this.toggle();
      }
    },
    toggle() {
      this.mutableChecked = !this.mutableChecked;
      this.$emit("toggle", this.mutableChecked);
    },
    toggleByTeacher(domPath) {
      if (domPath == getDomPath(this.$el).join("<")) {
        this.toggle();
      }
    }
  },
  computed: {
    ...mapGetters(["user"]),
    colorC() {
      return this.color ? this.color : "white";
    },
    bacgroundC() {
      let bg = this.background ? this.background : "#c3ab7c";
      if (this.mutableChecked) {
        bg = Color(bg).darken(0.3);
      }
      return bg;
    },
    widthC() {
      return this.width ? this.width : "auto";
    },
    styleChipWrap() {
      let direction = "auto";
      if (this.boxAlign == "left") {
        direction = "row-reverse";
      }
      return {
        color: this.colorC,
        background: this.bacgroundC,
        width: this.widthC,
        "flex-direction": direction
      };
    },
    styleText() {
      return {
        "text-align": this.textAlign ? this.textAlign : "auto"
      };
    },
    styleCheckbox() {
      let margin = "auto";
      if (this.boxAlign == "right") {
        margin = "0 0 0 10px";
      } else if (this.boxAlign == "left") {
        margin = "0 10px 0 0";
      }
      return {
        margin
      };
    }
  },
  model: {
    prop: "checked",
    event: "toggle"
  },
  components: {},
  props: [
    "background",
    "color",
    "text-align",
    "box-align",
    "width",
    "checked",
    "for-teacher"
  ],
  mixins: {},
  beforeMount() {
    this.mutableChecked = this.checked;
    this.onDo("toggleByTeacher");
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
      stack.unshift(el.nodeName.toLowerCase() + ":eq(" + sibIndex + ")");
    } else {
      stack.unshift(el.nodeName.toLowerCase());
    }
    el = el.parentNode;
  }
  return stack.slice(1); // removes the html element
}
</script>

<style scoped="scoped" lang="sass">
.chip
  padding: 5px 10px
  border-radius: 25px
  box-shadow: 1px -1px 1px 0px #0003
  font-weight: 500
  align-items: center
  display: inline-flex
  flex-wrap: wrap
  cursor: pointer
  &--noclick
    cursor: default
  &--active &__checkbox
    background: linear-gradient(180deg, #BABABA 0%, #FFFFFF 100%)
  &__text
    width: 70%
  &__checkbox
    width: 40px
    height: 40px
    border-radius: 100%
    background: #fff
    display: inline-block
    box-shadow: 2px 3px 3px 0px #0003
@media (max-width: 720px)
  .chip
    flex-direction: row !important
    &__text
      font-size: 13px
      text-align: left !important
    &__checkbox
      margin: 0px 0px 0px 10px !important
</style>
