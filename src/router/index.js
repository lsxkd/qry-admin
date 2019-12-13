import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'
// platformUserQuery
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: {
        title: 'dashboard',
        icon: 'ybb_index_on',
        noCache: true
      }
    }]
  },
  // {
  //   path: '/platformUserQuery',
  //   component: Layout,
  //   redirect: '/platformUserQuery/userListQuery',
  //   name: 'platformUserQuery',
  //   meta: {
  //     title: 'platformUserQuery',
  //     icon: 'peoples',
  //     name:'平台用户查询',
  //   },
  //   children: [{
  //     path: 'userListQuery',
  //     component: () => import('@/views/platformUserQuery/userListQuery'),
  //     name: 'userListQuery',
  //     meta: {
  //       title: 'userListQuery',
  //       name:'用户列表查询'
  //       // icon: 'peoples'
  //     }
  //   },

  //   {
  //     path: 'userRechargeList',
  //     component: () => import('@/views/platformUserQuery/userRechargeList'),
  //     name: 'userRechargeList',
  //     meta: {
  //       title: 'userRechargeList',
  //       name:'用户充值列表'
  //       // icon: 'peoples'
  //     }
  //   },
  //   {
  //     path: 'userWithdrawList',
  //     component: () => import('@/views/platformUserQuery/userWithdrawList'),
  //     name: 'userWithdrawList',
  //     meta: {
  //       title: 'userWithdrawList',
  //       name:'用户提现列表',
  //       // icon: 'peoples'
  //     }
  //   }]
  // },
  {
    path: '/managersAdmin',
    component: Layout,
    redirect: '/managersAdmin/managersList',
    name: 'managersAdmin',
    meta: {
      title: 'managersAdmin',
      icon: 'managersList',
      name:'管理员列表',
    },
    children: [{
      path: 'managersList',
      component: () => import('@/views/managersAdmin/managersList'),
      name: 'managersList',
      meta: {
        title: 'managersList',
        name:'管理员列表',
        icon: 'managersList'
      }
    },

    ]
  },
  {
    path: '/managerClassified',
    component: Layout,
    redirect: '/managerClassified/classifiedList',
    name: 'managerClassified',
    meta: {
      title: 'managerClassified',
      icon: 'classification',
      name:'分类管理',
    },
    children: [{
      path: 'classifiedList',
      component: () => import('@/views/managerClassified/classifiedList'),
      name: 'classifiedList',
      meta: {
        title: 'classifiedList',
        name:'分类列表',
        icon: 'classification'
      }
    },

    ]
  },
  {
    path: '/managerRechare',
    component: Layout,
    redirect: '/managerRechare/rechareList',
    name: 'managerRechare',
    meta: {
      title: 'managerRechare',
      icon: 'managerRechare',
      name:'充值套餐管理',
    },
    children: [{
      path: 'rechareList',
      component: () => import('@/views/managerRechare/rechareList'),
      name: 'rechareList',
      meta: {
        title: 'rechareList',
        name:'充值套餐列表',
        icon: 'managerRechare'
      }
    },

    ]
  },
  {
    path: '/managerOrder',
    component: Layout,
    redirect: '/managerOrder/orderList',
    name: 'managerOrder',
    meta: {
      title: 'managerOrder',
      icon: 'managerOrder',
      name:'订单管理',
    },
    children: [{
      path: 'orderList',
      component: () => import('@/views/managerOrder/orderList'),
      name: 'orderList',
      meta: {
        title: 'orderList',
        name:'订单列表',
        // icon: 'managerOrder'
      }
    },
    {
      path: 'vipOrderList',
      component: () => import('@/views/managerOrder/vipOrderList'),
      name: 'vipOrderList',
      meta: {
        title: 'vipOrderList',
        name:'会员订单列表',
        // icon: 'nested'
      }
    },

    ]
  },
  {
    path: '/managerTag',
    component: Layout,
    redirect: '/managerTag/tagList',
    name: 'managerTag',
    meta: {
      title: 'managerTag',
      icon: 'managerTag',
      name:'标签管理',
    },
    children: [{
      path: 'tagList',
      component: () => import('@/views/managerTag/tagList'),
      name: 'tagList',
      meta: {
        title: 'tagList',
        name:'标签列表',
        icon: 'managerTag'
      }
    },

    ]
  },

  {
    path: '/managerVipCompose',
    component: Layout,
    redirect: '/managerVipCompose/vipComposeList',
    name: 'managerVipCompose',
    meta: {
      title: 'managerVipCompose',
      icon: 'managerVipCompose',
      name:'VIP套餐管理',
    },
    children: [{
      path: 'vipComposeList',
      component: () => import('@/views/managerVipCompose/vipComposeList'),
      name: 'vipComposeList',
      meta: {
        title: 'vipComposeList',
        name:'VIP套餐列表',
        icon: 'managerVipCompose'
      }
    },

    ]
  },





  // {
  //   path: '/announcementCenter',
  //   component: Layout,
  //   redirect: '/announcementCenter/announcementList',
  //   name: 'announcementCenter',
  //   meta: {
  //     title: 'announcementCenter',
  //     icon: 'notice',
  //     name:'公告中心'
  //   },
  //   children: [
  //     {
  //       path: 'announcementList',
  //       component: () => import('@/views/announcementCenter/announcementList'),
  //       name: 'announcementList',
  //       meta: {
  //         title: 'announcementList',
  //         icon: 'notice-1',
  //         name:'公告列表'
  //       }
  //     },
  //     {
  //       path: 'releaseAnnouncement',
  //       component: () => import('@/views/announcementCenter/releaseAnnouncement'),
  //       name: 'releaseAnnouncement',
  //       meta: {
  //         title: 'releaseAnnouncement',
  //         icon: 'user',
  //         name:'发布公告'
  //       }
  //     }

  //   ]
  // },
  
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }

]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [

]
