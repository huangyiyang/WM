export default [
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: 'home' */ '@/page/home/index'),
    meta: {
      title: 'WISEMOTION开放平台'
    },
    children: [
      {
        path: 'page',
        name: 'homePage',
        component: () => import(/* webpackChunkName: 'home' */ '@/page/home/page'),
        meta: {
          title: 'WISEMOTION开放平台'
        }
      },
      {
        path: 'list',
        name: 'homeList',
        component: () => import(/* webpackChunkName: 'home' */ '@/page/home/list'),
        meta: {
          title: 'WISEMOTION开放平台'
        }
      },
      {
        path: 'details',
        name: 'homeDetails',
        component: () => import(/* webpackChunkName: 'home' */ '@/page/home/details'),
        meta: {
          title: 'WISEMOTION开放平台'
        }
      }
    ]
  }
]
