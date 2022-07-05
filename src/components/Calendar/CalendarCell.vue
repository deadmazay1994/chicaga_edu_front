<template>
  <div
    class="calendar-cell"
    :class="[
      { 'calendar-cell--past': item.month !== currMonth },
      itemState(item)
    ]"
    @click="item.subscribed ? toEventPage() : openModal()"
  >
    <div class="calendar-cell__header">
      <div
        class="calendar-cell__date"
        :class="{
          'calendar-cell__date--current':
            item.day == currentDateObj.day &&
            item.year == currentDateObj.year &&
            item.month == currentDateObj.month
        }"
      >
        {{ item.day }}
      </div>
      <schevron-svg
        class="calendar-cell__schevron"
        :on="showDropDown"
        @clickElem="toggleDropDown"
      />
      <lock-svg :show="item.subscribed" v-if="item.event && !item.subEvents" />
    </div>
    <div class="calendar-cell__body">
      <div class="calendar-cell__title">
        {{ item.title }}
      </div>
      <div class="calendar-cell__desc">
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
      this.$router.push({
        name: "upcoming-webinar",
        params: {
          id: this.item.lessonUid,
          code: this.item.id,
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
$line-height: 1.3
$line-clamp: 3
.calendar-cell
  position: relative
  display: flex
  flex-direction: column
  line-height: $line-height
  color: #323232
  background-color: #ffffff
  border-radius: 10px
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.1)
  cursor: pointer
  &--past
    color: #808080
  &--many-events
    background-image: radial-gradient(50% 76% at 50% 47%, #ffffff 0%, #f7f7ff 100%)
  &--enroled
    background-image: radial-gradient(50% 76% at 50% 47%, #ffffff 0%, #fcffec 100%)
  &--non-enroled
    background-image: radial-gradient(50% 76% at 50% 47%, #ffffff 0%, #ffeded 100%)
  &__header
    display: flex
    align-items: center
    justify-content: space-between
    padding-top: 6px
    padding-right: 14px
    padding-left: 14px
    border-bottom: 1px solid #d9d9d9
  &__date
    width: 40px
    margin-right: 10px
    font-weight: 800
    font-size: 24px
    text-overflow: ellipsis
    white-space: nowrap
    color: #363636
    overflow: hidden
  &__date--current
    color: #ff0000
  &--past &__date
    color: #c4c4c4
  &__body
    padding: 4px 14px 9px
  &__title,
  &__desc
    -webkit-line-clamp: $line-clamp
    display: -webkit-box
    -webkit-box-orient: vertical
    text-overflow: ellipsis
    overflow: hidden
    user-select: none
  &__title
    height: calc( 16px * #{$line-height} * #{$line-clamp} )
    font-weight: 600
    font-size: 16px
  &__desc
    height: calc( 12px * #{$line-height} * #{$line-clamp} )
    font-weight: 300
    font-size: 12px


  .slide-enter
    transform: translatex(-170px)
    opacity: 0

  .slide-enter-active,
  .slide-leave-active
    transition: all .2s ease-in-out

  .slide-enter-from,
  .slide-leave-to
    transform: translatex(-129px)
    opacity: 0
</style>
