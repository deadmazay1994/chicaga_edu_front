<template>
  <div class="video-chat vue-component">hello</div>
</template>

<script>
export default {
  name: "video-chat",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
  mounted() {}
};
</script>

<style lang="sass" scoped>
.video-chat-miniatures-wrapper
  height: 100%
  position: absolute
  width: 30%
  min-width: 146px
  background-color: #9d000040
  z-index: 10 !important
  right: 0
  border-top-left-radius: 10px
  border-bottom-left-radius: 10px
  .miniatures-go
    height: 12.5%
    display: flex
    align-items: center
    justify-content: center
    z-index: 1001 !important
    transition: all .2s
    &:hover
      cursor: pointer
      background-color: #9d000041

  .video-chat-miniatures-list
    height: 75%
    -ms-overflow-style: none
    scrollbar-width: none
    overflow-y: scroll
  .video-chat-miniatures-list::-webkit-scrollbar
    display: none

.video-chat
  position: relative
  display: flex
  overflow-y: auto
  flex-direction: column
  align-items: center
  justify-content: space-between
  positon: relative
  // height: 450px !important
  min-height: 450px
  height: 50%
  &__videos-wrap
    display: flex
    flex-wrap: wrap
    width: 100%
    height: 100%
    padding: 10px
    padding-top: 40px
  &__video-wrap
    width: 50%
    display: flex
    height: 150px
    margin-bottom: 10px
    &--active
      width: 0
  .video-chat__video--miniature
    width: calc(100% - 20px)
    height: 100px
    margin: 5px 10px
  &__video
    margin-top: 5px
    width: 50%
    min-width: 140px
    height: 450px
    // &--miniature
    //   &:nth-child(2n)
    //     justify-self: end
    // &:last-child
    //   margin-right: 0
  &__video--active
    width: 100%
    margin: 0
    height: 100%
    position: absolute
    top: 0
    left: 0
@media (max-width: 375px)
  .video-chat
    .video-chat__video--miniature
      width: 125px
      height: 125px
    &__video
      min-width: 120px
</style>
