import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://dianjiu.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
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
    redirect: '/task',
    // children: [{
    //   path: 'dashboard',
    //   name: '仪表盘',
    //   component: () => import('@/views/dashboard/index'),
    //   meta: { title: '仪表盘', icon: 'dashboard' }
    // }]
  },

  {
    path: '/task',
    component: Layout,
    redirect: '/task/details',
    name: '任务管理',
    meta: { title: '任务管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'details',
        name: '任务列表',
        component: () => import('@/views/task/details/index'),
        meta: { title: '任务列表', icon: 'el-icon-folder-opened' }
      },
      {
        path: 'records',
        name: '执行记录',
        component: () => import('@/views/task/records/index'),
        meta: { title: '执行记录', icon: 'el-icon-document' }
      },
      {
        path: 'errors',
        name: '异常日志',
        component: () => import('@/views/task/errors/index'),
        meta: { title: '异常日志', icon: 'el-icon-document-delete' }
      },
      {
        path: 'corns',
        name: '生成器',
        component: () => import('@/views/task/crons/index'),
        meta: { title: '生成器', icon: 'el-icon-view' }
      }
    ]
  },

  {
    path: '/manage',
    component: Layout,
    redirect: '/manage/users',
    name: '权限管理',
    meta: { title: '权限管理', icon: 'el-icon-s-tools' },
    children: [
      {
        path: 'users',
        name: '用户管理',
        component: () => import('@/views/manage/users/index'),
        meta: { title: '用户管理', icon: 'el-icon-user' }
      },
      {
        path: 'roles',
        name: '角色管理',
        component: () => import('@/views/manage/roles/index'),
        meta: { title: '角色管理', icon: 'el-icon-news' }
      },
      {
        path: 'menus',
        name: '菜单管理',
        component: () => import('@/views/manage/menus/index'),
        meta: { title: '菜单管理', icon: 'el-icon-mouse' }
      }
    ]
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
