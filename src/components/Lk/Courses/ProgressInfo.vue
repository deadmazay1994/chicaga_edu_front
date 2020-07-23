<template>
  <div class="progress-info vue-component">
    <v-progress-linear
      class="my-4"
      :striped="true"
      height="7"
      rounded
      :value="(complite / all) * 100"
    />
    <div class="text-subtitile-2 blue--text">
      Пройденно уроков {{ complite }} из
      {{ all }}
    </div>
  </div>
</template>

<script>
export default {
  name: "progress-info",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
  props: ["all", "complite"],
  mixins: {},
  beforeMount() {}
};
</script>
