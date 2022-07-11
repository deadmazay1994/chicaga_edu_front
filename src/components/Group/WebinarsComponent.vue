<template>
  <div class="webinars-component">
    <calendar-component
      class="webinars-component__calendar"
      :title="'ВЕБИНАРЫ'"
    />
  </div>
</template>

<script>
import CalendarComponent from "@/components/Calendar/CalendarComponent";

export default {
  name: "WebinarsComponent",
  components: {
    CalendarComponent
  }
};
</script>

<style lang="sass" scoped>
.webinars-component
  width: 100%
  height: 100%
  &__calendar
    width: 100%
    height: 100%
</style>
