<template>
  <section class="top-navbar">
    <div>
      <ul class="top-menu-list" :class="getCustomClass()">
        <li>
          <div class="page-title">
            <h1>
              <span
                id="burger"
                :class="getIsOpen ? '' : 'active'"
                @click="openSideNav"
              >
                <span class="left-menu-arrow" v-if="!getIsOpen">
                  <img src="@/assets/left.svg" alt="open" width="20" />
                </span>
                <span class="right-menu-arrow" v-if="getIsOpen">
                  <img src="@/assets/right.svg" alt="close" width="20" />
                </span>
              </span>
              {{ title }}

              <span v-if="getClientUser"> - {{ getClientUser.company }}</span>
            </h1>
          </div>
        </li>
        <li v-if="getAuthenticatedUser && getAuthenticatedUser.user_type">
          <div
            class="text-center"
            v-if="getAuthenticatedUser && getAuthenticatedUser.company"
          >
            {{ getAuthenticatedUser.company.toUpperCase() }}
          </div>
        </li>
        <li
          v-if="
            getAuthenticatedUser &&
            getAuthenticatedUser.user_type &&
            ['CLIENT_USER', 'CLIENT'].indexOf(getAuthenticatedUser.user_type) !=
              -1
          "
        >
          <div class="text-center report-btn">
            <el-button type="primary" plain @click="showReportModal = true"
              >Generate Report</el-button
            >
          </div>
        </li>
        <li>
          <div class="profile-logout-block">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <div class="profile-image d-flex align-center">
                  <div
                    class="user-name"
                    v-if="getAuthenticatedUser && getAuthenticatedUser.company"
                  >
                    {{
                      getAuthenticatedUser.first_name +
                      " " +
                      getAuthenticatedUser.last_name
                    }}
                  </div>
                  <img
                    src="@/assets/profile.png"
                    alt="profile-image"
                    class="img-fluid"
                  />
                </div>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="profile">Profile</el-dropdown-item>
                <el-dropdown-item command="updateDialog"
                  >Update Password</el-dropdown-item
                >
                <el-dropdown-item command="requestReports"
                  >Request Reports</el-dropdown-item
                >
                <el-dropdown-item
                  command="logout"
                  v-if="!this.$route.query.user_id"
                  >Logout</el-dropdown-item
                >
                <el-dropdown-item command="adminPanel" v-else
                  >Back to Admin</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </li>
      </ul>
    </div>
    <!-- <div v-if="dialogFormVisible">
      <el-dialog title="Update Password" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="Current Password">
            <el-input v-model="form.current_password" autocomplete="off"></el-input>
            <p v-if="getErrors&&getErrors['current_password']">{{ getErrors['current_password'] }}</p>
          </el-form-item>
          <el-form-item label="New Password">
            <el-input v-model="form.new_password" autocomplete="off"></el-input>
            <p v-if="getErrors&&getErrors['new_password']">{{ getErrors['new_password'] }}</p>
          </el-form-item>
          <el-form-item label="Confirm Password">
            <el-input v-model="form.re_enter_new_password" autocomplete="off"></el-input>
            <p v-if="getErrors&&getErrors['re_enter_new_password']">{{ getErrors['re_enter_new_password'] }}</p>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="updateDialog = false">Cancel</el-button>
          <el-button type="primary" @click="updatePassword">Update Password</el-button>
        </span>
      </el-dialog>
    </div> -->
    <div class="request-report">
      <div v-if="showReportModal">
        <el-dialog
          :visible.sync="showReportModal"
          width="60%"
          append-to-body="true"
        >
          <add-request-report></add-request-report>
        </el-dialog>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import AddRequestReport from "@/components/requestForReport/AddRequestReport";

