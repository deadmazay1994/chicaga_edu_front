<template>
  <div class="tariff" :class="'tariff--' + tariffData.type">
    <div class="tariff__inner">
      <header class="tariff__header">
        <div class="tariff__title-box">
          <span class="tariff__title">
            {{ tariffData.title }}
          </span>
        </div>
      </header>
      <div class="tariff__body">
        <ul class="tariff__list">
          <li
            class="tariff__item"
            v-for="(item, i) in tariffData.info.list"
            :key="i"
          >
            {{ item.text }}
            <ul class="tariff__list-2" v-if="item.list">
              <li
                class="tariff__item-2"
                v-for="(subitem, j) in item.list"
                :key="j"
              >
                {{ subitem.text }}
              </li>
            </ul>
          </li>
        </ul>
        <div v-if="tariffData.info.basic_attention" class="tariff__attention">
          {{ tariffData.info.basic_attention }}
        </div>
        <div v-if="tariffData.info.places" class="tariff__places">
          Осталось {{ tariffData.info.places }} мест{{ endingOfString }}
        </div>
      </div>
    </div>
    <price-card
      class="tariff__price-card"
      v-for="(price, index) in tariffData.prices"
      :key="index"
      :price="price"
      :trait="tariffData.type"
    ></price-card>
  </div>
</template>

<script>
import PriceCard from "./TariffPrice.vue";
export default {
  name: "",
  data: function() {
    return {};
  },
  methods: {},
  computed: {
    endingOfString() {
      const lastNumber = this.tariffData.info.places % 10;
      const lastTwoNumbers = this.tariffData.info.places % 100;
      if (lastNumber == 1 && lastTwoNumbers != 11) {
        return "о";
      } else if (lastNumber > 1 && lastNumber < 5) {
        return "а";
      } else return "";
    }
  },
  props: {
    tariffData: Object
  },
  components: {
    PriceCard
  },
  beforeMount() {}
};
</script>

<style lang="sass" scoped>
.tariff
  display: flex
  flex-direction: column
  &__inner
    flex-grow: 1
    background-color: #ffffff
    border-radius: 12px
    box-shadow: 0 4px 20px rgba(128, 128, 128, 0.2)
    overflow: hidden
  &__header
    padding: 30px 40px 20px
    background-color: #ffffff
    border-bottom: 1px solid #dcdcdc
  &--standart &__header
    background-image: linear-gradient(96deg, rgba(79, 79, 79, 0.5) 1%, rgba(111, 111, 111, 0.5) 10%, rgba(177, 177, 177, 0.5) 30%, rgba(111, 111, 111, 0.5) 45%, rgba(111, 111, 111, 0.5) 64%, rgba(177, 177, 177, 0.5) 82%, rgba(79, 79, 79, 0.5) 99%)
  &--premium &__header
    background-image: linear-gradient(96deg, rgba(255, 120, 22, 0.5) 1%, rgba(255, 160, 72, 0.5) 10%, rgba(255, 187, 126, 0.5) 30%, rgba(255, 160, 72, 0.5) 45%, rgba(255, 160, 72, 0.5) 64%, rgba(255, 187, 126, 0.5) 82%, rgba(255, 120, 22, 0.5) 99%)
  &__title-box
    font-weight: 800
    font-size: 32px
    line-height: 1.5
    text-align: center
    text-transform: uppercase
  &__body
    padding: 24px 32px
    font-size: 16px
    line-height: 1.5
  &__list
    list-style-type: none
  &__list:not(:last-child)
    margin-bottom: 16px
  &__item
    position: relative
    display: block
    min-height: 24px
    padding-left: 30px
  &__item:not(:last-child)
    margin-bottom: 8px
  &__item--mb16:not(:last-child)
    margin-bottom: 16px
  &__item::before
    content: ""
    position: absolute
    top: 0
    left: 0
    width: 24px
    height: 24px
    background-image: url("~@/assets/imgs/icons/star-1.svg")
    background-position: center
    background-size: contain
    background-repeat: no-repeat
  &--standart &__item::before
    background-image: url("~@/assets/imgs/icons/star-2.svg")
  &--premium &__item::before
    background-image: url("~@/assets/imgs/icons/star-3.svg")
  &__list-2
    padding-left: 26px
    list-style-type: disc
  &__attention
    padding-top: 16px
    padding-left: 32px
    font-weight: 700
    background-image: url("~@/assets/imgs/icons/attention.svg")
    background-position: left top 16px
    background-size: 24px 24px
    background-repeat: no-repeat
  &__places
    font-weight: 700
    font-size: 20px
    text-align: center
    padding-top: 16px
    padding-bottom: 16px
  a
    color: #487ef3
  &__price-card
    margin-top: -8px
</style>
