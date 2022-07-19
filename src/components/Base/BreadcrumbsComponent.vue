<template>
  <div class="breadcrumbs vue-component">
    <ol class="breadcrumbs__list">
      <li
        class="breadcrumbs__item"
        :class="{ 'breadcrumbs__item--first': isFirstItem(index) }"
        v-for="(breadcrumb, index) in breadcrumbList"
        :style="{ color: breadcrumb.color }"
        :key="index"
      >
        <router-link :to="breadcrumb.path" v-if="breadcrumb.link">{{
          breadcrumb.title
        }}</router-link>
        <span v-else>{{ breadcrumb.title }}</span>
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
    async defineFunction(value) {
      if (typeof value == "function") return await value();
      else return value;
    },
    updateBreadcrumbList() {
      this.breadcrumbList = [];
      this.$route.matched.map(async route => {
        let breadcrumb = route.meta.breadcrumb;
        let color = breadcrumb?.color,
          title = breadcrumb?.title;

        if (typeof color == "function") color = await breadcrumb.color();
        if (typeof title == "function")
          title = await breadcrumb.title(this.$route);

        let isBreadCrumb = breadcrumb !== this.$route.meta.breadcrumb;
        this.breadcrumbList.push({
          color,
          title,
          link: isBreadCrumb,
          path: route.path,
          hideSlash: breadcrumb.hideSlash
        });
      });
    },
    isFirstItem(index) {
      console.log(this.breadcrumbList[index]);
      // return index === 1 ? true : false;
      if (index === 1 && !this.breadcrumbList[index].hideSlash) {
        return true;
      } else return false;
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
  // &__item:not(:first-child)::before
  //   content: "/"
  //   margin-right: 0.25em
  //   color: #FF0000
  &__item--first::before
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
