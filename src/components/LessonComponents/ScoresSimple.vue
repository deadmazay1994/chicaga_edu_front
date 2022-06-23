<template>
  <div class="scores-simple vue-component">
    <div class="scores-simple__inner">
      <div class="scores-simple__item">
        <svg class="scores-simple__icon" width="15" height="15">
          <use xlink:href="#smile1"></use>
        </svg>
        <span class="scores-simple__points">{{ points.smile }}</span>
      </div>

      <div class="scores-simple__item">
        <svg class="scores-simple__icon" width="15" height="15">
          <use xlink:href="#star"></use>
        </svg>
        <span class="scores-simple__points">{{ points.star }}</span>
      </div>

      <div class="scores-simple__item">
        <svg class="scores-simple__icon" width="15" height="15">
          <use xlink:href="#brains"></use>
        </svg>
        <span class="scores-simple__points">{{ points.brain }}</span>
      </div>

      <div class="scores-simple__item">
        <svg class="scores-simple__icon" width="15" height="15">
          <use xlink:href="#bulb"></use>
        </svg>
        <span class="scores-simple__points">{{ points.lamp }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "scores-simple",
  data: function() {
    return {};
  },
  methods: {
    ...mapActions(["setUserPoints"]),
    setUserPointsToData() {
      this.getUserPoints.forEach(item => {
        switch (item.point_type.name) {
          case "Мозги":
            this.brainData = item.points;
            break;
          case "Смайлики":
            this.smileData = item.points;
            break;
          case "Звездочка":
            this.starData = item.points;
            break;
          case "Лампочка":
            this.lampData = item.points;
            break;
        }
      });
    }
  },
  computed: {
    ...mapGetters(["points"])
  },
  watch: {},
  components: {},
  mixins: {},
  async mounted() {
    await this.setUserPoints();
  }
};
</script>

<style scoped="scoped" lang="sass">
.scores-simple
  &__inner
    display: flex
    align-items: center
  &__item
    display: flex
    align-items: center
  &__item:not(:last-child)
    margin-right: 5px
  &__icon
    width: 15px
    height: 15px
    margin-right: 5px
  &__item:not(:last-child) &__points
    min-width: 25px
</style>
