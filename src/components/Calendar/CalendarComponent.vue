<template>
  <div class="calendar-component">
    <div class="swiper-date">
      <swiper-arrow :left="true" @clickElem="prev" />
      <swiper
        :options="swiperDateOption"
        ref="swiperDate"
        class="swiper"
        :slides-per-view="1"
      >
        <swiper-slide
          class="swiper-no-swiping"
          v-for="(item, index) in allMonths"
          :key="index"
        >
          <span class="date-item">{{ item.name }} 2022</span>
        </swiper-slide>
      </swiper>
      <swiper-arrow :right="true" @clickElem="next" />
    </div>
    <swiper class="swiper-grid" :options="swiperGridOption" ref="swiperGrid">
      <swiper-slide
        class="swiper-no-swiping"
        v-for="(item, index) in allMonths"
        :key="index"
      >
        <calendar-grid
          :days="eventArr(item.number, 2022)"
          :currentDateObj="currentDateObj"
          :currMonth="item.number"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper/src";
import "swiper/swiper-bundle.min.css";
import moment from "moment";

import CalendarGrid from "./CalendarGrid.vue";
import SwiperArrow from "@/components/Icons/SwiperArrow";

import api from "@/mixins/api";

export default {
  name: "CalendarComponent",
  components: {
    CalendarGrid,
    swiper,
    swiperSlide,
    SwiperArrow
  },
  data() {
    return {
      swiperGridOption: {
        spaceBetween: 100,
        noSwiping: true
      },
      swiperDateOption: {
        noSwiping: true
      },
      events: []
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
    allMonths() {
      let arr = [];
      for (let i = 0; i < 12; i++) {
        let month = moment()
          .month(i)
          .locale("ru")
          .format("MMMM");
        arr.push({
          name: month.charAt(0).toUpperCase() + month.slice(1),
          number: moment()
            .month(i)
            .month()
        });
      }
      return arr;
    }
  },
  methods: {
    setEvents() {
      api.methods.getWebinarEvents().map(element => {
        this.events.push(element);
      });
    },
    eventArr(item, year) {
      let arr = this.getDateArr(item, year);
      arr.forEach(item => {
        this.events.forEach(element => {
          if (
            moment.unix(element.date).date() === item.day &&
            moment.unix(element.date).month() === item.month
          ) {
            item.state = element.subscribed;
          }
        });
      });
      return arr;
    },
    getDateArr(month, year) {
      let arr = [];
      this.getDate(month, year).map(element => {
        element.days.map(element => {
          arr.push({
            // Передаем данные в ячейки здесь
            month: element.month(),
            day: element.date()
            // comingSoon:
            //   element.date() === 27 && element.month() == 2 ? true : false,
            // enroled:
            //   element.date() === 23 && element.month() == 2 ? true : false,
            // nonEnroled:
            //   element.date() === 24 && element.month() == 2 ? true : false
          });
        });
      });
      return arr;
    },
    getDate(month, year) {
      const startWeek = moment()
        .year(year)
        .month(month)
        .startOf("month")
        .week();
      const endWeek = moment()
        .year(year)
        .month(month)
        .endOf("month")
        .week();

      let calendar = [];
      for (let week = startWeek; week <= endWeek; week++) {
        calendar.push({
          week: week,
          days: Array(7)
            .fill(0)
            .map((_, i) => {
              let day = moment()
                .week(week)
                .startOf("week")
                .clone()
                .add(i + 1, "day");
              return day;
            })
        });
      }

      return calendar;
    },
    getCurrentMonth(offset) {
      let currMonth = moment().month();
      return moment()
        .month(currMonth + offset)
        .locale("ru")
        .format("MMMM");
    },
    prev() {
      console.log(this.$refs.swiper);
      this.$refs.swiperDate.swiper.slidePrev();
      this.$refs.swiperGrid.swiper.slidePrev();
    },
    next() {
      this.$refs.swiperDate.swiper.slideNext();
      this.$refs.swiperGrid.swiper.slideNext();
    }
  },
  mounted() {
    this.$refs.swiperDate.swiper.slideTo(
      this.currentDateObj.month,
      false,
      false
    );
    this.$refs.swiperGrid.swiper.slideTo(
      this.currentDateObj.month,
      false,
      false
    );
    this.setEvents();
  }
};
</script>

<style lang="sass">
.swiper-date
  display: flex
  align-items: center
  justify-content: center
  width: 200px
  .swiper-slide
    width: 100% !important
    display: flex
    align-items: center
    justify-content: center
    font-size: 24px
    font-style: normal
    font-weight: 900
    line-height: 29px
    color: #A22B21
    user-select: none

.swiper-button-next:after,
.swiper-button-prev:after
  content: none !important

.swiper-grid
  .swiper-slide
    width: 100% !important
</style>
