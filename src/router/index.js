import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/coin",
  },
  {
    path: "/home/",
    component: () => import("@/views/Home/Home"),
  },
  {
    path: "/login/",
    component: () => import("@/views/Login/Login"),
  },
  {
    path: "/signup/",
    component: () => import("@/views/Signup/Signup"),
  },
  {
    path: "/coin/",
    component: () => import("@/views/Coin/Coin"),
  },
  {
    path: "/chart/",
    component: () => import("@/views/Chart/Chart"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
