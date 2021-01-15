<script>
import Ctrls from "./Ctrls";
import Shapes from "./Shapes";

import Draw from "./mixins/draw";
import Transformer from "./mixins/transformer";

import { mapGetters, mapMutations } from "vuex";

export default {
  render() {
    return (
      <div class="paint" ref="paint">
        <v-stage ref="stage" config={this.configKonva}>
          <v-layer ref="layer">
            <shapes shapesConfigs={this.shapesConfigs} />
          </v-layer>
        </v-stage>
        <ctrls class="paint__ctrls"></ctrls>
      </div>
    );
  },
  name: "paint",
  data: function() {
    return {
      active: false,
      canvas: false,
      ctx: false,
      stage: false,
      layer: false,
      shapesConfigs: [],
      oldCanvas: false
    };
  },
  methods: {
    ...mapMutations([
      "addShape",
      "setConfigKonvaWidth",
      "setConfigKonvaHeight"
    ]),
    setSizes() {
      this.setConfigKonvaWidth(this.width);
      this.setConfigKonvaHeight(this.height);
    },
    createActiveShape(shapeName, color, x, y) {
      this.shapesConfigs.push({
        x,
        y,
        width: 30,
        height: 30,
        stroke: color,
        name: "shape-" + this.shapesConfigs.length,
        innerRadius: 30,
        shapeName,
        strokeWidth: 5
      });
    },
    getClickPositionByRelative(e, relative = document.querySelector("body")) {
      return {
        x: e.clientX - relative.getBoundingClientRect().x,
        y: e.clientY - relative.getBoundingClientRect().y
      };
    },
    paintOnClick() {
      this.$refs.paint.onmousedown = e => {
        let clickCoords = this.getClickPositionByRelative(e, this.$refs.paint);
        if (this.toolGroup == "shapes" && this.tool) {
          this.Do(
            "createActiveShape",
            ["v-" + this.tool, this.color, clickCoords.x, clickCoords.y],
            "do paint"
          );
          let canTransform = true;
          this.$refs.paint.onmouseup = () => {
            canTransform = false;
          };
          this.$refs.paint.onmousemove = eMousemove => {
            if (canTransform) {
              this.Do(
                "transformSizes",
                [
                  {
                    tool: this.tool,
                    width: eMousemove.clientX - e.clientX,
                    height: eMousemove.clientY - e.clientY,
                    innerRadius:
                      // eslint-disable-next-line prettier/prettier
                      Math.abs((eMousemove.clientY -
                          e.clientY +
                          eMousemove.clientY -
                          e.clientY) /
                          2
                      ) + 10
                  }
                ],
                "do paint"
              );
            }
          };
        }
      };
    },
    transformSizes(data) {
      let lastConf = this.shapesConfigs[this.shapesConfigs.length - 1];
      if (data.tool == "circle") {
        lastConf.width = Math.abs(data.width);
        lastConf.height = Math.abs(data.height);
      } else if (data.tool == "star") {
        lastConf.width = Math.abs(data.width);
        lastConf.height = Math.abs(data.height);
        lastConf.outerRadius = data.innerRadius;
        lastConf.innerRadius = data.innerRadius * 0.5;
      } else {
        lastConf.width = data.width;
        lastConf.height = data.height;
      }
    },
    clearCanvasDo() {
      this.Do("clearCanvas", [], "do paint");
    },
    clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.shapesConfigs = [];
    }
  },
  computed: {
    ...mapGetters([
      "shapes",
      "configKonva",
      "toolGroup",
      "tool",
      "color",
      "socket",
      "brushSize"
    ]),
    shapes() {
      return this.shapesConfigs.map(config => {
        let node = this.$createElement(config.shapeName, {
          props: {
            config
          }
        });
        return node;
      });
    }
  },
  components: { Ctrls, Shapes },
  props: ["width", "height"],
  mixins: [Draw, Transformer],
  beforeMount() {
    this.setSizes();
    // Прослушиваем события типа do. В них передаеются данные от учители какие функции с какими данными вызывать
    // Требуется socket в mapGetters
    this.onDo("do paint");
    this.shapesConfigs.push({
      x: 0,
      y: 0,
      width: 30,
      height: 30,
      stroke: "red",
      name: "shape-" + this.shapesConfigs.length,
      strokeWidth: 5
    });
  },
  mounted() {
    this.canvas = this.$refs.paint.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.stage = this.$refs.stage.getStage();
    this.drawInit();
    this.paintOnClick();
  }
};
</script>

<style lang="sass" scoped>
.paint
  &__ctrls
    position: absolute
    top: 0
    left: 0
</style>
