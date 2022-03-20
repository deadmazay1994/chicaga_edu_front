<template>
  <div class="calendar-component">
    <!-- <div v-for="(item, index) in weekDays(2, 2022)" :key="index">
      <div v-for="(item, index) in item.days" :key="index">
        {{ item }}
      </div>
    </div> -->
    {{ weekDays(2, 2022) }}
    {{ daysArr }}
    {{ currentDateObj }}
    <calendar-grid :days="daysArr" />
  </div>
</template>

<script>
// import SwiperClass, { Pagination } from "Swiper";
// import { swiper, swiperSlide } from "vue-awesome-swiper/src";
import "swiper/swiper.min.css";
import moment from "moment";

import CalendarGrid from "./CalendarGrid.vue";

export default {
  name: "CalendarComponent",
  data() {
    return {
      date: null
    };
  },
  computed: {
    currentDateObj() {
      return {
        day: moment().date(),
        month: moment().month(),
        year: moment().year(),
        startOfMonth: moment()
          .startOf("month")
          .date(),
        endOfMonth: moment()
          .endOf("month")
          .date()
      };
    },
    daysArr() {
      let arr = [];
      this.weekDays(2, 2022).forEach(element => {
        element.days.forEach(element => {
          arr.push({ day: element });
        });
      });
      return arr;
    }
  },
  methods: {
    weekDays(month, year) {
      const endDate = moment()
        .year(year)
        .month(month)
        .date(0); // 28
      return Array(endDate.date())
        .fill(0)
        .map((_, i) =>
          moment()
            .year(year)
            .month(month)
            .date(i + 1)
        )
        .map(day => ({ day, week: day.week(), month: day.month() }))
        .filter(
          ({ week }, i, arr) => arr.findIndex(info => info.week === week) === i
        )
        .map(({ day, week }) => ({
          week,
          days: Array(7)
            .fill(0)
            .map((_, i) =>
              moment(day)
                .week(week)
                .startOf("week")
                .add(i, "day")
                .format("DD")
            )
        }));
    }
  },
  components: {
    CalendarGrid
  },
  async beforeMount() {
    this.date = moment().calendar(null, {
      sameDay: "[Today]",
      nextDay: "[Tomorrow]",
      nextWeek: "dddd",
      lastDay: "[Yesterday]",
      lastWeek: "[Last] dddd",
      sameElse: "DD/MM/YYYY"
    });
  }
};
</script>

<style lang="sass">
</style>
