<template>
  <div>
    <el-form>
      <el-row :gutter="50">
        <el-col :span="24">
          <div class="form-group">
            <td>
                <h1 v-if="data.headingType==='H1'">
                    {{data.headingText}}
                </h1>
                <h2 v-if="data.headingType==='H2'">
                    {{data.headingText}}
                </h2>
                 <h3 v-if="data.headingType==='H3'">
                    {{data.headingText}}
                </h3>
                <h4 v-if="data.headingType==='H4'">
                    {{data.headingText}}
                </h4>
                <h5 v-if="data.headingType==='H5'">
                    {{data.headingText}}
                </h5>
                <h6 v-if="data.headingType==='H6'">
                    {{data.headingText}}
                </h6>
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