<template>
  <div>
    <div class="icon-block">
      <div class="icon">
        <td>
          <img
            height=100px
            width=150px
            :src="this.data.file"
            alt="icon"
          />
        </td>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["data"],
  computed: {
    selectedValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
  },
  methods: {
  },
  watch: {
  },
  data() {
    return {
      validations: []
    };
  }
};
</script>

<style lang="scss">
</style>