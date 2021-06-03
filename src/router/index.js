import AuthMiddleware from "@/middleware/auth";
import Router from "vue-router";
import Vue from "vue";

const Login = () => import("@/views/auth/Login");
const Signup = () => import("@/views/auth/Signup");
const NewTemplete = () => import("@/components/NewTemplates");
// const ForgotPassword = () => import('@/views/auth/forgotPassword');
// const RequestForgotPassword = () => import('@/views/auth/requestForgotPassword');
// const EmailVerification = () => import('@/views/auth/emailVerification');
const ForgotPassword = () => import('@/views/auth/forgotPassword');
const RequestForgotPassword = () => import('@/views/auth/requestForgotPassword');
const EmailVerification = () => import('@/views/auth/emailVerification');
const VerificationResponse = () => import('@/views/auth/verificationResponse');
// // const UpdatePassword = () => import("@/views/auth/UpdatePassword");
// // const UpdateProfile = () => import("@/views/auth/UpdateProfile");
const UserProfile = () => import("@/views/auth/UserProfile");
const NewProject = () => import("@/components/NewProject");

Vue.use(Router);
//export default
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      component: Login,
      name: "Login",
      beforeEnter: AuthMiddleware.guest,
    },
    {
      path: "/newproject",
      component: NewProject,
      name: "NewProject",
      beforeEnter: AuthMiddleware.guest,
    },
    {
      path:"/user-profile",
      component:UserProfile,
      name:"UserProfile",
      beforeEnter:AuthMiddleware.guest,
    },
    {
      path:"/new-templete",
      component:NewTemplete,
      name:"NewTemplete",
      beforeEnter:AuthMiddleware.guest  
    },
    {
      path: "/signup",
      component: Signup,
      name: "Signup",
      beforeEnter: AuthMiddleware.guest,
    },
    {
      path: "/forgot-password-verification",
      component: ForgotPassword,
      name: "ForgotPassword",
      beforeEnter: AuthMiddleware.guest
    },
    {
      path: "/forgot-password",
      component: RequestForgotPassword,
      name: "RequestForgotPassword",
      beforeEnter: AuthMiddleware.guest
    },
    {
      path: "/email-verification",
      component: EmailVerification,
      name: "EmailVerification",
      beforeEnter: AuthMiddleware.guest
    },
    {
      path: "/verification-response/:status",
      component: VerificationResponse,
      name: "EmailVerification",
      beforeEnter: AuthMiddleware.guest
    },
  ],
});

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default router;