<template>
  <div class="page-404 vue-component">
    <div class="page-404__content front relative">
      <div class="page-404__404">404</div>
      <div class="text-h3">Данная страница не найдена</div>
      <div class="text-h6">
        К сожалению запршиваемой страницы не существует <br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "page-404",
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
@import "@/assets/styles/variables.sass"

.page-404
  display: flex
  align-items: center
  justify-content: center
  padding: 10px
  text-align: center
  &__404
    font-size: 300px
    line-height: 1
    @media ($media_md)
      font-size: 150px
</style>
