<template>
  <div class="merch__categories">
    <button class="categories__item active">Популярные</button>
    <button class="categories__item">Худи</button>
    <button class="categories__item">Канцелярия</button>
    <button class="categories__item">Стикеры</button>
  </div>
</template>

<script>
export default {
  name: "MerchCategories"
};
</script>

<style lang="sass" scoped>
@import "@/assets/styles/variables.sass"

.merch__categories
  display: none
  align-items: center
  padding: 0 0 0 35px
  max-width: 100vw
  height: 35px
  overflow-x: auto

  &--promotion
    margin-bottom: 20px

  @media($media_md2)
    display: flex
</style>
