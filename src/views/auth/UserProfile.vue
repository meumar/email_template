<template>
  <section class="user-profile">
    <div class="user-details">
      <div class="inner-navbar">
        <el-row type="flex" align="middle">
          <el-col :span="12">
            <h3><span class="el-icon-user"></span>Profile</h3>
          </el-col>
          <el-col :span="12">
            <el-progress :text-inside="true" :stroke-width="26" :percentage="20"></el-progress>
          </el-col>
        </el-row>
      </div>
      <div class="user-form"> 
        <el-row type="flex" align="middle">
          <el-col :offset="6" :span="12">
            <el-input placeholder="Enter Your Name" v-model="form.name"></el-input>
            <el-input placeholder="Enter Mobile Number" v-model="form.mobile"></el-input>
            <!-- <el-input placeholder="Enter Your Company" v-model="form.company"></el-input> -->
             <el-select v-model="form.company" placeholder="Select Company">
              <el-option
                v-for="item in companies"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input placeholder="Enter Your website" v-model="form.website"></el-input>
            <el-button type="primary">Update</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      loading: false,
      companies:[
        {
          name:'MSI',
          value:'MSI'
        },
        {
          name:'Dell',
          value:'DELL'
        }
      ],
      form:{
        name:'',
        mobile:'',
        company:'',
        website:''
      }
    };
  },
  computed: {
    ...mapGetters("users", ["getProfile"]),
    ...mapGetters("users", ["getAuthenticatedUser"]),
  },
  async mounted() {
  
  },
  watch: {
    async $route() {
    
    },
  },
  methods: {
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
  },
};
</script>

<style lang="scss" scoped>
.user-profile {
  height: 90vh;
  position: relative;
  .user-details {
    position: absolute;
    top: 15%;
    left: 0;
    right: 0;
    background: #ffffff;
    border: 1px solid #f1eded;
    border-radius: 10px;
    width: 50%;
    margin: 0 auto;
    padding: 20px;
    .inner-navbar {
      margin-bottom: 50px;
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
      .edit-btn {
        border: 1px solid #1667a3;
        padding: 7px 20px;
        border-radius: 30px;
        color: #1667a3;
        text-transform: uppercase;
        float: right;
        transition: all 0.2s ease-in-out;
        span {
          padding-right: 5px;
        }
        &:hover {
          background: #1667a3;
          color: #fff;
        }
      }
    }
    .each-detail {
      margin-bottom: 40px;
      .label {
        font-size: 1.1em;
        display: block;
        margin-bottom: 5px;
        color: #606a7b;
      }
      .detail {
        color: #151522;
        font-weight: 500;
        font-size: 1.15em;
      }
    }
  }
}
</style>
