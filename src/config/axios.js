import axios from "axios";
import router from "@/router";
// import appConfig from "@/config/app";
import store from "@/store";

let apiUrl = ''

if (process.env.NODE_ENV == "staging") {
  apiUrl = process.env.VUE_APP_STAG_API_URL || process.env.VUE_APP_LOCAL_API_URL
}
else {
  apiUrl = process.env.VUE_APP_DEV_API_URL || process.env.VUE_APP_LOCAL_API_URL
}

const $axios = axios.create({
  baseURL: apiUrl,
  timeout: 10000
});


$axios.interceptors.request.use(
  config => {

    let authDetails = store.getters["auth/getAuthenticationDetails"];
    if (authDetails && authDetails["access_token"]) {
      config.headers.common["Authorization"] = authDetails["access_token"];
    } else {
      config.headers.common["Authorization"] = "";
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

$axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    let originalRequest = error.config;

    let errorStatusCode = ""
    if (error.response && error.response.status)
      errorStatusCode = error.response.status;

    if (
      errorStatusCode === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      store.commit("auth/resetAuthData");
      // store.commit("profile/resetProfileData");
      router.push("/login");
    }

    if (
      errorStatusCode === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      store.commit("auth/resetAuthData");
      // store.commit("profile/resetProfileData");
      router.go("/login");
    }
    return Promise.reject(error);
  }
);

export default $axios;
