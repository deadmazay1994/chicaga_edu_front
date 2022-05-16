<template>
  <div class="store-component">
    <div class="shop__content-inner merch__content active">
      <div class="merch__slider">
        <div class="merch-slider__item">
          <img
            class="shop__slide"
            src="@/assets/imgs/shop/merch/slide1.jpg"
            alt=""
          />

          <div class="slider__text">
            <h3 class="slider__subtitle">Прервись на кофе-брейк</h3>

            <div>
              <h2 class="slider__title">Бумажные стаканчики</h2>
              <br />
              <h2 class="slider__title">для кофе</h2>
            </div>

            <button class="slider__btn">Подробнее</button>
          </div>

          <div class="slider__dots">
            <div class="dots__item active"></div>
            <div class="dots__item"></div>
            <div class="dots__item"></div>
            <div class="dots__item"></div>
          </div>
        </div>
      </div>

      <div class="merch__categories">
        <button class="categories__item active">Популярные</button>
        <button class="categories__item">Худи</button>
        <button class="categories__item">Канцелярия</button>
        <button class="categories__item">Стикеры</button>
      </div>

      <div class="merch__block merch__popular">
        <h2 class="shop__title shop__title--merch mb20">Популярные товары</h2>

        <div class="popular__content active">
          <div class="merch__item popular__item">
            <div class="popular__item-text">
              <h3 class="popular__item-title">Стакан бумажный CHICAGA</h3>
              <p class="merch__item-price">
                <svg class="merch__svg">
                  <use xlink:href="#coin"></use>
                </svg>

                <span>1000 т.</span>
              </p>
            </div>

            <div class="popular__item-img">
              <img src="@/assets/imgs/shop/merch/cup.png" alt="" />
            </div>
          </div>

          <div class="merch__item popular__item">
            <div class="popular__item-text">
              <h3 class="popular__item-title">Фирменный пакет CHICAGA</h3>
              <p class="merch__item-price">
                <svg class="merch__svg">
                  <use xlink:href="#coin"></use>
                </svg>

                <span>1000 т.</span>
              </p>
            </div>

            <div class="popular__item-img">
              <img src="@/assets/imgs/shop/merch/package.png" alt="" />
            </div>
          </div>

          <div class="merch__item popular__item">
            <div class="popular__item-text">
              <h3 class="popular__item-title">Шариковая ручка CHICAGA</h3>
              <p class="merch__item-price">
                <svg class="merch__svg">
                  <use xlink:href="#coin"></use>
                </svg>

                <span>1000 т.</span>
              </p>
            </div>

            <div class="popular__item-img">
              <img src="@/assets/imgs/shop/merch/pen.png" alt="" />
            </div>
          </div>
        </div>
        <!-- ./popular__content -->

        <div class="merch__block merch__hoodie">
          <div class="shop__more-inner">
            <h2 class="shop__title shop__title--merch">Худи</h2>
            <button class="shop__more shop__more--merch">Смотреть всё</button>
          </div>

          <div class="hoodie__content active">
            <div class="merch__item hoodie__item">
              <div class="merch__item-price hoodie__price">
                <svg class="merch__svg">
                  <use xlink:href="#coin"></use>
                </svg>
                <span>1000 т.</span>
              </div>

              <img
                class="hoodie__img"
                src="@/assets/imgs/shop/merch/hoodie-item.png"
                alt="hoodie"
              />
              <h3 class="hoodie__title">Худи Peach</h3>

              <div class="hoodie__hover-text">
                <span>Подробнее</span>
                <svg class="hoodie__svg">
                  <use xlink:href="#arrow-down"></use>
                </svg>
              </div>
            </div>

            <div class="merch__item hoodie__item">
              <div class="merch__item-price hoodie__price">
                <svg class="merch__svg">
                  <use xlink:href="#coin"></use>
                </svg>
                <span>1000 т.</span>
              </div>

              <img
                class="hoodie__img"
                src="@/assets/imgs/shop/merch/hoodie-item.png"
                alt="hoodie"
              />
              <h3 class="hoodie__title">Худи Peach</h3>

              <div class="hoodie__hover-text">
                <span>Подробнее</span>
                <svg class="hoodie__svg">
                  <use xlink:href="#arrow-down"></use>
                </svg>
              </div>
            </div>

            <div class="merch__item hoodie__item">
              <div class="merch__item-price hoodie__price">
                <svg class="merch__svg">
                  <use xlink:href="#coin"></use>
                </svg>
                <span>1000 т.</span>
              </div>

              <img
                class="hoodie__img"
                src="@/assets/imgs/shop/merch/hoodie-item.png"
                alt="hoodie"
              />
              <h3 class="hoodie__title">Худи Peach</h3>

              <div class="hoodie__hover-text">
                <span>Подробнее</span>
                <svg class="hoodie__svg">
                  <use xlink:href="#arrow-down"></use>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ./merch__popular -->
    </div>
    <div class="shop__cart">
      <div class="cart__header">
        <h3 class="cart__title">Корзина <span class="cart__number">4</span></h3>
        <svg class="cart__svg">
          <use xlink:href="#cart"></use>
        </svg>
      </div>

      <div class="cart__content">
        <div class="cart__item">
          <div class="cart__item-content">
            <div class="cart__item-img">
              <img src="@/assets/imgs/shop/merch/cup.png" alt="" />
            </div>

            <div class="cart__item-text">
              <h3 class="cart__item-title">Стакан бумажный CHICAGA</h3>
              <span class="cart__item-amount">1 шт.</span>
            </div>
          </div>

          <div class="cart__item-price">
            <p class="merch__item-price">
              <svg class="merch__svg">
                <use xlink:href="#coin"></use>
              </svg>

              <span>1000 т.</span>
            </p>

            <div class="cart__item-controls">
              <div class="amount__controls">
                <button>-</button>
                <span class="amount__number">1</span>
                <button>+</button>
              </div>

              <button>
                <svg class="cart__bin">
                  <use xlink:href="#bin"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="cart__item">
          <div class="cart__item-content">
            <div class="cart__item-img">
              <img src="@/assets/imgs/shop/merch/hoodie-item.png" alt="" />
            </div>

            <div class="cart__item-text">
              <h3 class="cart__item-title">Худи Peach</h3>
              <span class="cart__item-amount">1 шт./Размер: S</span>
            </div>
          </div>

          <div class="cart__item-price">
            <p class="merch__item-price">
              <svg class="merch__svg">
                <use xlink:href="#coin"></use>
              </svg>

              <span>1000 т.</span>
            </p>

            <div class="cart__item-controls">
              <div class="amount__controls">
                <button>-</button>
                <span class="amount__number">1</span>
                <button>+</button>
              </div>

              <button>
                <svg class="cart__bin">
                  <use xlink:href="#bin"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="cart__item">
          <div class="cart__item-content">
            <div class="cart__item-img">
              <img src="@/assets/imgs/shop/merch/package.png" alt="" />
            </div>

            <div class="cart__item-text">
              <h3 class="cart__item-title">Фирменный пакет CHICAGA</h3>
              <span class="cart__item-amount">1 шт.</span>
            </div>
          </div>

          <div class="cart__item-price">
            <p class="merch__item-price">
              <svg class="merch__svg">
                <use xlink:href="#coin"></use>
              </svg>

              <span>1000 т.</span>
            </p>

            <div class="cart__item-controls">
              <div class="amount__controls">
                <button>-</button>
                <span class="amount__number">1</span>
                <button>+</button>
              </div>

              <button>
                <svg class="cart__bin">
                  <use xlink:href="#bin"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="cart__item">
          <div class="cart__item-content">
            <div class="cart__item-img">
              <img src="@/assets/imgs/shop/merch/cup.png" alt="" />
            </div>

            <div class="cart__item-text">
              <h3 class="cart__item-title">Стакан бумажный CHICAGA</h3>
              <span class="cart__item-amount">1 шт.</span>
            </div>
          </div>

          <div class="cart__item-price">
            <p class="merch__item-price">
              <svg class="merch__svg">
                <use xlink:href="#coin"></use>
              </svg>

              <span>1000 т.</span>
            </p>

            <div class="cart__item-controls">
              <div class="amount__controls">
                <button>-</button>
                <span class="amount__number">1</span>
                <button>+</button>
              </div>

              <button>
                <svg class="cart__bin">
                  <use xlink:href="#bin"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="cart__item cart__item--total">
        <div class="cart__item-content cart__item-content--total">
          <h2 class="total__title">Итого:</h2>

          <p class="merch__item-price">
            <svg class="merch__svg">
              <use xlink:href="#coin"></use>
            </svg>

            <span class="total__price">1000 т.</span>
          </p>
        </div>

        <button class="cart__btn" id="order-btn">
          <span>Оформление заказа</span>
          <svg class="cart__bin">
            <use xlink:href="#long-arrow"></use>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import { swiper, swiperSlide } from "vue-awesome-swiper/src";
