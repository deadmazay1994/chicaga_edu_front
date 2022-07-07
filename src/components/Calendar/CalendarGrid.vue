<template>
  <div class="calendar-grid">
    <div class="calendar-grid__header">
      <div class="calendar-grid__header-item">Mon</div>
      <div class="calendar-grid__header-item">Tue</div>
      <div class="calendar-grid__header-item">Wed</div>
      <div class="calendar-grid__header-item">Thu</div>
      <div class="calendar-grid__header-item">Fri</div>
      <div class="calendar-grid__header-item">Sat</div>
      <div class="calendar-grid__header-item">Sun</div>
    </div>
    <div class="calendar-grid__body">
      <calendar-cell
        v-for="(item, index) in days"
        :currentDateObj="currentDateObj"
        :currMonth="currMonth"
        :currYear="currYear"
        :item="item"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import CalendarCell from "./CalendarCell.vue";

export default {
  name: "CalendarGrid",
  components: {
    CalendarCell
  },
  props: {
    days: Array,
    currentDateObj: Object,
    currMonth: Number,
    currYear: Number
  }
};
</script>

<style lang="sass" scoped>
.calendar-grid
  &__header,
  &__body
    display: grid
    grid-template-columns: repeat(7, 1fr)
    grid-gap: 10px
  &__header
    padding-right: 24px
    padding-left: 24px
    font-weight: 400
    font-size: 16px
    line-height: 1.3
    color: #a9a9a9
  &__body
    padding: 16px 24px 24px
</style>
