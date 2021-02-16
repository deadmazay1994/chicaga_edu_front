<template>
  <div class="white-board vue-component" @click="hideColorPicker">
    <!---Whiteboard container -!-->
    <div id="whiteboardContainer"></div>

    <!---Toolbar -!-->
    <div
      style="position: absolute; top: 10px; left: 10px;"
      class="tollbar"
      v-if="!mobileDetected"
    >
      <!-- <div class="btn-group">
        <button
          id="whiteboardTrashBtn"
          title="Clears the whiteboard"
          type="button"
          class="whiteboardBtn"
        >
          <v-icon>fa-vuejs</v-icon>
        </button>
        <button
          id="whiteboardUndoBtn"
          title="Undo your last step"
          type="button"
          class="whiteboardBtn"
          @click="undo"
        >
          <i class="fa fa-undo"></i>
        </button>
      </div> -->
      <div class="btn-group">
        <!-- <button
          title="Take the mouse"
          type="button"
          class="whiteboardTool"
          :class="{ active: activeTool == 'mouse' }"
          @click="changeTool('mouse')"
        >
          <mouse-icon></mouse-icon>
        </button> -->
        <button
          title="Take the pen"
          type="button"
          class="whiteboardTool"
          :class="{ active: activeTool == 'pen' }"
          @click="changeTool('pen')"
        >
          <v-icon>mdi-pencil</v-icon>
        </button>
        <button
          style="padding-bottom: 8px; padding-top: 7px;"
          title="draw a line"
          type="button"
          class="whiteboardTool"
          :class="{ active: activeTool == 'line' }"
          @click="changeTool('line')"
        >
          ╱
        </button>
        <button
          title="draw a rectangle"
          type="button"
          class="whiteboardTool"
          :class="{ active: activeTool == 'rect' }"
          @click="changeTool('rect')"
        >
          <v-icon>mdi-checkbox-blank-outline</v-icon>
        </button>
        <button
          title="draw a circle"
          type="button"
          class="whiteboardTool"
          :class="{ active: activeTool == 'circle' }"
          @click="changeTool('circle')"
        >
          <v-icon>mdi-checkbox-blank-circle-outline</v-icon>
        </button>
        <button
          title="take the eraser"
          type="button"
          class="whiteboardTool"
          :class="{ active: activeTool == 'eraser' }"
          @click="changeTool('eraser')"
        >
          <v-icon>mdi-eraser</v-icon>
        </button>
      </div>

      <div
        style="width: 190px; border: 1px solid #000; position: relative"
        class="btn-group"
      >
        <img
          style="position: absolute; left: 11px; top: 13px; height:14px; width:130px;"
          src="/imgs/slider-background.svg"
        />
        <input
          title="Thickness"
          id="whiteboardThicknessSlider"
          style="position: absolute; left:9px; width: 130px; top: 15px;"
          type="range"
          min="1"
          max="50"
          value="3"
          @change="changeThickness"
        />
        <button
          type="button"
          style="position: absolute; right: 0; border: 0; height: 38px"
          class="whiteboardTool"
          :class="{ active: colorPickerActive }"
          @click="colorPickerActive = !colorPickerActive"
        >
          <v-icon>mdi-format-color-fill</v-icon>
        </button>
        <v-color-picker
          class="color-picker"
          v-show="colorPickerActive"
          v-model="color"
          style="position: absolute; top: 40px; right: 0"
        ></v-color-picker>
      </div>

      <div class="btn-group">
        <button
          id="saveAsImageBtn"
          title="Save whiteboard as image"
          type="button"
          class="whiteboardBtn"
        >
          <v-icon>mdi-content-save</v-icon>
        </button>
      </div>

      <!-- <div class="btn-group">
        <button
          id="addImgToCanvasBtn"
          title="Upload Image to whiteboard"
          type="button"
          class="whiteboardBtn"
        >
          <v-icon>mdi-file-image</v-icon>
          <input style="display:none;" id="myFile" type="file" />
        </button>
      </div> -->
    </div>
  </div>
</template>

<script>
import Whiteboard from "./assets/js/whiteboard";
import $ from "jquery";

