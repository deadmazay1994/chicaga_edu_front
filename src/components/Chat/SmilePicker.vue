<template>
  <div class="smile-picker">
    <div class="picker-header">
      <div class="picker-header__item picker-header__item--active">
        EMOJI
      </div>
      <div class="picker-header__item">
        STICKERS
      </div>
    </div>
    <Picker
      class="emoji-sheet"
      :showPreview="false"
      :showSkinTones="false"
      :showSearch="false"
      :emojiSize="30"
      @select="sendEmoji"
    />
  </div>
</template>

<script>
import { Picker } from "emoji-mart-vue";

export default {
  name: "SmilePicker",
  components: {
    Picker
  },
  methods: {
    sendEmoji(emoji) {
      this.$emit("onSendEmoji", emoji.native);
    }
  }
};
</script>

<style lang="sass">
.emoji-mart
  flex-direction: column-reverse !important
  border-radius: 0 0 15px 15px !important

.emoji-mart-bar
  border: none !important
  border-bottom-width: 0px !important
  .emoji-mart-anchor-selected
    color: rgba(169, 47, 33, 1) !important
    .emoji-mart-anchor-bar
      display: none

.picker-header
  display: flex
  align-items: center
  justify-content: space-between
  background: #fff
  border-radius: 15px 15px 0px 0px
  color: rgba(196, 196, 196, 1)

  .picker-header__item
    display: flex
    align-items: center
    justify-content: center
    padding: 12px 0 14px 0
    flex-basis: 50%
    font-weight: 800
    cursor: pointer

    &--active
      // -moz-box-shadow: 0 4px 4px rgba(169, 47, 33, 1)
      // -webkit-box-shadow: 0 4px 4px rgba(169, 47, 33, 1)
      // box-shadow: 0px 2px 0px rgba(169, 47, 33, 1)
      border-bottom: 2px solid rgba(169, 47, 33, 1)
      color: rgba(169, 47, 33, 1)
</style>
