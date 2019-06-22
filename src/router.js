import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from './views/Login.vue'
import HelloWorld from './components/HelloWorld.vue'

// import Uploads from './views/Uploads.vue'
// import Train from "./views/Train";

Vue.use(Router)


export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: {bodyClass: 'auth-wrapper'}
    },
    {
      path: "/uploads",
      name: 'Uploads',
      component: HelloWorld,
      alias: "/",
      meta: {bodyClass: 'full-screen', verboseName: 'Data Classifier', icon: '@/assets/img/company5.png'}
    },
    // {
    //   path: "/train",
    //   name: 'Train',
    //   component: Train,
    //   meta: {bodyClass: 'full-screen', verboseName: 'Data Trainer', icon: '@/assets/img/company5.png'}
    // },
    // {
    //   path: "/documents/collaborate/:id",
    //   name: "Collaborate",
    //   component: Train,
    //   meta: {bodyClass: 'full-screen', verboseName: 'Data Trainer', icon: '@/assets/img/company5.png'}
    // },
    {
      path: '*', redirect: '/'
    },
  ]
})

router.beforeEach((to, from, next) => {

  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/uploads'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user-token');

//   if (authRequired && (loggedIn === null)) {
//     return next('/login');
//   }
  next()

})

export default router;  
