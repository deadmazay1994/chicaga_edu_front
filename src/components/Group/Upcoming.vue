<template>
  <section class="sc-lessons-bud">
    <div class="container">
      <v-card class="front" v-if="!timeToLesson && !lesson">
        <v-skeleton-loader type="article" />
      </v-card>
      <div v-else class="d-flex main-content">
        <div class="video-wrapper" v-if="showComponent">
          <web-cam :roomId="roomId" />
        </div>
        <div class="countdown d-flex flex-column">
          <lesson-starts
            :event="lesson"
            :date="dateLesson"
            :exactTime="timeLesson"
            :time="timeToLesson"
          />
          <prepare :event="lesson" :roomId="roomId" :time="timeToLesson" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from "moment";
import dateFormat from "dateformat";
import api from "@/mixins/api";
import Prepare from "./Prepare";
import LessonStarts from "./LessonStarts.vue";
import WebCam from "../LessonComponents/WebCam/WebCam.vue";

export default {
  name: "Upcoming",
  data() {
    return {
      timeToLesson: Infinity,
      dateLesson: String,
      timeLesson: String,
      timerId: false,
      lesson: null,
      DateLessonTime: new Date()
    };
  },
  props: {
    showComponent: Boolean
  },
  computed: {
    roomId() {
      return (
        String(this.$route.params.id) + String(Math.floor(Math.random() * 1000))
      );
    }
  },
  methods: {
    // Start countdown
    startTimer() {
      if (!this.lesson) return;
      this.timeToLesson = Math.floor(
        (+this.DateLessonTime - +new Date()) / 1000
      );
      this.timerId = setInterval(() => {
        // this.redirectToLessonIfLessonStart();
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
    }
  },
  components: {
    Prepare,
    LessonStarts,
    WebCam
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
    this.startTimer();
    this.setDateAndTime();
  }
};
</script>

<style lang="scss" scoped>
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
    flex: 1;
    height: 100%;
  }
  @media (max-width: 900px) {
    .video-wrapper {
      margin-bottom: 2rem;
    }
  }
  .countdown {
    flex: 1;
    align-items: center;
    justify-content: space-between;
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
