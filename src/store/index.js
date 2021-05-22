export const strict = false;

import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import createPersistedState from "vuex-persistedstate";
// Modules
import navigationOpen from "./modules/navigationOpen";

// import config from "@/config/app";

Vue.use(Vuex);


const store = new Vuex.Store({
  modules: {
    auth,
    navigationOpen,
  },
  strict: true,
  plugins: [createPersistedState({
    paths: ['auth']
  })]
});
export default store;
