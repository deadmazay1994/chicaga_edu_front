<template>
  <div class='task-module vue-component'>

  </div>
  
</template>

<script>
export default {
  name: 'task-module',
  data: function() {
    return {
      activeG: 0
    }
  },
  methods: {},
  computed: {},
  components: {},
  props: {
    tasks: {
      required: true,
      type: Object
    }
  },
  mixins: {},
  beforeMount() {}
}
</script>

<style scoped='scoped' lang='sass'></style>
