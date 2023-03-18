import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.free === true) {
//     return next()
//   }
//   if (to.matched.length === 0) {
//     return next("/notfound");
//   }
//   if (store.state.user == null) {
//     return next("/login");
//   }
//   if (filter(to.path, store) === true) {
//     return next();
//   }
//   return next("/unauthorized");
// });
export default router
