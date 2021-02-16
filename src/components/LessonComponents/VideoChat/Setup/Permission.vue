<template>
  <div class="permission vue-component">
    <p>
      Проверьте разрешен ли доступ к камере? <br />
      Обратите внимание на виделенную область изображения.
    </p>
    <v-img :src="'/imgs/setup/' + cameraImg" />
    <p>
      Если в своем браузре вы видите аналогичную картину, то это значит, что вы
      запретили доступ к камере. Разрешите доступ к камере, чтобы продолжить
    </p>
  </div>
</template>

<script>
export default {
  name: "permission",
  data: function() {
    return {
      cameraImg: ""
    };
  },
  methods: {
    setCameraImg() {
      let ua = navigator.userAgent;
      let cameraImg = "yandex-lap.png";
      if (ua.search(/Firefox/) > 0) cameraImg = "firefox-lap.png";
      else if (ua.search(/YaBrowser/) > 0) cameraImg = "yandex-lap.png";
      else if (ua.search(/Opera/) > 0) cameraImg = "opera-lap.png";
      else if (ua.search(/Chrome/) > 0) cameraImg = "chrome-lap.png";
      else if (ua.search(/Edge/) > 0) cameraImg = "edge-lap.png";
      this.cameraImg = cameraImg;
    }
  },
  computed: {},
  components: {},
  props: [],
  mixins: {},
  beforeMount() {
    this.setCameraImg();
  }
};
</script>

<style scoped="scoped" lang="sass"></style>
