<template>
  <div
    class="settings-aside vue-component"
    :class="{ 'settings-aside--standart': tariff == 'standart' }"
  >
    <div class="settings-aside__avatar-box"></div>
    <div class="settings-aside__tariff-box">
      <span class="settings-aside__tariff-text">
        Standart
      </span>
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
  props: {
    tariff: {
      type: String,
      default: "basic"
    }
  },
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
  &--standart &__avatar-box
    border: 2px solid #ff9999
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
  &--standart &__tariff-box
    display: flex
    align-items: center
    justify-content: center
    color: #ffffff
    background-color: #ff9999
  &--standart &__tariff-box::before,
  &--standart &__tariff-box::after
    content: ""
    display: inline-block
    width: 36px
    height: 22px
    background-image: url("data:image/svg+xml,%3Csvg width='37' height='22' viewBox='0 0 37 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M25.6832 11.7535C20.0239 11.2557 14.6325 10.3039 9.27946 8.83117C3.92406 7.35757 0.475216 4.96039 0.00195312 -0.000244141C0.711815 0.124548 4.30108 2.16474 5.58184 2.72326C9.60419 4.47776 13.6342 6.06869 18.1243 7.20873C19.3877 7.52945 23.8437 8.46362 25.0942 8.71072C25.1351 9.74584 25.3349 10.7621 25.6832 11.7535ZM29.1057 21.6132C31.2749 21.4774 32.9375 21.2448 34.1696 20.9342C34.7566 21.2908 35.3676 21.637 36.002 21.9729C33.7968 22.0232 31.3106 22.0486 29.1057 21.6132ZM33.3074 20.3933C31.6665 21.1347 26.9974 21.0406 25.0968 20.9618C22.7907 20.8664 18.7375 20.1618 16.8003 19.2208C20.4283 19.635 27.1671 18.9291 30.8231 18.6422C30.8535 18.6475 30.9046 18.6674 30.9715 18.6994C31.6926 19.284 32.4723 19.8494 33.3074 20.3933ZM30.1997 18.0447C29.1239 18.1977 28.0059 18.3013 26.8808 18.3996C19.7493 18.9112 15.0789 19.3881 8.84611 15.7163C8.05166 15.2484 6.49271 14.0132 6.0532 13.5534C14.7479 15.7285 19.8902 15.5071 27.8788 15.6757C27.9786 15.7812 28.0775 15.8838 28.1753 15.984C28.7719 16.6919 29.4485 17.3798 30.1997 18.0447ZM27.5177 15.1528C21.5454 14.9886 9.5042 15.3098 5.03972 11.4682C3.64373 10.2674 1.61604 8.25732 1.18934 6.65044C4.31842 8.15967 7.60718 9.144 12.959 10.316C15.0266 10.7688 17.1512 11.2093 19.2364 11.508C23.3131 12.092 25.0384 12.1461 25.8732 12.2558C26.2759 13.2497 26.8278 14.2174 27.5177 15.1528Z' fill='white'/%3E%3C/svg%3E%0A")
    background-position: center
    background-size: contain
    background-repeat: no-repeat
  &--standart &__tariff-box::after
    transform: scaleX(-1)
  &--standart &__tariff-text
    padding-right: 24px
    padding-left: 24px
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
