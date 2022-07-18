<template>
  <textarea
    :placeholder="placeholder"
    class="inline-textarea"
    v-on:keyup.enter.exact="enter()"
    @input="$emit('input', $e)"
    rows="1"
  ></textarea>
</template>

<script>
export default {
  name: "inline-textarea",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
  props: ["placeholder"],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
.inline-textarea
  font-family: Manrope, sans-serif
  font-weight: 500
  padding: 7px 21px 7px 16px
  background: hsla(0, 0%, 50%, .1)
  border-radius: 10px
  border: 0
</style>
