<template>
  <div class="breadcrumbs vue-component">
    <ol class="breadcrumbs__list">
      <li
        class="breadcrumbs__item"
        v-for="(breadcrumb, index) in breadcrumbList"
        :style="{ color: breadcrumb.breadcrumbObject.color }"
        :key="index"
      >
        <router-link :to="breadcrumb.path" v-if="breadcrumb.link">{{
          breadcrumb.breadcrumbObject.title
        }}</router-link>
        <span v-else>{{ breadcrumb.breadcrumbObject.title }}</span>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "BreadcrumbsComponent",
  data() {
    return {
      breadcrumbList: []
    };
  },
  methods: {
    async updateBreadcrumbList() {
      this.breadcrumbList = [];
      console.log("this.$route.matched:", this.$route.matched);
      for (let i = 0; i < this.$route.matched.length; i++) {
        let currRoute = this.$route.matched[i];
        let breadcrumbObject = currRoute.meta.breadcrumb;
        for (let prop in currRoute.meta.breadcrumb) {
          if (typeof currRoute.meta.breadcrumb[prop] === "function") {
            breadcrumbObject[prop] = await currRoute.meta.breadcrumb[prop](
              this.$route
            );
          }
        }
        if (currRoute.breadcrumbObject === this.$route.breadcrumbObject)
          this.breadcrumbList.push({
            breadcrumbObject,
            link: false
          });
        else
          this.breadcrumbList.push({
            breadcrumbObject,
            link: true,
            path: currRoute.path
          });
      }
    }
  },
  watch: {
    $route() {
      this.updateBreadcrumbList();
    }
  },
  beforeMount() {
    this.updateBreadcrumbList();
  }
};
</script>

<style lang="sass" scoped="scoped">
.breadcrumbs
  &__list
    width: 100%
    padding-left: 0
    font-weight: 600
    font-size: 16px
    line-height: 19px
    list-style: none
    word-break: break-word
    color: #808080
  &__item
    display: inline-block
  &__item:not(:last-child)
    margin-right: 0.25em
  &__item:not(:first-child)::before
    content: "/"
    margin-right: 0.25em
    color: #FF0000
  span
    cursor: default
  a
    color: inherit
    cursor: pointer
    &:focus
      color: #000000
    &:hover
      color: #95B423
    &:active
      opacity: 0.5
</style>
