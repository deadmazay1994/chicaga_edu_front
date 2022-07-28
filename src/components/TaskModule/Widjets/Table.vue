<template>
  <div class="d-table vue-component">
    <div class="d-table__table">
      <div class="d-table__head">
        <div
          class="d-table__title"
          :class="tableTitleState(column.state)"
          v-for="(column, index) in tableColumns"
          :key="index"
          style="width: 25%"
          @click="clickColumn(index)"
        >
          {{ column.name }}
        </div>
      </div>
      <div class="d-table__body">
        <div
          class="d-table__field"
          :class="tableFieldState(column.state)"
          v-for="(column, index) in tableColumns"
          :key="index"
          style="width: 25%"
          @click="clickColumn(index)"
        >
          <slot v-bind:columnIndex="index"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Table",
  data: function() {
    return {};
  },
  methods: {
    clickColumn(index) {
      this.$emit("click", index);
    },
    tableTitleState(boolean) {
      return { "d-table__title--success": boolean };
    },
    tableFieldState(boolean) {
      return {
        "d-table__field--success": boolean,
        "d-table__field--error": boolean === false
      };
    }
  },
  computed: {},
  components: {},
  props: {
    tableColumns: {
      type: Array,
      default() {
        return [{ name: "First column" }, { name: "Second column" }];
      }
    }
  },
  mixins: {},
  beforeMount() {},
  mounted() {}
};
</script>

<style scoped="scoped" lang="sass">
.d-table
  width: 100%
  &__table
    width: 100%
    display: flex
    flex-direction: column
    min-height: 240px
    font-weight: 500
    font-size: 16px
    line-height: 20px
    word-wrap: break-word
  &__head
    display: flex
    align-items: center
    width: 100%
    text-align: center
    color: #303030
    background: linear-gradient(180deg, #fff4f7 0%, #fcdbe3 100%)
    border-top-right-radius: 10px
    border-top-left-radius: 10px
    overflow: hidden
  &__title
    flex-grow: 1
    padding: 10px
    &--success
      background-color: rgba(142, 220, 81, 1)
  &__body
    display: flex
    flex-grow: 1
    width: 100%
    min-height: 200px
    background-color: #ffffff
    border: 1px solid #e8e8e8
    border-bottom-right-radius: 10px
    border-bottom-left-radius: 10px
  &__field
    flex-grow: 1
    &--success
      background-color: rgba(142, 220, 81, .35)
    &--error
      background-color: rgba(233, 74, 69, .35)
    &--column
      display: flex
      flex-direction: column
      align-items: center
      gap: 8px
  &__field:not(:last-child)
    border-right: 2px solid #e8e8e8
</style>
