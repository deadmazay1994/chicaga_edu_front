<template>
  <div class="test-interlayer vue-component">
    <div class="test-interlayer__inner">
      <div class="test-interlayer__part test-interlayer__part--1">
        <div class="test-interlayer__part-inner">
          <slot></slot>
        </div>
      </div>
      <div class="test-interlayer__part test-interlayer__part--2">
        <div class="test-interlayer__part-inner">
          <slot name="aside"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "test-interlayer",
  components: {},
  data: function() {
    return {};
  },
  props: [],
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="sass">
.test-interlayer
  display: flex
  width: 100%
  height: 100%
  padding: 40px 40px 35px
  background-image: linear-gradient(292deg, #ffffff -15%, rgba(255, 255, 255, 0) 63.5%), url(~@/assets/imgs/bg/bg-test-level.jpg)
  background-position: right center
  background-size: cover
  backdrop-filter: blur(7px)
  &__inner
    position: relative
    display: flex
    width: 100%
    height: 100%
    padding-bottom: 66px
  &__inner::after
    content: ""
    position: absolute
    bottom: 0
    left: 0
    width: 100%
    height: 50px
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 60%)
    border-radius: 30px
    filter: blur(8px)
  &__part
    background-color: rgba(255, 255, 255, 0.5)
    border: 2px solid #ffffff
    border-radius: 30px
    overflow: hidden
  &__part--1
    flex-grow: 1
    max-width: 100%
    margin-right: 20px
  &__part--2
    flex-shrink: 0
    flex-basis: 388px
  &__part-inner
    width: 100%
    height: 100%
    padding: 14px
    overflow: hidden auto
</style>
