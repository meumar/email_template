<template>
  <div class="side-navigation-menu">
    <ul class="side-navigation-menu-list">
      <li>
        <div class="logo">
          <div class="icon" v-if="getIsOpen">
            <router-link to="/">
              <img
                src="@/assets/rhym-logo-icon.png"
                alt="logo"
                class="img-fluid"
              />
            </router-link>
          </div>
          <div class="complete-logo" v-if="!getIsOpen">
            <router-link to="/">
              <img src="@/assets/rhym-logo.png" alt="logo" class="img-fluid" />
            </router-link>
          </div>
        </div>
      </li>
      <li class="navigation-menu-list">
        <el-menu
          default-active="-1"
          class="el-menu-vertical-demo"
          :router="routerValue"
          :collapse="isCollapse"
        >
          <span
            v-if="
              getAuthenticatedUser &&
              getAuthenticatedUser.user_type &&
              ['SUPER_ADMIN', 'ADMIN'].indexOf(
                getAuthenticatedUser.user_type
              ) != -1 &&
              !this.$route.query.user_id
            "
          >
            <el-menu-item
              index="/users"
              :class="$route.path.indexOf('/users') > -1 ? 'menuActive' : ''"
            >
              <img src="../assets/sidebar/group.svg" alt="Dashboard" />
              <span slot="title">Users</span>
            </el-menu-item>

            <el-menu-item
              index="/uploaded-files"
              :class="
                $route.path.indexOf('/uploaded-files') > -1 ? 'menuActive' : ''
              "
            >
              <img src="../assets/sidebar/upload.svg" alt="Dashboard" />
              <span slot="title">Uploaded Files</span>
            </el-menu-item>
            <el-menu-item
              index="/companies"
              :class="
                $route.path.indexOf('/companies') > -1 ? 'menuActive' : ''
              "
            >
              <!-- <el-menu-item @click="addcompany"> -->
              <img src="../assets/sidebar/enterprise.svg" alt="Dashboard" />
              <span slot="title">Companies</span>
            </el-menu-item>
          </span>
          <span
            v-if="
              (getAuthenticatedUser &&
                getAuthenticatedUser.user_type &&
                ['CLIENT_USER', 'CLIENT'].indexOf(
                  getAuthenticatedUser.user_type
                ) != -1) ||
              this.$route.query.user_id
            "
          >
            <el-menu-item
              :key="-1"
              @click="toggleMenu('', -1)"
              :class="
                $route.path.indexOf('/dashboard/over-all') > -1
                  ? 'menuActive'
                  : ''
              "
            >
              <img src="../assets/sidebar/over_all.svg" alt="Dashboard" />
              <span slot="title">Overall</span>
            </el-menu-item>
            <el-menu-item
              v-for="(category, index) in getCategories"
              :key="index"
              @click="toggleMenu(category, index)"
              :class="
                $route.path.indexOf('/dashboard/' + category.slug) > -1
                  ? 'menuActive'
                  : ''
              "
            >
              <!-- <img src="../assets/sidebar/over_all.svg" alt="Dashboard" /> -->

              <img :src="imgPath(category.slug)" :alt="category.name" />
              <span slot="title">{{ category.name }}</span>
            </el-menu-item>
          </span>
        </el-menu>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SidebarDefault",
  data() {
    return {
      loading: true,
      isOpen: "",
      offCanvas: "",
      routerValue: "",
      categories: [],
      path: "over-all",
      paramPath: "",
      month: "",
    };
  },
  computed: {
    ...mapGetters("navigationOpen", ["getIsOpen", "getIsCollapse"]),
    ...mapGetters("data", [
      "getCategories",
      "getWeekGraphData",
      "getMonthGraphData",
      "getPath",
      "getLoading",
      "getFromMonth",
      "getToMonth",
      "getClientUser",
    ]),
    ...mapGetters("navigationOpen", ["getActiveFilter"]),
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
  async mounted() {
    await this.$store.dispatch("data/fetchCategories");
    if (this.$route.name === "Dashboard") {
      await this.fetchRequiredData();
    }
    this.$store.commit("data/setLoading", false, { root: true });
  },
  created() {
    this.$root.$on("change-date", async () => {
      await this.fetchRequiredData();
    });
  },
  methods: {
    // addcompany(){
    //   this.$router.push({path: '/add-company'})
    // },
    imgPath(categoryName) {
      let fileName = categoryName.replace(/-/gi, "_");
      let filePath = require.context("../assets/sidebar/", false, /\.svg$/);
      return filePath("./" + fileName + ".svg");
    },
    openSideNav() {
      this.isOpen = !this.isOpen;
      this.isCollapse = !this.isCollapse;
    },

    async toggleMenu(category, index) {
      let name = category ? category.name : "";
      if (name && name !== "") {
        this.path = name.toLowerCase().split(" ").join("_");
      } else {
        this.path = "over-all";
      }

      this.$store.commit("data/setPathIndex", index, {
        root: true,
      });

      this.paramPath = category ? category.slug : "over-all";
      this.$store.commit("data/setPath", this.paramPath, {
        root: true,
      });
      if (this.$route.query.user_id) {
        await this.$router.push({
          path: "/dashboard",
          name: "Dashboard",
          params: {
            category: this.paramPath,
          },
          query: {
            user_id: this.$route.query.user_id,
          },
        });
      } else {
        await this.$router
          .push({
            path: "/dashboard",
            name: "Dashboard",
            params: {
              category: this.paramPath,
            },
          })
          .catch(() => {});
        await this.fetchRequiredData();
      }
    },

    async fetchRequiredData() {
      let params = {
        path: "over-all",
      };
      let threatCategories = [];
      let categoriesData = [];
      if (
        this.getPath &&
        this.$route.params.category &&
        this.$route.params.category !== this.getPath
      ) {
        params.path = this.$route.params.category;

        threatCategories = this.getCategories;

        threatCategories.forEach((category) => {
          categoriesData.push(category.slug);
        });

        if (categoriesData.indexOf(this.$route.params.category) !== -1) {
          this.$store.commit(
            "data/setPathIndex",
            categoriesData.indexOf(this.$route.params.category),
            {
              root: true,
            }
          );
          await this.$store.commit(
            "data/setPath",
            this.$route.params.category,
            { root: true }
          );
        }
      } else if (this.getPath && this.getPath !== "") {
        params.path = this.getPath;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.side-navigation-menu {
  background: #1667a3;
  height: 100vh;
  .side-navigation-menu-list {
    list-style: none;
    padding-left: 0;
    margin-top: 0;
    padding-bottom: 2em;
    .navigation-menu-list {
      margin-top: 10px;
      ul {
        height: calc(100vh - 120px);
        overflow-y: scroll;
        padding-bottom: 2em;
        min-height: auto !important;
        &::-webkit-scrollbar-track {
          background-color: #1667a3;
        }

        &::-webkit-scrollbar {
          width: 8px;
          background-color: #1667a3;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
          background-color: #012a52;
        }
      }
    }
    li {
      .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 230px;
      }
      .el-menu {
        background-color: transparent !important;
      }
      .el-menu--collapse {
        min-height: 100vh;
        background: #1667a3;
        width: 75px;
      }

      .el-menu-item {
        color: #fff;
        background: #1667a3 !important;
        position: relative;
        font-size: 1.1em;
        span {
          margin-left: 40px !important;
        }

        img {
          position: absolute;
          left: 20px;
          top: 51%;
          transform: translateY(-50%);
          bottom: 0;
          width: 30px;
          height: 30px;
        }

        &:hover {
          background: rgba($color: #000000, $alpha: 0.1) !important;
        }
      }
      .menuActive {
        background: rgba($color: #000000, $alpha: 0.2) !important;
        position: relative;
        font-weight: 500;
      }
      .el-menu {
        border-right: none;
        .menu-icon {
          margin-right: 15px;
          &:focus {
            border: none;
            outline: none;
          }
        }
      }
      .el-menu--collapse {
        .menu-icon {
          margin-right: 0 !important;
        }
        .el-tooltip {
          display: flex !important;
          align-items: center !important;
        }
      }
      .el-tooltip {
        padding: 0 15px !important;
      }
      .el-tooltip__popper {
        background: #f8f9fa !important;
        color: #7348bf !important;
        font-weight: 500 !important;
        box-shadow: 0 1px 1px #dddddd;
        .popper__arrow {
          border-right-color: #7348bf !important;
          &:after {
            border-right-color: #7348bf !important;
          }
        }
      }
      .toggle-menu-animation {
        .hidden {
          visibility: hidden;
        }
        button {
          cursor: pointer;
        }
        button:focus {
          outline: 0;
        }
        .burger-button {
          position: relative;
          height: 30px;
          width: 35px;
          display: block;
          margin-top: 10px;
          margin-bottom: 30px;
          margin-left: 10px;
          z-index: 60;
          border: 0;
          border-radius: 0;
          background-color: transparent;
          pointer-events: all;
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .burger-bar {
          background-color: #fff;
          position: absolute;
          top: 50%;
          right: 6px;
          left: 6px;
          height: 2px;
          width: auto;
          margin-top: -1px;
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
          opacity: 1;
        }

        .burger-bar--1 {
          -webkit-transform: translateY(-6px);
          transform: translateY(-8px);
        }

        .burger-bar--3 {
          transform: translateY(8px);
        }

        #burger.active .burger-button {
          transform: rotate(-180deg);
        }

        #burger.active .burger-bar--1 {
          transform: rotate(45deg);
        }

        #burger.active .burger-bar--2 {
          opacity: 0;
        }

        #burger.active .burger-bar--3 {
          transform: rotate(-45deg);
        }
      }
      .logo {
        padding-top: 10px;
        height: 75px;
        padding-left: 10px;
        padding-right: 10px;
        .icon {
          img {
            display: table;
            margin: 0 auto;
            width: 20px;
          }
        }
      }
      .complete-logo {
        img {
          max-width: 195px;
        }
      }
    }
  }
}
</style>
