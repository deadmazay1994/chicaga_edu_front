<template>
  <div class="calendar-grid">
    <div class="calendar">
      <calendar-cell
        :currentDateObj="currentDateObj"
        :currMonth="currMonth"
        :currYear="currYear"
        :item="item"
        :key="index"
        v-for="(item, index) in days"
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

<style lang="sass">
.calendar-grid
  margin-top: 39px

.calendar
  max-width: 1078px
  margin: 0 auto
  display: grid
  grid-template-columns: repeat(7, 1fr)
  grid-gap: 0
</style>