export default {
  name: "App",
  data: function() {
    return {
      color: "#000",
      whiteBoard: Whiteboard,
      whiteboardId: null,
      activeTool: "pen",
      colorPickerActive: false,
      mobileDetected: false
    };
  },
  directives: {},
  methods: {
    hideColorPicker(e) {
      if (
        !e.path.find(el => {
          if (el.classList) {
            return (
              el.classList.contains("v-color-picker") ||
              el.classList.contains("v-color-picker__canvas") ||
              el.classList.contains("whiteboardTool")
            );
          }
          return false;
        })
      ) {
        this.colorPickerActive = false;
      }
    },
    changeTool(toolName) {
      $(".whiteboardTool").removeClass("active");
      $(this).addClass("active");
      this.whiteBoard.setTool(toolName);
      this.activeTool = toolName;
    },
    changeThickness(event) {
      this.whiteBoard.thickness = event.target.value;
    },
    undo() {
      this.whiteBoard.undoWhiteboardClick();
    },
    isImageFileName(filename) {
      var ending = filename.split(".")[filename.split(".").length - 1];
      if (
        ending.toLowerCase() == "png" ||
        ending.toLowerCase() == "jpg" ||
        ending.toLowerCase() == "jpeg" ||
        ending.toLowerCase() == "gif" ||
        ending.toLowerCase() == "tiff"
      ) {
        return true;
      }
      return false;
    },
    isValidImageUrl(url, callback) {
      //Check if given url it is a vaild img url
      var img = new Image();
      var timer = null;
      img.onerror = img.onabort = function() {
        clearTimeout(timer);
        callback(false);
      };
      img.onload = function() {
        clearTimeout(timer);
        callback(true);
      };
      timer = setTimeout(function() {
        callback(false);
      }, 2000);
      img.src = url;
    }
  },
  computed: {},
  components: {},
  watch: {
    color: function() {
      this.whiteBoard.drawcolor = this.color;
    }
  },
  props: ["server", "socketProp", "username"],
  beforeMount() {
    this.mobileDetected = detectMob();
    this.whiteboardId = getQueryVariable("whiteboardid");
    this.whiteboardId = this.whiteboardId || "myNewWhiteboard";

    this.socketProp.on("drawToWhiteboard", content => {
      this.whiteBoard.handleEventsAndData(content, true);
    });

    this.socketProp.on("refreshUserBadges", () => {
      this.whiteBoard.refreshUserBadges();
    });

    this.socketProp.emit("joinWhiteboard", this.whiteboardId);

    //Prevent site from changing tab on drag&drop
    window.addEventListener(
      "dragover",
      function(e) {
        e = e || event;
        e.preventDefault();
      },
      false
    );
    window.addEventListener(
      "drop",
      function(e) {
        e = e || event;
        e.preventDefault();
      },
      false
    );

    function uploadImgAndAddToWhiteboard(base64data) {
      var date = +new Date();
      $.ajax({
        type: "POST",
        url: this.server + "upload",
        data: {
          imagedata: base64data,
          whiteboardId: this.whiteboardId,
          date: date
        },
        success: function() {
          var filename = this.whiteboardId + "_" + date + ".png";
          this.whiteBoard.addImgToCanvasByUrl(
            this.server + "uploads/" + filename
          ); //Add image to canvas
          console.log("Image uploaded!");
        },
        error: function(err) {
          console.error("Failed to upload frame: " + JSON.stringify(err));
        }
      });
    }

    window.addEventListener("paste", function(e) {
      //Even do copy & paste from clipboard
      if (e.clipboardData) {
        var items = e.clipboardData.items;
        if (items) {
          // Loop through all items, looking for any kind of image
          for (var i = 0; i < items.length; i++) {
            if (items[i].type.indexOf("image") !== -1) {
              // We need to represent the image as a file,
              var blob = items[i].getAsFile();

              var reader = new window.FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = function() {
                console.log("Uploading image!");
                var base64data = reader.result;
                uploadImgAndAddToWhiteboard(base64data);
              };
            }
          }
        }
      }
    });

    function getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return false;
    }
  },
  mounted() {
    this.whiteBoard.loadWhiteboard("#whiteboardContainer", {
      //Load the whiteboard
      whiteboardId: this.whiteboardId,
      username: this.username,
      canvasWidth: this.$el.clientWidth,
      canvasHeight: this.$el.clientHeight || 1000,
      sendFunction: content => {
        this.socketProp.emit("drawToWhiteboard", content);
      }
    });

    $.get(this.server + "loadwhiteboard", { wid: this.whiteboardId }).done(
      data => {
        this.whiteBoard.loadData(data);
      }
    );

    /*----------------/
Whiteboard actions
  /----------------*/

    $("#whiteboardTrashBtn").click(() => {
      this.whiteBoard.clearWhiteboard();
    });

    $("#addImgToCanvasBtn").click(() => {
      alert("Просто перенесите изображение сюда!");
    });

    $("#saveAsImageBtn").click(() => {
      var imgData = this.whiteBoard.getImageDataBase64();
      var a = document.createElement("a");
      a.href = imgData;
      a.download = "this.whiteBoard.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });

    $("#saveAsJSONBtn").click(() => {
      var imgData = this.whiteBoard.getImageDataJson();
      var a = window.document.createElement("a");
      a.href = window.URL.createObjectURL(
        new Blob([imgData], { type: "text/json" })
      );
      a.download = "this.whiteBoard.json";
      // Append anchor to body.
      document.body.appendChild(a);
      a.click();
      // Remove anchor from body
      document.body.removeChild(a);
    });

    $("#myFile").on("change", function() {
      var file = document.getElementById("myFile").files[0];
      var reader = new FileReader();
      reader.onload = function(e) {
        try {
          var j = JSON.parse(e.target.result);
          this.whiteBoard.loadJsonData(j);
        } catch (e) {
          alert("File was not a valid JSON!");
        }
      };
      reader.readAsText(file);
      $(this).val("");
    });

    var dragCounter = 0;
    $("#whiteboardContainer").on("dragenter", function(e) {
      e.preventDefault();
      e.stopPropagation();
      dragCounter++;
      this.whiteBoard.dropIndicator.show();
    });

    $("#whiteboardContainer").on("dragleave", function(e) {
      e.preventDefault();
      e.stopPropagation();
      dragCounter--;
      if (dragCounter === 0) {
        this.whiteBoard.dropIndicator.hide();
      }
    });

    $("#whiteboardContainer").on("drop", function(e) {
      //Handle drag & drop
      if (e.originalEvent.dataTransfer) {
        if (e.originalEvent.dataTransfer.files.length) {
          //File from harddisc
          e.preventDefault();
          e.stopPropagation();

          var filename = e.originalEvent.dataTransfer.files[0]["name"];
          if (this.isImageFileName(filename)) {
            var blob = e.originalEvent.dataTransfer.files[0];
            var reader = new window.FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function() {
              console.log("Uploading image!");
              var base64data = reader.result;
              this.uploadImgAndAddToWhiteboard(base64data);
            };
          } else {
            console.error("File must be an image!");
          }
        } else {
          //File from other browser
          var fileUrl = e.originalEvent.dataTransfer.getData("URL");
          var imageUrl = e.originalEvent.dataTransfer.getData("text/html");
          var rex = /src="?([^"\s]+)"?\s*/;
          var url = rex.exec(imageUrl);
          if (url && url.length > 1) {
            url = url[1];
          } else {
            url = "";
          }

          this.isValidImageUrl(fileUrl, function(isImage) {
            if (isImage && this.isImageFileName(url)) {
              this.whiteBoard.addImgToCanvasByUrl(fileUrl);
            } else {
              this.isValidImageUrl(url, function(isImage) {
                if (isImage) {
                  if (this.isImageFileName(url)) {
                    this.whiteBoard.addImgToCanvasByUrl(url);
                  } else {
                    this.uploadImgAndAddToWhiteboard(url);
                  }
                } else {
                  console.error("Can only upload imagedata!");
                }
              });
            }
          });
        }
      }
      dragCounter = 0;
      this.whiteBoard.dropIndicator.hide();
    });
  }
};

