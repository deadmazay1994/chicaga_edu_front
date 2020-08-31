<template>
  <div class="tf-task vue-component">
    <description>{{ inputCopy.description }}</description>
    <table>
      <tr v-for="(tf, index) in inputCopy.body" :key="index">
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
              @click.native="onChangeTask"
            ></v-radio>
            <v-radio
              label="F"
              :class="vRadioStatus(tf)"
              :value="false"
              :color="getColor(tf)"
              @click.native="onChangeTask"
            ></v-radio>
          </v-radio-group>
        </td>
      </tr>
    </table>

    <slot></slot>
  </div>
</template>

<script>
import Description from "./TasksDescription";

import Methods from "@/mixins/tasks";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "tf-task",
  data: function() {
    return {
      task: {},
      inputCopy: {},
      error: true
    };
  },
  methods: {
    ...mapMutations(["saveTask"]),
    check() {
      this.error = false;
      this.inputCopy.body.forEach(e => {
        if (!e.right) {
          e.right = false;
        }
        if (e.correct == e.right) {
          e.error = false;
        } else {
          e.error = true;
          this.error = true;
        }
      });
      this.$forceUpdate();
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
    },
    update(data) {
      this._data = data;
    }
  },
  computed: { ...mapGetters(["socket"]) },
  components: {
    Description
  },
  props: ["input", "index"],
  mixins: [Methods],
  beforeMount() {
    this.setInputCopy();
  }
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
