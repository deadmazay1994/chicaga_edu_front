<template>
  <div class="swiper-arrow" @click="clickElem">
    <svg
      v-if="left"
      width="12"
      height="20"
      viewBox="0 0 12 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.94817 10.0042L11.4301 2.52195C11.6361 2.31642 11.7495 2.04163 11.7495 1.74862C11.7495 1.45545 11.6361 1.18081 11.4301 0.974961L10.7745 0.319677C10.5688 0.113498 10.2939 1.79986e-06 10.0009 1.74863e-06C9.70785 1.6974e-06 9.43322 0.113498 9.22736 0.319676L0.318905 9.22797C0.112239 9.43447 -0.000931967 9.71041 -0.000118997 10.0037C-0.000932042 10.2984 0.112076 10.574 0.318905 10.7806L9.21907 19.6803C9.42492 19.8865 9.69955 20 9.99272 20C10.2857 20 10.5604 19.8865 10.7664 19.6803L11.4218 19.025C11.8483 18.5985 11.8483 17.9042 11.4218 17.4779L3.94817 10.0042Z"
        fill="#A22B21"
      />
    </svg>
    <svg
      v-if="right"
      width="12"
      height="20"
      viewBox="0 0 12 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.80121 9.99577L0.319264 17.4781C0.113248 17.6836 -8.4197e-05 17.9584 -8.41577e-05 18.2514C-8.41184e-05 18.5446 0.113248 18.8192 0.319264 19.025L0.974873 19.6803C1.18056 19.8865 1.45553 20 1.74853 20C2.04154 20 2.31617 19.8865 2.52203 19.6803L11.4305 10.772C11.6371 10.5655 11.7503 10.2896 11.7495 9.99626C11.7503 9.70163 11.6373 9.42602 11.4305 9.21935L2.53032 0.319678C2.32446 0.1135 2.04983 2.75532e-06 1.75666 2.78095e-06C1.46365 2.80657e-06 1.18902 0.1135 0.983002 0.319678L0.327555 0.974963C-0.0989491 1.40147 -0.098949 2.09577 0.327555 2.52212L7.80121 9.99577Z"
        fill="#A22B21"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "SwiperArrow",
  props: {
    left: Boolean,
    right: Boolean
  },
  methods: {
    clickElem() {
      this.$emit("clickElem");
    }
  }
};
</script>

<style lang="sass" scoped>
.swiper-arrow
  cursor: pointer
  display: flex
  align-items: center
  justify-content: center
  svg
    width: 8px
    height: 14px
  path
    fill: #FF0000
</style>
