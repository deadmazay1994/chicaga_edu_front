<script>
export default {
  render() {
    return <div>{this.shapes}</div>;
  },
  methods: {},
  computed: {
    shapes() {
      return this.shapesConfigs.map(config => {
        let node = this.$createElement(config.shapeName, {
          props: {
            config
          }
        });
        return node;
      });
    }
  },
  components: {},
  props: ["shapesConfigs"],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped" lang="sass"></style>
