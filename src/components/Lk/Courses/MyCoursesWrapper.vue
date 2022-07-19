<template>
  <div class="my-courses-wrapper vue-component">
    <interlayer class="my-courses-wrapper__body" :title="$route.meta.title">
      <router-view></router-view>
    </interlayer>
    <div class="my-courses-wrapper__aside">
      <div class="my-courses-wrapper__aside-wrap">
        <div class="my-courses-wrapper__aside-inner">
          <UserAsideProgressVue />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Interlayer from "@/components/Interlayer.vue";
import UserAsideProgressVue from "../UserAside/UserAsideProgress.vue";
export default {
  name: "my-courses-wrapper",
  components: {
    Interlayer,
    UserAsideProgressVue
  },
  data: function() {
    return {};
  },
  props: [],
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="sass">
@import "@/assets/styles/variables.sass"

.my-courses-wrapper
  display: flex
  width: 100%
  height: 100%
  padding: 12px
  @media ($media_xl)
    display: block
    height: auto
    padding: 0
  &__body
    flex-grow: 1
    @media ($media_xl)
      flex-grow: 0
  &__aside
    flex-shrink: 0
    flex-basis: 389px
    height: 100%
    padding-left: 20px
    @media ($media_xl)
      height: auto
      padding-top: 20px
      padding-left: 0
  &__aside-wrap
    width: 100%
    height: 100%
    background-color: #fffefe
    border-radius: 12px
    box-shadow: 0 4px 20px rgba(128, 128, 128, 0.2)
    overflow: hidden
    @media ($media_md)
      box-shadow: 0 4px 20px rgba(128, 128, 128, 0.2)
  &__aside-inner
    width: 100%
    height: 100%
    padding: 24px 13px
    overflow: auto
</style>