export default {
  name: "TopbarDefault",
  comments: { AddRequestReport },
  data() {
    return {
      title: "",
      isOpen: "",
      offCanvas: "",
      routerValue: "",
      fromMonth: "",
      toMonth: "",
      showReportModal: false,
      dialogFormVisible: false,
      form: {
        current_password: "",
        new_password: "",
        re_enter_new_password: "",
      },
      dialogFormVisibleFromChild: "",
    };
  },
  computed: {
    routerName() {
      if (this.$route.name) {
        return this.$route.name;
      }
      return null;
    },
    ...mapGetters("navigationOpen", ["getIsOpen", "getIsCollapse"]),
    ...mapGetters("data", ["getFromMonth", "getToMonth", "getClientUser"]),
    ...mapGetters("users", ["getPasswordUpdateStatus", "getErrors"]),
    ...mapGetters("auth", ["getAuthenticatedUser"]),
    isCollapse: {
      get() {
        return this.getIsOpen;
      },
      set(isCollapse) {
        this.$store.commit("navigationOpen/setIsOpen", isCollapse, {
          root: true,
        });
      },
    },
  },
  mounted() {
    this.isOpen = this.getIsOpen;
    this.displayHeader(this.$route.path);
    // this.fromMonth = this.getFromMonth ? this.getFromMonth : "May";
    // this.changeFromMonth();
    // this.toMonth = this.getToMonth ? this.getToMonth : "Oct";
    // this.changeToMonth();
  },
  watch: {
    $route() {
      this.displayHeader();
    },
  },
  methods: {
    getCustomClass() {
      return this.getAuthenticatedUser &&
        ["CLIENT_USER", "CLIENT"].indexOf(
          this.getAuthenticatedUser.user_type
        ) != -1
        ? "request-report"
        : "";
    },
    dialogVisibleFromChild(value) {
      this.dialogFormVisibleFromChild = value;
    },
    sendMessageToParent() {
      this.isOpen = !this.isOpen;
      this.isCollapse = !this.isCollapse;
      this.$store.commit("navigationOpen/setIsOpen", this.isOpen, {
        root: true,
      });
    },
    openSideNav() {
      this.isOpen = !this.isOpen;
      this.isCollapse = !this.isCollapse;
    },
    displayHeader() {
      if (this.$route.params.category) {
        this.title = this.$route.params.category
          ? this.camelCaseCategory(this.$route.params.category)
          : "";
      } else {
        this.title = this.$route.name
          ? this.camelCaseCategory(this.$route.name)
          : "";
      }
    },
    camelCaseCategory(str) {
      if (str === "over-all") {
        str = "overall";
      }
      var splitStr = str.toLowerCase().split("-");
      for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] =
          splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }
      if (splitStr[0] == "Dns") {
        splitStr[0] = "DNS";
      } else if (splitStr[0] == "Vip") {
        splitStr[0] = "VIP";
      }
      return splitStr.join(" ");
    },
    navigationDashboard() {
      this.$router.push({
        path: "/dashboard",
        name: "Dashboard",
        params: { category: "over-all" },
      });
    },
    navigationDatailedAnalysis() {
      this.$router.push({
        path: "/detailed-analysis",
      });
    },
    navigationSecuritySettings() {
      this.$router.push({
        path: "/security-settings",
      });
    },
    logout() {
      this.$store.commit("auth/resetAuthData");
      this.$store.commit("users/resetUsersData");
      this.$store.commit("data/resetData");
      this.$router.push("/login");
    },
    handleCommand(command) {
      if (command === "logout") {
        this.logout();
      }
      if (command == "updateDialog") {
        // this.dialogFormVisible = true;
        this.$router.push({
          path: "/update-password",
          name: "update-password",
        });
      }
      if (command == "profile") {
        this.$router.push({
          path: "/user-profile",
          name: "user-profile",
        });
      }
      if (command == "adminPanel") {
        this.$router.push({
          path: "/users",
          name: "users",
        });
      }
      if (command == "requestReports") {
        this.$router.push({
          path: "/request-reports",
          name: "request-reports",
        });
      }
    },
    takeWindowPrint() {
      window.print();
    },
    async updatePassword() {
      let params = this.form;
      await this.$store.dispatch("users/updatePassword", params);
      if (
        this.getPasswordUpdateStatus &&
        this.getPasswordUpdateStatus.success
      ) {
        this.$notify.success({
          title: "Success",
          message: this.getPasswordUpdateStatus.message,
        });
        this.dialogFormVisible = false;
      }
    },
  },
  components: {
    AddRequestReport,
    // HeaderName,
  },
};
</script>

<style lang="scss">
.top-navbar {
  padding: 0px 20px;
  .el-row {
    width: 100%;
    background: red;
  }
  .page-title {
    h1 {
      color: #333333;
      font-weight: 500;
      font-size: 1.25em;
      text-transform: uppercase;
    }
  }
  .report-btn {
    button {
      color: #1667a3;
      font-weight: 500;
      font-size: 1.2em;
      letter-spacing: 0.5px;
    }
  }
  .profile-image {
    margin-left: 15px;
    img {
      padding: 2px;
      border-radius: 50%;
      width: 40px;
      border: none;
      box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.1);
    }
  }
  .profile-logout-block {
    display: flex;
    justify-content: flex-end;
  }
  .date-picker-list {
    list-style: none;
    display: flex;
    justify-content: flex-end;
    li {
      &:not(:last-child) {
        margin-right: 20px;
      }
    }
    .el-date-editor {
      max-width: 150px;
    }
    .el-input__inner {
      height: 37px;
      border: 1px solid rgba(22, 103, 163, 0.3);
      border-radius: 5px;
      // background: rgba(22, 103, 163, 0.1);
      color: #9a99a0;
    }
    .el-input__prefix {
      top: -1px;
      color: #9a99a0;
    }
  }
  .top-menu-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    list-style: none;
    align-items: center;
    padding-left: 0;
    margin: 5px 0px;
    &.request-report {
      grid-template-columns: 1fr 2fr 170px auto;
      column-gap: 22px;
    }
  }
}
@media (max-width: 768px) {
  .top-navbar .page-title h1 {
    color: #fff !important;
  }
  .dashboard-view .overall-component .left-component .side-navbar-component {
    top: 54px !important;
  }
  .top-navbar .profile-image {
    color: #fff;
  }
  .sideCanvas {
    left: -250px !important;
  }
  .dashboard-view .overall-component .right-component .top-navbar {
    height: 55px;
  }
  .top-navbar .top-menu-list {
    grid-template-columns: 40% auto auto;
  }
}
@media (max-width: 575px) {
  .top-menu-list {
    grid-template-columns: 60% auto !important;
    li {
      &:nth-child(2) {
        display: none;
      }
    }
  }
}
</style>
