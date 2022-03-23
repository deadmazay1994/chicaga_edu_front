<template>
  <snackbar
    ref="snackbar"
    baseSize="100px"
    :wrapClass="'snackbar-wrapper'"
    :colors="{open: '#333',info: '#3DBD7D',error: '#FA7377',warn: '#FF6600'}"
    :holdTime="3000"
    :multiple="true"
    :position="'bottom-right'"
  />
</template>

<script>
import { mapGetters } from "vuex";
import Snackbar from "vuejs-snackbar";

export default {
  name: "Notifications",
  computed: {
    ...mapGetters(["snuckbars", "snuckbarsActive"])
  },
  components: { Snackbar },
  mounted() {
    console.log(this.$refs.snackbar.info);
    this.$refs.snackbar.info("msg");
  }
};
</script>

<style lang="sass" scoped>
</style>
