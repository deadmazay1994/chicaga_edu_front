<template>
  <section class="sc-lessons-bud">
    <div class="container">
      <v-card class="front" v-if="!timeToLesson && !lesson">
        <v-skeleton-loader type="article" />
      </v-card>
      <div v-else class="d-flex main-content">
        <div class="video-wrapper">
          <!-- Здесь будет компонент видеочата -->
        </div>
        <div class="countdown d-flex flex-column">
          <div class="lesson-starts" v-show="lesson">
            <div class="d-flex justify-content-center center">
              <counter class="counter" :current-time="timeToLesson" />
            </div>
            <div class="date-info">
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
          <prepare />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Counter from "@/components/Group/Counter";
import moment from "moment";
import dateFormat from "dateformat";
import api from "@/mixins/api";
import Prepare from "./Prepare.vue";

export default {
  name: "Upcoming",
  data() {
    return {
      timeToLesson: Infinity,
      dateLesson: String,
      timeLesson: String,
      timerId: false,
      lesson: null,
      DateLessonTime: new Date(),
    };
  },
  methods: {
    // Start countdown
    startTimer() {
      if (!this.lesson) return;
      this.timeToLesson = Math.floor(
        (+this.DateLessonTime - +new Date()) / 1000
      );
      this.timerId = setInterval(() => {
        this.redirectToLessonIfLessonStart();
        this.timeToLesson--;
      }, 1000);
    },
    setDateAndTime() {
      let d = this.DateLessonTime;
      this.dateLesson = dateFormat(d, "yyyy.mm.dd");
      this.timeLesson = dateFormat(d, "HH:MM");
    },
    // Get lesson by academig croup id
    async setLesson() {
      let r = await api.methods.getFullLesson(this.$route.params.id);
      if (r.success && r.start) {
        this.lesson = r;
        this.lesson.start = parseInt(r.start) * 1000; // convert to ms
      } else {
        this.lesson = r;
        this.lesson["start"] = Date.now() + 1;
      }
      return true;
    },

    // Redirect lesson if it's start
    redirectToLessonIfLessonStart() {
      let tenMinutes = 600;
      if (tenMinutes > this.timeToLesson) {
        let course_id = 0;
        if (
          this.lesson.course_id != null &&
          this.lesson.course_id != undefined
        ) {
          course_id = this.lesson.course_id;
        }
        this.$router.push({
          name: "lesson",
          params: {
            courseId: course_id,
            userid: this.$route.params.code,
            id: this.lesson.uniq_id,
          },
          // path: `../../lesson/${course_id}/${this.lesson.uniq_id}/${this.$route.params.code}`,
        });
        clearInterval(this.timerId);
      }
    },
  },
  components: {
    Counter,
    Prepare
  },
  async beforeMount() {
    await this.setLesson();
    // this.DateLessonTime =
    //   this.lesson.start > Date.now()
    //     ? moment(this.lesson.start).valueOf()
    //     : Date.now() + 1;
    if (this.$route.params.startTime) {
      this.DateLessonTime = moment(
        new Date(parseInt(this.$route.params.startTime))
      ).valueOf();
    }
    this.redirectToLessonIfLessonStart();
    this.startTimer();
    this.setDateAndTime();
  },
};
</script>

<style lang="scss" scoped>
.lesson-starts {
  display: inline-block;
  background: #f8f8f8;
  border-radius: 12px;
  width: 100%;
  text-align: center;
  padding: 23px 50px 19px 50px;
  margin-bottom: 8px;
  h4 {
    padding: 7px 0;
  }
}

.date-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 12px 0;
  span {
    display: flex;
    align-items: center;
    margin: 0 12;
    img {
      margin-right: 5px;
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
.main-content {
  height: 100%;
  .video-wrapper {
    width: 50%;
    height: 100%;
  }
  .countdown {
    width: 50%;
    height: 100%;
    justify-content: space-evenly;
  }
}

@media (max-width: 900px) {
  .main-content {
    flex-direction: column;
    .video-wrapper {
      width: 100%;
    }
    .countdown {
      width: 100%;
    }
  }
}
</style>
