<template>
  <section class="dashboard-view">
    <div class="overall-component">
      <div class="left-component">
        <div
          class="side-navbar-component"
          :class="getIsOpen ? 'sideCanvas' : ''"
        >
          <sideNavbar />
        </div>
      </div>
      <div class="right-component" :class="getIsOpen ? 'canvas' : 'offCanvas'">
        <topNavbar />
        <div class="main-dashboard-component">
          <router-view :layout.sync="layout" />
          <div class="copyirght text-center">
            © RHYMTech 2020. All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

import TopNavbar from "@/layouts/Topbar";
import SideNavbar from "@/layouts/Sidebar";
export default {
  name: "home",
  data() {
    return {
      layout: "div",
      offCanvas: true,
    };
  },
  computed: {
    ...mapGetters("navigationOpen", ["getIsOpen", "getIsCollapse"]),
    ...mapGetters("data", ["getHeader"]),
  },
  mounted() {
    if (this.$route.path === "/") {
      if (
        this.getAuthenticatedUser &&
        this.getAuthenticatedUser.user_type &&
        this.getAuthenticatedUser.user_type !== "ADMIN"
      ) {
        this.$router.replace("/dashboard/over-all");
      } else {
        this.$router.replace("/users");
      }
    }
  },
  components: {
    TopNavbar,
    SideNavbar,
  },
  watch: {
    async $route() {
      if (this.$route.path == "/") {
        if (
          this.getAuthenticatedUser &&
          this.getAuthenticatedUser.user_type &&
          this.getAuthenticatedUser.user_type !== "ADMIN"
        ) {
          this.$router.replace("/dashboard/over-all");
        } else {
          this.$router.replace("/users");
        }
      }
    },
  },
};
</script>

<style lang="scss">
.dashboard-view {
  position: relative;
  background: #f1f6fb;
  .canvas {
    transition: all 0.2s ease-in-out;
  }
  .offCanvas {
    margin-left: 155px;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    .top-navbar {
      left: 230px !important;
    }
  }
  .overall-component {
    display: grid;
    grid-template-columns: 75px auto;
    .left-component {
      background: #1667a3;
      .side-navbar-component {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
      }
    }
    .right-component {
      position: relative;
      overflow: hidden;
      .top-navbar {
        min-height: 0;
        background: #ebf0f5;
        box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.125);
        position: fixed;
        top: 0;
        left: 75px;
        right: 0;
        z-index: 9999999999999;
        transition: all 0.2s ease-in-out;
      }
      .main-dashboard-component {
        margin-top: 60px;
        padding: 20px;
        min-height: calc(100vh - 100px);
      }
    }
  }
  .copyirght {
    text-align: center;
    margin-top: 20px;
    margin-bottom: -10px;
    font-size: 12px;
    color: #777777;
  }
}
</style>
