<template>
  <div class="product-order vue-component">
    <form class="product-order__form" @submit.prevent="sendPaymentData()">
      <div class="product-order__top">
        <div class="product-order__header">
          <div class="product-order__title">
            Оформление заказа
          </div>
        </div>
        <div class="product-order__item">
          <div class="product-order__label">
            Имя:
          </div>
          <c-input
            class="product-order__input"
            type="text"
            name="ФИО"
            placeholder="Соловьева Ульяна"
            aria-label="Поле для ввода ФИО"
            :maxlength="30"
            v-model="fullName"
          />
        </div>

        <div class="product-order__item">
          <div class="product-order__label">
            Телефон:
          </div>
          <c-input
            class="product-order__input"
            type="tel"
            name="phone"
            placeholder="+792125678543"
            aria-label="Поле для ввода номера телефона"
            :maxlength="12"
            v-model="phone"
            ref="phoneInput"
          />
        </div>

        <div class="product-order__item">
          <div class="product-order__label">
            Электронная почта:
          </div>
          <c-input
            class="product-order__input"
            type="email"
            name="email"
            placeholder="qwerty@mail.ru"
            aria-label="Поле для ввода электронной почты"
            :maxlength="50"
            v-model="email"
          />
        </div>

        <div class="product-order__item">
          <label class="product-order__label product-order__label--align-top">
            Комментарий:
          </label>
          <c-textarea
            class="product-order__textarea"
            name="comment"
            :ariaLabel="'Поле для ввода комментария'"
            v-model="comment"
          />
        </div>
      </div>

      <div class="product-order__bottom">
        <div class="product-order__bottom-main">
          <div class="product-order__payment">
            <div class="product-order__title">Промокод</div>
            <div class="product-order__promocode">
              <c-input
                class="product-order__input"
                type="text"
                name="promocode"
                aria-label="Поле для ввода промокода"
                :maxlength="30"
                v-model="promoCode"
              />
              <c-btn btnClass="product-order__red-btn">Применить</c-btn>
            </div>

            <div class="product-order__title">Способ оплаты</div>
            <div class="product-order__methods">
              <div class="product-order__method">
                <input
                  class="product-order__method-input sr-only"
                  id="method1"
                  name="payment-method"
                  type="radio"
                  value="token"
                  v-model="paymentMethod"
                />
                <span class="product-order__method-radio"></span>
                <label class="product-order__method-label" for="method1"
                  >Монетами</label
                >
              </div>

              <div class="product-order__method">
                <input
                  class="product-order__method-input sr-only"
                  id="method2"
                  name="payment-method"
                  type="radio"
                  value="cart"
                  v-model="paymentMethod"
                />
                <span class="product-order__method-radio"></span>
                <label class="product-order__method-label" for="method2"
                  >Банковской картой онлайн</label
                >
              </div>
            </div>
          </div>

          <div class="product-order__total">
            <div class="product-order__total-header">
              <div class="product-order__title">Итого:</div>

              <div class="product-order__price">
                <svg class="product-order__coin">
                  <use xlink:href="#coin"></use>
                </svg>
                <span class="product-order__price-text"
                  >{{ getBasketItemsTotal }} т.</span
                >
              </div>
            </div>

            <div class="product-order__config-top">
              <div class="product-order__config">
                <span class="product-order__config-title">
                  Товары:
                </span>
                <span class="product-order__config-desc">
                  {{ cartItemsLength }}шт.
                </span>
              </div>
              <div class="product-order__config">
                <span class="product-order__config-title">
                  Доставка:
                </span>
                <span class="product-order__config-desc">
                  Бесплатно
                </span>
              </div>
            </div>
            <div class="product-order__config-bottom">
              <div class="product-order__config">
                <span class="product-order__config-title">
                  Доставка:
                </span>
                <span
                  class="product-order__config-desc product-order__config-desc--bold"
                >
                  Пункт выдачи
                </span>
              </div>
              <div class="product-order__config">
                <span class="product-order__config-title">
                  Ежедневно
                </span>
                <span class="product-order__config-desc">
                  10:00-21:00
                </span>
              </div>
              <div class="product-order__config">
                Город, улица, дом ...
              </div>
            </div>
          </div>
        </div>

        <div class="product-order__footer">
          <div class="product-order__footer-text">
            <p>
              Нажимая на кнопку «Оплатить» Вы принимаете условия Публичной
              оферты
            </p>
          </div>
          <c-btn class="product-order__red-btn">Оплатить</c-btn>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import api from "@/mixins/api";

