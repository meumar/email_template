<template>
  <div id="app">
    <component :is="layout">
      <router-view :layout.sync="layout" />
    </component>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "app",
  data() {
    return {
      layout: "div",
    };
  },
  computed: {
    ...mapGetters("navigationOpen", ["getIsOpen", "getIsCollapse"]),
  },
  created() {},
  components: {},
};
</script>
