import Konva from "konva";

export default {
  data: function() {
    return {
      stage: false,
      isPaint: false,
      lastPointerPosition: { x: 0, y: 0 },
      drawDots: []
    };
  },
  methods: {
    drawInit() {
      this.ctx.lineJoin = "round";
      this.ctx.lineWidth = this.brushSize;

      var image = new Konva.Image({
        image: this.canvas,
        x: 0,
        y: 0
      });
      image.zIndex(20);
      this.stage.children[0].add(image);
      this.stage.draw();

      image.on("mousedown touchstart", this.touchstart);
      this.stage.on("mouseup touchend", this.touchup);
      this.stage.on("mousemove touchmove", this.touchMove);
    },
    touchstart() {
      this.isPaint = true;
      this.lastPointerPosition = this.stage.getPointerPosition();
      this.Do("changeStrokeColor", [this.color], "do paint");
      this.Do("changeLineWidth", [this.brushSize], "do paint");
    },
    touchup() {
      this.isPaint = false;
    },
    touchMove() {
      let isDrawTool = this.tool == "brush" || this.tool == "eraser";
      if (!this.isPaint || !isDrawTool) return;
      this.Do(
        "draw",
        [
          {
            lastPointerPosition: this.lastPointerPosition,
            pointerPosition: this.stage.getPointerPosition(),
            globalCompositeOperation:
              this.tool == "eraser" ? "destination-out" : "source-over"
          }
        ],
        "do paint"
      );
    },
    draw(data) {
      this.drawDots.push({
        start: {
          x: data.lastPointerPosition.x,
          y: data.lastPointerPosition.y
        },
        end: {
          x: data.pointerPosition.x,
          y: data.pointerPosition.y
        },
        globalCompositeOperation: data.globalCompositeOperation,
        color: this.color
      });
      let lastDot = this.drawDots[this.drawDots.length - 1];
      this.drawLineByTwoDots(
        lastDot.start,
        lastDot.end,
        data.globalCompositeOperation
      );
    },
    drawLineByTwoDots(start, end, globalCompositeOperation) {
      this.ctx.globalCompositeOperation = globalCompositeOperation;
      this.ctx.beginPath();
      this.ctx.moveTo(start.x, start.y);
      this.ctx.lineTo(end.x, end.y);
      this.ctx.closePath();
      this.ctx.stroke();
      this.lastPointerPosition = end;
      // this.shapesConfigs.push({
      //   x: start.x,
      //   y: start.y,
      //   points: [0, 0, 100, 0, 100, 100],
      //   stroke: this.color,
      //   name: "shape-" + this.shapesConfigs.length,
      //   shapeName: "v-line",
      //   strokeWidth: this.brushSize
      // });
    },
    changeStrokeColor(color = "#df4b26") {
      this.ctx.strokeStyle = color;
    },
    changeLineWidth(lineWidth = 5) {
      this.ctx.lineWidth = lineWidth;
    }
  },
  computed: {},
  components: {},
  props: [],
  mixins: {},
  updated() {
    setTimeout(() => {
      this.drawDots.forEach(dots => {
        this.ctx.strokeStyle = dots.color;
        this.drawLineByTwoDots(
          dots.start,
          dots.end,
          dots.globalCompositeOperation
        );
      });
    }, 200);
  }
};
