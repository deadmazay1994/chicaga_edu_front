<template>
  <div class="calendar-dropdown">
    <div class="calendar-dropdown__title">
      <span>Lorem Ipsum has been the industr</span>
      <lock-svg :show="true" />
    </div>
    <div class="calendar-dropdown__title">
      <span>Lorem Ipsum has been the industr</span>
      <lock-svg :show="false" />
    </div>
  </div>
</template>

<script>
import LockSvg from "@/components/Icons/LockSvg";

export default {
  name: "CalendarDropdown",
  components: {
    LockSvg
  }
};
</script>

<style lang="sass" scoped>
.calendar-dropdown
  background: red
  position: absolute
  right: 0
  top: 0
  width: 100%
  margin-right: -100%
  z-index: 10
  height: 80px
  padding: 3px 10px
  border-radius: 10px
  background: linear-gradient(89.7deg, #E8E8FF 0.28%, #FFFFFF 99.76%), linear-gradient(89.7deg, #FFE1E1 0.28%, #FFFFFF 99.76%), linear-gradient(89.7deg, #F8F8F8 0.28%, #FFFFFF 99.76%)
  display: flex
  flex-direction: column
  justify-content: space-evenly

  .calendar-dropdown__title
    display: flex
    align-items: center
    justify-content: space-between
    cursor: pointer
    height: 34px

    span
      font-size: 12px
      font-weight: 600
      font-style: normal
      line-height: 14px
      letter-spacing: 0em
      text-align: left
      overflow: hidden
      text-overflow: ellipsis
      display: -webkit-box
      -webkit-line-clamp: 2
      -webkit-box-orient: vertical
      -moz-user-select: -moz-none
      -o-user-select: none
      -khtml-user-select: none
      -webkit-user-select: none
      user-select: none
</style>
