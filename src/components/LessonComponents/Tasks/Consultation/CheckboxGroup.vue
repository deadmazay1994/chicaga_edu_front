<template>
  <div class="checkbox-group vue-component">
    <checkbox
      class="checkbox-group__checkbox"
      v-for="(option, i) in options"
      :status="status"
      :click="active"
      :disabled="checked && oneAttempt"
      @click.native="Do('switchActive', [i])"
      :key="i"
      ref="checkbox"
    >
      {{ option.text }}
    </checkbox>
  </div>
</template>

<script>
import Checkbox from "./Checkbox";

export default {
  name: "checkbox-group",
  data: function() {
    return {
      activeBox: null,
      status: null,
      checked: false
    };
  },
  methods: {
    check() {
      this.status = this.activeBox.correct;
      this.checked = true;
    },
    switchActive(i) {
      if (this.oneAttempt && !this.checked) {
        if (!this.multiple) {
          this.unsetAllBoxesExcept(i);
        }
        this.activeBox = this.options[i];
        this.check();
        this.$emit("change", this.activeBox);
      }
    },
    unsetAllBoxesExcept(i) {
      this.$refs.checkbox.forEach((box, index) => {
        if (i != index) box.unset();
      });
    }
  },
  computed: {},
  components: {
    Checkbox
  },
  model: {
    prop: "active",
    event: "change"
  },
  props: ["options", "active", "multiple", "index", "one-attempt"],
  mixins: {},
  beforeMount() {
    this.statusCopy = this.staus;
    let uniqComponent = true;
    this.onDo("switchActive", uniqComponent);
  }
};
</script>

<style scoped="scoped" lang="sass">
.checkbox-group
  &__checkbox
    width: 33%

@media (max-width:580px)
  .checkbox-group__checkbox
    width: 100%
</style>
