<template>
  <div class="paint-wrap">
    <canvas
      :class="{
        'paint--active': this.drawing && this.user.role == 'teacher'
      }"
      ref="canvas"
      :width="canvasWidth"
      :height="canvasHeight"
      class="paint vue-component"
    ></canvas>
    <div v-if="user.role == 'teacher'" class="paint__palet palet">
      <v-icon class="ctrl d-block" size="30" @click="toggleDrawing">
        {{ drawing ? "mdi-pencil-box" : "mdi-pencil-box-outline" }}
      </v-icon>
      <v-icon class="ctrl d-block" size="30" @click="toggleEarser">
        mdi-eraser
      </v-icon>
      <div
        class="palet__color"
        v-for="color in pallet"
        :key="color"
        :style="'background-color: ' + color"
        @click="toggleColor"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "paint",
  data: function() {
    return {
      canvasWidth: 0,
      canvasHeight: 0,
      color: "red",
      ctx: false,
      lineWidth: 200,
      pallet: [],
      drawing: false,
      eraser: false
    };
  },
  methods: {
    toggleEarser() {
      this.eraser = !this.eraser;
      if (this.eraser) {
        this.drawing = true;
        this.eraserStart();
        this.socket.emit("send paint", { type: "eraser-start" });
      } else {
        this.eraserEnd();
        this.socket.emit("send paint", { type: "eraser-end" });
      }
    },
    eraserStart() {
      this.ctx.globalCompositeOperation = "destination-out"; // изменяем параметр, чтобы стиралось
      this.ctx.lineWidth = 20;
    },
    eraserEnd() {
      this.ctx.globalCompositeOperation = "source-over"; // возвращаем по-умолчанию
      this.ctx.lineWidth = 2;
    },
    setFullWidth() {
      this.canvasWidth = this.$parent.$el.clientWidth + "px";
      this.canvasHeight = this.$parent.$el.clientHeight + "px";
    },
    setPallet() {
      this.pallet = [
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "purple",
        "black",
        "white"
      ];
    },
    toggleColor(e) {
      this.color = e.target.style.backgroundColor;
    },
    toggleDrawing() {
      this.drawing = !this.drawing;
    },
    socketDraw() {
      this.socket.on("on send paint", data => {
        this.setFullWidth();
        if ("type" in data) {
          if (data.type == "eraser-start") {
            this.eraserStart();
          } else if (data.type == "eraser-end") {
            this.eraserEnd();
          }
        }
        if (data.startX == data.startY && data.startY == 0.00000001) {
          this.ctx.beginPath();
        } else {
          this.ctx.lineTo(data.x, data.y);
          this.ctx.strokeStyle = data.color;
          this.ctx.stroke();
        }
      });
    }
  },
  computed: {
    ...mapGetters(["socket", "user"]),
    canvas() {
      return this.$refs.canvas;
    }
  },
  components: {},
  props: [],
  mixins: {},
  mounted() {
    this.setPallet();
    this.setFullWidth();
    this.ctx = this.canvas.getContext("2d");
    this.ctx.lineWidth = 2;
    let startX = 0.00000001;
    let startY = 0.00000001;
    this.canvas.onmousedown = () => {
      if (this.drawing) {
        this.canvas.onmousemove = e => {
          this.setFullWidth();
          this.ctx.fillStyle = this.color;
          let x = e.offsetX;
          let y = e.offsetY;
          if (startX == startY && startY == 0.00000001) {
            this.ctx.beginPath();
            startY = y;
            startX = x;
          } else {
            this.ctx.lineTo(x, y);
            this.ctx.strokeStyle = this.color;
            this.ctx.stroke();
          }
          this.socket.emit("send paint", {
            x: x - this.lineWidth / 2,
            y: y - this.lineWidth / 2,
            lineWidth: this.lineWidth,
            color: this.color,
            roomId: this.$route.params.id,
            startX,
            startY
          });
        };
        this.canvas.onmouseup = () => {
          this.canvas.onmousemove = null;
          startX = 0.00000001;
          startY = 0.00000001;
        };
      }
    };
    this.socketDraw();
  }
};
</script>

<style scoped="scoped" lang="sass">
.paint-wrap
  top: 0
  left: 0
  position: absolute
  width: 100%
  height: 100%
.paint
  z-index: 100
  pointer-events: none
  position: absolute
  left: 0
  &__palet
    position: fixed
    bottom: 10px
    right: 10px
  &--active
    position: relative
    opaicity: 0.99
    pointer-events: auto
.palet
  box-shadow: 5px 5px 3px #0007
  z-index: 101
  &__color
    width: 30px
    height: 30px
    cursor: pointer
    border: 1px solid #000
    border-top: 0
    &:first-child
      border-top: 1px solid #000
</style>
