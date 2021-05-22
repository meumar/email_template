<template>
  <div>
    <el-form>
      <el-row :gutter="50">
        <el-col :span="24">
          <div class="form-group">
            <td>
              {{data.text}}
            </td>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
    };
  },
  mounted() {}
};
</script>

<style lang="scss">
</style>