<template>
  <div class=' vue-component'>

    <div class="d-table">
      <div class="d-table__table">

        <div class="d-table__head">

          <div class="d-table__title">
            food
          </div>

          <div class="d-table__title">
            technology
          </div>

          <div class="d-table__title">
            sports
          </div>

          <div class="d-table__title">
            places
          </div>

        </div>

        <div class="d-table__body">

          <div class="d-table__field">
            gap
          </div>
          
          <div class="d-table__field">
            gap
          </div>

          <div class="d-table__field">
            gap
          </div>

          <div class="d-table__field">
            gap
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: '',
  data: function() {
    return {}
  },
  methods: {},
  computed: {},
  components: {},
  props: [],
  mixins: {},
  beforeMount() {}
}
</script>

<style scoped='scoped' lang='sass'>
.d-table
  width: 100%
  &__table
    display: flex
    flex-direction: column
    min-height: 240px
  &__head
    display: flex
    align-items: center
    max-width: 100%
    font-weight: 500
    font-size: 16px
    line-height: 20px
    text-align: center
    color: #303030
    background: linear-gradient(180deg, #fff4f7 0%, #fcdbe3 100%)
    border-top-right-radius: 10px
    border-top-left-radius: 10px
  &__title
    flex-grow: 1
    flex-basis: 100%
    padding: 10px
  &__body
    display: flex
    flex-grow: 1
    max-width: 100%
    min-height: 200px
    border: 1px solid #e8e8e8
    border-bottom-right-radius: 10px
    border-bottom-left-radius: 10px
  &__field
    flex-grow: 1
    flex-basis: 100%
    padding: 9px
  &__field:not(:last-child)
    border-right: 2px solid #e8e8e8
</style>
