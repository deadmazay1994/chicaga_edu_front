<template>
  <div class="breadcrumbs-component">
    <ol class="breadcrumb">
      <li
        class="breadcrumb-item"
        v-for="(item, index) in breadcrumbList"
        :key="index"
      >
        <router-link :to="item.path" v-if="item.name !== $route.name">{{
          item.meta.breadcrumb
        }}</router-link>
        <span v-if="item.name === $route.name">{{
          item.meta.breadcrumb.dynamic === true ? name : item.meta.breadcrumb
        }}</span>
      </li>
    </ol>
  </div>
</template>

<script>
import api from "@/mixins/api";

export default {
  name: "BreadcrumbsComponent",
  data() {
    return {
      breadcrumbList: [],
      name: undefined
    };
  },
  computed: {
    thisRouterPath() {
      return this.$route.path;
    }
  },
  methods: {
    updateBreadcrumbList() {
      this.breadcrumbList = [];
      this.$route.matched.map(element => {
        this.breadcrumbList.push(element);
      });
    },
    async getPromise() {
      let res = await api.methods.getFullLesson(this.$route.params.id);
      this.name = res.name;
    }
  },
  watch: {
    $route() {
      this.updateBreadcrumbList();
      this.getPromise();
    }
  },
  beforeMount() {
    this.updateBreadcrumbList();
  }
};
</script>

<style lang="sass" scoped>
.breadcrumb-component
  display: block
</style>
