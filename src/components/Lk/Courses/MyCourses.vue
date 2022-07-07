<template>
  <div class="catalog-c vue-component">
    <div class="catalog-c__inner">
      <interlayer class="catalog-c__body">
        <template v-if="myCourses.length">
          <div class="course-card-container">
            <!-- По идее, тут должна вставляться сетка с карточками курса, а не вот это вот, а потом отдельно карточки. Данный компонент раньше и выполнял эту роль, но пока для нового дизайна решили сделать так. Очень желательно в дальнейшем это исправить. -->
            <course-card
              v-for="course in myCourses"
              :key="course.id"
              :course="course"
              :buy="true"
            />
          </div>
        </template>
        <div v-else-if="myCoursesLoaded">
          Вы еще не приобрели курсы
        </div>
        <plug v-if="!myCoursesLoaded" />
      </interlayer>
      <div class="catalog-c__aside">
        <div class="catalog-c__aside-wrap">
          <div class="catalog-c__aside-inner">
            <!-- типа слот для контента боковой панели -->
            <UserAsideProgressVue />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Interlayer from "@/components/Interlayer.vue";
import CourseCard from "@/components/Lk/Courses/CourseCard";
import Plug from "./CatalogCoursePlug";
import UserAsideProgressVue from "../UserAside/UserAsideProgress.vue";

import { mapGetters } from "vuex";

export default {
  name: "catalog-c",
  methods: {
    setCourses() {
      // Данный метод работает только если мы еще не запрашивали курсы
      this.$store.dispatch("setMyCourses");
    }
  },
  computed: {
    ...mapGetters(["myCourses", "myCoursesLoaded"])
  },
  components: {
    Interlayer,
    CourseCard,
    Plug,
    UserAsideProgressVue
  },
  props: [],
  mixins: {},
  beforeMount() {
    this.setCourses();
  }
};
</script>

<style scoped="scoped" lang="sass">
.catalog-c
  width: 100%
  height: 100%
  padding: 12px
  &__inner
    display: flex
    width: 100%
    height: 100%
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

.course-card-container
  padding: 32px
.course-card:not(:last-child)
  margin-bottom: 20px
</style>
