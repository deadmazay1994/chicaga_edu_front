<template>
  <div
    class="task-navigation-button vue-component"
    @click="$emit('moveToGroup')"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "task-navigation-button",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
.task-navigation-button
  position: relative
  display: flex
  align-items: center
  justify-content: center
  width: 28px
  height: 28px
  font-weight: 600
  font-size: 20px
  line-height: 24px
  background-color: #DCDCDC
  border-radius: 5px
  cursor: pointer
  overflow: hidden

  &--success
    background-color: #D4FFB2

  &--error
    background-color: #FEA795

  &--active
    color: #FFFFFF
    background-color: #000000

  &--result
    background-color: rgba(#FF0000, 0.5)
    background-image: linear-gradient(180deg, #FF6440 0%, #CC2D23 100%)
    border: 1px solid rgba(#FFFFFF, 0.5)
    background-origin: border-box
    &::before,
    &::after
      content: ""
      position: absolute
      top: -1px
      right: -1px
      bottom: -1px
      left: -1px
      background-position: center
      background-repeat: no-repeat
    &::before
      background-color: rgba(#FF0000, 0.5)
      background-image: linear-gradient(180deg, #FF6440 0%, #CC2D23 100%)
      background-size: 100%
    &::after
      display: flex
      align-items: center
      justify-content: center
      background-image: url("data:image/svg+xml,%3Csvg width='18' height='16' viewBox='0 0 18 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M17.124 6.09784C17.0165 5.76711 16.7232 5.53295 16.3775 5.50168L11.6625 5.07362L9.79914 0.711081C9.66156 0.39057 9.34853 0.183708 9.0001 0.183708C8.65167 0.183708 8.33852 0.39057 8.20181 0.711081L6.33843 5.07362L1.62273 5.50168C1.27705 5.53358 0.984324 5.76773 0.876158 6.09784C0.768614 6.42857 0.867933 6.79132 1.12938 7.02061L4.69351 10.1458L3.64262 14.7743C3.56574 15.1146 3.69783 15.4666 3.98021 15.6707C4.13199 15.781 4.31032 15.836 4.48926 15.836C4.64304 15.836 4.79694 15.7952 4.93439 15.7129L9.0001 13.2819L13.0651 15.7129C13.3633 15.8911 13.7382 15.8748 14.02 15.6707C14.3024 15.4666 14.4345 15.1146 14.3576 14.7743L13.3067 10.1458L16.8708 7.02061C17.1321 6.79132 17.2316 6.42931 17.124 6.09784V6.09784Z' fill='white'/%3E%3C/svg%3E%0A")
      background-size: 18px 16px
</style>
