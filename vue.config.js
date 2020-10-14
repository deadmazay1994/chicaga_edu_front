const path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    resolve: {
      alias: {
        // eslint-disable-next-line prettier/prettier
        Tasks: path.resolve(__dirname, "src/components/LessonComponents/Tasks/"),
        LC: path.resolve(__dirname, "src/components/LessonComponents/"),
        // eslint-disable-next-line prettier/prettier
        VChat: path.resolve(__dirname, "src/components/LessonComponents/VideoChat/"),
        Chat: path.resolve(__dirname, "src/components/LessonComponents/Chat/"),
        Components: path.resolve(__dirname, "src/components/")
      }
    }
  }
};
