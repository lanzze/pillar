import Details                          from "@/pages/details/Details.vue";
import {createRouter, createWebHistory} from 'vue-router';
import Index                            from "../pages/Index/Index.vue";


const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: '/tab',
         component: Index,
      },
      {
         path: '/details',
         component: Details,
      },
   ],
});

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
export default router;
