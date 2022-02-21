<template>
  <div class="counter vue-component">
    <div class="title">
      <h4 class="main--text">{{ (currentTime > 0) ? titlePrepare : titleLate }}</h4>
    </div>
    <div class="counter-content">
      <div class="counter-item">
                <div class="counter-num">{{timeStrGetHours(currentTime)}}</div>
                <div class="counter-text">ЧАС</div>
            </div> 
            <div class="counter-item">
                <div class="counter-num">{{timeStrGetMinutes(currentTime)}}</div>
                <div class="counter-text">МИН</div>
            </div> 
            <div class="counter-item">
                <div class="counter-num">{{timeStrGetSeconds(currentTime)}}</div>
                <div class="counter-text">СЕК</div>
            </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'timer',
  props: {
    currentTime: Number,
  },
  data: () => ({
    timerID: null,
    titlePrepare: "Занятие начнется через",
    titleLate: "Занятие уже началось"
  }),
  methods: {
  
    timeStrUppendZeroToStartStr(str) {
        if (String(str).length == 1) return `0${str}`
        return str
    },
    timeStrGetHours(seconds) {
        return (this.currentTime > 0) ? this.timeStrUppendZeroToStartStr(Math.floor(seconds / 3600)) : this.timeStrUppendZeroToStartStr(0)
    },
    timeStrGetMinutes(seconds) {
        return (this.currentTime > 0) ? this.timeStrUppendZeroToStartStr(
            Math.floor((seconds % 3600) / 60)
        ) : this.timeStrUppendZeroToStartStr(0)
    },
    timeStrGetSeconds(seconds) {
        return (this.currentTime > 0) ? this.timeStrUppendZeroToStartStr((seconds % 3600) % 60) : this.timeStrUppendZeroToStartStr(0)
    },
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
    justify-content: center;
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
