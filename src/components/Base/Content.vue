<template>
  <div class='content-block vue-component'>
    <slot name="header"></slot>
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'content-component',
  data: function() {
    return {}
  },
  methods: {},
  computed: {},
  components: {},
  props: [],
  mixins: {},
  beforeMount() {}
}
</script>

<style scoped='scoped' lang='sass'>
.content-block
  background: #FFFFFFcc
  backdrop-filter: blur(7px)
  border-radius: 30px
  padding: 14px 0
</style>