import "swiper/swiper-bundle.min.css";

export default {
  name: "StoreComponent",
  components: {
    // swiper,
    // swiperSlide
  }
};
</script>

<style lang="sass" scoped>
// colors
$white: #fff
$black: #0D0D0D
$black2: #000
$gray: #808080
$gray_light: #F8F8F8
$gray_light2: #C4C4C4
$red: #FF0000
$red2: #D44105
$red_dark: #791616
$red_light: #F5CCC4
$red__light2: #E2AEA3
$blue_light: #598AEB
$purple_light: #D3B6B0
$pink: #F47090
$pink2: #F9B7C7
$pink_light: #F0A993
$pink_dark: #D5ADAD
$brown: #B86756
$brown_light: #D39494

// media
$media_xxxl: 'max-width: 1400px'
$media_xxl: 'max-width: 1300px'
$media_xl: 'max-width: 1200px'
$media_lg: 'max-width: 1100px'
$media_lg2: 'max-width: 1000px'
$media_md: 'max-width: 800px'
$media_md2: 'max-width: 700px'
$media_sm: 'max-width: 600px'
$media_sm2: 'max-width: 500px'
$media_xs: 'max-width: 400px'

.store-component
  display: flex
  align-items: center
  justify-content: space-between

.shop__content
  display: flex
  justify-content: space-between

  @media($media_md2)
    padding: 0 15px

