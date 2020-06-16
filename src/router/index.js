import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '仪表盘', icon: 'dashboard' }
    },
    {
      path: 'test',
      name: 'test',
      component: () => import('@/views/dashboard/test'),
      meta: { title: '测试', icon: 'dashboard' }
    }]
  },

  {
    path: '/gateway',
    component: Layout,
    redirect: '/gateway/add',
    name: 'gateway',
    meta: {
      title: '网关中心',
      icon: 'tree'
    },
    children: [
      {
        path: 'add',
        component: () => import('@/views/gateway/add'), // Parent router-view
        name: 'gateway-add',
        meta: { title: '添加网关' }
      },
      {
        path: 'manage',
        component: () => import('@/views/gateway/table'),
        meta: { title: '网关管理' }
      }
    ]
  },

  {
    path: '/sensor',
    component: Layout,
    redirect: '/sensor/add',
    name: 'sensor',
    meta: {
      title: '传感器中心',
      icon: 'ET'
    },
    children: [
      {
        path: 'add',
        component: () => import('@/views/sensor/add'), // Parent router-view
        name: 'sensor-add',
        meta: { title: '添加传感器' }
      },
      {
        path: 'manage',
        name: 'sensor-manage',
        component: () => import('@/views/sensor/table'),
        meta: { title: '传感器管理' }
      }
    ]
  },

  {
    path: '/solution',
    component: Layout,
    redirect: '/solution/add',
    name: 'solution',
    meta: {
      title: '解决方案中心',
      icon: 'nested'
    },
    children: [
      {
        path: 'add',
        component: () => import('@/views/solution/add'), // Parent router-view
        name: 'solution-add',
        meta: { title: '创建解决方案' }
      },
      {
        path: 'solution-manage',
        component: () => import('@/views/solution/stable'),
        meta: { title: '解决方案管理' }
      },
      {
        path: 'program-manage',
        component: () => import('@/views/solution/ptable'),
        meta: { title: '项目管理' }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user',
    meta: { title: '用户中心', icon: 'user' },
    children: [{
      path: 'user',
      name: 'user',
      component: () => import('@/views/user/index'),
      meta: { title: '用户管理' }
    }, {
      path: 'company',
      component: () => import('@/views/solution/stable'),
      meta: { title: '公司管理' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
