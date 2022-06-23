<template>
  <div class="tariff tariff--premium">
    <div class="tariff__inner">
      <header class="tariff__header">
        <div class="tariff__title-box">
          <span class="tariff__title">
            Premium
          </span>
        </div>
      </header>
      <div class="tariff__body">
        <ul class="tariff__list">
          <li class="tariff__item">Доступ на <b>2 года</b></li>
          <li class="tariff__item"><b>Личный чат</b> с преподавателем</li>
          <li class="tariff__item">
            <b>Аттестация и сертификат</b> о прохождении курса
          </li>
          <li class="tariff__item">
            Занятия в месяц:
            <ul class="tariff__list-2">
              <li class="tariff__item-2">8 <a href="#">видеоуроков</a></li>
              <li class="tariff__item-2">
                6 доп.уроков с фразами для общения
              </li>
              <li>
                2 <a href="#">вебинара</a> на закрепление изученного материала
              </li>
              <li>4 <a href="#">индивидуальных урока</a></li>
            </ul>
          </li>
          <li class="tariff__item tariff__item--mb16">
            Помощь в подготовке резюме на английском
          </li>
          <li class="tariff__item">
            Личный куратор
          </li>
          <li class="tariff__item">
            Чат-бот для грамматики
          </li>
          <li class="tariff__item tariff__item--mb16">
            Доп. материалы для увлекательного изучения английского
          </li>
          <li class="tariff__item">
            Упражнения с автоматической проверкой
          </li>
        </ul>
        <div v-if="spec == 'basic'" class="tariff__attention">
          Тариф не предполагает обратной связи преподавателя. Полностью
          самостоятельное прохождение
        </div>
        <div v-else-if="spec == 'premium'" class="tariff__places">
          Осталось 20 мест
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data: function() {
    return {
      spec: "premium"
    };
  },
  methods: {},
  computed: {},
  components: {},
  beforeMount() {}
};
</script>

<style lang="sass" scoped>
.tariff
  max-width: 390px
  box-shadow: 0 4px 20px rgba(128, 128, 128, 0.2)
  border-radius: 12px
  overflow: hidden
  &__inner
    background-color: #ffffff
  &__header
    padding: 30px 40px 20px
    background-color: #ffffff
    border-bottom: 1px solid #dcdcdc
  &--standart &__header
    background-image: linear-gradient(96deg, rgba(79, 79, 79, 0.5) 1%, rgba(111, 111, 111, 0.5) 10%, rgba(177, 177, 177, 0.5) 30%, rgba(111, 111, 111, 0.5) 45%, rgba(111, 111, 111, 0.5) 64%, rgba(177, 177, 177, 0.5) 82%, rgba(79, 79, 79, 0.5) 99%)
  &--premium &__header
    background-image: linear-gradient(96deg, rgba(255, 120, 22, 0.5) 1%, rgba(255, 160, 72, 0.5) 10%, rgba(255, 187, 126, 0.5) 30%, rgba(255, 160, 72, 0.5) 45%, rgba(255, 160, 72, 0.5) 64%, rgba(255, 187, 126, 0.5) 82%, rgba(255, 120, 22, 0.5) 99%)
  &__title-box
    font-weight: 800
    font-size: 32px
    line-height: 1.5
    text-align: center
    text-transform: uppercase
  &__body
    padding: 24px 32px
    font-size: 16px
    line-height: 1.5
  &__list
    list-style-type: none
  &__list:not(:last-child)
    margin-bottom: 16px
  &__item
    position: relative
    display: inline-block
    min-height: 24px
    padding-left: 30px
  &__item:not(:last-child)
    margin-bottom: 8px
  &__item--mb16:not(:last-child)
    margin-bottom: 16px
  &__item::before
    content: ""
    position: absolute
    top: 0
    left: 0
    width: 24px
    height: 24px
    background-image: url("~@/assets/imgs/icons/star-1.svg")
    background-position: center
    background-size: contain
    background-repeat: no-repeat
  &--standart &__item::before
    background-image: url("~@/assets/imgs/icons/star-2.svg")
  &--premium &__item::before
    background-image: url("~@/assets/imgs/icons/star-3.svg")
  &__list-2
    padding-left: 26px
    list-style-type: disc
  &__attention
    padding-top: 16px
    padding-left: 32px
    font-weight: 700
    background-image: url("~@/assets/imgs/icons/attention.svg")
    background-position: left top 16px
    background-size: 24px 24px
    background-repeat: no-repeat
  &__places
    font-weight: 700
    font-size: 20px
    text-align: center
  a
    color: #487ef3
</style>
