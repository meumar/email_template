<template>
  <section class="uppdate-password">
    <div class="user-form">
      <div class="inner-navbar">
        <el-row type="flex" align="middle">
          <el-col :span="12">
            <h3><span class="el-icon-user"></span>Update Password</h3>
          </el-col>
        </el-row>
      </div>
      <el-form :model="formData">
        <el-row>
          <el-col :span="20" :offset="3">
            <el-form-item label="Current Password">
              <el-input
                v-model="formData.current_password"
                type="password"
              ></el-input>
              <p
                class="error-message"
                v-if="getErrors && getErrors['current_password']"
              >
                {{ getErrors["current_password"] }}
              </p>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="3">
            <el-form-item label="New Password">
              <el-input
                v-model="formData.new_password"
                type="password"
              ></el-input>
              <p
                class="error-message"
                v-if="getErrors && getErrors['new_password']"
              >
                {{ getErrors["new_password"] }}
              </p>
            </el-form-item>
          </el-col>
          <el-col :span="20" :offset="3">
            <el-form-item label="Confirm Password">
              <el-input
                v-model="formData.re_enter_new_password"
                type="password"
              ></el-input>
              <p
                class="error-message"
                v-if="getErrors && getErrors['re_enter_new_password']"
              >
                {{ getErrors["re_enter_new_password"] }}
              </p>
              <p class="error-message" v-if="getErrors && getErrors['error']">
                {{ getErrors["error"] }}
              </p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item>
              <el-button
                type="primary"
                @click="updatePassword()"
                :loading="loading"
              >
                <span>Update</span>
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-form-item>
              <el-button
                type="danger"
                @click="$router.go(-1)"
                :loading="loading"
                class="cancel-btn"
              >
                <span>Cancel</span>
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "login",
  computed: {
    ...mapGetters("auth", ["getAddUserStatus"]),
    ...mapGetters("users", ["getErrors", "getPasswordUpdateStatus"]),
  },

  data() {
    return {
      loading: false,
      formData: {
        current_password: "",
        new_password: "",
        re_enter_new_password: "",
      },
    };
  },
  created() {},
  mounted() {
    this.$store.commit("users/setErrors", [], { root: true });
    //this.$store.dispatch("auth/reset");
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async updatePassword() {
      let params = this.formData;
      await this.$store.dispatch("users/updatePassword", params);
      if (
        this.getPasswordUpdateStatus &&
        this.getPasswordUpdateStatus.success
      ) {
        this.$notify.success({
          title: "Success",
          message: this.getPasswordUpdateStatus.message,
        });
        this.$store.dispatch("data/reset");
        this.$store.dispatch("auth/reset");
        this.$store.dispatch("users/reset");
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style lang="scss">
.uppdate-password {
  height: 90vh;
  position: relative;
  .user-form {
    position: absolute;
    top: 15%;
    left: 0 !important;
    right: 0 !important;
    background: #ffffff;
    border: 1px solid #f1eded;
    border-radius: 10px;
    width: 40% !important;
    margin: 0 auto;
    padding: 20px;
    .error-message {
      padding-top: 0;
      margin: 0;
      color: #d82525;
      font-size: 0.9em;
    }
    label {
      margin-bottom: 5px;
      line-height: 25px;
      color: #0b4ec0;
    }
    .form-title {
      color: #1667a3;
      letter-spacing: 2px;
      font-size: 1.5em;
      margin-bottom: 35px;
    }
    input {
      height: 50px;
      background: #ffffff;
      border: 1px solid #ecebed;
      border-radius: 6px;
      width: 90%;
      // box-shadow: 0px 7px 40px rgba(0, 0, 0, 0.07);
    }

    .el-button {
      display: block;
      width: 100%;
      background: #1667a3;
      padding: 18px 0;
      margin-top: 25px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      transition: all 0.5s ease-in-out;
      border: none;
      font-weight: 500;
      position: relative;
      &:hover {
        background: #1667a3;
      }
      .submit-loading {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        img {
          width: 25px;
        }
        span {
          display: inline;
        }
      }
    }
    .cancel-btn {
      background: #ed5e68;
      &:hover {
        background: #fd535f;
      }
    }
    .form-next-page {
      margin-top: 1.5em;
      text-align: right;

      a {
        text-decoration: none;
        color: #858e98;
        font-size: 0.9em;
        letter-spacing: 1px;
      }
    }
  }
  .inner-navbar {
    margin-bottom: 30px;
    position: relative;
    padding-bottom: 10px;
    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -10px;
      background: #ebf0f5;
      height: 1px;
    }
    h3 {
      font-size: 1.3em;
      color: #1667a3;
      span {
        padding-right: 10px;
        color: #1667a3;
      }
    }
  }
}
</style>
