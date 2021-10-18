import {createRouter, createWebHistory} from "vue-router"
import store                            from "../store";
import filter                           from "./filter";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      component: () => import("../modules/login/routes/Login.vue"),
      meta: {free: true}
    },
    {
      path: "/index",
      component: () => import("../modules/main/routes/Main.vue"),
    },
    {
      path: "/error",
      component: () => import("../modules/commons/routes/Error.vue"),
      meta: {free: true}
    },
    {
      path: "/notfound",
      component: () => import("../modules/commons/routes/Notfound.vue"),
      meta: {free: true}
    },
    {
      path: "/unauthorized",
      component: () => import("../modules/commons/routes/Unauthorized.vue"),
      meta: {free: true}
    }
  ]
});

router.beforeEach((to, from, next) => {
  // if (to.meta.free === true) {
  //   return next()
  // }
  // if (to.matched.length === 0) {
  //   return next("/notfound");
  // }
  // if (store.state.user == null) {
  //   return next("/login");
  // }
  // if (filter(to.path, store) === true) {
  //   return next();
  // }
  // return next("/unauthorized");
  next();
});

export default router;