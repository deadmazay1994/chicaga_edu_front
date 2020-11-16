export default {
  namespaces: true,
  mutations: {
    addShape(state, shape) {
      state.shapes.push(shape);
    },
    setConfigKonvaWidth(state, width) {
      state.configKonva.width = width;
    },
    setConfigKonvaHeight(state, height) {
      state.configKonva.height = height;
    },
    toggleTool: (state, tool) => {
      if (state.tool == tool) {
        state.tool = false;
      } else {
        state.tool = tool;
        state.toolGroup = false;
      }
    },
    toggleTollGroup: (state, toolGroup) => (state.toolGroup = toolGroup),
    toggleColor: (state, color) => (state.color = color),
    changeBrushSize: (state, brushSize) => (state.brushSize = brushSize)
  },
  state: {
    shapes: [],
    configKonva: {},
    tool: false,
    toolGroup: false,
    color: "#df4b26",
    brushSize: 5
  },
  getters: {
    shapes: state => state.shapes,
    configKonva: state => state.configKonva,
    tool: state => state.tool,
    toolGroup: state => state.toolGroup,
    color: state => state.color,
    brushSize: state => state.brushSize
  }
};
