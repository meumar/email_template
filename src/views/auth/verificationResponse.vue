<template>
  <div>
    <section id="verificationResponse" v-if="verificationStatus">
      <p>Email Verification Page</p>
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
      "getEmailVerifyStatus",
      "getErrors",
    ]),
  },

  data() {
    return {
      loading: false,
      verificationStatus: this.$route.params.status
        ? this.$route.params.status
        : null,
    };
  },
  created() {},
  async mounted() {},
  methods: {},
};
</script>

<style lang="scss">
#verificationResponse {
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
    margin-top: 5em !important;
    .login-info {
      margin-bottom: 40px;
      .title {
        font-size: 2em;
        font-weight: 500;
        color: #000;
        margin-bottom: 10px;
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
    .login-btn {
      background: #1667a3;
      height: 50px;
      width: 100%;
      font-size: 1.2em;
      font-weight: 500;
      letter-spacing: 0;
      margin-top: 1.2em;
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
      background: #1667a3;
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
