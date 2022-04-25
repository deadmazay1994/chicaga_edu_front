<template>
  <div
    class="calendar-cell"
    :class="[
      { 'calendar-cell--past': item.month !== currMonth },
      itemState(item)
    ]"
    @click="item.subscribed ? toEventPage() : openModal()"
  >
    <div class="cell-head">
      <span
        class="cell-head__date"
        :class="{
          'cell-head__date--current':
            item.day == currentDateObj.day &&
            item.year == currentDateObj.year &&
            item.month == currentDateObj.month
        }"
      >
        {{ item.day }}
      </span>
      <schevron-svg
        :on="showDropDown"
        v-if="item.subEvents"
        @clickElem="toggleDropDown"
      />
      <lock-svg :show="item.subscribed" v-if="item.event && !item.subEvents" />
    </div>
    <div class="cell-body">
      <div class="cell-body__title">
        {{ item.title }}
      </div>
      <div class="cell-body__desc">
        {{ item.subtitle }}
      </div>
    </div>
    <transition name="slide">
      <calendar-dropdown
        :class="itemState(item)"
        v-if="showDropDown"
        :events="item.subEvents"
      />
    </transition>
  </div>
</template>

<script>
import LockSvg from "@/components/Icons/LockSvg";
import SchevronSvg from "@/components/Icons/SchevronSvg";
import CalendarDropdown from "./CalendarDropdown.vue";

import { mapMutations } from "vuex";

export default {
  name: "CalendarCell",
  components: {
    LockSvg,
    SchevronSvg,
    CalendarDropdown
  },
  data() {
    return {
      showDropDown: false
    };
  },
  props: {
    item: Object,
    currentDateObj: Object,
    currMonth: Number,
    currYear: Number
  },
  computed: {
    hasSubEvents() {
      return !!this.item.subEvents;
    }
  },
  methods: {
    ...mapMutations(["toggleModale", "setEventData"]),
    itemState(item) {
      return {
        "calendar-cell--enroled": item?.subscribed === true && !item.subEvents,
        "calendar-cell--non-enroled":
          item?.subscribed === false && !!item.subEvents,
        "calendar-cell--many-events": item.subEvents
      };
    },
    toggleDropDown() {
      this.showDropDown = !this.showDropDown;
    },
    toEventPage() {
      // TODO
      // Вывести предупреждение пользователю, если он не зарегистрирован
      if (!this.item?.subscribed) return;
      // TODO
      // Сделать возможность указывать название роута за пределами календаря
      console.log(this.item);
      this.$router.push({
        name: "upcoming-webinar",
        params: {
          id: this.item.lessonUid,
          // Если необходимо будет проводить несколько вебинаров в одно время, то тут надо будет передавать код данного вебинара
          code: "webinar",
          startTime: this.item.date * 1000
        }
      });
    },
    openModal() {
      if (!this.item.event || this.hasSubEvents) return;
      this.setEventData({ item: this.item });
      this.toggleModale();
    }
  }
};
</script>

<style lang="sass" scoped>
.calendar-cell
  display: flex
  flex-direction: column
  border-radius: 10px
  padding: 12px 14px 15px
  background: linear-gradient(89.7deg, #F8F8F8 0.28%, #FFFFFF 99.76%)
  box-shadow: 4px 4px 20px 0px #0000001A
  height: 125px
  width: 154px
  position: relative
  font-family: sf-ui, sans-serif
  cursor: pointer

  .cell-head
    display: flex
    align-items: center
    justify-content: space-between

  .cell-head__date
    font-size: 24px
    font-style: normal
    font-weight: 800
    line-height: 29px
    letter-spacing: 0em
    text-align: left
    color: #363636
    &.cell-head__date--current
      color: red

  .cell-head__date,
  .cell-body__title,
  .cell-body__desc
    overflow: hidden
    text-overflow: ellipsis
    display: -webkit-box
    -webkit-line-clamp: 2
    -webkit-box-orient: vertical
    font-style: normal
    letter-spacing: 0
    color: #323232
    -moz-user-select: -moz-none
    -o-user-select: none
    -khtml-user-select: none
    -webkit-user-select: none
    user-select: none

  .cell-body__title
    font-size: 16px
    font-weight: 600
    font-style: normal
    font-size: 16px
    line-height: 19px
    height: 38px

  .cell-body__desc
    margin-top: 4px
    font-size: 12px
    font-weight: 200
    font-size: 12px
    font-style: normal
    line-height: 14px
    height: 28px

  .slide-enter
    transform: translateX(-170px)
    opacity: 0

  .slide-enter-active,
  .slide-leave-active
    transition: all .2s ease-in-out

  .slide-enter-from,
  .slide-leave-to
    transform: translateX(-129px)
    opacity: 0

  &.calendar-cell--past
    .cell-head__date,
    .cell-body__title,
    .cell-body__desc
      color: #C4C4C4

  &.calendar-cell--many-events
    background: linear-gradient(89.7deg, #E8E8FF 0.28%, #FFFFFF 99.76%), linear-gradient(89.7deg, #F8F8F8 0.28%, #FFFFFF 99.76%)
  &.calendar-cell--enroled
    background: linear-gradient(89.7deg, #F6FFC1 0.28%, #FFFFFF 99.76%), linear-gradient(89.7deg, #F8F8F8 0.28%, #FFFFFF 99.76%)
  &.calendar-cell--non-enroled
    background: linear-gradient(89.7deg, #FFE1E1 0.28%, #FFFFFF 99.76%), linear-gradient(89.7deg, #F8F8F8 0.28%, #FFFFFF 99.76%)
</style>
