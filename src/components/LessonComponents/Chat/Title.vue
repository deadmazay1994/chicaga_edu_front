<template>
  <div class="title-chat vue-component"><slot></slot></div>
</template>

<script>
export default {
  name: "title-chat",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped">
.title-chat {
  font-size: 0.9rem;
  font-weight: 600;
}
</style>
