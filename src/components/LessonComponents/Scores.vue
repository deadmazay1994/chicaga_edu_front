<template>
  <div class="scores vue-component task__header__item">
    <div class="task__header__inner">
      <animated-cool-svg ref="animatedCool" />
      <span class="points">{{ points.smile }}</span>
    </div>

    <div class="task__header__inner">
      <animated-star-svg ref="animatedStar" />
      <span class="points">{{ points.star }}</span>
    </div>

    <div class="task__header__inner">
      <animated-brain-svg ref="animatedBrain" />
      <span class="points">{{ points.brain }}</span>
    </div>

    <div class="task__header__inner">
      <animated-lamp-svg ref="animatedLamp" />
      <span class="points">{{ points.lamp }}</span>
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
  name: 'scores',
  data: function() {
    return {}
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
    },
  },
  computed: {
    ...mapGetters(['points'])
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
}
</script>

<style scoped='scoped' lang='sass'>
.scores
  display: inline-flex
  justify-content: space-between
  align-items: center
  align-self: flex-end
  padding: 9px 46px
  background-color: #FFFFFF
  box-shadow: 0 4px 10px #F3F3F3
  border-radius: 20px
</style>
