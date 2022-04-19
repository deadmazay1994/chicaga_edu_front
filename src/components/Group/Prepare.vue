<template>
  <div class="prepare">
    <div class="title">Готовы присоединиться?</div>
    <div class="buttons">
      <router-link
        :to="link"
        @click.native="returnValue()"
        tag="button"
        :disabled="timeStrGetMinutes(time) > 10"
        >Присоединиться</router-link
      >
    </div>
  </div>
</template>

<script>
import api from "@/mixins/api";

export default {
  name: "Prepare",
  props: ["event", "time", "titleText", "room"],
  data() {
    return {
      course_id: null,
      id: null,
      link: null,
      access: null
    };
  },
  methods: {
    timeStrGetMinutes(seconds) {
      return Math.floor((seconds % 3600) / 60);
    },
    async setParams() {
      let r = await api.methods.getFullLesson(this.$route.params.id);
      this.course_id = r.course_id;
      this.id = r.uniq_id;
    },
    lessonAccessCheck(access) {
      if (access) {
        this.link = `/lesson/${this.$route.params.id}/${this.$route.params.code}`;
        this.access = true;
      } else {
        this.link = "/";
        this.access = false;
      }
    },
    returnValue() {
      if (!this.room) return;
      this.$emit("ready");
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setParams();
    });
    if (this.room) this.link = this.room;
    else this.lessonAccessCheck(true); // получаем доступ к уроку здесь (пока метода нет - передаем true/false)
  }
};
</script>

<style lang="scss" scoped>
.prepare {
  margin-top: 1rem;
  background: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .title {
    font-size: 18px;
    text-align: center;
  }
  .sub-title {
    font-size: 14px;
    margin-top: 0.5rem;
    text-align: center;
  }
  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      background: #ff0000;
      border-radius: 40px;
      margin-top: 1rem;
      padding: 0.5rem 1.5rem;
      transition: all 0.5s ease;
      color: #ffffff;
      -webkit-box-shadow: 3px 3px 15px 3px #ffffff80 inset;
      -moz-box-shadow: 3px 3px 15px 3px #ffffff80 inset;
      box-shadow: 3px 3px 15px 3px #ffffff80 inset;
      &:disabled {
        background: #fab5b4;
        -webkit-box-shadow: inset 3px 3px 15px 3px rgba(255, 245, 245, 0.5);
        -moz-box-shadow: inset 3px 3px 15px 3px rgba(255, 245, 245, 0.5);
        box-shadow: inset 3px 3px 15px 3px rgba(255, 245, 245, 0.5);
        pointer-events: none;
      }
    }
  }
}
</style>
