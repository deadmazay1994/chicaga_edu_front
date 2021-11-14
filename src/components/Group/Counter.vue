<template>
  <div class="counter vue-component">
    <div class="title">
      <h4 class="main--text">Занятие начнется через</h4>
    </div>
    <div v-html="getTimeStr(currentTime)" class="counter-content"></div>
  </div>
</template>

<script>
export default {
  name: 'timer',
  props: {
    currentTime: Number,
    isOlympiad: Boolean,
    isLesson: Boolean
  },
  data: () => ({
    timerID: null
  }),
  methods: {
    changeTimer() {
      this.timerID = setInterval(() => {
        this.$emit('updateTimer')
        if (this.currentTime === 0) {
          clearInterval(this.timerID)
        }
      }, 1000)
    }
  },
  mounted() {
    this.changeTimer()
  },
  beforeDestroy() {
    clearInterval(this.timerID)
  }
}
</script>

<style lang='scss'>
.counter {
 
  .title {
    font-size: 14px;
    line-height: 18px;
  }

  .counter-content {
    display: flex;
    flex-wrap: wrap;
  }

  .counter-item {
    margin-right: 17px;

    &:last-child {
      margin-right: 0;
    }
  }

  .counter-num {
    font-weight: bold;
    font-size: 32px;
    line-height: 40px;
  }

  .counter-text {
    font-size: 14px;
    line-height: 17px;
    color: #8c8e97;
    text-align: center;
    margin-top: -3px;
  }
}
</style>
