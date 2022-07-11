<template>
  <div class="settings-aside vue-component">
    <div class="settings-aside__avatar-box"></div>
    <div class="settings-aside__tariff-box">
      Basic
    </div>
    <div class="settings-aside__name-box">
      Соловьева Ульяна
    </div>
    <div class="settings-aside__list">
      <div class="settings-aside__item">
        <svg class="settings-aside__item-icon" width="48" height="48">
          <use xlink:href="#school-monitor-big"></use>
        </svg>
        <span class="settings-aside__item-text">
          <span class="settings-aside__item-name">
            Elementary
          </span>
          <span class="settings-aside__item-desc">
            Текущий курс
          </span>
        </span>
      </div>
      <div class="settings-aside__item">
        <svg class="settings-aside__item-icon" width="48" height="48">
          <use xlink:href="#school-red-big"></use>
        </svg>
        <span class="settings-aside__item-text">
          <span class="settings-aside__item-name">
            0 / 32
          </span>
          <span class="settings-aside__item-desc">
            Пройдено уроков
          </span>
        </span>
      </div>
      <div class="settings-aside__item">
        <svg class="settings-aside__item-icon" width="48" height="48">
          <use xlink:href="#verified-big"></use>
        </svg>
        <span class="settings-aside__item-text">
          <span class="settings-aside__item-name">
            0 / 7
          </span>
          <span class="settings-aside__item-desc">
            Выполнено тестов
          </span>
        </span>
      </div>
      <div class="settings-aside__item">
        <svg class="settings-aside__item-icon" width="48" height="48">
          <use xlink:href="#supervised-user-circle-big"></use>
        </svg>
        <span class="settings-aside__item-text">
          <span class="settings-aside__item-name">
            0
          </span>
          <span class="settings-aside__item-desc">
            Участие в вебинарах
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "settings-aside",
  components: {},
  data: function() {
    return {};
  },
  props: [],
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="sass">
.settings-aside
  min-height: 100%
  padding: 32px
  background-image: url("data:image/svg+xml,%3Csvg width='245' height='127' viewBox='0 0 245 127' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M245 127L198.291 -1.78166e-05L131.326 127L245 127Z' fill='url(%23paint0_linear_2417_23180)' fill-opacity='0.2'/%3E%3Cpath d='M221.217 127L149.5 37.7567L0.5 127L221.217 127Z' fill='url(%23paint1_linear_2417_23180)' fill-opacity='0.2'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_2417_23180' x1='210.171' y1='126.986' x2='184.846' y2='14.9916' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FF121A'/%3E%3Cstop offset='1' stop-color='%23FAE3DE'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear_2417_23180' x1='138.025' y1='114.445' x2='201.847' y2='-5.60433' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FF121A'/%3E%3Cstop offset='1' stop-color='%23FFBAAD'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%0A")
  background-position: 100% 100%
  background-size: 245px 127px
  background-repeat: no-repeat
  &__avatar-box
    min-height: 260px
    margin-bottom: 4px
    background-color: #f8f8f8
    background-image: linear-gradient(135deg, #ffcace 0%, #d8eeff 100%)
    border-top-left-radius: 12px
    border-top-right-radius: 12px
  &__tariff-box
    min-height: 38px
    margin-bottom: 16px
    padding: 8px 16px
    font-weight: 700
    font-size: 16px
    text-align: center
    text-transform: uppercase
    background-color: #f8f8f8
    border-bottom-left-radius: 12px
    border-bottom-right-radius: 12px
  &__name-box
    margin-bottom: 60px
    font-weight: 600
    font-size: 20px
    text-align: center
    color: #0d0d0d
  &__item
    display: flex
    align-items: center
  &__item:not(:last-child)
    margin-bottom: 24px
  &__item-icon
    flex-shrink: 0
    margin-right: 8px
  &__item-text
    display: flex
    flex-direction: column
    flex-grow: 1
  &__item-name
    min-height: 27px
    font-weight: 700
    font-size: 20px
    line-height: 27px
    color: #323232
  &__item-desc
    font-weight: 500
    font-size: 12px
    color: #808080
</style>
