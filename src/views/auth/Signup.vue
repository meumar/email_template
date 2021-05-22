<template>
  <div>
    <section id="signUp-page">
      <div class="logo">
        <!-- <img src="../../assets/rhymtech_logo_2.png" alt="" /> -->
      </div>
      <el-row type="flex" align="middle" class="flex-wrap">
        <el-col :xl="12" :lg="12" :md="12" class="right-block hidden-sm-up">
          <div class="logo ml-3">
            <img src="../../assets/img/logo.svg" alt="Logo" width="200" />
          </div>
          <div class="image mt-4">
            <img src="@/assets/img/sign-up.svg" alt="bg" />
          </div>
        </el-col>
        <el-col :xl="12" :lg="12" :md="12" :sm="24" class="left-block">
          <div class="login-form">
            <div class="login-info">
              <h3 class="title">Sign Up Today</h3>
              <p class="description">
                Create an account on EmailMill to manage your email campaigns
                here.
              </p>
            </div>
            <el-form
              :model="formData"
              :rules="loginRules"
              ref="ruleForm"
              @keyup.enter.native="submitForm('ruleForm')"
            >
              <el-form-item class="mb-1" label="Your Email" prop="username">
                <el-input
                  v-model="formData.username"
                  placeholder="Write your email"
                ></el-input>
                <span
                  class="error-message"
                  v-if="getErrors && getErrors['username']"
                  >{{ this.getErrors["username"] }}</span
                >
              </el-form-item>
              <el-form-item
                class="mb-05"
                label="Choose a password"
                prop="password"
              >
                <el-input
                  v-model="formData.password"
                  type="password"
                  placeholder="Enter password"
                  show-password
                  @input="passwordValidation"
                ></el-input>
                <span
                  class="error-message"
                  v-if="getErrors && getErrors['password']"
                  >{{ this.getErrors["password"] }}</span
                >
                <div class="instruction-checklist">
                  <div v-bind:class="{'each-instruction':true, 'active':isPasswordLenghtAccept}">
                    <i v-bind:class="{'el-icon-close':true, 'el-icon-check':isPasswordLenghtAccept}"></i>
                    <span class="text">be atleast 8 characters long</span>
                  </div>
                </div>
              </el-form-item>
              <el-form-item class="mb-05">
                <el-checkbox v-model="checked" class="text-dark"
                  >I agree to
                  <a href="#">terms &amp; conditions</a></el-checkbox
                >
              </el-form-item>
              <el-form-item style="margin-bottom: 0 !important">
                <el-button
                  type="success"
                  @click="submitForm('ruleForm')"
                  :loading="loading"
                  class="login-btn"
                >
                  <span>Sign Up for free</span>
                </el-button>
              </el-form-item>
              <p class="error-message" v-if="getErrors && getErrors['error']">
                {{ getErrors["error"] }}
              </p>
              <div class="blue-dark mt-15 text-center xl-text">
                Do you already have an account?
                <router-link to="/login" class="xl-text">Log In</router-link>
              </div>
            </el-form>
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
      isPasswordLenghtAccept:false,
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
      checked: false,
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("auth/reset");
  },
  methods: {
    passwordValidation(){
      this.formData.password.length > 7 ? this.isPasswordLenghtAccept= true : this.isPasswordLenghtAccept = false;
    },
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
#signUp-page {
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
    margin-top: 1em !important;
    .login-info {
      margin-bottom: 40px;
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
      background: #089a08;
      border-color: #089a08;
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
  .instruction-checklist {
    margin-top: 1em;
    .each-instruction {
      list-style: none;
      font-weight: 400;
      margin-bottom: 0.5em;
      line-height: 1.25 !important;
      display: flex;
      align-items: center;
      i {
        display: inline-block;
        color: #f1527e;
        padding-right: 10px;
      }
      &.active {
        color: #27ae60;
        i {
          color: #27ae60;
        }
      }
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
</style>
