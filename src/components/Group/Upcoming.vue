<template>
  <section class="sc-lessons-bud">
    
    <div class="container">
    <v-card class="front" v-if="!timeToLesson">
      <v-skeleton-loader type="article" />
    </v-card>
      <div v-else class="row">
        <div class="lesson-starts" v-show='lesson'>
          <div class="d-flex justify-content-center center">
            <counter
              class="counter"
              :current-time="timeToLesson"
            />
          </div>
          <div class="date-info" >
            <span class="main--text"
              ><img src="@/assets/svg/cal_icon.svg" alt="" />
              {{ this.dateLesson }}</span
            >
            <span class="main--text"
              ><img src="@/assets/svg/time_icon.svg" alt="" />
              {{ this.timeLesson }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Counter from '@/components/Group/Counter'
import moment from 'moment'
import dateFormat from 'dateformat'
import api from '@/mixins/api'

export default {
  name: 'Upcoming',
  data() {
    return {
      timeToLesson: Infinity,
      dateLesson: String,
      timeLesson: String,
      timerId: false,
      lesson: null,
      DateLessonTime: new Date()
    }
  },
  methods: {
    // Start countdown
    startTimer() {
      if (!this.lesson) return
      this.timeToLesson = Math.floor(
        (+this.DateLessonTime - +new Date()) / 1000
      )
      this.timerId = setInterval(() => {
        this.redirectToLessonIfLessonStart()
        this.timeToLesson--
      }, 1000)
    },
    setDateAndTime() {
      let d = this.DateLessonTime
      this.dateLesson = dateFormat(d, 'yyyy.mm.dd')
      this.timeLesson = dateFormat(d, 'HH:MM')
      console.log(this.DateLessonTime)
    },
    // Get lesson by academig croup id
    async setLesson() {
      let r = await api.methods.getFullLesson(this.$route.params.uniq_id)
      console.log('Response',r)
      // if (!r.start) return
      // hardcoded start time
      //this.lesson = r
      this.lesson = { start_time: 1639443736 * 1000}
      return true
    },
    
    // Redirect lesson if it's start
    // TODO: Make correct redirect link
    redirectToLessonIfLessonStart() {
      let tenMinutes = 600
      if (tenMinutes > this.timeToLesson) {
        this.$router.push({ path:'/'})
        clearInterval(this.timerId)
      }
    }
  },
  components: {
    Counter,
  },
  async beforeMount() {
    await this.setLesson()
    this.DateLessonTime = moment(this.lesson.start_time).valueOf()
    this.redirectToLessonIfLessonStart()
    this.startTimer()
    this.setDateAndTime()
  }
}
</script>

<style lang="scss" scoped>

.lesson-starts {
  margin-top: 10px;
  display: inline-block;
  width: 100%;
  background: #f8f8f8;
  border-radius: 12px;
  text-align: center;
  padding: 23px 50px 19px 50px;
  margin-bottom: 8px;
  h4 {
    padding: 7px 0;
  }
}

.date-info {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 12px 0;
  span {
    display: flex;
    align-items: center;
    margin: 0 12px;
    img {
      margin-right: 10px;
    }
  }
}

.tip-box {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 12px 24px 12px 32px;
  background: #ddf1fd;
  border-radius: 12px;
  align-items: center;
  margin-bottom: 8px;
  padding: 10px 24px 10px 32px;
  h4 {
    margin-bottom: 0;
    display: flex;
    align-items: center;
    img {
      margin-right: 14px;
    }
  }
}

.do-homework {
  // font-family: $mb;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.02em;
  color: #1da1f2;
  text-decoration: none;
  transition: 0.2s;
  &:hover {
    color: #8ed0f9;
  }
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
