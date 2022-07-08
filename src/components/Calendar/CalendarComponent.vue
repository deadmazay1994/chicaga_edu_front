<template>
  <InterlayerVue class="calendar-interlayer" :title="'Вебинары'">
    <div class="calendar">
      <div class="calendar__inner">
        <div class="calendar__header">
          <div class="calendar__date">
            <div class="calendar__date-inner">
              <swiper
                class="calendar__date-swiper"
                :options="swiperDateOption"
                ref="swiperDate"
                :slides-per-view="1"
              >
                <swiper-slide v-for="(item, index) in allMonths" :key="index">
                  <span class="date">{{ item.name + " " + item.year }}</span>
                </swiper-slide>
              </swiper>
            </div>
            <div class="calendar__date-arrows">
              <swiper-arrow
                class="calendar__date-arrow"
                :left="true"
                @clickElem="prev"
              />
              <swiper-arrow
                class="calendar__date-arrow"
                :right="true"
                @clickElem="next"
              />
            </div>
          </div>
        </div>
        <div class="calendar__body">
          <swiper
            class="calendar__body-swiper"
            :options="swiperGridOption"
            ref="swiperGrid"
          >
            <swiper-slide v-for="(item, index) in allMonths" :key="index">
              <calendar-grid
                :days="eventArr(item.number, item.year)"
                :currentDateObj="currentDateObj"
                :currMonth="item.number"
                :currYear="item.year"
              />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </InterlayerVue>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper/src";
import "swiper/swiper-bundle.min.css";
import moment from "moment";

import CalendarGrid from "./CalendarGrid.vue";
import SwiperArrow from "@/components/Icons/SwiperArrow";
import InterlayerVue from "../Interlayer.vue";

import api from "@/mixins/api";

export default {
  name: "CalendarComponent",
  components: {
    CalendarGrid,
    swiper,
    swiperSlide,
    SwiperArrow,
    InterlayerVue
  },
  data() {
    return {
      swiperGridOption: {
        spaceBetween: 48,
        noSwipingClass: "swiper-slide",
        loop: false
      },
      swiperDateOption: {
        spaceBetween: 24,
        noSwipingClass: "swiper-slide",
        loop: false
      },
      events: []
    };
  },
  props: {
    title: String
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
      let currYear = moment().year();
      let years = [currYear - 1, currYear, currYear + 1];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 12; j++) {
          let month = moment()
            .month(j)
            .locale("en")
            .format("MMMM");
          arr.push({
            name: month,
            number: moment()
              .month(j)
              .month(),
            year: years[i]
          });
        }
      }
      return arr;
    }
  },
  methods: {
    returnDuplicates(arr) {
      const uniq = arr
        .map(item => {
          return { count: 1, item: item.date_time };
        })
        .reduce((acc, curr) => {
          acc[curr.item] = (acc[curr.item] || 0) + curr.count;
          return acc;
        });

      const duplicates = Object.keys(uniq).filter(a => uniq[a] > 1);
      let result = arr.filter(item => item.date_time == duplicates);
      return result;
    },
    async setEvents() {
      let webinarsResponse = await api.methods.getWebinarEvents();
      let duplicatedDates = this.returnDuplicates(webinarsResponse);
      webinarsResponse.forEach(element => {
        let obj = {
          title: element.title,
          subtitle: element.subtitle,
          poster: element.poster,
          price: element.price,
          responsible: "",
          date: +new Date(element.date_time) / 1000,
          subscribed: element.subscribed,
          id: element.id,
          lessonUid: element.lesson_uid
        };
        if (element.date_time == duplicatedDates[0]?.date_time) {
          obj.subEvents = duplicatedDates;
        } else {
          obj.setEvents = undefined;
        }
        this.events.push(obj);
      });
    },
    eventArr(item, year) {
      let arr = this.getDateArr(item, year);
      arr.forEach(item => {
        this.events.forEach(element => {
          if (
            moment.unix(element.date).date() === item.day &&
            moment.unix(element.date).month() === item.month &&
            moment.unix(element.date).year() === item.year
          ) {
            let subEvents = undefined;
            if (element.subEvents)
              subEvents = element.subEvents.filter(
                item => item.title != element.title
              );
            item.subscribed = element.subscribed;
            item.event = true;
            item.title = element.title;
            item.subtitle = element.subtitle;
            item.subEvents = subEvents;
            item.price = element.price;
            item.id = element.id;
            item.lessonUid = element.lessonUid;
            item.date = element.date;
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
            month: element.month(),
            day: element.date(),
            year: element.year()
          });
        });
      });
      return arr;
    },
    getDate(month, year) {
      let calendar = [];

      const today = moment()
        .year(year)
        .month(month);
      const startDay = today
        .clone()
        .startOf("month")
        .startOf("isoWeek");
      const endDay = today
        .clone()
        .endOf("month")
        .endOf("isoWeek");

      let date = startDay.clone().subtract(1, "day");

      while (date.isBefore(endDay, "day")) {
        calendar.push({
          days: Array(7)
            .fill(0)
            .map(() => date.add(1, "day").clone())
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
      this.$refs.swiperDate.swiper.slidePrev();
      this.$refs.swiperGrid.swiper.slidePrev();
    },
    next() {
      this.$refs.swiperDate.swiper.slideNext();
      this.$refs.swiperGrid.swiper.slideNext();
    },
    setCurrentMonth() {
      let currYear = this.currentDateObj.year;
      let currMonth = this.currentDateObj.month;
      let currGridIndex = this.allMonths.findIndex(element => {
        return element.year == currYear && element.number == currMonth;
      });
      this.$refs.swiperDate.swiper.slideTo(currGridIndex, false, false);
      this.$refs.swiperGrid.swiper.slideTo(currGridIndex, false, false);
    }
  },
  mounted() {
    this.setCurrentMonth();
    this.setEvents();
  }
};
</script>

<style lang="sass" scoped>
$header-height: 32px
.calendar-interlayer
  width: 100%
  height: 100%
.calendar
  &__inner
    width: 100%
    height: 100%
    padding-top: 32px
  &__header
    height: $header-height
    padding-right: 24px
  &__date
    display: flex
    align-items: center
    font-weight: 700
    font-size: 24px
    line-height: 32px
    color: #323232
  &__date-inner
    width: calc( 210px + 24px )
  &__date-swiper
    .swiper-slide
      display: flex
      user-select: none
    .date
      padding-left: 24px
  &__date-arrows
    display: flex
  &__date-arrow
    width: 30px
    height: 30px
    border: 1px solid #ff0000
    border-radius: 50%
  &__date-arrow:not(:last-child)
    margin-right: 32px
  &__body
    width: 100%
    height: calc( 100% - #{$header-height} )
    padding-top: 14px
    overflow: hidden
  &__body-swiper
    width: 100%
    height: 100%
    .swiper-slide
      overflow: auto
    .calendar-grid
      min-width: 1088px
</style>
