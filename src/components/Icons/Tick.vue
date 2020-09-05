<template>
  <div class="tick vue-component">
    <svg
      version="1.1"
      id="Capa_1"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      style="enable-background:new 0 0 512 512;"
      xml:space="preserve"
    >
      <g transform="translate(1 1)">
        <g>
          <g>
            <path
              :fill="color ? color : '#fff'"
              d="M489.667-1H20.333C8.551-1-1,8.551-1,20.333v469.333C-1,501.449,8.551,511,20.333,511h469.333
				c11.782,0,21.333-9.551,21.333-21.333V20.333C511,8.551,501.449-1,489.667-1z M468.333,468.333H41.667V41.667h426.667V468.333z"
            />
            <path
              v-if="tickActive"
              :fill="color ? color : '#fff'"
              d="M216.6,353.133c7.789,10.386,22.972,11.465,32.152,2.285l149.333-149.333c8.331-8.331,8.331-21.839,0-30.17
				s-21.839-8.331-30.17,0l-131.94,131.94L186.733,242.2c-7.069-9.426-20.441-11.336-29.867-4.267
				c-9.426,7.069-11.336,20.441-4.267,29.867L216.6,353.133z"
            />
          </g>
        </g>
      </g>
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
    </svg>
  </div>
</template>

<script>
export default {
  name: "tick",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
  props: ["color", "tickActive"],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass">
svg
  max-width: 100%
  height: auto
</style>
