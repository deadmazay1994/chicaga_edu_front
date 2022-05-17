<template>
  <div class="breadcrumbs-component">
    <ol class="breadcrumb">
      <li
        class="breadcrumb-item"
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
