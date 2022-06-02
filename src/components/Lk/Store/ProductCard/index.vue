<template>
  <div class="product-card vue-component">
    <div class="product-card__inner">
      <div class="product-card__title">Худи Peach</div>
      <div class="product-card__main">
        <div class="product-card__img-side">
          <div class="product-card__img-container">
            <div class="product-card__img-inner">
              <img
                src="@/assets/imgs/shop/merch/hoodie-item.png"
                alt="hoodie"
              />
            </div>

            <div class="product-card__dots dots">
              <button class="dots__item dots__item--active"></button>
              <button class="dots__item"></button>
              <button class="dots__item"></button>
            </div>
          </div>
        </div>
        <div class="product-card__content-side">
          <div class="product-card__price-box">
            <div class="product-card__coin">
              <animated-coin-png ref="animatedCoin" />
            </div>

            <span class="product-card__price">1000 т.</span>
          </div>

          <div class="product-card__desc-box">
            <div class="product-card__desc">
              Подробное описание... Худи свободного кроя изготовлено из
              хлопка...
              <br />
              Модель с карманами, эластичными манжетами на рукавах и поясе
              дополнена застёжкой-молнией и капюшоном.
            </div>

            <div class="product-card__desc">
              <span class="product-card__desc-caption">Состав:</span>
              <span>хлопок 83%, полиэстер 17%</span>
            </div>

            <div class="product-card__desc">
              <span class="product-card__desc-caption">Цвет:</span>
              <span>Персиковый</span>
              <div class="product-card__desc-vars">
                <product-colors />
              </div>
            </div>

            <div class="product-card__desc">
              <span class="product-card__desc-caption">Таблица размеров:</span>
              <div class="product-card__desc-vars">
                <product-sizes />
              </div>
            </div>
          </div>

          <button class="cart__btn cart__btn--about">
            Добавить в корзину
          </button>

          <div class="product-card__footer">
            <button class="product-card__additional">
              <svg class="product-card__svg">
                <use xlink:href="#help"></use>
              </svg>
              <span>Помощь</span>
            </button>

            <button class="product-card__additional">
              <svg class="product-card__svg">
                <use xlink:href="#delivery"></use>
              </svg>
              <span>Доставка</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AnimatedCoinPng from "@/components/Icons/AnimatedCoinPng";
import ProductColors from "./ProductColors";
import ProductSizes from "./ProductSizes";

export default {
  name: "stand",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {
    AnimatedCoinPng,
    ProductColors,
    ProductSizes
  },
  props: [],
  mixins: {},
  beforeMount() {}
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

  &__desc-vars {
    padding-top: 10px;
  }

  &__footer {
    display: flex;
  }

  &__svg {
    width: 25px;
    height: 25px;
    margin-right: 10px;
  }

  &__additional {
    display: flex;
    align-items: center;
    color: gray;
  }

  &__additional:not(:last-child) {
    margin-right: 50px;
  }
}

.dots {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  z-index: 2;

  &__item {
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

  &__item::before {
    content: "";
    width: 8px;
    height: 8px;
    background-color: $gray;
    border: 2px solid $gray;
    border-radius: inherit;
    transition-property: background-color, width, height, opacity;
    transition-duration: 0.3s;
  }

  &__item--active::before {
    width: 14px;
    height: 14px;
    background-color: transparent;
  }

  &__item:hover::before {
    opacity: 0.7;
  }
}
</style>
