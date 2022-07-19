<template>
  <div class="interlayer vue-component">
    <div class="interlayer__inner">
      <div class="interlayer__header">
        <div class="interlayer__title" :title="title">
          {{ title }}
        </div>
      </div>
      <div class="interlayer__body">
        <div class="interlayer__body-inner">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "interlayer",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
  props: {
    title: {
      type: String,
      required: true
    }
  },
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
@import "@/assets/styles/variables.sass"

$header-width: 90px
$header-height: 54px
$border-width: 2px
$border-radius: 12px
$bg-color-safe: rgb(255, 255, 255)
$header-bg-color-main: rgba(255, 0, 0, 0.1)

.interlayer
  &__inner
    display: flex
    width: 100%
    height: 100%
    @media ($media_md)
      display: block
  &__header
    position: relative
    display: flex
    justify-content: center
    flex-shrink: 0
    width: $header-width
    background-color: $bg-color-safe
    background-image: linear-gradient(90deg, $bg-color-safe 0%, $header-bg-color-main 100%)
    border-top-left-radius: $border-radius
    border-bottom-left-radius: $border-radius
    z-index: 0
    @media ($media_lg2)
      width: calc( #{$header-width} - 30px )
    @media ($media_md)
      align-items: center
      justify-content: flex-start
      width: auto
      height: $header-height
      background-image: linear-gradient(180deg, $bg-color-safe 0%, $header-bg-color-main 100%)
      border-top-right-radius: $border-radius
      border-bottom-left-radius: 0
  &__header::before
    content: ""
    position: absolute
    top: $border-width
    right: 0
    bottom: $border-width
    left: $border-width
    z-index: -1
    background-color: $bg-color-safe
    background-image: linear-gradient(90deg, $header-bg-color-main 0%, $header-bg-color-main 100%)
    border-top-left-radius: calc(#{$border-radius} - #{$border-width})
    border-bottom-left-radius: calc(#{$border-radius} - #{$border-width})
    @media ($media_md)
      right: $border-width
      bottom: 0
      border-top-right-radius: calc(#{$border-radius} - #{$border-width})
      border-bottom-left-radius: 0
  &__title
    position: relative
    z-index: 0
    padding: 80px 14px
    font-weight: 700
    font-size: 48px
    line-height: 62px
    text-align: right
    text-overflow: ellipsis
    white-space: nowrap
    writing-mode: vertical-rl
    color: #ff0000
    transform: rotate(180deg)
    overflow: hidden
    @media ($media_lg2)
      padding: 30px 10px
      font-size: 32px
      line-height: 40px
    @media ($media_md)
      padding: 10px 20px
      writing-mode: horizontal-tb
      transform: rotate(0)
      text-align: left
      font-size: 28px
      line-height: 34px
  &__body
    position: relative
    display: flex
    flex-direction: column
    flex-grow: 1
    min-width: 100px
    min-height: 100px
    background-color: #fffefe
    border-top-right-radius: 12px
    border-bottom-right-radius: 12px
    box-shadow: 0 4px 20px rgba(128, 128, 128, 0.2)
    overflow: hidden
    @media ($media_md)
      flex-grow: 0
      height: calc( 100% - #{$header-height} )
      border-top-right-radius: 0
      border-bottom-left-radius: 12px
      box-shadow: 0 4px 10px rgba(128, 128, 128, 0.2)
  &__body-inner
    position: relative
    flex-grow: 1
    height: 100%
    overflow-x: hidden
    overflow-y: auto
</style>
