<template>
  <section id="update-profile" v-loading="loading">
    <div class="user-form">
      <div class="form-title">
        <h3 class="form-title">
          <span class="el-icon-user"></span>
          Update Profile
        </h3>
      </div>
      <el-form :model="formData">
        <el-row :gutter="30">
          <el-col :xl="12" :lg="12" :md="12">
            <label for="">First Name</label>
            <el-form-item>
              <el-input v-model="formData.first_name"></el-input>
              <p
                class="error-message"
                v-if="getErrors && getErrors['first_name']"
              >
                {{ getErrors["first_name"] }}
              </p>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="12">
            <label for="">Last Name</label>
            <el-form-item>
              <el-input v-model="formData.last_name"></el-input>
              <p
                class="error-message"
                v-if="getErrors && getErrors['last_name']"
              >
                {{ getErrors["last_name"] }}
              </p>
            </el-form-item>
          </el-col>
          <el-col
            :xl="12"
            :lg="12"
            :md="12"
            v-if="getAuthenticatedUser.user_type == 'ADMIN'"
          >
            <label for="">Company</label>
            <el-form-item>
              <!-- <el-input v-model="formData.company"></el-input> -->
              <el-select placeholder="Select Company" v-model="company_values">
                <el-option
                  v-for="(com, index) of getCompanies.data"
                  :key="index"
                  :value="com._id + '-' + com.name"
                  :label="com.name"
                ></el-option>
              </el-select>
              <p class="error-message" v-if="getErrors && getErrors['company']">
                {{ getErrors["company"] }}
              </p>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="12">
            <label for="">Email</label>
            <el-form-item>
              <el-input
                v-model="formData.email"
                auto-complete="false"
              ></el-input>
              <p class="error-message" v-if="getErrors && getErrors['email']">
                {{ getErrors["email"] }}
              </p>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="12">
            <label for="">Phone</label>
            <el-form-item>
              <vue-tel-input
                v-model="mobileData"
                :disabledFetchingCountry="true"
                @input="getPhoneDetails"
              ></vue-tel-input>
              <!-- <el-input v-model="formData.phone"></el-input> -->
              <p class="error-message" v-if="getErrors && getErrors['phone']">
                {{ getErrors["phone"] }}
              </p>
            </el-form-item>
          </el-col>
          <el-col
            :xl="12"
            :lg="12"
            :md="12"
            v-if="
              ['SUPER_ADMIN', 'ADMIN'].indexOf(
                getAuthenticatedUser.user_type
              ) != -1
            "
          >
            <label for="">Select Role</label>
            <el-select placeholder="Select Role" v-model="formData.user_type">
              <el-option
                v-for="(user_type, index) of user_types"
                :key="index"
                :value="user_type.value"
                :label="user_type.name"
              ></el-option>
            </el-select>
            <p class="error-message" v-if="getErrors && getErrors['user_type']">
              {{ getErrors["user_type"] }}
            </p>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :xl="6" :lg="6" :md="8">
            <el-form-item>
              <el-button
                type="primary"
                @click="updateProfile()"
                :loading="loading"
              >
                <span>Update</span>
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="6" :md="8" :offset="1">
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
        <p class="error-message" v-if="getErrors && getErrors['error']">
          {{ getErrors["error"] }}
        </p>
      </el-form>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "login",
  data() {
    return {
      loading: false,
      mobileData: null,
      company_values: "",
      formData: {
        first_name: "",
        last_name: "",
        email: "",
        company: "",
        username: "",
        phone: "",
        region: "",
        company_id: "",
        user_type: "",
      },
      user_types: [
        {
          name: "Super Admin",
          value: "SUPER_ADMIN",
        },
        {
          name: "Super User Analyst",
          value: "SUPER_USER_ANALYST",
        },
        {
          name: "Super User Read Only",
          value: "SUPER_USER_READ_ONLY",
        },
        {
          name: "User",
          value: "CLIENT_USER",
        },
        {
          name: "Vendor",
          value: "VENDOR",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("users", [
      "getProfile",
      "getUpdateProfileStatus",
      "getErrors",
    ]),
    ...mapGetters("company", ["getCompanies"]),
    ...mapGetters("auth", ["getAuthenticatedUser"]),
    user_id() {
      if (this.$route.params.user_id) {
        return this.$route.params.user_id;
      }
      return null;
    },
  },

  created() {},
  async mounted() {
    // if(getAuthenticatedUser.user_type == 'ADMIN'){
    //   await this.fetchCompanies();
    // }
    if (!this.$route.query.user_id) {
      await this.fetchCompanies();
    }
    await this.fetchProfile();
    this.profileData = { ...this.getProfile.data };
    this.setFormData();
  },
  methods: {
    async fetchCompanies() {
      if (
        this.getAuthenticatedUser &&
        ['SUPER_ADMIN', 'ADMIN'].indexOf(this.getAuthenticatedUser.user_type) != -1
      ) {
        await this.$store.dispatch("company/fetchCompanies");
      }
    },
    getPhoneDetails(string, data) {
      this.formData.country_code = "+" + data.country.dialCode;
      this.formData.phone = data.number.significant;
      this.formData.region = data.regionCode;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async updateProfile() {
      this.loading=true;
      if (['SUPER_ADMIN', 'ADMIN'].indexOf(this.getAuthenticatedUser.user_type) != -1) {
        let value = this.company_values;
        let var1 = value.split("-");
        this.formData.company_id = var1[0].trim();
        this.formData.company = var1[1];
      }
      if (this.user_id) {
        this.formData.id = this.user_id;
      }
      await this.$store.dispatch("users/updateProfile", this.formData);
      if (this.getUpdateProfileStatus && this.getUpdateProfileStatus.success) {
        this.$notify.success({
          title: "Success",
          message: this.getUpdateProfileStatus.message,
        });
        if (this.getAuthenticatedUser.user_type === "CLIENT_USER") {
          this.$router.push({
            name: "user-profile",
            path: "/user-profile",
            params: { user_id: this.user_id },
          });
        } else {
          this.$router.push({ name: "CompanyProfile", path: "/company" });
        }
      }
      this.loading=false;
    },
    async fetchProfile() {
      this.loading = true;
      let params = {};
      if (this.user_id) {
        params.id = this.user_id;
      }
      await this.$store.dispatch("users/fetchProfile", params);
      this.loading = false;
      this.profileData = this.getProfile.data;
    },
    setFormData() {
      this.formData.first_name = this.profileData.first_name;
      this.formData.last_name = this.profileData.last_name;
      this.company_values =
        this.profileData.company_id.trim() +
        "-" +
        this.profileData.company.trim();
      this.formData.company_id = this.profileData.company_id;
      this.formData.company = this.profileData.company;
      this.formData.email = this.profileData.email;
      this.formData.username = this.profileData.username;
      this.formData.user_type = this.profileData.user_type;
      if (this.profileData.phone) {
        this.formData.phone = this.profileData.phone;
        if (this.profileData.country_code) {
          this.formData.country_code = this.profileData.country_code;
        } else {
          this.formData.country_code = "+91";
        }
        if (this.profileData.region) {
          this.formData.region = this.profileData.region;
        } else {
          this.formData.region = "IN";
        }
        let code = this.profileData.country_code
          ? this.profileData.country_code
          : "+91";
        this.mobileData = code + " " + this.profileData.phone;
      }
    },
    goBack() {
      this.$route.go(-1);
    },
  },
};
</script>

<style lang="scss">
#update-profile {
  height: 90vh;
  position: relative;
  .el-select {
    width: 100%;
  }
  .form-title {
    font-size: 1.2em !important;
    letter-spacing: 0 !important;
  }
  .vue-tel-input {
    border: 1px solid #ecebed;
    input {
      border-radius: 0 !important;
      border-top: none !important;
      border-bottom: none !important;
      border-right: none !important;
      height: 46px !important;
    }
  }
  .user-form {
    position: absolute;
    top: 15%;
    left: 0 !important;
    right: 0 !important;
    background: #ffffff;
    border: 1px solid #f1eded;
    border-radius: 10px;
    width: 60% !important;
    margin: 0 auto;
    padding: 20px;
    .error-message {
      padding-top: 3px;
      margin: 0;
      color: #d82525;
    }
    label {
      margin-bottom: 5px;
      line-height: 25px;
      color: #0b4ec0;
      display: block;
      font-size: 14px;
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
      // box-shadow: 0px 7px 40px rgba(0, 0, 0, 0.07);
    }

    .el-button {
      display: block;
      width: 100%;
      background: #1667a3;
      padding: 15px 0;
      margin-top: 25px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      transition: all 0.5s ease-in-out;
      border: none;
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
}
@media (max-width: 768px) {
  .update-profile .user-form {
    width: 85% !important;
    top: 5% !important;
  }
}
</style>
