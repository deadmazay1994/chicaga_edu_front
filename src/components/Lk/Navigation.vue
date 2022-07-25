<template>
  <div class="navigation">
    <router-link
      class="navigation__logo-link"
      :to="{
        name: 'index'
      }"
    >
      <sidebar-logo class="navigation__logo" />
    </router-link>
    <template v-for="(item, k) in links">
      <router-link
        :key="k"
        :to="{ path: item.url + (item.params ? item.params() : '') }"
        :aria-label="item.name"
        class="navigation__link"
        :class="{ 'navigation__link--disabled': item.disabled }"
        v-if="item.showCondition ? item.showCondition() : false"
      >
        <svg class="navigation__link-icon" width="24" height="24">
          <use :xlink:href="'#' + item.icon"></use>
        </svg>
      </router-link>
    </template>
  </div>
</template>

<script>
import SidebarLogo from "@/components/Icons/SidebarLogo.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      // "disabled" - свойство по
      // которому ссылка становится некликабельной
      // "limitedAccess" - элементы с этим свойством
      // не отображаются при store.state.isDemo = true
      links: [
        {
          name: "Каталог курсов",
          url: "/lk/catalog-courses",
          icon: "courses-icon",
          showCondition: () => true,
          disabled: false
        },
        {
          name: "Мои курсы",
          url: "/lk/my-courses",
          icon: "education-icon",
          showCondition: () => true,
          disabled: false
        },
        {
          name: "Вебинары",
          url: "/lk/webinars",
          icon: "webinar-icon",
          showCondition: () => true,
          limitedAccess: true,
          disabled: false
        },
        {
          name: "Конференц-комнаты",
          url: "/conference/",
          params: () => {
            return this.generateRoomId;
          },
          src: require("@/assets/svg/question.svg"),
          icon: "group-icon",
          showCondition: () => {
            return this.user.role === "teacher";
          },
          limitedAccess: true,
          disabled: false
        },
        {
          name: "Консультация",
          url: "/lk/consultation",
          icon: "tablet-icon",
          showCondition: () => true,
          disabled: false,
          limitedAccess: true
        },
        {
          name: "Расписание",
          url: "/lk/my-groups",
          icon: "timetable-icon",
          showCondition: () => true,
          disabled: false,
          limitedAccess: true
        },
        {
          name: "Магазин",
          url: "/store",
          icon: "shopping-icon",
          showCondition: () => true,
          disabled: false,
          limitedAccess: true
        },
        {
          name: "FAQ",
          url: "/faq",
          icon: "question-icon",
          showCondition: () => true,
          disabled: false,
          limitedAccess: true
        }
      ],
      mobileDetected: false
    };
  },
  props: ["mobilemenuopen"],
  components: {
    SidebarLogo
  },
  computed: {
    ...mapGetters(["user", "draver", "isDemo"]),
    access() {
      // предоставить доступ только учителю
      return this.user.role == "teacher";
    },
    draverComputed: {
      get() {
        return this.draver;
      },
      set(value) {
        this.setDraverState(value);
      }
    },
    generateRoomId() {
      return (
        String(this.user.id) +
        "__" +
        (Math.random() + 1).toString(36).substring(7)
      );
    }
  },
  methods: {
    ...mapMutations(["setDraverState"])
  },
  beforeMount() {
    if (this.isDemo) {
      this.links
        .filter(link => link.limitedAccess)
        .map(link => (link.disabled = true));
    }
  }
};
</script>

<style lang="sass" scoped>
@import "@/assets/styles/variables.sass"

.navigation
  display: flex
  align-items: center
  flex-direction: column
  color: #323232
  @media ($media_lg2)
    flex-direction: row
    justify-content: space-between
    width: 100%
  &__logo-link
    display: flex
    align-items: center
    justify-content: center
    width: 40px
    height: 40px
    margin-bottom: 39px
    @media ($media_lg2)
      width: 48px
      height: 48px
      margin-bottom: 0
  &__logo
    width: 100%
    height: 100%
    @media ($media_lg2)
      width: 28px
      height: 28px
  &__link
    position: relative
    width: 48px
    height: 48px
    display: flex
    align-items: center
    justify-content: center
    background-color: #ffffff
    border-radius: 15px
    transition-property: color, background-color, box-shadow
    transition-duration: 0.15s
    transition-timing-function: ease-in-out
    @media ($media_lg2)
      background-color: transparent
  &__link:not(:last-child)
    margin-bottom: 12px
    @media ($media_lg2)
      margin-bottom: 0
  &__link:hover
    background-color: #d9d9d9
    @media ($media_lg2)
      background-color: transparent
  &__link[aria-label]:hover::after
    content: attr(aria-label)
    position: absolute
    left: calc( 100% + 4px )
    padding: 6px 16px
    font-weight: 600
    font-size: 12px
    white-space: nowrap
    color: #ff6440
    background-color: #ffffff
    border-radius: 15px
    box-shadow: 0 4px 20px rgba(128, 128, 128, 0.2)
    z-index: 999
    @media ($media_lg2)
      content: none
  &__link--disabled
    color: #a9a9a9
    pointer-events: none

  &__link.router-link-active
    color: #e84145
    box-shadow: inset 3px 0 1px rgba(147, 43, 31, 0.5)
    @media ($media_lg2)
      box-shadow: none
  &__link-icon
    width: 24px
    height: 24px
    @media ($media_lg2)
      width: 28px
      height: 28px
</style>
