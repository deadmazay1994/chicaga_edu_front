<template>
  <div class="calendar-modal">
    <div class="modal-head">
      <div class="modal-head__title">
        {{ modalData.title }}
      </div>
      <div class="close" @click="close()">
        <svg
          width="15"
          height="16"
          viewBox="0 0 15 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.87424 7.99996L14.7149 2.15908C15.0951 1.77915 15.0951 1.16487 14.7149 0.784944C14.335 0.405019 13.7207 0.405019 13.3408 0.784944L7.49992 6.62582L1.65922 0.784944C1.27911 0.405019 0.665003 0.405019 0.285078 0.784944C-0.0950258 1.16487 -0.0950258 1.77915 0.285078 2.15908L6.12579 7.99996L0.285078 13.8408C-0.0950258 14.2208 -0.0950258 14.8351 0.285078 15.215C0.474417 15.4045 0.723371 15.4997 0.972146 15.4997C1.22092 15.4997 1.4697 15.4045 1.65922 15.215L7.49992 9.3741L13.3408 15.215C13.5303 15.4045 13.7791 15.4997 14.0279 15.4997C14.2767 15.4997 14.5254 15.4045 14.7149 15.215C15.0951 14.8351 15.0951 14.2208 14.7149 13.8408L8.87424 7.99996Z"
            fill="#CA2E23"
          />
        </svg>
      </div>
    </div>
    <div class="modal-body">
      <span class="modal-body__text">{{ modalData.subtitle }}</span>
      <div class="teacher-block"></div>
      <div class="price-block">
        <div class="price-block__text">Стоимость вебинара:</div>
        <div class="price-block__price">{{ modalData.price }} ₽</div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="modal-cancel" @click="close()">Отмена</button>
      <button class="modal-submit" @click="subscribe()">
        Оплатить
      </button>
    </div>
  </div>
</template>

<script>
import api from "@/mixins/api";
import { eventBus } from "@/main";

export default {
  name: "CalendarModal",
  props: {
    modalData: Object
  },
  methods: {
    close() {
      eventBus.$emit("closeModal");
    },
    async subscribe() {
      let r = await api.methods.subscribeToEvent(this.getEventData.item.id);
      if (r.success && r.data.payment_url)
        return (location.href = r.data.payment_url);
      alert("Что-то пошло не так при оплате");
      return r;
    }
  }
};
</script>

<style lang="sass" scoped>
.calendar-modal__wrapper
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: rgba(85, 85, 85, 0.25)
  z-index: 9998
.calendar-modal
  position: fixed
  display: flex
  flex-direction: column
  justify-content: space-between
  top: 50%
  left: 50%
  z-index: 9999
  width: 520px
  height: 574px
  margin-top: -287px
  margin-left: -260px
  background: #FFFFFF
  font-family: Manrope, sans-serif
  color: #252525
  border-radius: 15px
  // padding: 30px 25px 25px 25px

  .modal-head
    height: 134px
    padding: 25px 30px
    overflow: hidden
    border-radius: 15px 15px 0 0
    background: url(~@/assets/imgs/calendarHeader.png) no-repeat

    .modal-head__title
      font-family: Manrope, sans-serif !important
      font-weight: 600
      font-size: 32px
      line-height: 41.6px

    .close
      position: absolute
      top: 25px
      right: 30px
      cursor: pointer

  .modal-body
    flex: 1
    padding: 16px 30px 16px 30px
    display: flex
    flex-direction: column
    justify-content: space-between

    .modal-body__text
      font-weight: 400
      font-size: 18px
      line-height: 29.8px

    .price-block
      display: flex
      align-items: center
      justify-content: space-between

      .price-block__text
        font-weight: 700
        font-size: 18px
        line-height: 27px

      .price-block__price
        display: inline
        font-weight: 900
        font-size: 36px
        line-height: 54px
        text-align: right
        background: linear-gradient(0deg, #DC3337 0%, #BE1C21 100%), linear-gradient(0deg, #6D9AF8 10.09%, #487EF3 85.32%)
        -webkit-background-clip: text
        -webkit-text-fill-color: transparent

  .modal-footer
    height: 110px
    background: #F4F4F4
    box-shadow: 0px 4px 16px 0px #0000001A inset
    border-radius: 0 0 15px 15px
    display: flex
    align-items: center
    justify-content: flex-end
    padding: 30px

    .modal-submit,
    .modal-cancel
      font-weight: 600
      font-size: 20px
      line-height: 20px
      cursor: pointer

    .modal-submit
      background: linear-gradient(0deg, #BE1C21 0%, #DC3337 100%)
      color: #FFFFFF
      padding: 15px 24px
      border-radius: 16px

    .modal-cancel
      color: #A6ADAE
      margin-right: 20px

.fade-enter-active, .fade-leave-active
  transition: opacity .2s
.fade-enter, .fade-leave-to
  opacity: 0
</style>
