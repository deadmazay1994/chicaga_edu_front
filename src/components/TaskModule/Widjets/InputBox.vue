<template>
  <div class="input-box vue-component">
    <input class="input-box__input" type="text" />
  </div>
</template>

<script>
export default {
  name: "",
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

<style scoped="scoped" lang="sass">
.input-box
  display: inline-block
  width: 28px
  &__input
    width: 100%
    height: 28px
    padding: 0 4px
    font-weight: 600
    font-size: 16px
    line-height: 28px
    text-align: center
    white-space: nowrap
    background-color: #ffffff
    border: 1px solid #dcdcdc
    border-radius: 4px
</style>
