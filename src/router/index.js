import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import App from '../App.vue'
// import Main from '../components/Main.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'business',
    component: App,
    children: [
      {
        path: '/home',
        name: '首页',
        component: Home,
      }, {
        path: '/scheme/manage',
        name: '方案管理',
        component: Home,
      },{
        path: '/user/manage',
        name: '用户管理',
        component: () => import('../views/user/manage')
      }
    ]
  },

];

const router = new VueRouter({
  routes,
});

export default router;
