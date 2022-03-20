<template>
  <div class="calendar-grid">
    <div class="calendar">
      <!-- <div class="calendar__item" v-for="(item, index) in days" :key="index">
        {{ item }}
      </div> -->
      <calendar-cell :item="item" v-for="(item, index) in days" :key="index" />
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
    days: Array
  }
};
</script>

<style lang="sass">
.calendar
  display: grid
  grid-template-columns: repeat(7, 1fr)
</style>
