<template>
  <div class="thumbnail-chat vue-component">
    <img class="thumbnail-chat__img" :src="path" :alt="alt" />
  </div>
</template>

<script>
export default {
  name: "thumbnail-chat",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
  props: ["path", "alt"],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped">
.thumbnail-chat {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.thumbnail-chat__img {
  display: block;
  max-width: 100%;
  height: auto;
  max-height: 100%;
  border-radius: 100%;
}
</style>
