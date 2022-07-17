<template>
  <div class="popular-content">
    <popular-item
      class="popular-content__item"
      v-for="(item, index) in popularItems"
      :key="index"
      :item="item"
    />
  </div>
</template>

<script>
import PopularItem from "./PopularItem.vue";

export default {
  name: "PopularContent",
  data() {
    return {
      popularItems: [
        {
          id: 4,
          title: "Cертификат OZON",
          image: require("@/assets/imgs/shop/merch/cards.png"),
          price: 800,
          alt: "Изображение сертификата OZON"
        },
        {
          id: 5,
          title: "Футболка CHICAGA",
          image: require("@/assets/imgs/shop/merch/t-shirts.png"),
          price: 2000,
          alt: "Изображение футболки CHICAGA"
        },
        {
          id: 6,
          title: "Дрип-кофе CHICAGA 8x25",
          image: require("@/assets/imgs/shop/merch/drips.png"),
          price: 500,
          alt: "Изображение кофе"
        }
      ]
    };
  },
  components: {
    PopularItem
  }
};
</script>

<style lang="sass" scoped>
.popular-content
  display: flex
  justify-content: space-between
  &__item
    flex-basis: 33.33%
  &__item:not(:last-child)
    margin-right: 10px
</style>
