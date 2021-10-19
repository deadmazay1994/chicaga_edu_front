const path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],
  publicPath: "/edu",
  configureWebpack: {
    resolve: {
      alias: {
        Base: path.resolve(__dirname, "src/components/Base/"),
        // eslint-disable-next-line prettier/prettier
        Tasks: path.resolve(
          __dirname,
          "src/components/LessonComponents/Tasks/"
        ),
        Ui: path.resolve(__dirname, "src/components/UiElements/"),
        LC: path.resolve(__dirname, "src/components/LessonComponents/"),
        // eslint-disable-next-line prettier/prettier
        VChat: path.resolve(
          __dirname,
          "src/components/LessonComponents/VideoChat/"
        ),
        Chat: path.resolve(__dirname, "src/components/LessonComponents/Chat/"),
        Components: path.resolve(__dirname, "src/components/"),
        Mixns: path.resolve(__dirname, "src/mixins")
      }
    }
  }
};
