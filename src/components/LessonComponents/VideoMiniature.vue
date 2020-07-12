<template>
  <div class="video-miniature vue-component">
    <video class="video" :src="src"></video>
  </div>
</template>

<script>
export default {
  name: "video-miniature",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
  props: ["src"],
  mixins: {},
  beforeMount() {}
};
</script>
