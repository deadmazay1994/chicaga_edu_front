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
.my-courses-wrapper
  display: flex
  width: 100%
  height: 100%
  padding: 12px
  &__body
    flex-grow: 1
  &__aside
    flex-shrink: 0
    flex-basis: 389px
    height: 100%
    padding-left: 20px
  &__aside-wrap
    width: 100%
    height: 100%
    background-color: #fffefe
    border-radius: 12px
    box-shadow: 0 4px 20px rgba(128, 128, 128, 0.2)
    overflow: hidden
  &__aside-inner
    width: 100%
    height: 100%
    padding: 24px 13px
    overflow: auto
</style>