function detectMob() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ];

  return toMatch.some(toMatchItem => {
    return navigator.userAgent.match(toMatchItem);
  });
}
</script>

<style scoped>
i {
  color: #000 !important;
}
#whiteboardContainer {
  width: 100%;
  height: 100%;
}
.btn-group button {
  background-color: #fff; /* Green background */
  border: 1px solid #636060; /* Green border */
  color: black; /* White text */
  padding: 8px; /* Some padding */
  cursor: pointer; /* Pointer/hand icon */
  float: left; /* Float the buttons side by side */
  font-size: 1.2em;
  width: 40px;
  height: 40px;
  display: flex;
}

.btn-group button:not(:last-child) {
  border-right: none; /* Prevent double borders */
}

/* Clear floats (clearfix hack) */
.btn-group:after {
  content: "";
  clear: both;
  display: table;
}

/* Add a background color on hover */
.btn-group button:hover {
  background-color: #a5a3a3;
}

button {
  outline-width: 0;
}

.btn-group {
  margin-left: 5px;
  float: left;
  position: relative;
  background: #fff;
  min-height: 40px;
}

.whiteboardTool.active {
  background: #bfbfbf;
}

#whiteboardThicknessSlider {
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 3px;
  background: transparent;
  outline: none;
  opacity: 1;
  -webkit-transition: opacity 0.15s ease-in-out;
  transition: opacity 0.15s ease-in-out;
}
</style>
