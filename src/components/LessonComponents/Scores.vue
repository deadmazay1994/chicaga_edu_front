<template>
  <div class="scores vue-component">
    <div
      class="scores__inner"
      :class="{ 'scores__inner--no-design': withoutInner }"
    >
      <div class="scores__item">
        <animated-cool-svg ref="animatedCool" />
        <span class="scores__points">{{ points.smile }}</span>
      </div>

      <div class="scores__item">
        <animated-star-svg ref="animatedStar" />
        <span class="scores__points">{{ points.star }}</span>
      </div>

      <div class="scores__item">
        <animated-brain-svg ref="animatedBrain" />
        <span class="scores__points">{{ points.brain }}</span>
      </div>

      <div class="scores__item">
        <animated-lamp-svg ref="animatedLamp" />
        <span class="scores__points">{{ points.lamp }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
import { mapGetters, mapActions } from "vuex";

import AnimatedCoolSvg from "@/components/Icons/AnimatedCoolSvg";
import AnimatedStarSvg from "@/components/Icons/AnimatedStarSvg";
import AnimatedBrainSvg from "@/components/Icons/AnimatedBrainSvg";
import AnimatedLampSvg from "@/components/Icons/AnimatedLampSvg";

export default {
  name: "scores",
  data: function() {
    return {};
  },
  props: {
    withoutInner: Boolean
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
  watch: {
    points(newValue) {
      gsap.to(this.$data, { duration: 0.5, points: newValue });
    },
    "points.smile": function() {
      this.$refs.animatedCool.animate();
    },
    "points.star": function() {
      this.$refs.animatedStar.animate();
    },
    "points.brain": function() {
      this.$refs.animatedBrain.animate();
    },
    "points.lamp": function() {
      this.$refs.animatedLamp.animate();
    }
  },
  components: {
    AnimatedCoolSvg,
    AnimatedStarSvg,
    AnimatedBrainSvg,
    AnimatedLampSvg
  },
  mixins: {},
  async mounted() {
    await this.setUserPoints();
  }
};
</script>

<style scoped="scoped" lang="sass">
.scores
  display: flex
  justify-content: flex-end
  &__inner
    display: flex
    align-items: center
    padding: 8px 46px
    background-color: #FFFFFF
    box-shadow: 0 4px 10px #F3F3F3
    border-radius: 20px
  &__item
    display: flex
    align-items: center
    font-size: 14px
    line-height: 1
  &__item:not(:last-child)
    margin-right: 40px
  &__points
    margin-left: 8px
    font-weight: 600
    font-size: 14px
    line-height: 16px
  .animated-svg-wrapper
    width: 30px
    height: 30px
</style>
