<template>
  <div class="img-list vue-component">
    <div class="img-list__inner">
      <div class="img-list__item">
        <img
          class="img-list__img"
          src="imgs/faviconBig.png"
          width="100"
          height="100"
          alt=""
        />
        <div class="img-list__text">
          1
        </div>
      </div>
      <div class="img-list__item">
        <img
          class="img-list__img"
          src="imgs/whiteboardBg.png"
          width="100"
          height="100"
          alt=""
        />
        <div class="img-list__text">
          2
        </div>
      </div>
      <div class="img-list__item">
        <img
          class="img-list__img"
          src="imgs/slider-background.svg"
          width="100"
          height="100"
          alt=""
        />
        <div class="img-list__text">
          3
        </div>
      </div>
      <div class="img-list__item">
        <img
          class="img-list__img"
          src="imgs/cardBg.png"
          width="100"
          height="100"
          alt=""
        />
        <div class="img-list__text">
          4
        </div>
      </div>
      <div class="img-list__item">
        <img
          class="img-list__img"
          src="imgs/whitenoize.gif"
          width="100"
          height="100"
          alt=""
        />
        <div class="img-list__text">
          5
        </div>
      </div>
      <div class="img-list__item">
        <img
          class="img-list__img"
          src="img/arrow-down.c1f4056a.svg"
          width="100"
          height="100"
          alt=""
        />
        <div class="img-list__text">
          6
        </div>
      </div>
    </div>
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
.img-list
  width: 100%
  overflow: hidden
  &__inner
    display: flex
    flex-wrap: wrap
    width: calc(100% + 16px)
    margin: -8px
    overflow: hidden
  &__item
    position: relative
    display: flex
    align-items: center
    justify-content: center
    width: 100px
    height: 100px
    margin: 8px
    background-color: #ffffff
    border: 1px solid #dcdcdc
    border-radius: 4px
  &__img
    width: auto
    max-width: 100%
    height: auto
    max-height: 100%
    object-fit: contain
  &__text
    position: absolute
    bottom: -1px
    left: -1px
    min-width: 28px
    max-width: calc(100% + 2px)
    height: 28px
    padding-right: 4px
    padding-left: 4px
    font-weight: 600
    font-size: 16px
    line-height: 28px
    text-align: center
    white-space: nowrap
    text-overflow: ellipsis
    background-color: #ffffff
    border: 1px solid #dcdcdc
    border-radius: 4px
    overflow: hidden
</style>
