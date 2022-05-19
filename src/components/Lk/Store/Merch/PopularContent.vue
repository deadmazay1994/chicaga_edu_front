<template>
  <div class="popular__content active">
    <popular-item
      v-for="(item, index) in popularItems"
      :key="index"
      :itemImg="item.src"
      :itemTitle="item.title"
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
          title: "Стакан бумажный CHICAGA",
          src: require("@/assets/imgs/shop/merch/cup.png")
        },
        {
          title: "Фирменный пакет CHICAGA",
          src: require("@/assets/imgs/shop/merch/package.png")
        },
        {
          title: "Шариковая ручка CHICAGA",
          src: require("@/assets/imgs/shop/merch/pen.png")
        }
      ]
    };
  },
  components: {
    PopularItem
  }
};
</script>

<style lang="sass" scoped></style>
