<template>
  <div class="cart-item">
    <div class="cart-item__top">
      <div class="cart-item__img-box">
        <img :src="item.src" alt="Изображение товара" />
      </div>
      <div class="cart-item__content">
        <div class="cart-item__title" :title="item.title">{{ item.title }}</div>
        <div
          class="cart-item__properties"
          :title="item.count + 'шт. / Размер: ' + item.size"
        >
          {{ item.count }} шт. / Размер: {{ item.size }}
        </div>
      </div>
    </div>
    <div class="cart-item__bottom">
      <div class="cart-item__price-box">
        <svg class="cart-item__price-icon" width="19" height="19">
          <use xlink:href="#coin"></use>
        </svg>
        <span class="cart-item__price">{{ item.price }} м.</span>
      </div>
      <div class="cart-item__controls">
        <div class="cart-item__amount-box">
          <button
            class="cart-item__amount-btn"
            title="Меньше"
            aria-label="Меньше"
            @click="$emit('decrease')"
          >
            -
          </button>
          <span class="cart-item__amount" :title="item.count">
            {{ item.count }}
          </span>
          <button
            class="cart-item__amount-btn"
            title="Больше"
            aria-label="Больше"
            @click="$emit('increase')"
          >
            +
          </button>
        </div>
        <button
          class="cart-item__bin-btn"
          title="Удалить"
          aria-label="Удалить"
          @click="$emit('clickTrashButton')"
        >
          <svg class="cart-item__bin-icon" width="19" height="19">
            <use xlink:href="#bin"></use>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    item: Object
  },
  mounted() {}
};
</script>

<style lang="sass" scoped>
@import "@/assets/styles/variables.sass"

$line-height: 16px

.cart-item
  padding: 15px
  font-weight: 500
  font-size: 12px
  line-height: $line-height
  background-color: $gray_light
  border-radius: 15px
  &__top
    display: flex
    align-items: center
    padding-bottom: 14px
    border-bottom: 2px solid $white
  &__img-box
    display: flex
    align-items: center
    justify-content: center
    flex-shrink: 0
    width: 55px
    height: 55px
    margin-right: 10px
    background-color: $white
    border-radius: 10px
    overflow: hidden
  &__img-box img
    max-height: 100%
  &__content
    flex-grow: 1
  &__title,
  &__properties
    display: -webkit-box
    -webkit-box-orient: vertical
    text-overflow: ellipsis
    overflow: hidden
  &__title
    height: calc( #{$line-height} * 2 )
    -webkit-line-clamp: 2
    font-weight: 600
  &__properties
    height: $line-height
    -webkit-line-clamp: 1
    color: $gray
  &__bottom
    display: flex
    align-items: center
    justify-content: space-between
    padding-top: 14px
  &__price-box
    display: flex
    align-items: center
    margin-right: 15px
  &__price-icon
    width: 19px
    height: 19px
    margin-right: 5px
  &__controls
    display: flex
    align-items: center
  &__amount-box
    display: flex
    align-items: center
    margin-right: 12px
    padding-right: 3px
    padding-left: 3px
    color: $gray
    background-color: $white
    border-radius: 10px
    overflow: hidden
  &__amount-btn
    display: flex
    align-items: center
    justify-content: center
    width: 19px
    height: 19px
    font-weight: 600
  &__amount
    width: 24px
    text-align: center
    text-overflow: ellipsis
    white-space: nowrap
    overflow: hidden
  &__bin-btn
    display: flex
  &__bin-icon
    width: 19px
    height: 19px
</style>