export default {
  name: "",
  data: function() {
    return {
      fullName: "",
      phone: "",
      email: "",
      comment: "",
      promoCode: undefined,
      paymentMethod: ""
    };
  },
  methods: {
    sendPaymentData() {
      let paymentData = {
        fullName: this.fullName,
        phone: this.phone,
        email: this.email,
        comment: this.comment,
        promoCode: this.promoCode,
        paymentMethod: this.paymentMethod
      };
      api.methods.sendPaymentData(paymentData);
    }
  },
  computed: {
    ...mapGetters(["getBasketItems", "getBasketItemsTotal"]),
    cartItemsLength() {
      return this.getBasketItems.reduce((acc, item) => acc + item.count, 0);
    }
  },
  components: {},
  props: [],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="scss">
@import "@/assets/styles/variables.sass";

.product-order {
  p {
    margin-top: 0;
    margin-bottom: 0;
  }

  &__form {
    width: 100%;
    height: 100%;
    font-family: "Manrope", sans-serif;

    @media ($media_sm) {
      padding: 15px;
    }
  }

  &__top {
    max-width: 434px;
    margin-bottom: 50px;
  }

  &__header {
    margin-bottom: 25px;
  }

  &__title {
    font-weight: 600;
    font-size: 20px;
    line-height: 1.2;
  }

  &__item {
    display: flex;
    align-items: center;

    @media ($media_sm2) {
      display: block;
    }
  }

  &__item:not(:last-child) {
    margin-bottom: 15px;
  }

  &__label {
    flex-basis: 120px;
    flex-shrink: 0;
    margin-right: 20px;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
  }

  &__label--align-top {
    align-self: flex-start;
    padding-top: 7px;
  }

  &__input,
  &__textarea {
    flex-basis: 293px;
  }

  &__red-btn {
    margin-top: 0;
    background-color: $red;
    box-shadow: none;
  }

  &__bottom {
    font-weight: 500;
    line-height: 1.2;
    background-color: rgba($red, 0.1);
    border-radius: 20px;
    overflow: hidden;
  }

  &__bottom-main {
    display: flex;
    padding: 15px;

    @media ($media_sm) {
      padding-right: 10px;
      padding-left: 10px;
    }

    @media ($media_sm2) {
      display: block;
    }
  }

  &__payment {
    flex-basis: 50%;
    padding-top: 20px;
    padding-right: 15px;
    padding-bottom: 10px;
    border-right: 1.5px solid rgba($gray, 0.1);

    @media ($media_sm2) {
      padding-right: 0;
      padding-bottom: 15px;
      border-right: none;
      border-bottom: 1.5px solid rgba($gray, 0.1);
    }
  }

  &__payment &__title {
    margin-bottom: 15px;
  }

  &__promocode {
    display: flex;
    align-items: center;
    margin-bottom: 35px;
  }

  &__promocode &__input {
    flex-basis: 175px;
    margin-right: 5px;
  }

  &__promocode &__red-btn {
    margin-left: 0;
    padding: 7px 15px;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    border-radius: 5px;
  }

  &__method {
    position: relative;
  }

  &__method-radio {
    position: absolute;
    top: calc(50% - 8.5px);
    left: 0;
    width: 18px;
    height: 18px;
    border: 1px solid $gray;
    border-radius: 50%;
  }

  &__method-radio::before {
    content: "";
    position: absolute;
    top: calc(50% - 4px);
    left: calc(50% - 4px);
    width: 8px;
    height: 8px;
    background-color: $red;
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.2s;
  }

  &__method-input:checked + &__method-radio::before {
    opacity: 1;
  }

  &__method-label {
    display: inline-block;
    padding-top: 9px;
    padding-bottom: 9px;
    padding-left: 27px;
    font-size: 14px;
    line-height: 16px;
    cursor: pointer;
  }

  &__total {
    flex-basis: 50%;
    padding-top: 20px;
    padding-bottom: 10px;
    padding-left: 15px;
    font-size: 14px;
  }

  &__total-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  &__total-header &__title {
    margin-right: 15px;
  }

  &__price {
    display: flex;
    align-items: center;
  }

  &__coin {
    width: 19px;
    height: 19px;
    margin-right: 10px;
  }

  &__price-text {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
  }

  &__config-top {
    color: $gray;
    margin-bottom: 27px;
  }

  &__config-top &__config:not(:last-child) {
    margin-bottom: 15px;
  }

  &__config-desc--bold {
    font-weight: 700;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    font-size: 12px;
    background: rgba($red, 0.3);

    @media ($media_sm2) {
      display: block;
    }
  }

  &__footer-text {
    max-width: 280px;
  }

  &__footer &__red-btn {
    flex-basis: 203px;
    margin-right: 0;
    margin-left: 0;
    font-size: 14px;
    border-radius: 10px;
  }
}
</style>
