import Vue from 'vue';
import VueRouter from 'vue-router';
// import App from '../App.vue'
// import Main from '../components/Main.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: '登录',
    component: () => import('../components/home/user/login')
  },
  {
    path: '/scheme/manage',
    name: '方案管理',
    component: () => import('../components/home/scheme/search')
  }, {
    path: '/user/manage',
    name: '用户管理',
    component: () => import('../components/home//user/manage')
  },
  {
    path: '/scheme/search',
    name: '方案查询',
    component: () => import('../components/home/scheme/search')
  },

];

const router = new VueRouter({
  routes,
});

export default router;
