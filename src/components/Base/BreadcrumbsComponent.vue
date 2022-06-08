<template>
  <div class="breadcrumbs vue-component">
    <ol class="breadcrumbs__list">
      <li
        class="breadcrumbs__item"
        v-for="(breadcrumb, index) in breadcrumbList"
        :key="index"
      >
        <router-link :to="breadcrumb.path" v-if="breadcrumb.link">{{
          breadcrumb.name
        }}</router-link>
        <span v-else>{{ breadcrumb.name }}</span>
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
      for (let i = 0; i < this.$route.matched.length; i++) {
        let currRoute = this.$route.matched[i];
        let name;
        if (typeof currRoute.meta.breadcrumb === "function") {
          name = await currRoute.meta.breadcrumb(this.$route);
        } else {
          name = currRoute.meta.breadcrumb;
        }
        if (currRoute.name === this.$route.name)
          this.breadcrumbList.push({
            name,
            link: false
          });
        else
          this.breadcrumbList.push({
            name,
            link: true,
            path: currRoute.path
          });
      }
      console.log(this.breadcrumbList);
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
