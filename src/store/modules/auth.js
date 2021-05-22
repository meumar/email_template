import axios from "@/config/axios";

// initial state
const initialState = () => {
  return {
    user: null,
    authenticationDetails: {},
    authenticationStatus: null,
    errors: [],
    generalErrorMessage: null,
    addUserStatus: null,
    emailVerifyStatus: null,
    forgotPasswordRequestStatus: null,
  };
};

const state = initialState();

const getters = {
  getAuthenticatedUser: state => state.user,
  getAuthenticationDetails: state => state.authenticationDetails,
  getAuthenticationStatus: state => state.authenticationStatus,
  getGeneralErrorMessage: state => state.generalErrorMessage,
  getErrors: state => state.errors,
  getAddUserStatus: state => state.addUserStatus,
  getEmailVerifyStatus: state => state.emailVerifyStatus,
  // forgot password
  getForgotPasswordStatus: state => state.forgotPasswordRequestStatus,
};

const mutations = {

  setAuthenticatedUser: (state, user) => {
    state.user = user;
  },

  setAuthenticationStatus: (state, status) => {
    state.authenticationStatus = status;
  },

  setAuthenticationDetails: (state, tokens) => {
    state.authenticationDetails = tokens;
  },

  setGeneralErrorMessage: (state, message) => {
    state.generalErrorMessage = message;
  },

  setErrors: (state, errors) => {
    state.errors = errors
  },

  resetAuthData: state => {
    const initial = initialState();
    Object.keys(initial).forEach(key => {
      state[key] = initial[key];
    });
  },

  setAddUserStatus: (state, status) => {
    state.addUserStatus = status
  },

  setEmailVerifyStatus: (state, status) => {
    state.emailVerifyStatus = status
  },

  setForgotPasswordStatus: (state, status) => {
    state.forgotPasswordRequestStatus = status
  },

};

const actions = {
  // create user by admin
  addUser: async (context, params) => {
    try {
      context.commit('auth/setAddUserStatus', null, { root: true });
      let response = await axios.post("users", params);
      context.commit('auth/setAddUserStatus', response.data, { root: true });
    } catch (error) {
      context.dispatch("auth/errorResponse", error.response, { root: true });
    }
  },
  // user login
  login: async (context, params) => {
    context.commit("auth/resetAuthData", null, { root: true });
    try {
      let response = await axios.post("signin", params);
      let userDetails = response.data.data;
      let tokens = {
        access_token: userDetails.access_token,
        refresh_token: userDetails.refresh_token
      };
      context.commit("auth/setAuthenticatedUser", userDetails, { root: true });

      context.commit("auth/setAuthenticationDetails", tokens, { root: true });

      context.commit("auth/setAuthenticationStatus", true, { root: true });
    } catch (error) {
      context.commit("auth/setAuthenticationStatus", false, { root: true });
      context.dispatch("auth/errorResponse", error.response, { root: true });
    }
  },
  // verifying user - based on verify link
  emailVerify: async (context, params) => {
    context.commit("auth/setEmailVerifyStatus", null, {root: true});
    context.commit('auth/setErrors', [], { root: true });
    try {
      await axios.post("verify-email", params);
      context.commit("auth/setEmailVerifyStatus", true, { root: true });
    } catch (error) {
      context.commit("auth/setEmailVerifyStatus", false, { root: true });
      console.log(error.response)
      context.dispatch("auth/errorResponse", error.response, { root: true });
    }
  },
  // forgot password - sends verification email to the user registered given mail
  forgotPasswordRequest: async (context, params) => {
    context.commit("auth/setForgotPasswordStatus", null, {root: true});
    context.commit('auth/setErrors', [], { root: true });
    try {
      await axios.post("forget-password", params);
      context.commit("auth/setForgotPasswordStatus", true, { root: true });
    } catch (error) {
      context.commit("auth/setForgotPasswordStatus", false, { root: true });
      console.log(error.response)
      context.dispatch("auth/errorResponse", error.response, { root: true });
    }
  },
  // forgot password verification - verifies email and update password
  forgotPasswordVerify: async (context, params) => {
    context.commit("auth/setForgotPasswordStatus", null, {root: true});
    context.commit('auth/setErrors', [], { root: true });
    try {
      await axios.post("verify-forget-password", params);
      context.commit("auth/setForgotPasswordStatus", true, { root: true });
    } catch (error) {
      context.commit("auth/setForgotPasswordStatus", false, { root: true });
      console.log(error.response)
      context.dispatch("auth/errorResponse", error.response, { root: true });
    }
  },
  reset: function (context) {
    context.commit("auth/resetAuthData", null, { root: true });
  },

  errorResponse: async (context, errorResponse) => {
    context.commit('auth/setErrors', [], { root: true });
    let errorStatusCode = errorResponse.status;

    let errorData = [];

    switch (errorStatusCode) {
      case 422:
        var errors = errorResponse.data.errors;
        if (errors.details) {
          errors.details.forEach(detail => {
            errorData[detail.key] = detail.message;
          });
        } else {
          Object.keys(errors).forEach(function (key) {
            errorData[key] = errors[key].message;
          });
        }
        break;

      case 401:
      case 403:
        errorData["error"] = errorResponse.data.message;

        break;

      default:
        errorData["error"] = errorResponse.data.message;
        break;
    }

    context.commit("auth/setErrors", errorData, { root: true });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};


