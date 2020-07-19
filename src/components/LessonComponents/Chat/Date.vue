<template>
  <div class="date-chat vue-component">
    <div class="date-chat__date">{{ date }}</div>
  </div>
</template>

<script>
export default {
  name: "date-chat",
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
  props: ["date"],
  mixins: {},
  beforeMount() {}
};
</script>

<style scoped="scoped">
.date-chat {
  text-align: center;
  margin-bottom: 20px;
  color: #96aeba;
  font-size: 0.9rem;
  position: relative;
}
.date-chat__date {
  background: #fff;
  display: inline-block;
  z-index: 2;
  position: relative;
  padding: 0 10px;
}
.date-chat:last-child {
  margin-bottom: 0;
}
.date-chat:after {
  display: block;
  content: "";
  width: 100%;
  position: absolute;
  height: 1px;
  background: #e3eaee;
  bottom: 45%;
}
</style>
