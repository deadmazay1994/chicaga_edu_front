<template>
  <div class="calendar-cell">
    <div class="calendar-cell__head">
      <span class="calendar-cell__data">
        {{ item }}
      </span>
    </div>
    <div class="calendar-cell__body">
      <div class="calendar-cell__title">
        Lorem Ipsum has been the indus...
      </div>
      <div class="calendar-cell__desc">
        Lorem Ipsum has been the industry's standard...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalendarCell",
  props: {
    item: String
  }
};
</script>

<style lang="sass" scoped>
.calendar-cell
  display: flex
  flex-direction: column
  border-radius: 10px
  padding: 6px 14px
  background: linear-gradient(89.7deg, #F8F8F8 0.28%, #FFFFFF 99.76%)
  box-shadow: 4px 4px 20px 0px #0000001A

  .calendar-cell__data
    font-size: 24px
    color: #363636

  .calendar-cell__title
    font-size: 16px
    font-weight: 600
    color: #323232

  .calendar-cell__desc
    font-size: 12px
    font-weight: 200
    color: #323232
</style>
