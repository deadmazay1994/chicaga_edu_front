<template>
  <div class="current-time">
    <div class="current-time__title">
      {{ currentTitle }}
    </div>
    <div class="current-time__duration">
      {{ currentVideoTime }}
      <template v-if="formattedDuration">{{ formattedDuration }}</template>
    </div>
  </div>
</template>

<script>
export default {
  name: "current-time",
  components: {},
  data: function() {
    return {};
  },
  props: {
    currentTitle: String,
    currentVideoTime: String,
    formattedDuration: [String, Boolean]
  },
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="sass">
.current-time
  display: flex
  align-self: center
  font-weight: 400
  font-size: 13px
  line-height: 22px
  letter-spacing: 0.01em
  color: #eaeaea
</style>
