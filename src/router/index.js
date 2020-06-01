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
  {
    path: '/platformUserQuery',
    component: Layout,
    redirect: '/platformUserQuery/userListQuery',
    name: 'platformUserQuery',
    meta: {
      title: 'platformUserQuery',
      icon: 'peoples',
      name:'平台用户查询',
      noCache: false,
    },
    children: [{
      path: 'userListQuery',
      component: () => import('@/views/platformUserQuery/userListQuery'),
      name: 'userListQuery',
      meta: {
        title: 'userListQuery',
        name:'用户列表查询',
        icon: 'peoples',
        noCache: false,
      }
    },

    // {
    //   path: 'userRechargeList',
    //   component: () => import('@/views/platformUserQuery/userRechargeList'),
    //   name: 'userRechargeList',
    //   meta: {
    //     title: 'userRechargeList',
    //     name:'用户充值列表'
    //     // icon: 'peoples'
    //   }
    // },
    // {
    //   path: 'userWithdrawList',
    //   component: () => import('@/views/platformUserQuery/userWithdrawList'),
    //   name: 'userWithdrawList',
    //   meta: {
    //     title: 'userWithdrawList',
    //     name:'用户提现列表',
    //     // icon: 'peoples'
    //   }
    // }
  ]
  },
  {
    path: '/managersAdmin',
    component: Layout,
    redirect: '/managersAdmin/managersList',
    name: 'managersAdmin',
    meta: {
      title: 'managersAdmin',
      icon: 'managersList',
      name:'管理员列表',
      noCache: false,
    },
    children: [{
      path: 'managersList',
      component: () => import('@/views/managersAdmin/managersList'),
      name: 'managersList',
      meta: {
        title: 'managersList',
        name:'管理员列表',
        icon: 'managersList',
        noCache: false,
      }
    },

    ]
  },
  {
    path: '/appLayoutManagement',
    component: Layout,
    redirect: '/appLayoutManagement/columnList',
    name: 'appLayoutManagement',
    meta: {
      title: 'appLayoutManagement',
      icon: 'applyNovelManagement',
      name:'app版面配置',
    },
    children: [
    
      {
        path: 'columnList',
        component: () => import('@/views/appLayoutManagement/columnList'),
        name: 'columnList',
        meta: {
          title: 'columnList',
          name:'书城页面配置',
          noCache: false,
          icon: 'columnList'
        }
      },
      {
        path: 'classificationPageMan',
        component: () => import('@/views/appLayoutManagement/classificationPageMan'),
        name: 'classificationPageMan',
        meta: {
          title: 'classificationPageMan',
          name:'分类页面配置',
          noCache: false,
          icon: 'columnList'
        }
      },
    ]
  },
  
  {
    path: '/novelManagement',
    component: Layout,
    redirect: '/novelManagement/novelManagementList',
    name: 'novelManagement',
    meta: {
      title: 'novelManagement',
      icon: 'applyNovelManagement',
      name:'基础数据管理',
      noCache: false,
    },
    children: [
      {
        path: 'classifiedList',
        component: () => import('@/views/novelManagement/classifiedList'),
        name: 'classifiedList',
        meta: {
          title: 'classifiedList',
          name:'分类列表',
          noCache: false,
          icon: 'classification'
        }
      },
      {
        path: 'novelManagementList',
        component: () => import('@/views/novelManagement/novelManagementList'),
        name: 'novelManagementList',
        meta: {
          title: 'novelManagementList',
          name:'小说列表',
          icon: 'applyNovelManagement',
          noCache: false,
        }
      },
      {
        path: 'novelChapterList/:id(\\d+)',
        component: () => import('@/views/novelManagement/novelChapterList'),
        name: 'novelChapterList',
        meta: {
          title: 'novelChapterList',
          name:'小说章节列表',
          noCache: false,
          // icon: 'applyNovelManagement'
        }, 
        hidden: true 
      },
      {
        path: 'novelChapterContent/:id(\\d+)',
        component: () => import('@/views/novelManagement/novelChapterContent'),
        name: 'novelChapterContent',
        meta: {
          title: 'novelChapterContent',
          name:'小说章节内容编辑',
          noCache: false,
          // icon: 'applyNovelManagement'novelChapterContent
        }, 
        hidden: true 
      },
      {
        path: 'tagList',
        component: () => import('@/views/novelManagement/tagList'),
        name: 'tagList',
        meta: {
          title: 'tagList',
          name:'标签列表',
          icon: 'managerTag',
          noCache: false,
        }
      },
      // {
      //   path: 'bannerList',
      //   component: () => import('@/views/novelManagement/bannerList'),
      //   name: 'bannerList',
      //   meta: {
      //     title: 'bannerList',
      //     name:'banner列表',
      //     icon: 'bannerList'
      //   }
      // },
      

    ]
  },
  {
    path: '/adManagement',
    component: Layout,
    redirect: '/adManagement/rechareList',
    name: 'adManagement',
    meta: {
      title: 'adManagement',
      icon: 'setting',
      name:'广告活动管理',
    },
    children: [
      {
        path: 'activityManagement',
        component: () => import('@/views/adManagement/activityManagement'),
        name: 'activityManagement',
        meta: {
          title: 'activityManagement',
          icon: '',
          title1: '活动列表',
          noCache: false,
        }
      },
      {
        path: 'activityConfig',
        component: () => import('@/views/adManagement/activityConfig'),
        name: 'activityConfig',
        meta: {
          title: 'activityConfig',
          icon: '',
          title1: '活动配置',
          noCache: false,
        }
      },

    ]
  },
  /* ======================================平台设置======================================== */
  {
    path: '/platformSettings',
    component: Layout,
    redirect: '/platformSettings/messageCenter',
    name: 'platformSettings',
    meta: {
      title: 'platformSettings',
      icon: 'setting'
    },
    children: [
      {
        path: 'messageCenter',
        component: () => import('@/views/platformSettings/messageCenter'),
        name: 'messageCenter',
        meta: {
          title: 'messageCenter',
          icon: '',
          title1: '公告管理',
          noCache: false,
        }
      },
      {
        path: 'goldRuleSettings',
        component: () => import('@/views/platformSettings/goldRuleSettings'),
        name: 'goldRuleSettings',
        meta: {
          title: 'goldRuleSettings',
          icon: '',
          title1: '金币规则设置',
          noCache: false,
        }
      },
      
      {
        path: 'applyNovelManagement',
        component: () => import('@/views/platformSettings/applyNovelManagement'),
        name: 'applyNovelManagement',
        meta: {
          title: 'applyNovelManagement',
          name:'申请上架小说管理',
          noCache: false,
          // icon: 'applyNovelManagement'
        }
      },
      {
        path: 'feedbackManagement',
        component: () => import('@/views/platformSettings/feedbackManagement'),
        name: 'feedbackManagement',
        meta: {
          title: 'feedbackManagement',
          icon: '',
          noCache: false,
          title1: '反馈帮助管理'
        }
      },
      {
        path: 'feedbackBook',
        component: () => import('@/views/platformSettings/feedbackBook'),
        name: 'feedbackBook',
        meta: {
          title: 'feedbackBook',
          icon: '',
          noCache: false,
          title1: '书籍纠错反馈管理'
        }
      },
      
      
    ]
  },
  {
    path: '/memberCenter',
    component: Layout,
    redirect: '/memberCenter/rechareList',
    name: 'memberCenter',
    meta: {
      title: 'memberCenter',
      icon: 'memberCenter',
      name:'会员中心管理',
    },
    children: [
      {
        path: 'rechareList',
        component: () => import('@/views/memberCenter/rechareList'),
        name: 'rechareList',
        meta: {
          title: 'rechareList',
          name:'充值套餐列表',
          noCache: false,
          icon: 'managerRechare'
        }
      },
      {
        path: 'vipComposeList',
        component: () => import('@/views/memberCenter/vipComposeList'),
        name: 'vipComposeList',
        meta: {
          title: 'vipComposeList',
          name:'VIP套餐列表',
          noCache: false,
          icon: 'managerVipCompose'
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
      noCache: false,
    },
    children: [{
      path: 'orderList',
      component: () => import('@/views/managerOrder/orderList'),
      name: 'orderList',
      meta: {
        title: 'orderList',
        name:'订单列表',
        noCache: false,
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
        noCache: false,
        // icon: 'nested'
      }
    },
    {
      path: 'adFreeList',
      component: () => import('@/views/managerOrder/adFreeList'),
      name: 'adFreeList',
      meta: {
        title: 'adFreeList',
        name:'免广告业务列表',
        noCache: false,
        // icon: 'nested'
      }
    },

    ]
  },
  {
    path: '/appManagement',
    component: Layout,
    redirect: '/appManagement/appManagement',
    name: 'appManagement',
    meta: {
      title: 'appManagement',
      icon: 'appManagement',
      noCache: false,
      name:'APP版本管理',
    },
    children: [{
      path: 'appManagement',
      component: () => import('@/views/appManagement/appManagement'),
      name: 'appManagement',
      meta: {
        title: 'appManagement',
        name:'APP版本管理',
        noCache: false,
        icon: 'appManagement'
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
