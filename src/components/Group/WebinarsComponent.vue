<template>
  <div class="webinars-component">
    <calendar-component :title="'ВЕБИНАРЫ'" />
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
</style>