.shop__content-inner
  flex-grow: 1
  margin-top: 50px

.shop__cart
  background: $white
  box-shadow: 0px 4px 10px rgba(128, 128, 128, 0.2)
  border-radius: 20px
  padding: 25px

  margin: 50px 0 0 35px
  flex-basis: 40%

  @media($media_xl)
    margin: 50px 0 0 15px
    padding: 20px 15px

  @media($media_md)
    margin: 50px 0 0 10px
    padding: 15px 5px 15px 10px

  @media($media_md2)
    display: none

.cart__header
  display: flex
  justify-content: space-between

.cart__svg
  width: 20px
  height: 20px

  .cart__path
    fill: $white

.cart__number
  border-left: 1.5px solid rgba($gray, .1)
  padding-left: 10px
  margin-left: 5px

.cart__content
  padding-right: 5px
  flex-grow: 1
  max-height: 440px
  overflow-y: auto

  margin-top: 25px

  /* width */
  &::-webkit-scrollbar
    width: 5px

  /* Handle */
  &::-webkit-scrollbar-thumb
    background: rgba(128, 128, 128, 0.1)
    border-radius: 40px

.cart__item
  background: $gray_light
  border-radius: 15px

  padding: 15px
  margin-bottom: 20px

  &--total
    margin-top: 30px
    padding-bottom: 25px

  @media($media_md)
    padding: 10px

.cart__item-content
  display: flex
  align-items: flex-start

  border-bottom: 2px solid $white
  padding-bottom: 15px
  margin-bottom: 15px

  &--total
    justify-content: space-between

.cart__item-amount
  // @include font('sf-ui', 500)
  color: $gray
  font-size: 12px

.cart__item-img
  background: $white
  border-radius: 10px
  padding: 5px 10px
  margin-right: 10px
  width: 65px
  height: 65px

  img
    max-height: 100%

.cart__item-title
  // @include font('sf-ui', 500)
  font-size: 12px

  margin-bottom: 7px

.cart__item-price
  display: flex
  align-items: center
  justify-content: space-between

.cart__item-controls
  display: flex
  align-items: center

.amount__controls
  display: flex
  align-items: center
  padding: 3px 10px
  margin-right: 15px

  background: $white
  border-radius: 10px

  color: $gray
  font-size: 12px

  button
    color: $gray
    font-size: 13px

  @media($media_lg)
    margin-right: 0
    padding: 3px

.amount__number
  margin: 0 13px

  @media($media_md)
    margin: 0 8px

.cart__btn
  background: $red
  box-shadow: 0px 4px 10px rgba(164, 164, 164, 0.2)
  border-radius: 10px
  padding: 10px 15px
  margin: 0 auto

  color: $white

  display: flex
  align-items: center

  &--about
    margin: 0 auto 35px

.cart__bin
  width: 19px
  height: 19px

  margin-left: 10px

.total__title
  // @include font('sf-ui', 600)
  font-size: 20px

.total__price
  // @include font('sf-ui', 700)
  font-size: 16px

.shop__cart-sm
  background: $white
  border-top: 1.5px solid $gray_light
  padding: 10px 35px

  position: fixed
  bottom: 0
  left: 0
  z-index: 1000
  width: 100%
  display: none

  @media($media_md2)
    display: flex

.cart-sm__btn
  background: rgba($red, .8)
  border-radius: 10px
  padding: 15px
  align-items: center
  justify-content: space-between

  // @include font('sf-ui', 600)
  font-size: 20px
  color: $white

  cursor: pointer

  @media($media_xs)
    font-size: 15px

  .controls__item
    margin: 0

.cart-sm__p
  margin-left: 10px

.cart-sm__inner
  display: flex
  align-items: center

// slider
.shop__slider
  height: 117px
  margin-top: 35px
  padding: 0 0 0 35px
  overflow: auto
  display: none

  &.active
    @media($media_md2)
      display: flex

.shop-slider__item
  border-radius: 15px
  overflow: hidden
  position: relative
  margin-right: 25px
  min-width: 236px
  padding: 70px 20px 0 20px

  cursor: pointer

  &:after
    content: ''
    width: 100%
    height: 100%
    position: absolute
    z-index: 5
    top: 0
    left: 0
    background: rgba(241, 220, 213, 0.4)

  img
    position: absolute
    top: 0
    left: 0
    width: 236px
    height: 117px

  p
    position: relative
    z-index: 4

    // @include font('sf-ui', 700)
    font-size: 22px
</style>
