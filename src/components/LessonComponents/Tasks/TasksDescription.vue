<template>
  <div
    class="task-description vue-component"
    :class="{ 'task-description--consultation': isConsultation }"
    v-if="Object.keys(this.$slots)[0]"
  >
    <div
      v-if="isConsultation"
      :style="String(index).length == 2 ? 'padding-left: 75px' : ''"
      class="task-description__title"
    >
      <span class="task-description__index" v-if="isConsultation">
        {{ Number(index) + 1 }}
      </span>
      <slot></slot>
    </div>
    <div v-else class="text-subtitle-1">
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
  computed: {
    isConsultation() {
      return location.href.includes("consultation");
    }
  },
  components: {},
  props: ["index"],
  mixins: {}
};
</script>

<style scoped="scoped" lang="sass">
@import "@/components/Sass/Varibles.sass"

.task-description
  &__title
    max-width: 70%
    position: relative
    padding-left: 48px
    line-height: 21px
  &--consultation
    padding: 20px
    background: linear-gradient(90deg, $main_color 60%, transparent)
    color: #fff
    margin-bottom: 30px
    .task-description__title
      font-size: 21px
  &__index
    position: absolute
    left: 0
    letter-spacing: -13px
    bottom: -8px
    font-size: 70px
    font-weight: bold
    text-shadow: 5px 1px 2px #FFF7, 1px 1px 1em white
</style>
