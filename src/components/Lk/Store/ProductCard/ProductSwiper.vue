<template>
  <div class="product-card__img-side">
    <swiper class="product-card__img-container" :options="swiperOptions">
      <swiper-slide
        class="product-card__img-inner"
        v-for="(src, index) in productImages"
        :key="index"
      >
        <img :src="src" alt="hoodie" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper/src";
import "swiper/swiper-bundle.min.css";

export default {
  name: "product-swiper",
  components: {
    swiper,
    swiperSlide
  },
  data: function() {
    return {
      swiperOptions: {
        direction: "horizontal",
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  props: {
    productImages: Array
  },
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="scss">
@import "@/assets/styles/variables.sass";
.product-card__img-side {
  // flex-basis: 252px;
  // flex-grow: 0;
  width: 252px;
  margin-right: 50px;
  padding-top: 24px;

  @media ($media_sm) {
    margin-right: 0;
    margin-bottom: 30px;
  }
}

.product-card__img-inner {
  width: 202px;
  height: 313px;
  margin-bottom: 30px;

  @media ($media_sm) {
    margin-right: auto;
    margin-left: auto;
  }
}

.product-card__img-inner img {
  width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.product-card__dots {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  z-index: 2;
}

.product-card__dot {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  border-radius: 50%;
}

.product-card__dot::before {
  content: "";
  width: 8px;
  height: 8px;
  background-color: $gray;
  border: 2px solid $gray;
  border-radius: inherit;
  transition-property: background-color, width, height, opacity;
  transition-duration: 0.3s;
}

.product-card__dot--active::before {
  width: 14px;
  height: 14px;
  background-color: transparent;
}

.product-card__dot:hover::before {
  opacity: 0.7;
}
</style>

<style lang="sass">
.swiper-pagination
  display: flex
  align-items: center
  justify-content: center
  bottom: 0px
.swiper-pagination-bullet
  background: #808080
  opacity: 1
  transition-property: background-color, opacity
  transition-duration: 0.3s
  margin: 0 6px !important
  &:hover
    opacity: .7
.swiper-pagination-bullet-active
  background: transparent
  border: 2px solid #808080
  height: 14px
  width: 14px
  margin: 2px !important
</style>
