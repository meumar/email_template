<template>
  <div>
    <section id="login-page">
      <el-row type="flex" align="middle" class="flex-wrap">
        <el-col :xl="13" :lg="13" :md="12" class="right-block hidden-sm-up">
          <div class="logo ml-3">
            <img src="../../assets/img/logo.svg" alt="Logo" width="200" />
          </div>
          <div class="image">
            <img src="@/assets/img/login.svg" alt="bg" />
          </div>
        </el-col>
        <el-col :xl="11" :lg="11" :md="12" :sm="24" class="left-block">
          <div class="login-form">
            <div class="login-info">
              <h3 class="title">Welcome Back!</h3>
              <p class="description">
                Don't have an account?<router-link to="/signup" class="xl-text">Sign up</router-link>
              </p>
            </div>
            <el-form
              :model="formData"
              :rules="loginRules"
              ref="ruleForm"
              @keyup.enter.native="submitForm('ruleForm')"
            >
              <el-form-item label="Email*" prop="username">
                <el-input
                  v-model="formData.username"
                  placeholder="Enter the address"
                ></el-input>
                <span
                  class="error-message"
                  v-if="getErrors && getErrors['username']"
                  >{{ this.getErrors["username"] }}</span
                >
              </el-form-item>
              <el-form-item label="Password" prop="password">
                <el-input
                  v-model="formData.password"
                  placeholder="Password"
                  show-password
                ></el-input>
                <span
                  class="error-message"
                  v-if="getErrors && getErrors['password']"
                  >{{ this.getErrors["password"] }}</span
                >
              </el-form-item>
              <el-form-item style="margin-bottom: 0 !important">
                <el-button
                  type="primary"
                  @click="submitForm('ruleForm')"
                  :loading="loading"
                  class="login-btn"
                >
                  <span>Login to your Account</span>
                  <i class="el-icon-right"></i>
                </el-button>
              </el-form-item>
              <p
                class="error-message pt-1"
                v-if="getErrors && getErrors['error']"
              >
                {{ getErrors["error"] }}
              </p>
              <div class="form-next-page forgot-password mt-05">
                <router-link
                  class="xl-text"
                  to="/request-forgot-password blue-1"
                  >Forgot Password ?</router-link
                >
              </div>
            </el-form>
            <div class="copy-right">
              <p class="mt-4 small-text">
                ©2020 All Right Reserved. EmailMill. <br />Cookie Preferences,
                Privacy, and Terms
              </p>
            </div>
          </div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "login",
  computed: {
    ...mapGetters("auth", [
      "getGeneralErrorMessage",
      "getAuthenticationStatus",
      "getAuthenticatedUser",
      "getErrors",
    ]),
  },

  data() {
    return {
      loading: false,
      formData: {
        username: "",
        password: "",
        err: "",
      },
      loginRules: {
        username: [
          {
            required: true,
            message: "User name is required",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Password is required",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("auth/reset");
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async login() {
      let params = {
        username: this.formData.username,
        password: this.formData.password,
      };

      this.loading = true;
      await this.$store.dispatch("auth/login", params);
      this.loading = false;

      if (this.getAuthenticationStatus) {
        if (
          this.getAuthenticatedUser &&
          this.getAuthenticatedUser.user_type &&
          ["SUPER_ADMIN", "ADMIN"].indexOf(
            this.getAuthenticatedUser.user_type
          ) != -1
        ) {
          this.$router.push({
            path: "/users",
            name: "users",
          });
        } else {
          this.$router.push({ path: "welcome" });
        }
      } else {
        this.formData.err = this.getGeneralErrorMessage;
      }
    },
  },
};
</script>

<style lang="scss">
#login-page {
  height: 100vh;
  position: relative;
  overflow: hidden;
  .logo {
    position: absolute;
    left: 30px;
    top: 30px;
    img {
      max-width: 230px;
    }
  }
  .login-form {
    max-width: 400px;
    margin: 0 auto;
    margin-top: 2em !important;
    .login-info {
      margin-bottom: 30px;
      .title {
        font-size: 1.875em;
        font-weight: 700;
        line-height: 1.75;
        color: #000000;
        margin-bottom: 0px;
      }
      .description {
        margin: 0;
        color: #777;
        line-height: 24px;
        font-size: 1.1em;
        letter-spacing: 0;
        span {
          color: #1667a3;
        }
      }
    }
    .forgot-password {
      float: right;
      padding: 0;
      font-size: 1.2em;
      line-height: 2;
    }
    .login-btn {
      background: #1667a3;
      height: 50px;
      width: 100%;
      font-size: 1.2em;
      font-weight: 500;
      letter-spacing: 0;
      margin-top: 0.5em;
      text-transform: uppercase;
    }
  }
  .el-form-item {
    margin-bottom: 30px;
    .el-input__inner {
      height: 45px !important;
      background: none !important;
      border: 1px solid #777;
    }
    .el-form-item__label {
      line-height: 30px;
    }
  }
  .error-message {
    text-align: center;
    color: red;
    font-weight: 500;
    margin-top: 5px;
    height: 50px;
  }
  .right-block {
    position: relative;

    .shape_1 {
      width: 250px;
      height: 250px;
      background: rgba(255, 255, 255, 0.4);
      display: block;
      border-radius: 50%;
      position: absolute;
      bottom: -100px;
      right: -100px;
    }
    .shape_2 {
      width: 250px;
      height: 250px;
      background: rgba(255, 255, 255, 0.4);
      display: block;
      border-radius: 50%;
      position: absolute;
      bottom: -130px;
      right: -130px;
    }
    .shape_3 {
      width: 250px;
      height: 250px;
      background: rgba(255, 255, 255, 0.4);
      display: block;
      border-radius: 50%;
      position: absolute;
      bottom: -160px;
      right: -160px;
    }
  }
  .left-block {
    position: relative;
    overflow: hidden;
    .shape_1 {
      width: 250px;
      height: 250px;
      background: rgba(22, 103, 163, 0.4);
      display: block;
      border-radius: 50%;
      position: absolute;
      bottom: -100px;
      right: -100px;
    }
    .shape_2 {
      width: 250px;
      height: 250px;
      background: rgba(22, 103, 163, 0.4);
      display: block;
      border-radius: 50%;
      position: absolute;
      bottom: -130px;
      right: -130px;
    }
    .shape_3 {
      width: 250px;
      height: 250px;
      background: rgba(22, 103, 163, 0.4);
      display: block;
      border-radius: 50%;
      position: absolute;
      bottom: -160px;
      right: -160px;
    }
  }

  .el-row {
    height: 100%;
    .right-block {
      background: #edf2fe;
      background: radial-gradient(
        51.61% 64.44% at 24.83% 48.39%,
        #ffffff 0%,
        #edf2fe 100%
      );
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .image {
        img {
          width: 450px;
          margin: 0 auto;
          display: table;
        }
      }
    }
  }
  @media (max-width: 991px) {
    .el-row .right-block {
      display: none;
    }
  }
  @media (max-width: 760px) {
    height: auto !important;
    .login-form {
      padding-left: 30px;
      padding-right: 30px;
      margin-top: 0 !important;
    }
    .logo {
      left: 20px;
      top: 20px;
    }
    .logo img {
      max-width: 250px;
    }
    .description {
      br {
        display: none;
      }
    }
    .left-block {
      height: 100vh;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  @media (min-width: 761px) {
    .left-block {
      .shapes {
        display: none;
      }
    }
  }
}
.copy-right {
  text-align: center;
  margin-top: 10vh;
  p {
    line-height: 1.5;
  }
}
</style>
