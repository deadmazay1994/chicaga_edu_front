<template>
  <div class="calendar-grid">
    <div class="calendar">
      <calendar-cell
        :currentDateObj="currentDateObj"
        :currMonth="currMonth"
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
    currMonth: Number
  }
};
</script>

<style lang="sass">
.calendar
  padding: 1rem 2rem
  display: grid
  grid-template-columns: repeat(7, 1fr)
</style>
