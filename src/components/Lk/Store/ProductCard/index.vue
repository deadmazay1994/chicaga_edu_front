<template>
  <div class="product-card vue-component">
    <div class="product-card__inner">
      <div class="product-card__title">{{ productInfo.title }}</div>
      <div class="product-card__main">
        <ProductSwiper :productImages="productInfo.images" />
        <div class="product-card__content-side">
          <div class="product-card__price-box">
            <div class="product-card__coin">
              <animated-coin-png ref="animatedCoin" />
            </div>
            <span class="product-card__price">{{ productInfo.price }} т.</span>
          </div>

          <div class="product-card__desc-box">
            <div class="product-card__desc">
              {{ productInfo.description }}
            </div>

            <div class="product-card__desc">
              <span class="product-card__desc-caption">Состав:</span>
              <span class="product-card__desc-composition">
                <span
                  v-for="(composition, index) in productInfo.composition"
                  :key="index"
                  >{{ composition }}</span
                >
              </span>
            </div>

            <div class="product-card__desc">
              <span class="product-card__desc-caption">Цвет:</span>
              <span>{{ activeColor.title }}</span>
              <div class="product-card__desc-vars">
                <product-colors
                  v-if="colors"
                  :colorsArray="colors"
                  @changeColor="changeColor"
                />
              </div>
            </div>

            <div class="product-card__desc">
              <span class="product-card__desc-caption">Таблица размеров:</span>
              <div class="product-card__desc-vars">
                <product-sizes
                  :productSizesArray="sizes"
                  @changeSize="changeSize"
                />
              </div>
            </div>
          </div>

          <c-btn
            btnClass="product-card__red-btn"
            :disabled="false"
            @click="pushItemToBasket()"
          >
            Добавить в корзину
          </c-btn>

          <div class="product-card__footer">
            <product-additions />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import AnimatedCoinPng from "@/components/Icons/AnimatedCoinPng";
import CBtn from "@/components/UiElements/C-btn.vue";
import ProductAdditions from "./ProductAdditions";
import ProductColors from "./ProductColors";
import ProductSizes from "./ProductSizes";
import ProductSwiper from "./ProductSwiper.vue";

export default {
  name: "product-card",
  data: function() {
    return {
      colors: undefined,
      activeColor: undefined,
      sizes: undefined,
      activeSize: undefined
    };
  },
  methods: {
    ...mapActions(["requestPushItemToBasket"]),
    pushItemToBasket() {
      let item = {
        id: this.productInfo.id,
        title: this.productInfo.title,
        src: this.productInfo.images[0],
        price: this.productInfo.price,
        count: 1,
        color: this.activeColor.title,
        size: this.activeSize.title.toUpperCase()
      };
      this.requestPushItemToBasket(item);
      this.$store.commit("pushShuckbar", {
        success: true,
        val: "Товар добавлен в корзину"
      });
      this.$store.commit("toggleShopModale");
    },
    changeColor(index) {
      this.colors.map(color => (color.active = false));
      this.colors[index].active = true;
      this.activeColor = this.colors[index];
    },
    changeSize(index) {
      this.sizes.map(size => (size.active = false));
      this.sizes[index].active = true;
      this.activeSize = this.sizes[index];
    },
    setColors() {
      this.colors = this.productInfo.colors.map((color, i) => ({
        title: color.title,
        color: color.color,
        active: i === 0
      }));
      this.activeColor = this.colors.find(color => color.active);
    },
    setSizes() {
      this.sizes = this.productInfo.sizes.map((size, i) => ({
        title: size,
        active: i === 0
      }));
      this.activeSize = this.sizes.find(size => size.active);
    }
  },
  computed: {
    ...mapGetters(["getShopModalData"])
  },
  components: {
    AnimatedCoinPng,
    CBtn,
    ProductAdditions,
    ProductColors,
    ProductSizes,
    ProductSwiper
  },
  props: {
    productInfo: Object
  },
  mixins: {},
  beforeMount() {},
  mounted() {
    this.setColors();
    this.setSizes();
  }
};
</script>

<style scoped="scoped" lang="scss">
@import "@/assets/styles/variables.sass";

.product-card {
  position: relative;
  max-width: 610px;

  max-height: 100%;
  margin-right: auto;
  margin-left: auto;
  padding: 25px;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.2;
  border-radius: 15px;
  background-color: $white;
  box-shadow: 0 4px 20px rgba(128, 128, 128, 0.2);
  overflow-y: auto;

  &__inner {
    display: flex;
    flex-direction: column;
    width: 100%;

    @media ($media_sm) {
      box-shadow: 0;
      border-radius: 0;
    }
  }

  &__title {
    max-width: 400px;
    min-height: calc(1em * 1.2);
    margin-right: 44px;
    margin-bottom: 35px;
    font-weight: 600;
    font-size: 20px;
    line-height: 1.2;
    text-align: start;
  }

  &__main {
    display: flex;

    @media ($media_sm) {
      flex-direction: column;
    }
  }

  &__img-side {
    flex-basis: 252px;
    flex-grow: 0;
    margin-right: 50px;
    padding-top: 24px;

    @media ($media_sm) {
      margin-right: 0;
      margin-bottom: 30px;
    }
  }

  &__img-inner {
    width: 202px;
    height: 313px;
    margin-bottom: 30px;

    @media ($media_sm) {
      margin-right: auto;
      margin-left: auto;
    }
  }

  &__img-inner img {
    width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  &__dots {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    z-index: 2;
  }

  &__dot {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    margin: 0;
    padding: 0;
    background-color: transparent;
    border: none;
    border-radius: 50%;
  }

  &__dot::before {
    content: "";
    width: 8px;
    height: 8px;
    background-color: $gray;
    border: 2px solid $gray;
    border-radius: inherit;
    transition-property: background-color, width, height, opacity;
    transition-duration: 0.3s;
  }

  &__dot--active::before {
    width: 14px;
    height: 14px;
    background-color: transparent;
  }

  &__dot:hover::before {
    opacity: 0.7;
  }

  &__content-side {
    flex-grow: 2;
  }

  &__price-box {
    margin-bottom: 35px;
    display: flex;
    align-items: center;
  }

  &__coin {
    min-width: 25px;
    min-height: 25px;
    margin-right: 10px;
  }

  &__price {
    font-weight: 600;
    font-size: 20px;
  }

  &__desc-box {
    margin-bottom: 35px;
  }

  &__desc:not(:last-child) {
    margin-bottom: 20px;
  }

  &__desc-caption {
    color: $gray;
    margin-right: 0.2em;
  }

  &__desc-composition {
    span + span {
      margin-left: 0.25rem;
    }
  }

  &__desc-vars {
    padding-top: 10px;
  }

  &__red-btn {
    margin-top: 0;
    margin-bottom: 35px;
    padding-top: 15px;
    padding-bottom: 15px;
    font-size: 14px;
  }
}
</style>
