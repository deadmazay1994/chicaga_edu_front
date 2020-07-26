<template>
  <div class="tf-task vue-component">
    <description>{{ input.description }}</description>
    <table>
      <tr v-for="tf in input.body.tasks" :key="tf.text">
        <td class="table-item" :class="statusClass(tf)">
          <span class="mr-5">{{ tf.text }}</span>
        </td>
        <td class="table-item" :class="statusClass(tf)">
          <v-radio-group row v-model="tf.correct" :mandatory="false">
            <v-radio
              label="T"
              :class="vRadioStatus(tf)"
              :value="true"
              :color="getColor(tf)"
            ></v-radio>
            <v-radio
              label="F"
              :class="vRadioStatus(tf)"
              :value="false"
              :color="getColor(tf)"
            ></v-radio>
          </v-radio-group>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Description from "./TasksDescription";

export default {
  name: "tf-task",
  data: function() {
    return {
      task: {}
    };
  },
  methods: {
    check() {
      this.input.body.tasks.forEach(e => {
        if (e.correct == e.right) {
          e.error = false;
        } else {
          e.error = true;
        }
      });
    },
    checkQuesion() {
      this.input.body.questions.forEach(e => {
        if (e.answer == e.userAnswer) {
          e.correct = true;
        } else {
          e.correct = false;
        }
      });
    },
    statusClass(tf) {
      return {
        "table-item--correct": tf.error == 0,
        "table-item--uncorrect": tf.error == 1
      };
    },
    getColor(tf) {
      if (tf.error != null) {
        return "white";
      }
    },
    vRadioStatus(tf) {
      return { "v-radio--white": tf.error != null };
    }
  },
  computed: {},
  components: {
    Description
  },
  props: ["input"],
  mixins: {}
};
</script>

<style scoped="scoped">
.question-field {
  width: 100px;
}
</style>

<style lang="sass">
.v-radio--white label
  color: #fff !important
</style>
