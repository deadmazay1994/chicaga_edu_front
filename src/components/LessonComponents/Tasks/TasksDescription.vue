<template>
  <div class="task-description vue-component">
    <div
      :style="String(index).length == 2 ? 'padding-left: 75px' : ''"
      class="text-subtitle-1 task-description__title"
    >
      <span class="task-description__index">
        {{ index }}
      </span>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "task-description",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
  props: ["index"],
  mixins: {}
};
</script>

<style scoped="scoped" lang="sass">
@import "@/components/Sass/Varibles.sass"

.task-description
  padding: 20px
  background: linear-gradient(90deg, $main_color 60%, transparent)
  color: #fff
  margin-bottom: 20px
  &__title
    max-width: 70%
    position: relative
    padding-left: 48px
  &__index
    position: absolute
    left: 0
    letter-spacing: -13px
    bottom: -8px
    font-size: 70px
    font-weight: bold
    text-shadow: 5px 1px 2px #FFF7, 1px 1px 1em white
</style>
